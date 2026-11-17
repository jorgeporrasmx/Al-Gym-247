import test from 'node:test'
import assert from 'node:assert/strict'
import { createTrackedWhatsAppURL, directWhatsAppURL } from './whatsapp-attribution'
import { resolveAttribution } from './lead-attribution'
import { POST } from '../app/api/whatsapp/route'

const secret = 'qa_only_not_a_real_secret_'.repeat(2)
const reference = `AGREF.${'A'.repeat(43)}`
const attribution = resolveAttribution('https://www.algym247.com/ubicaciones/azcapotzalco?gclid=QA_ONLY&utm_source=google&utm_medium=cpc')

test('only the opaque reference reaches WhatsApp; the capture is posted to the backend with server authorization', async () => {
  const calls: Array<{ url: string; options?: RequestInit }> = []
  const result = await createTrackedWhatsAppURL('Hola, quiero informes', attribution, { secret,
    fetcher: (async (url, options) => {
      calls.push({ url: String(url), options })
      return Response.json({ reference, expiresAt: Date.now() + 30000 }, { status: 201 })
    }) as typeof fetch,
  })
  assert.equal(result.tracked, true)
  const url = new URL(result.url)
  assert.equal(url.searchParams.get('text'), `Hola, quiero informes\n[${reference}]`)
  assert(!result.url.includes('QA_ONLY')); assert(!result.url.includes(secret))
  assert.equal(calls.length, 1)
  assert.equal((calls[0].options?.headers as Record<string, string>).Authorization, `Bearer ${secret}`)
  assert.equal(calls[0].options?.cache, 'no-store')
  assert.equal(JSON.parse(String(calls[0].options?.body)).parameters.gclid, 'QA_ONLY')
})

test('missing capture makes no backend request or invented campaign', async () => {
  const result = await createTrackedWhatsAppURL('Informes', undefined, {
    fetcher: (async () => { throw new Error('must_not_call') }) as typeof fetch,
  })
  assert.equal(result.tracked, false); assert.equal(result.url, directWhatsAppURL('Informes'))
})

test('outage, expired response, invalid token, missing credential and foreign endpoint all fail explicitly', async () => {
  const responses = [new Response('', { status: 503 }),
    Response.json({ reference, expiresAt: 0 }), Response.json({ reference: 'fake', expiresAt: Date.now() + 30000 })]
  for (const response of responses) await assert.rejects(createTrackedWhatsAppURL('Informes', attribution, {
    secret, fetcher: (async () => response) as typeof fetch,
  }))
  await assert.rejects(createTrackedWhatsAppURL('Informes', attribution))
  await assert.rejects(createTrackedWhatsAppURL('Informes', attribution, { secret, endpoint: 'https://evil.test/' }))
})

test('website endpoint rejects cross-origin requests and never echoes private payloads', async () => {
  const request = new Request('https://www.algym247.com/api/whatsapp', { method: 'POST',
    headers: { Origin: 'https://evil.test' }, body: JSON.stringify({ message: 'private' }) })
  const response = await POST(request)
  assert.equal(response.status, 403); assert(!(await response.text()).includes('private'))
})

test('website endpoint preserves the opaque reference contract and no-store response', async () => {
  const original = globalThis.fetch; const previous = process.env.ALGYM_WEB_ATTRIBUTION_SECRET
  process.env.ALGYM_WEB_ATTRIBUTION_SECRET = secret
  globalThis.fetch = (async () => Response.json({ reference, expiresAt: Date.now() + 30000 }, { status: 201 })) as typeof fetch
  try {
    const response = await POST(new Request('https://www.algym247.com/api/whatsapp', { method: 'POST',
      headers: { Origin: 'https://www.algym247.com' }, body: JSON.stringify({ message: 'Informes', attribution }) }))
    assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store')
    const data = await response.json(); assert.equal(data.tracked, true); assert(!data.url.includes('QA_ONLY'))
  } finally { globalThis.fetch = original; if (previous === undefined) delete process.env.ALGYM_WEB_ATTRIBUTION_SECRET; else process.env.ALGYM_WEB_ATTRIBUTION_SECRET = previous }
})

test('Maps tagging is retained for downstream separation from Google organic', () => {
  const maps = resolveAttribution('https://www.algym247.com/?utm_source=gmb&utm_medium=referral')
  assert.equal(maps.source, 'Google'); assert.equal(maps.parameters.utm_source, 'gmb')
})
