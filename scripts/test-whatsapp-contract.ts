// Run with ALGYM_BACKEND_REVIEW_DIR pointing at the sanitized backend checkout.
// This exercises real local HTTP + SQLite and mocks only the remote Monday boundary.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { createTrackedWhatsAppURL } from '../lib/whatsapp-attribution'
import { resolveAttribution } from '../lib/lead-attribution'

async function main() {
  const backendDir = process.env.ALGYM_BACKEND_REVIEW_DIR
  if (!backendDir) throw new Error('Set ALGYM_BACKEND_REVIEW_DIR to the sanitized backend checkout')
  process.env.ALGYM_WHATSAPP_TEST_MODE = '1'
  process.env.ALGYM_WHATSAPP_AUTO_REPLY = '0'
  process.env.ALGYM_WHATSAPP_LLM_BRAIN = '0'
  process.env.ALGYM_MONDAY_SYNC = '0'
  process.env.ALGYM_CALENDAR_ENABLED = '0'
  process.env.ALGYM_WEB_ATTRIBUTION_SECRET = 'qa_only_local_contract_'.repeat(3)
  const require = createRequire(import.meta.url)
  const backend = require(resolve(backendDir, 'scripts/algym-whatsapp-backend.js'))
  const database = backend.createDatabase(':memory:')
  backend.ensureSchema(database)
  const server = backend.createServer(database)
  await new Promise<void>(done => server.listen(0, '127.0.0.1', done))
  const localURL = `http://127.0.0.1:${server.address().port}/attribution/web-reference`
  const localFetch = globalThis.fetch
  const records: Array<{ query: string; variables: any }> = []
  try {
    const capture = resolveAttribution('https://www.algym247.com/ubicaciones/azcapotzalco?gclid=QA_CONTRACT_ONLY&utm_source=google&utm_medium=cpc&campaign_id=QA_CAMPAIGN&ad_id=QA_AD&email=do-not-retain@example.test')
    const outbound = await createTrackedWhatsAppURL('Hola, quiero informes', capture, {
      secret: process.env.ALGYM_WEB_ATTRIBUTION_SECRET,
      fetcher: (async (url, options) => {
        assert.equal(String(url), 'https://algym-wa.sutilde.com/attribution/web-reference')
        return localFetch(localURL, options)
      }) as typeof fetch,
    })
    assert.equal(database.prepare('select count(*) as c from lead_profiles').get().c, 0)
    assert(!outbound.url.includes('QA_CONTRACT_ONLY')); assert(!outbound.url.includes('example.test'))
    const text = new URL(outbound.url).searchParams.get('text')
    const event = { from: '5215550000301', messageId: 'wamid.QA_CONTRACT', text, raw: { text: { body: text } }, type: 'text' }
    assert.equal(backend.persistInbound(database, event).attributionStatus, 'resolved')
    assert.equal(event.text, 'Hola, quiero informes')
    const result = await backend.syncLeadToMonday(database, event.from, {
      force: true, mode: 'create_only', mondayClient: async (query: string, variables: any) => {
        records.push({ query, variables })
        if (query.includes('items_page_by_column_values')) return { items_page_by_column_values: { items: [], cursor: null } }
        if (query.includes('create_item')) return { create_item: { id: 'qa_contract_mock_only' } }
        throw new Error('Unexpected remote action')
      },
    })
    assert.equal(result.ok, true)
    const simulatedWrite = records.find(row => row.query.includes('create_item'))!
    const columns = JSON.parse(simulatedWrite.variables.columnValues)
    assert.equal(columns.estado.label, 'Google Ads'); assert.equal(columns.text_mm388zbj, 'QA_CONTRACT_ONLY')
    assert.equal(columns.text_mm38d6nd, undefined); assert.equal(columns.text_mkzbc1ta, undefined)
    assert.equal(JSON.parse(columns.long_text_mm6xae20.text).contact_channel, 'WhatsApp')
    assert.equal(backend.persistInbound(database, { ...event }).duplicate, true)
    const duplicate = await backend.syncLeadToMonday(database, event.from, { force: true, mode: 'create_only',
      mondayClient: async (query: string) => {
        assert(query.includes('exclude_nonactive'))
        return { items: [{ id: 'qa_contract_mock_only', state: 'active', board: { id: '4052125777' }, column_values: [{ id: 'tel_fono', value: JSON.stringify({ phone: event.from }) }] }] }
      } })
    assert.equal(duplicate.operation, 'noop_existing_item')
    assert.equal(records.filter(row => row.query.includes('create_item')).length, 1)
    console.log('PASS: web → local HTTP → opaque reference → WhatsApp payload → SQLite → simulated Monday; retry creates zero additional items. External writes: 0. Ads events: 0. Messages sent: 0.')
  } finally {
    server.closeAllConnections()
    await new Promise<void>(done => server.close(done))
    database.close()
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
