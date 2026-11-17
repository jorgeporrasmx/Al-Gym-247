import { buildInterestFormURL, captureBrowserAttribution } from '@/lib/lead-attribution'
import { directWhatsAppURL } from '@/lib/whatsapp-attribution'

/**
 * Configuración centralizada de contactos de Algym247
 * Este archivo contiene toda la información de contacto para mantener consistencia
 */

export const CONTACTS = {
  // Números de contacto
  whatsapp: {
    number: '5215565215702',
    displayNumber: '+52 1 55 6521 5702',
    defaultMessage: {
      es: 'Hola, quiero informes de Al Gym Azcapotzalco',
      en: 'Hello, I would like information about Al Gym Azcapotzalco.'
    }
  },

  phone: {
    number: '+16722072221',
    displayNumber: '+1 (672) 207-2221',
    internationalFormat: '+1 672 207 2221'
  },

  // Emails
  email: {
    general: 'info@algym247.com',
    franchise: 'franquicias@algym247.com',
    support: 'soporte@algym247.com'
  },

  // Formularios externos
  forms: {
    interest: 'https://forms.monday.com/forms/34bf2aeca8d71c4b8b5ce4fb4111c244?r=use1'
  },

  // Redes sociales
  social: {
    facebook: 'https://www.facebook.com/AlGymParaTodos?mibextid=ZbWKwL',
    instagram: 'https://www.instagram.com/algym.247/?igsh=bDFiNGtycHcwOWxh#',
    linkedin: 'https://www.linkedin.com/company/algymmx/?originalSubdomain=mx',
    youtube: 'https://www.youtube.com/@AlGym247',
    tiktok: 'https://www.tiktok.com/@algym.247'
  }
}

// Helpers para generar URLs
// Called by click handlers, preserving the original visit across internal navigation.
export const getInterestFormURL = () =>
  buildInterestFormURL(CONTACTS.forms.interest, captureBrowserAttribution())

export const getWhatsAppURL = (message?: string, language: 'es' | 'en' = 'es') => {
  const msg = message || CONTACTS.whatsapp.defaultMessage[language]
  return directWhatsAppURL(msg)
}

// Open the tab synchronously to retain the user's click gesture on mobile browsers.
export const openWhatsApp = async (message?: string, language: 'es' | 'en' = 'es') => {
  const popup = window.open('about:blank', '_blank')
  if (popup) popup.opener = null
  let url = getWhatsAppURL(message, language)
  try {
    const attribution = captureBrowserAttribution()
    const response = await fetch('/api/whatsapp', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({ message: message || CONTACTS.whatsapp.defaultMessage[language], attribution }),
    })
    if (!response.ok) throw new Error('reference_unavailable')
    const data = await response.json()
    const destination = new URL(data.url)
    if (destination.origin !== 'https://api.whatsapp.com' || destination.pathname !== '/send/' ||
        destination.searchParams.get('phone') !== CONTACTS.whatsapp.number) throw new Error('invalid_destination')
    url = destination.toString()
  } catch {
    // Contact remains available during an outage; never manufacture attribution.
    console.warn('whatsapp_reference_unavailable')
  }
  if (popup) { if (!popup.closed) popup.location.replace(url) }
  else window.location.assign(url)
}

export const getPhoneURL = () => {
  return `tel:${CONTACTS.phone.number}`
}

export const getEmailURL = (type: 'general' | 'franchise' | 'support' = 'general', subject?: string) => {
  const email = CONTACTS.email[type]
  const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${email}${subjectParam}`
}
