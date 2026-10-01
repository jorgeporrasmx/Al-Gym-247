import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { LocationDetail } from "@/components/location-detail"

export const metadata: Metadata = {
  title: "Gimnasio 24/7 en Polanco | Al Gym Algym247",
  description:
    "Al Gym Algym247 en Nuevo Polanco: Lago Alberto 442, Local 15. Gimnasio abierto 24/7. Consulta mensualidades y condiciones de acceso por WhatsApp.",
  keywords: [
    "gimnasio en Polanco",
    "gym en Polanco",
    "gimnasio 24/7 Polanco",
    "Al Gym Polanco",
    "Algym Nuevo Polanco",
  ],
  authors: [{ name: "Algym247" }],
  creator: "Algym247",
  publisher: "Algym247",
  openGraph: {
    title: "Gimnasio 24/7 en Polanco | Al Gym Algym247",
    description:
      "Al Gym Algym247 en Nuevo Polanco: Lago Alberto 442, Local 15. Consulta mensualidades y condiciones de acceso por WhatsApp.",
    type: "website",
    locale: "es_MX",
    url: "https://www.algym247.com/ubicaciones/polanco",
    siteName: "Algym247",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gimnasio 24/7 en Polanco | Al Gym Algym247",
    description:
      "Al Gym Algym247 en Nuevo Polanco: Lago Alberto 442, Local 15. Consulta mensualidades y condiciones de acceso por WhatsApp.",
  },
  alternates: {
    canonical: "https://www.algym247.com/ubicaciones/polanco",
  },
}

const locationData = {
  name: "Algym247 Nuevo Polanco",
  headline: "Gimnasio 24/7 en Nuevo Polanco",
  intro:
    "Al Gym Algym247 está en Lago Alberto 442, Local 15. Entrena a cualquier hora, todos los días; consulta por WhatsApp las mensualidades y condiciones de acceso.",
  address: "Lago Alberto 442-Local 15, Anáhuac 1 Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX",
  neighborhood: "Anáhuac 1 Secc",
  phone: "+52 55 6811 3049",
  whatsapp: "+52 55 6811 3049",
  email: "informes@algymnuevopolanco.com.mx",
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
        "name": "Polanco",
        "item": "https://www.algym247.com/ubicaciones/polanco"
      }
    ]
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": "https://www.algym247.com/ubicaciones/polanco#exercise-gym",
    "name": "Algym247 Nuevo Polanco",
    "url": "https://www.algym247.com/ubicaciones/polanco",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lago Alberto 442, Local 15",
      "addressLocality": "Anáhuac 1 Secc, Miguel Hidalgo",
      "addressRegion": "Ciudad de México",
      "postalCode": "11320",
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
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
