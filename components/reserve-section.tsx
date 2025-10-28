"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { getWhatsAppURL } from "@/config/contacts"

export function ReserveSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden" style={{
      background: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0),
        white
      `,
      backgroundSize: '20px 20px'
    }}>
      <div className="max-w-4xl mx-auto">
        {/* Main Container */}
        <div className="relative bg-white rounded-2xl shadow-lg p-12 md:p-16 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.01] transform-gpu">
          {/* Subtle gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50/50 to-transparent rounded-b-2xl pointer-events-none"></div>
          
          {/* Content */}
          <div className="relative z-10 space-y-8">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-300 hover:scale-105">
              {t("joinFamily")}
            </h2>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed italic transition-all duration-300 hover:text-gray-900">
              {t("reserveDescription")}
            </p>
            
            {/* WhatsApp Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform-gpu"
                onClick={() => {
                  const customMessage = language === "es"
                    ? "Hola, me interesa reservar mi lugar en Algym247"
                    : "Hello, I'm interested in reserving my spot at Algym247"
                  window.open(getWhatsAppURL(customMessage, language), "_blank")
                }}
              >
                <svg
                  className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
