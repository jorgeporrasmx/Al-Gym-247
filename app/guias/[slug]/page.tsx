import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { getGuide, guides } from "@/lib/guides"

type GuidePageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getGuide(params.slug)

  if (!guide) {
    return {
      title: "Guía no encontrada | Algym247",
      robots: { index: false, follow: true },
    }
  }

  const url = `https://www.algym247.com/guias/${guide.slug}`

  return {
    title: `${guide.title} | Algym247`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url,
      siteName: "Algym247",
      locale: "es_MX",
    },
    robots: { index: true, follow: true },
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide(params.slug)

  if (!guide) notFound()

  const url = `https://www.algym247.com/guias/${guide.slug}`
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Algym247" },
        publisher: { "@type": "Organization", name: "Algym247", url: "https://www.algym247.com" },
        inLanguage: "es-MX",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.algym247.com" },
          { "@type": "ListItem", position: 2, name: "Guías", item: "https://www.algym247.com/guias" },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="flex-1">
        <article>
          <header className="bg-gradient-to-br from-gray-950 via-gray-900 to-primary px-4 py-16 text-white md:px-8 md:py-24">
            <div className="mx-auto max-w-4xl">
              <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-white/70">
                <Link href="/" className="hover:text-white">Inicio</Link>
                <span aria-hidden="true" className="mx-2">/</span>
                <span>Guías</span>
              </nav>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary">{guide.eyebrow}</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{guide.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">{guide.intro}</p>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-20">
            <div className="space-y-14">
              {guide.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                  <div className="mt-5 space-y-4 text-lg leading-8 text-gray-700">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 grid gap-3 md:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 rounded-xl bg-gray-50 p-4 text-gray-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className="mt-16 rounded-2xl bg-gray-950 p-7 text-white md:p-10">
              <h2 className="text-2xl font-bold md:text-3xl">Conoce Algym247 Azcapotzalco</h2>
              <p className="mt-3 max-w-2xl text-white/75">
                Revisa ubicación, instalaciones y datos de contacto vigentes antes de elegir tu gimnasio.
              </p>
              <Link
                href="/ubicaciones/azcapotzalco"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-bold text-white transition hover:bg-secondary/90"
              >
                Ver ubicación <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </aside>

            <div className="mt-12 border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900">Más guías de Azcapotzalco</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {guides.filter(({ slug }) => slug !== guide.slug).map((related) => (
                  <Link
                    key={related.slug}
                    href={`/guias/${related.slug}`}
                    className="rounded-xl border border-gray-200 p-4 font-semibold text-gray-800 transition hover:border-secondary hover:text-secondary"
                  >
                    {related.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
