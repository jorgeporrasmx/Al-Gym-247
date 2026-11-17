import { createTrackedWhatsAppURL } from '@/lib/whatsapp-attribution'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' }

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ error: 'forbidden' }, { status: 403, headers })
  }
  try {
    const text = await request.text()
    if (text.length > 16000) return Response.json({ error: 'invalid_request' }, { status: 413, headers })
    const payload = JSON.parse(text)
    const result = await createTrackedWhatsAppURL(payload.message, payload.attribution, {
      secret: process.env.ALGYM_WEB_ATTRIBUTION_SECRET,
    })
    return Response.json(result, { headers })
  } catch {
    // Never echo contact text, tracking IDs or credentials into responses or logs.
    console.warn('whatsapp_attribution_unavailable')
    return Response.json({ error: 'attribution_unavailable' }, { status: 503, headers })
  }
}
