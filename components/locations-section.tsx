"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getWhatsAppURL } from "@/config/contacts"

export function LocationsSection() {
  const { t, language } = useLanguage()

  const locations = [
    {
      name: t("location1Name"),
      address: t("location1Address"),
      phone: t("location1Phone"),
      hours: t("hours"),
      mapUrl: "https://maps.google.com/?q=Azcapotzalco+CDMX",
    },
    {
      name: t("location2Name"),
      address: t("location2Address"),
      phone: t("location2Phone"),
      hours: t("hours"),
      mapUrl: "https://maps.google.com/?q=Nuevo+Polanco+CDMX",
    },
  ]

  return (
    <section id="ubicaciones" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance transition-all duration-300 hover:scale-105">
              {t("locationsTitle")}
            </h2>

            <div className="space-y-6 mb-8">
              {locations.map((location, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform-gpu animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 transition-all duration-300 group-hover-brand-orange">
                      {location.name}
                    </h3>

                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-start gap-2 group/item">
                        <MapPin className="w-4 h-4 mt-1 text-primary transition-all duration-300 group-hover/item:scale-110 group-hover-brand-orange" />
                        <span className="text-sm transition-colors duration-300 group-hover:text-foreground">
                          {location.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 group/item">
                        <Phone className="w-4 h-4 text-primary transition-all duration-300 group-hover/item:scale-110 group-hover-brand-orange" />
                        <span className="text-sm transition-colors duration-300 group-hover:text-foreground">
                          {location.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 group/item">
                        <Clock className="w-4 h-4 text-primary transition-all duration-300 group-hover/item:scale-110 group-hover-brand-orange" />
                        <span className="text-sm font-medium text-primary transition-colors duration-300 group-hover-brand-orange">
                          {location.hours}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/ubicaciones/${index === 0 ? 'azcapotzalco' : 'polanco'}`}
                        className="flex-1"
                      >
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                        >
                          Ver detalles
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-md hover-bg-brand-orange-light hover-border-brand-orange hover-brand-orange"
                        onClick={() => window.open(location.mapUrl, "_blank")}
                      >
                        {t("viewOnMap")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              size="lg"
              className="group relative overflow-hidden bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-600"
              onClick={() => {
                const customMessage = language === "es"
                  ? "¡Hola! Me interesa conocer más sobre las ubicaciones de Algym247 y sus servicios."
                  : "Hello! I'm interested in learning more about Algym247 locations and services."
                window.open(getWhatsAppURL(customMessage, language), "_blank")
              }}
            >
              Contacto
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-right h-[500px]">
            <Image
              src="/pic3.jpg"
              alt="Gimnasio Algym247 en CDMX - Ubicaciones Azcapotzalco y Nuevo Polanco con equipos modernos"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] transform-gpu"
              loading="lazy"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
