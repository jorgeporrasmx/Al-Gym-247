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

const locationData = {
  name: "Algym247 Nuevo Polanco",
  address: "Parques Plaza Nuevo Polanco - Local 15, Lago Alberto 442, Anáhuac 1 Sección, Miguel Hidalgo, CDMX, CP 11320",
  neighborhood: "Nuevo Polanco",
  phone: "+52 55 6811 3049",
  whatsapp: "+52 55 6811 3049",
  email: "informes@algymnuevopolanco.com.mx",
  hours: "24 horas, 7 días a la semana",
  coordinates: {
    lat: 19.4358,
    lng: -99.2037,
  },
  mapUrl: "https://maps.google.com/?q=Lago+Alberto+442,+Anáhuac+I+Secc,+Miguel+Hidalgo,+11320+CDMX",
  embedMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.3!2d-99.2037!3d19.4358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sLago%20Alberto%20442%2C%20Anáhuac%20I%20Secc%2C%20Miguel%20Hidalgo%2C%2011320%20CDMX!5e0!3m2!1ses!2smx!4v1234567890",
  features: [
    "AlGym HIIT - Entrenamiento interválico de alta intensidad",
    "AlGym FUNCIONAL - Ejercicios cardiovasculares, gimnásticos y de fuerza",
    "AlGym SUSPENSIÓN - Entrenamiento funcional con sistema de suspensión (TRX)",
    "AlGym BOXING CIRCUIT - Circuito de alta intensidad combinando funcional y box",
    "AlGym ABS - 30 minutos de entrenamiento del Core con bandas y discos",
    "AlGym STEP - Coreografía aeróbica con escalón y música",
    "AlGym COMBAT - Circuito aeróbico con movimientos de artes marciales",
    "AlGym GAP - 30 minutos exclusivos para glúteos, abdominales y piernas",
    "ZUMBA - Baile fitness con movimientos aeróbicos y coreografías",
    "AlGym YOGA - Práctica integral para cuerpo y mente",
    "AlGym JUMP - Entrenamiento dinámico con mini trampolín",
    "Equipamiento moderno para entrenamiento de fuerza",
    "Zona cardiovascular completa",
    "Vestidores y regaderas",
    "Acceso 24/7 todos los días",
  ],
  images: ["/pic2.jpg", "/3.jpg", "/pic1.jpg"],
  nearbyLandmarks: [
    "Parques Plaza Nuevo Polanco",
    "Lago Alberto 442, Anáhuac 1 Sección",
    "Zona de Nuevo Polanco y Anáhuac",
    "Cerca de Circuito Interior",
    "Fácil acceso en transporte público y automóvil",
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
