import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { SchemaOrg } from "@/components/schema-org"
import { dinPro } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Algym247: Gimnasio 24/7 en CDMX | Azcapotzalco y Polanco",
  description:
    "Gimnasio 24 horas en Ciudad de México. Equipos modernos, clases incluidas, acceso ilimitado. Ubicaciones en Azcapotzalco y Nuevo Polanco. ¡Prueba gratis!",
  keywords: [
    "gimnasio 24 horas",
    "gimnasio CDMX",
    "gym Azcapotzalco",
    "gimnasio Polanco",
    "gimnasio 24/7",
    "gym cerca de mi",
    "clases de gimnasio",
    "equipos de gimnasio",
  ],
  authors: [{ name: "Algym247" }],
  creator: "Algym247",
  publisher: "Algym247",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://al-gym-247.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Algym247 - Gimnasio 24/7 en CDMX",
    description:
      "Gimnasio 24 horas en Ciudad de México. Equipos modernos, clases incluidas, acceso ilimitado. Ubicaciones en Azcapotzalco y Nuevo Polanco.",
    url: "https://al-gym-247.vercel.app",
    siteName: "Algym247",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Algym247 - Gimnasio 24/7 en CDMX",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algym247 - Gimnasio 24/7 en CDMX",
    description:
      "Gimnasio 24 horas en Ciudad de México con equipos modernos y clases incluidas.",
    images: ["/og-image.jpg"],
    creator: "@algym247",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'google-site-verification-code-here',
    yandex: 'yandex-verification-code-here',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <SchemaOrg />
      </head>
      <body className={`${dinPro.variable} font-sans antialiased`}>
        <GoogleTagManager />
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
