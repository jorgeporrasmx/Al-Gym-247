import type { LeadAttribution } from './lead-attribution'

export function directWhatsAppURL(message: string): string {
  const url = new URL('https://api.whatsapp.com/send/')
  url.searchParams.set('phone', '5215565215702')
  url.searchParams.set('text', message)
  url.searchParams.set('type', 'phone_number')
  url.searchParams.set('app_absent', '0')
  return url.toString()
}

// Used only on the server. The shared credential is never sent to the browser.
export async function createTrackedWhatsAppURL(
  message: string, attribution: LeadAttribution | undefined,
  options: { secret?: string; endpoint?: string; fetcher?: typeof fetch } = {},
): Promise<{ url: string; tracked: boolean }> {
  if (typeof message !== 'string' || !message.trim() || message.length > 1200 || /[\x00-\x08]/.test(message)) {
    throw new Error('invalid_message')
  }
  if (!attribution) return { url: directWhatsAppURL(message), tracked: false }
  if (!options.secret || options.secret.length < 32) throw new Error('attribution_unavailable')
  const endpoint = new URL(options.endpoint || 'https://algym-wa.sutilde.com/attribution/web-reference')
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.search ||
      endpoint.hostname !== 'algym-wa.sutilde.com' || endpoint.pathname !== '/attribution/web-reference') {
    throw new Error('invalid_endpoint')
  }
  const response = await (options.fetcher || fetch)(endpoint, {
    method: 'POST', cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(3000),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${options.secret}` },
    body: JSON.stringify(attribution),
  })
  if (!response.ok) throw new Error('attribution_unavailable')
  const data = await response.json()
  if (typeof data.reference !== 'string' || !/^AGREF\.[A-Za-z0-9_-]{43}$/.test(data.reference) ||
      !Number.isFinite(data.expiresAt) || data.expiresAt <= Date.now()) throw new Error('invalid_reference')
  return { url: directWhatsAppURL(`${message}\n[${data.reference}]`), tracked: true }
}
