"use client"

import { TrendingUp, Users, MapPin, Award } from "lucide-react"

export function FranchiseStats() {
  const stats = [
    {
      icon: MapPin,
      value: "10+",
      label: "Ubicaciones",
      description: "Gimnasios operando exitosamente",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Miembros Activos",
      description: "Personas transformando sus vidas",
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "ROI Promedio",
      description: "Retorno de inversión anual",
    },
    {
      icon: Award,
      value: "#1",
      label: "En México",
      description: "Gimnasio 24/7 más confiable",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Números que hablan por sí solos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Únete a una red de franquicias exitosas con resultados comprobados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
