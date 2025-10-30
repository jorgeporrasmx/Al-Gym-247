"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  Star,
  CheckCircle2,
  MessageCircle,
} from "lucide-react"
import { getWhatsAppURL, getPhoneURL, CONTACTS } from "@/config/contacts"
import { useLanguage } from "@/contexts/language-context"

interface LocationDetailProps {
  location: {
    name: string
    address: string
    neighborhood: string
    phone: string
    whatsapp: string
    email: string
    hours: string
    coordinates: {
      lat: number
      lng: number
    }
    mapUrl: string
    embedMapUrl: string
    features: string[]
    images: string[]
    nearbyLandmarks: string[]
    testimonial: {
      name: string
      text: string
      rating: number
    }
  }
}

export function LocationDetail({ location }: LocationDetailProps) {
  const { language, t } = useLanguage()

  const handleWhatsAppClick = () => {
    const message = language === "es"
      ? `¡Hola! Me interesa conocer más sobre el gimnasio Algym247 en ${location.neighborhood}. ¿Podrían darme más información?`
      : `Hello! I'm interested in learning more about Algym247 gym in ${location.neighborhood}. Could you provide more information?`
    window.open(getWhatsAppURL(message, language), "_blank")
  }

  const handleCallClick = () => {
    // Use location phone if available, otherwise use central phone
    const phoneToUse = location.phone || CONTACTS.phone.number
    window.location.href = `tel:${phoneToUse}`
  }

  const handleDirectionsClick = () => {
    window.open(location.mapUrl, "_blank")
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                  {t("locationPremiumBadge")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {location.name}
              </h1>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                  <span className="text-lg">{location.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-lg font-semibold text-primary">{location.hours}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${location.email}`}
                    className="text-lg hover:text-primary transition-colors"
                  >
                    {location.email}
                  </a>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 text-white"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  {t("locationReserveWhatsApp")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-primary"
                  onClick={handleDirectionsClick}
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  {t("locationHowToGet")}
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={location.images[0]}
                alt={`Gimnasio ${location.name} - Instalaciones modernas`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("locationFacilitiesTitle")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {location.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Nearby Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("locationMapTitle")}</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={location.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${location.name}`}
                />
              </div>
              <Button
                className="w-full mt-4 bg-primary hover:bg-primary/90"
                onClick={handleDirectionsClick}
              >
                <Navigation className="w-5 h-5 mr-2" />
                {t("locationOpenMap")}
              </Button>
            </div>

            {/* Nearby Landmarks */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("locationNearbyTitle")}</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {location.nearbyLandmarks.map((landmark, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{landmark}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="mt-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{t("locationReadyTitle")}</h3>
                  <p className="text-gray-600">
                    {t("locationReadyDescription")}
                  </p>
                  {!location.phone && (
                    <p className="text-sm text-gray-500 italic">
                      {language === "es"
                        ? "Contacta nuestra línea de atención general para más información"
                        : "Contact our general support line for more information"}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t("whatsapp")}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCallClick}
                      title={language === "es" ? "Llamar ahora" : "Call now"}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t("call")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("locationGalleryTitle")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {location.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={image}
                  alt={`${location.name} - Instalación ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("locationTestimonialsTitle")}
          </h2>

          <Card className="bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex mb-4">
                {[...Array(location.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-xl text-gray-700 mb-6 italic">
                &ldquo;{location.testimonial.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {location.testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{location.testimonial.name}</p>
                  <p className="text-sm text-gray-500">Socio de Algym247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("locationVisitUs")} {location.neighborhood}
          </h2>
          <p className="text-xl text-white/90">
            {t("locationFirstClassFree")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("locationReserveNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary"
              onClick={handleDirectionsClick}
            >
              <Navigation className="w-5 h-5 mr-2" />
              {t("locationViewMap")}
            </Button>
          </div>

          <div className="pt-6">
            <a
              href="/#ubicaciones"
              className="text-white/90 hover:text-white underline transition-colors"
            >
              ← {t("locationAllLocations")}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
