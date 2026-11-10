import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Ubicaciones en Ciudad de México | Algym247",
  description: "Encuentra las sucursales de Algym247 en Azcapotzalco y Nuevo Polanco. Consulta la dirección y los detalles de cada gimnasio.",
  alternates: { canonical: "/ubicaciones" },
  openGraph: { url: "https://www.algym247.com/ubicaciones", type: "website" },
}

const locations = [
  { slug: "azcapotzalco", name: "Azcapotzalco", address: "Av. Azcapotzalco 527, locales 15 al 17" },
  { slug: "polanco", name: "Nuevo Polanco", address: "Lago Alberto 442, local 15" },
]

export default function LocationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16">
        <h1 className="text-4xl font-bold">Ubicaciones de Algym247</h1>
        <p className="mt-4 text-muted-foreground">
          Consulta cómo llegar y qué encontrarás en cada sucursal de Ciudad de México.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {locations.map(({ slug, name, address }) => (
            <li className="rounded-lg border p-6" key={slug}>
              <h2 className="text-xl font-bold">
                <Link className="text-primary underline" href={`/ubicaciones/${slug}`}>
                  Algym247 {name}
                </Link>
              </h2>
              <p className="mt-2 text-muted-foreground">{address}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
