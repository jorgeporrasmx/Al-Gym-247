const STORAGE_KEY = 'algym.lead-attribution.v1'
const SESSION_MS = 30 * 60 * 1000

const TRACKING_KEYS = [
  'gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium',
  'utm_campaign', 'utm_content', 'utm_term', 'campaign_id', 'adgroup_id', 'ad_id',
] as const

export type LeadAttribution = {
  capturedAt: number
  landingPage: string
  source?: 'Google Ads' | 'Google'
  parameters: Record<string, string>
}

// Keep each visit's identifiers together; never attach an old click ID to a new campaign.
export function resolveAttribution(
  href: string,
  referrer = '',
  previous?: LeadAttribution,
  now = Date.now(),
): LeadAttribution {
  const url = new URL(href)
  const parameters: Record<string, string> = {}
  for (const key of TRACKING_KEYS) {
    const value = url.searchParams.get(key)?.trim()
    if (value && value.length <= 512 && !/[\r\n]/.test(value)) parameters[key] = value
  }
  if (!Object.keys(parameters).length && previous &&
      now >= previous.capturedAt && now - previous.capturedAt < SESSION_MS) return previous

  const source = parameters.utm_source?.toLowerCase()
  const medium = parameters.utm_medium?.toLowerCase()
  let acquisition: LeadAttribution['source']
  if (parameters.gclid || parameters.gbraid || parameters.wbraid ||
      (source === 'google' && /^(cpc|ppc|paid|paidsearch|paid_search)$/.test(medium || ''))) {
    acquisition = 'Google Ads'
  } else if (source === 'google' || /^(google_maps|maps|gmb|google_business_profile)$/.test(source || '') ||
      (source === 'google' && /^(maps|gmb)$/.test(medium || ''))) acquisition = 'Google'

  // A missing referrer is unknown/direct traffic, not evidence of a Google visit.
  if (!Object.keys(parameters).length && referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase()
      if (/^(www\.)?google\.(com|com\.mx)$/.test(host)) {
        acquisition = 'Google'
        parameters.utm_source = 'google'
        parameters.utm_medium = 'organic'
      }
    } catch { /* Ignore malformed referrers. */ }
  }

  // Only retain tracking parameters, excluding arbitrary URL data such as email addresses.
  const landing = new URL(url.origin + url.pathname)
  for (const [key, value] of Object.entries(parameters)) landing.searchParams.set(key, value)
  return { capturedAt: now, landingPage: landing.toString(), source: acquisition, parameters }
}

let cached: LeadAttribution | undefined

export function captureBrowserAttribution(): LeadAttribution | undefined {
  if (typeof window === 'undefined') return undefined
  let previous = cached
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const value = JSON.parse(raw)
      if (typeof value.capturedAt === 'number' && typeof value.landingPage === 'string' &&
          value.parameters && typeof value.parameters === 'object') previous = value
    }
  } catch { /* In-memory capture also works when storage is blocked. */ }
  cached = resolveAttribution(window.location.href, document.referrer, previous)
  try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cached)) } catch { /* Optional storage. */ }
  return cached
}

export function buildInterestFormURL(base: string, attribution?: LeadAttribution): string {
  if (!attribution) return base
  const url = new URL(base)
  for (const key of TRACKING_KEYS) {
    const value = attribution.parameters[key]
    if (value) url.searchParams.set(key, value)
  }
  url.searchParams.set('landing_page', attribution.landingPage)
  url.searchParams.set('contact_channel', 'Formulario web')
  if (attribution.source) url.searchParams.set('acquisition_source', attribution.source)
  return url.toString()
}
