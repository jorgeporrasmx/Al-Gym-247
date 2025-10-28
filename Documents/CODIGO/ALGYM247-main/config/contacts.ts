/**
 * Configuración centralizada de contactos de Algym247
 * Este archivo contiene toda la información de contacto para mantener consistencia
 */

export const CONTACTS = {
  // Números de contacto
  whatsapp: {
    number: '525569028493',
    displayNumber: '+52 55 6902 8493',
    defaultMessage: {
      es: '¡Hola! Me interesa conocer más sobre Algym247.',
      en: 'Hello! I\'m interested in learning more about Algym247.'
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
export const getWhatsAppURL = (message?: string, language: 'es' | 'en' = 'es') => {
  const msg = message || CONTACTS.whatsapp.defaultMessage[language]
  return `https://api.whatsapp.com/send/?phone=${CONTACTS.whatsapp.number}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`
}

export const getPhoneURL = () => {
  return `tel:${CONTACTS.phone.number}`
}

export const getEmailURL = (type: 'general' | 'franchise' | 'support' = 'general', subject?: string) => {
  const email = CONTACTS.email[type]
  const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${email}${subjectParam}`
}
