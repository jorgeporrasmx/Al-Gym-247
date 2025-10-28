import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { GoogleTagManager } from "@/components/google-tag-manager"
import { dinPro } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Algym - El gimnasio para todos | 24/7",
  description:
    "El gimnasio para todos. Tu mejor versión, a cualquier hora. Gimnasios modernos con acceso 24/7, equipos de última generación y clases incluidas.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
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
