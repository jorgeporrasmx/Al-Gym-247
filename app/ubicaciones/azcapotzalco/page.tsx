import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { LocationDetail } from "@/components/location-detail"

export const metadata: Metadata = {
  title: "Algym247 Azcapotzalco - Gimnasio 24/7 en CDMX | Equipamiento Completo",
  description:
    "Visita Algym247 en Azcapotzalco, CDMX. Gimnasio 24 horas con equipamiento moderno, clases grupales y entrenadores certificados. Ubicado en zona céntrica con fácil acceso. ¡Primera clase gratis!",
  keywords: [
    "gimnasio azcapotzalco",
    "gym 24 horas azcapotzalco",
    "gimnasio cdmx azcapotzalco",
    "algym247 azcapotzalco",
    "fitness azcapotzalco",
    "entrenamiento azcapotzalco",
  ],
  openGraph: {
    title: "Algym247 Azcapotzalco - Gimnasio 24/7 en CDMX",
    description:
      "Gimnasio 24 horas en Azcapotzalco con equipamiento moderno, clases grupales y entrenadores certificados. ¡Primera clase gratis!",
    type: "business.business",
    locale: "es_MX",
    url: "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
    siteName: "Algym247",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algym247 Azcapotzalco - Gimnasio 24/7 en CDMX",
    description:
      "Gimnasio 24 horas en Azcapotzalco con equipamiento moderno y clases grupales. ¡Primera clase gratis!",
  },
  alternates: {
    canonical: "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
  },
}

const locationData = {
  name: "Algym247 Azcapotzalco",
  address: "Calle Principal 123, Azcapotzalco, CDMX, CP 02000",
  neighborhood: "Azcapotzalco",
  phone: "+52 55 1234 5678",
  whatsapp: "+52 55 1234 5678",
  email: "azcapotzalco@algym247.com",
  hours: "24 horas, 7 días a la semana",
  coordinates: {
    lat: 19.4569,
    lng: -99.1895,
  },
  mapUrl: "https://maps.google.com/?q=19.4569,-99.1895",
  embedMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15045.234567890!2d-99.1895!3d19.4569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI3JzI0LjgiTiA5OcKwMTEnMjIuMiJX!5e0!3m2!1ses!2smx!4v1234567890",
  features: [
    "Área de pesas libres con equipamiento de última generación",
    "Máquinas cardiovasculares con pantallas interactivas",
    "Zona de entrenamiento funcional amplia",
    "Clases grupales incluidas: Spinning, Yoga, Crossfit",
    "Vestidores amplios con lockers de seguridad",
    "Regaderas con agua caliente 24/7",
    "Estacionamiento gratuito para miembros",
    "WiFi de alta velocidad en todas las áreas",
    "Sistema de acceso con huella digital",
    "Personal de apoyo disponible en horarios pico",
  ],
  images: ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"],
  nearbyLandmarks: [
    "A 5 minutos del Metro El Rosario",
    "Cerca de Parque Tezozómoc",
    "Zona comercial con restaurantes y tiendas",
    "Fácil acceso desde Circuito Interior",
  ],
  testimonial: {
    name: "María González",
    text: "Llevo 6 meses entrenando en Algym247 Azcapotzalco y me encanta. El equipamiento es excelente y al ser 24 horas puedo entrenar después de mi turno nocturno. ¡100% recomendado!",
    rating: 5,
  },
}

export default function AzcapotzalcoPage() {
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
