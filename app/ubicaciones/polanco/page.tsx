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
  ],
  openGraph: {
    title: "Algym247 Polanco - Gimnasio Premium 24/7 en CDMX",
    description:
      "Gimnasio premium 24 horas en Nuevo Polanco con tecnología de punta, spa y clases exclusivas. ¡Prueba gratis!",
    type: "business.business",
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
  address: "Av. Ejército Nacional 843, Nuevo Polanco, Miguel Hidalgo, CDMX, CP 11510",
  neighborhood: "Nuevo Polanco",
  phone: "+52 55 8765 4321",
  whatsapp: "+52 55 8765 4321",
  email: "polanco@algym247.com",
  hours: "24 horas, 7 días a la semana",
  coordinates: {
    lat: 19.44,
    lng: -99.2019,
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
    name: "Carlos Mendoza",
    text: "El mejor gimnasio donde he estado. Las instalaciones son de primer nivel, el equipo es nuevo y las clases de boxing son increíbles. Vale cada peso de la membresía.",
    rating: 5,
  },
}

export default function PolancoPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
