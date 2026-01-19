"use client"

import Image from "next/image"
import { Dumbbell, Users, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: (
        <Dumbbell className="w-12 h-12 text-primary transition-all duration-300 group-hover:scale-110 group-hover-brand-orange" />
      ),
      title: t("feature1Title"),
      description: t("feature1Description"),
      image: "/pic1.jpg",
      altText: "Área de spinning en Algym247 CDMX - Bicicletas de última generación",
    },
    {
      icon: (
        <Users className="w-12 h-12 text-primary transition-all duration-300 group-hover:scale-110 group-hover-brand-orange" />
      ),
      title: t("feature2Title"),
      description: t("feature2Description"),
      image: "/pic2.jpg",
      altText: "Clases grupales incluidas en Algym247 - Spinning, Yoga y Crossfit en CDMX",
    },
    {
      icon: (
        <Clock className="w-12 h-12 text-primary transition-all duration-300 group-hover:scale-110 group-hover-brand-orange" />
      ),
      title: t("feature3Title"),
      description: t("feature3Description"),
      image: "/3.jpg",
      altText: "Gimnasio 24 horas CDMX - Acceso ilimitado Algym247 Azcapotzalco y Polanco",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance transition-all duration-300 hover:scale-105">
            {t("featuresTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group flex flex-col lg:flex-row items-center gap-8 animate-fade-in-up ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Image side */}
              <div className="flex-1">
                <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] transform-gpu">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3 group">
                  {feature.icon}
                  <h3 className="text-2xl md:text-3xl font-bold transition-all duration-300 group-hover-brand-orange">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed transition-all duration-300 group-hover:text-foreground">
                  {feature.description}
                </p>
                {index === 2 && (
                  <a
                    href="#ubicaciones"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
                  >
                    Ver nuestras ubicaciones →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
