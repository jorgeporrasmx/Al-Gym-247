"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getWhatsAppURL, getPhoneURL } from "@/config/contacts"

export default function NotFound() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              Página no encontrada
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-lg md:text-xl text-muted-foreground">
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>
          <p className="text-base text-muted-foreground">
            Pero no te preocupes, ¡estamos aquí para ayudarte a encontrar lo que necesitas!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          <Link href="/" className="w-full">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 gap-2"
            >
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Button>
          </Link>

          <Link href="/#ubicaciones" className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2"
            >
              <MapPin className="w-5 h-5" />
              Ver Ubicaciones
            </Button>
          </Link>
        </div>

        {/* Quick Contact */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Necesitas ayuda? Contáctanos directamente:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(getWhatsAppURL(undefined, language), "_blank")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              WhatsApp
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(getPhoneURL(), "_self")}
            >
              <Phone className="w-5 h-5" />
              Llamar
            </Button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="pt-6">
          <p className="text-sm text-muted-foreground mb-4">Enlaces populares:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/#ubicaciones">
              <Button variant="link" size="sm">
                Ubicaciones
              </Button>
            </Link>
            <Link href="/#contacto">
              <Button variant="link" size="sm">
                Contacto
              </Button>
            </Link>
            <Link href="/franquicias">
              <Button variant="link" size="sm">
                Franquicias
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="link" size="sm">
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
