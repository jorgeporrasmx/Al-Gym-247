import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { LocationDetail } from "@/components/location-detail"

export const metadata: Metadata = {
  title: "Algym247 Azcapotzalco - Gimnasio 24/7 en CDMX | Equipamiento Completo",
  description:
    "Visita Algym247 en Av. Azcapotzalco 527, Centro de Azcapotzalco. Gimnasio 24 horas con clases de Boxeo, Spinning, Bouncing, Funcional y más. A 5 min del Metro Camarones. ¡Primera clase gratis!",
  keywords: [
    "gimnasio azcapotzalco",
    "gym 24 horas azcapotzalco",
    "gimnasio cdmx azcapotzalco",
    "algym247 azcapotzalco",
    "fitness azcapotzalco",
    "entrenamiento azcapotzalco",
    "gimnasio cerca metro camarones",
    "gym parque tezozomoc",
    "clases grupales azcapotzalco",
    "boxeo spinning bouncing azcapotzalco",
    "clases de boxeo azcapotzalco",
    "gimnasio av azcapotzalco 527",
  ],
  authors: [{ name: "Algym247" }],
  creator: "Algym247",
  publisher: "Algym247",
  openGraph: {
    title: "Algym247 Azcapotzalco - Gimnasio 24/7 en CDMX",
    description:
      "Gimnasio 24 horas en Av. Azcapotzalco 527 con clases de Boxeo, Spinning, Bouncing y Funcional. A 5 min del Metro Camarones. ¡Primera clase gratis!",
    type: "website",
    locale: "es_MX",
    url: "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
    siteName: "Algym247",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algym247 Azcapotzalco - Gimnasio 24/7 en CDMX",
    description:
      "Gimnasio 24 horas con clases de Boxeo, Spinning, Bouncing y Funcional. A 5 min del Metro Camarones. ¡Primera clase gratis!",
  },
  alternates: {
    canonical: "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
  },
}

const locationData = {
  name: "Algym247 Azcapotzalco",
  address: "Av. Azcapotzalco 527. Local 15 al 17, Centro de Azcapotzalco, 02000 CDMX",
  neighborhood: "Azcapotzalco",
  phone: "+52 55 1234 5678", // TODO: Real phone number
  whatsapp: "+52 55 1234 5678", // Mismo que WhatsApp principal
  email: "azcapotzalco@algym247.com", // TODO: Verify email works
  hours: "24 horas, 7 días a la semana",
  coordinates: {
    lat: 19.4569, // TODO: Verify real GPS coordinates
    lng: -99.1895, // TODO: Verify real GPS coordinates
  },
  mapUrl: "https://maps.google.com/?q=19.4569,-99.1895",
  embedMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15045.234567890!2d-99.1895!3d19.4569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI3JzI0LjgiTiA5OcKwMTEnMjIuMiJX!5e0!3m2!1ses!2smx!4v1234567890",
  features: [
    "Área de pesas libres con equipamiento de última generación",
    "Máquinas cardiovasculares con pantallas interactivas",
    "Zona de entrenamiento funcional amplia",
    "Clases grupales incluidas: Boxeo, Spinning, Bouncing, Funcional y más",
    "Vestidores amplios con lockers de seguridad",
    "Regaderas con agua caliente 24/7",
    "WiFi de alta velocidad en todas las áreas",
    "Acceso con Tarjeta Llave personal 24/7",
    "Personal de apoyo disponible en horarios pico",
  ],
  images: ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"],
  nearbyLandmarks: [
    "A 5 minutos del Metro Camarones",
    "Cerca de Parque Tezozómoc",
    "Zona comercial con restaurantes y tiendas",
    "Fácil acceso desde varias vías",
  ],
  testimonial: {
    name: "María González", // TODO: Replace with real testimonial
    text: "Llevo 6 meses entrenando en Algym247 Azcapotzalco y me encanta. El equipamiento es excelente y al ser 24 horas puedo entrenar después de mi turno nocturno. ¡100% recomendado!", // TODO: Real testimonial
    rating: 5,
  },
}

export default function AzcapotzalcoPage() {
  // Breadcrumb Schema for better navigation in search results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://al-gym-247.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ubicaciones",
        "item": "https://al-gym-247.vercel.app/#ubicaciones"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Azcapotzalco",
        "item": "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco"
      }
    ]
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "GymHealthClub",
    "@id": "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
    "name": "Algym247 Azcapotzalco",
    "image": [
      "https://al-gym-247.vercel.app/pic1.jpg",
      "https://al-gym-247.vercel.app/pic2.jpg",
      "https://al-gym-247.vercel.app/pic3.jpg"
    ],
    "description": "Gimnasio 24 horas en Azcapotzalco, CDMX con equipos modernos de última generación, clases grupales incluidas (Boxeo, Spinning, Bouncing, Funcional) y acceso ilimitado. Primera clase gratis.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Azcapotzalco 527. Local 15 al 17",
      "addressLocality": "Centro de Azcapotzalco",
      "addressRegion": "CDMX",
      "postalCode": "02000",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.4569",
      "longitude": "-99.1895"
    },
    "url": "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
    "telephone": "+52-55-1234-5678",
    "email": "azcapotzalco@algym247.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Debit Card, Mobile Payment",
    "currenciesAccepted": "MXN"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        <LocationDetail location={locationData} />
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
