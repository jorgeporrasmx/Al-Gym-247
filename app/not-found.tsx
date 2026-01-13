import Link from "next/link"
import { CONTACTS, getWhatsAppURL, getPhoneURL } from "@/config/contacts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Página no encontrada - Algym247",
  description: "La página que buscas no existe. Visita nuestras ubicaciones en Azcapotzalco y Polanco o contáctanos por WhatsApp.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  const whatsappUrl = getWhatsAppURL(undefined, 'es')
  const phoneUrl = getPhoneURL()

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
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Ir al Inicio
          </Link>

          <Link
            href="/#ubicaciones"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-11 px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Ver Ubicaciones
          </Link>
        </div>

        {/* Quick Contact */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Necesitas ayuda? Contáctanos directamente:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              WhatsApp
            </a>

            <a
              href={phoneUrl}
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Llamar
            </a>
          </div>
        </div>

        {/* Popular Links */}
        <div className="pt-6">
          <p className="text-sm text-muted-foreground mb-4">Enlaces populares:</p>
          <nav className="flex flex-wrap gap-2 justify-center">
            <Link href="/#ubicaciones" className="text-sm text-primary hover:underline px-2 py-1">
              Ubicaciones
            </Link>
            <Link href="/#contacto" className="text-sm text-primary hover:underline px-2 py-1">
              Contacto
            </Link>
            <Link href="/franquicias" className="text-sm text-primary hover:underline px-2 py-1">
              Franquicias
            </Link>
            <Link href="/blog" className="text-sm text-primary hover:underline px-2 py-1">
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
