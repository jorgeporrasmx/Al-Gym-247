/**
 * Centralized location data for NAP (Name, Address, Phone) consistency
 * Used across the entire site for local SEO optimization
 *
 * TODO: Update with real data before production (see PLACEHOLDERS-TODO.md)
 * IMPORTANT: NAP consistency is critical for local SEO
 */

export interface Location {
  id: string
  name: string
  fullName: string
  address: {
    street: string
    neighborhood: string
    municipality: string
    state: string
    postalCode: string
    country: string
    full: string
  }
  phone: string
  whatsapp: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  hours: {
    display: string
    structured: {
      opens: string
      closes: string
    }
  }
}

export const LOCATIONS: Record<string, Location> = {
  azcapotzalco: {
    id: "azcapotzalco",
    name: "Azcapotzalco",
    fullName: "Algym247 Azcapotzalco",
    address: {
      street: "Av. Azcapotzalco 527. Local 15 al 17",
      neighborhood: "Centro de Azcapotzalco",
      municipality: "Azcapotzalco",
      state: "CDMX",
      postalCode: "02000",
      country: "México",
      full: "Av. Azcapotzalco 527. Local 15 al 17, Centro de Azcapotzalco, 02000 CDMX",
    },
    phone: "",
    whatsapp: "",
    email: "azcapotzalco@algym247.com",
    coordinates: {
      lat: 19.4569,
      lng: -99.1895,
    },
    hours: {
      display: "24 horas, 7 días a la semana",
      structured: {
        opens: "00:00",
        closes: "23:59",
      },
    },
  },
  polanco: {
    id: "polanco",
    name: "Polanco",
    fullName: "Algym247 Nuevo Polanco",
    address: {
      street: "Lago Alberto 442-Local 15",
      neighborhood: "Anáhuac 1 Secc",
      municipality: "Miguel Hidalgo",
      state: "CDMX",
      postalCode: "11320",
      country: "México",
      full: "Lago Alberto 442-Local 15, Anáhuac 1 Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX",
    },
    phone: "+52 55 6811 3049",
    whatsapp: "+525568113049",
    email: "informes@algymnuevopolanco.com.mx",
    coordinates: {
      lat: 19.44,
      lng: -99.2019,
    },
    hours: {
      display: "24 horas, 7 días a la semana",
      structured: {
        opens: "00:00",
        closes: "23:59",
      },
    },
  },
}

// Company information for NAP consistency
// TODO: Verify all contact info and social media URLs before production
export const COMPANY_INFO = {
  name: "Algym247",
  legalName: "Algym247 S.A. de C.V.",
  tagline: "El gimnasio para todos",
  description:
    "Cadena de gimnasios 24 horas en Ciudad de México. Equipamiento moderno, clases incluidas y acceso ilimitado.",
  founded: "2020",
  email: "contacto@algym247.com", // TODO: Verify email
  phone: "+52 55 1234 5678", // TODO: Real main contact number
  website: "https://al-gym-247.vercel.app",
  social: {
    facebook: "https://www.facebook.com/algym247", // TODO: Verify URL
    instagram: "https://www.instagram.com/algym247", // TODO: Verify URL
    twitter: "https://twitter.com/algym247", // TODO: Verify URL
    tiktok: "https://www.tiktok.com/@algym247", // TODO: Verify URL
    youtube: "https://www.youtube.com/@algym247", // TODO: Verify URL
    linkedin: "https://www.linkedin.com/company/algym247", // TODO: Verify URL
  },
}

// Helper function to get location by ID
export function getLocation(locationId: string): Location | undefined {
  return LOCATIONS[locationId]
}

// Helper function to get all locations as array
export function getAllLocations(): Location[] {
  return Object.values(LOCATIONS)
}

// Helper function to format phone for tel: links
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/\s+/g, "")
}

// Helper function to get Google Maps URL
export function getGoogleMapsUrl(location: Location): string {
  return `https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}`
}

// Helper function to get embedded map URL
export function getEmbeddedMapUrl(location: Location): string {
  const { lat, lng } = location.coordinates
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15045.234567890!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI3JzI0LjgiTiA5OcKwMTEnMjIuMiJX!5e0!3m2!1ses!2smx!4v1234567890`
}
