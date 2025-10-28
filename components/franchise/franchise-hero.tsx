"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function FranchiseHero() {
  const { t } = useLanguage()

  const scrollToForm = () => {
    const form = document.getElementById("franchise-form")
    form?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[600px] flex items-center py-16 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white relative z-10">
            <div className="inline-block">
              <span className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium">
                Oportunidad de Inversión
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Abre tu propia
              <span className="block text-secondary">Franquicia Algym247</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300">
              Únete al modelo de negocio fitness más exitoso de México. Gimnasio 24/7 con
              tecnología de punta y soporte completo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white"
                onClick={scrollToForm}
              >
                Solicita Información
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={scrollToForm}
              >
                Ver Beneficios
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/pic1.jpg"
              alt="Franquicia Algym247"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-2xl"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
