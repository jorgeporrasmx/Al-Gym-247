"use client"

import { CheckCircle2, Headphones, BookOpen, TrendingUp, Shield, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FranchiseBenefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Marca Reconocida",
      description:
        "Aprovecha el prestigio y reconocimiento de Algym247, líder en fitness 24/7 en México con miles de miembros satisfechos.",
    },
    {
      icon: BookOpen,
      title: "Capacitación Completa",
      description:
        "Recibe entrenamiento integral para ti y tu equipo: operaciones, ventas, marketing digital y servicio al cliente.",
    },
    {
      icon: Headphones,
      title: "Soporte Continuo",
      description:
        "Asesoría permanente en operaciones, marketing, tecnología y recursos humanos. Nunca estarás solo en el camino.",
    },
    {
      icon: TrendingUp,
      title: "Modelo Rentable",
      description:
        "Sistema 24/7 con tecnología de acceso automatizado que maximiza ingresos y reduce costos operativos significativamente.",
    },
    {
      icon: Zap,
      title: "Tecnología Avanzada",
      description:
        "Software de gestión, apps móviles, control de acceso inteligente y sistemas de pago automatizados incluidos.",
    },
    {
      icon: CheckCircle2,
      title: "Inversión Protegida",
      description:
        "Modelo de negocio probado con ROI comprobado, territorio exclusivo y contrato transparente sin sorpresas.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Algym247?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Te brindamos todas las herramientas y el soporte que necesitas para que tu inversión
            sea un éxito garantizado.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-secondary"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
