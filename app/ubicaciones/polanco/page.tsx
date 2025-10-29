import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { LocationDetail } from "@/components/location-detail"

export const metadata: Metadata = {
  title: "Algym247 Polanco - Gimnasio Premium 24/7 en CDMX | Instalaciones de Lujo",
  description:
    "Descubre Algym247 en Nuevo Polanco, CDMX. Gimnasio premium 24 horas con tecnología de punta, spa, clases exclusivas y amenidades de lujo. En el corazón de Polanco. ¡Prueba gratis!",
  keywords: [
    "gimnasio polanco",
    "gym 24 horas polanco",
    "gimnasio cdmx polanco",
    "algym247 polanco",
    "fitness polanco",
    "gimnasio premium polanco",
    "nuevo polanco gym",
    "gimnasio antara polanco",
    "gym plaza carso",
    "gimnasio ejército nacional",
    "spa gimnasio polanco",
    "pilates boxing polanco",
  ],
  authors: [{ name: "Algym247" }],
  creator: "Algym247",
  publisher: "Algym247",
  openGraph: {
    title: "Algym247 Polanco - Gimnasio Premium 24/7 en CDMX",
    description:
      "Gimnasio premium 24 horas en Nuevo Polanco con tecnología de punta, spa y clases exclusivas. ¡Prueba gratis!",
    type: "website",
    locale: "es_MX",
    url: "https://al-gym-247.vercel.app/ubicaciones/polanco",
    siteName: "Algym247",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algym247 Polanco - Gimnasio Premium 24/7 en CDMX",
    description:
      "Gimnasio premium 24 horas en Nuevo Polanco con tecnología de punta y amenidades de lujo. ¡Prueba gratis!",
  },
  alternates: {
    canonical: "https://al-gym-247.vercel.app/ubicaciones/polanco",
  },
}

// TODO: Update with real location data before production (see PLACEHOLDERS-TODO.md)
const locationData = {
  name: "Algym247 Nuevo Polanco",
  address: "Av. Ejército Nacional 843, Nuevo Polanco, Miguel Hidalgo, CDMX, CP 11510", // TODO: Verify address
  neighborhood: "Nuevo Polanco",
  phone: "+52 55 8765 4321", // TODO: Real phone number
  whatsapp: "+52 55 8765 4321", // TODO: Real WhatsApp number
  email: "polanco@algym247.com", // TODO: Verify email works
  hours: "24 horas, 7 días a la semana",
  coordinates: {
    lat: 19.44, // TODO: Verify real GPS coordinates
    lng: -99.2019, // TODO: Verify real GPS coordinates
  },
  mapUrl: "https://maps.google.com/?q=19.4400,-99.2019",
  embedMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15045.234567890!2d-99.2019!3d19.4400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI2JzI0LjAiTiA5OcKwMTInMDYuOCJX!5e0!3m2!1ses!2smx!4v1234567890",
  features: [
    "Equipamiento premium Technogym y Life Fitness",
    "Zona cardiovascular con vistas panorámicas",
    "Área de entrenamiento funcional de 200m²",
    "Clases exclusivas: Pilates, Boxing, TRX, Hot Yoga",
    "Spa con sauna, vapor y jacuzzi",
    "Vestidores premium con amenidades de lujo",
    "Regaderas individuales con productos de cortesía",
    "Estacionamiento valet parking disponible",
    "Lounge área con café y snacks saludables",
    "WiFi de fibra óptica en todas las instalaciones",
    "Entrenadores personales certificados internacionalmente",
    "Sistema de reserva de clases vía app móvil",
  ],
  images: ["/pic2.jpg", "/3.jpg", "/pic1.jpg"],
  nearbyLandmarks: [
    "A 3 minutos del Metro San Joaquín (Línea 7)",
    "Frente a Antara Polanco",
    "Cerca de Plaza Carso y Museo Soumaya",
    "Acceso directo desde Ejército Nacional",
    "Zona corporativa y residencial premium",
  ],
  testimonial: {
    name: "Carlos Mendoza", // TODO: Replace with real testimonial
    text: "El mejor gimnasio donde he estado. Las instalaciones son de primer nivel, el equipo es nuevo y las clases de boxing son increíbles. Vale cada peso de la membresía.", // TODO: Real testimonial
    rating: 5,
  },
}

export default function PolancoPage() {
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
        "name": "Polanco",
        "item": "https://al-gym-247.vercel.app/ubicaciones/polanco"
      }
    ]
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "GymHealthClub",
    "@id": "https://al-gym-247.vercel.app/ubicaciones/polanco",
    "name": "Algym247 Nuevo Polanco",
    "image": [
      "https://al-gym-247.vercel.app/pic2.jpg",
      "https://al-gym-247.vercel.app/3.jpg",
      "https://al-gym-247.vercel.app/pic1.jpg"
    ],
    "description": "Gimnasio premium 24 horas en Nuevo Polanco, CDMX. Instalaciones de lujo con equipamiento Technogym, spa, clases exclusivas (Pilates, Boxing, TRX, Hot Yoga) y servicios VIP. Primera clase gratis.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Ejército Nacional 843",
      "addressLocality": "Nuevo Polanco, Miguel Hidalgo",
      "addressRegion": "CDMX",
      "postalCode": "11510",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.4400",
      "longitude": "-99.2019"
    },
    "url": "https://al-gym-247.vercel.app/ubicaciones/polanco",
    "telephone": "+52-55-8765-4321",
    "email": "polanco@algym247.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$$",
    "paymentAccepted": "Cash, Credit Card, Debit Card, Mobile Payment, Bank Transfer",
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
