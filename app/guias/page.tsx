import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { guides } from "@/lib/guides"

export const metadata: Metadata = {
  title: "Guías para elegir gimnasio en Azcapotzalco | Algym247",
  description: "Guías objetivas sobre ubicación, clases y criterios para elegir un gimnasio en Azcapotzalco.",
  alternates: { canonical: "/guias" },
  robots: { index: true, follow: true },
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-primary px-4 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Información práctica</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Guías para elegir dónde y cómo entrenar</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
              Criterios claros para comparar gimnasios y clases en Azcapotzalco sin depender solamente de promociones.
            </p>
          </div>
        </section>
        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {guides.map((guide) => (
              <article key={guide.slug} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">{guide.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-gray-900">{guide.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-gray-600">{guide.description}</p>
                <Link href={`/guias/${guide.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:text-secondary">
                  Leer guía <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
