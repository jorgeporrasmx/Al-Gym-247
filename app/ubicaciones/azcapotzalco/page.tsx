import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { LocationDetail } from "@/components/location-detail"

export const metadata: Metadata = {
  title: "Gimnasio 24/7 en Azcapotzalco | Al Gym Algym247",
  description:
    "Gimnasio 24/7 en Azcapotzalco: Al Gym está en Av. Azcapotzalco 527, locales 15–17. Pregunta por mensualidades y acceso por WhatsApp.",
  keywords: [
    "gimnasio Azcapotzalco",
    "gym Azcapotzalco",
    "gym Azcapo",
    "gimnasio 24/7 Azcapotzalco",
    "Al Gym Azcapotzalco",
    "Algym 24/7 Azcapotzalco",
  ],
  authors: [{ name: "Algym247" }],
  creator: "Algym247",
  publisher: "Algym247",
  openGraph: {
    title: "Gimnasio 24/7 en Azcapotzalco | Al Gym Algym247",
    description:
      "Al Gym está en Av. Azcapotzalco 527, locales 15–17. Consulta mensualidades y condiciones de acceso por WhatsApp.",
    type: "website",
    locale: "es_MX",
    url: "https://www.algym247.com/ubicaciones/azcapotzalco",
    siteName: "Algym247",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gimnasio 24/7 en Azcapotzalco | Al Gym Algym247",
    description:
      "Al Gym está en Av. Azcapotzalco 527, locales 15–17. Consulta mensualidades y condiciones de acceso por WhatsApp.",
  },
  alternates: {
    canonical: "https://www.algym247.com/ubicaciones/azcapotzalco",
  },
}

const locationData = {
  name: "Algym247 Azcapotzalco",
  headline: "Gimnasio 24/7 en Azcapotzalco",
  intro:
    "Al Gym Algym247 está en Av. Azcapotzalco 527, locales 15–17. Entrena 24/7 y escríbenos por WhatsApp para consultar mensualidades y condiciones de acceso.",
  address: "Av. Azcapotzalco 527. Local 15 al 17, Centro de Azcapotzalco, 02000 CDMX",
  neighborhood: "Azcapotzalco",
  phone: "", // No phone number for this location
  whatsapp: "", // No WhatsApp for this location
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
        "item": "https://www.algym247.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ubicaciones",
        "item": "https://www.algym247.com/#ubicaciones"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Azcapotzalco",
        "item": "https://www.algym247.com/ubicaciones/azcapotzalco"
      }
    ]
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": "https://www.algym247.com/ubicaciones/azcapotzalco#exercise-gym",
    "name": "Algym247 Azcapotzalco",
    "url": "https://www.algym247.com/ubicaciones/azcapotzalco",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Azcapotzalco 527, locales 15 al 17",
      "addressLocality": "Centro de Azcapotzalco",
      "addressRegion": "Ciudad de México",
      "postalCode": "02000",
      "addressCountry": "MX"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
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
        <section className="bg-gray-50 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-gray-900">Guías para elegir dónde entrenar en Azcapotzalco</h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Compara ubicación, clases, equipo y condiciones antes de tomar una decisión.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                ["Cómo elegir un gimnasio cerca de ti", "/guias/gimnasio-en-azcapotzalco-cerca-de-mi"],
                ["Cómo comparar clases de gimnasio", "/guias/clases-de-gym-azcapotzalco"],
                ["Checklist para elegir el mejor gimnasio", "/guias/mejor-gimnasio-azcapotzalco"],
              ].map(([title, href]) => (
                <Link key={href} href={href} className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-800 transition hover:border-secondary hover:text-secondary hover:shadow-sm">
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
