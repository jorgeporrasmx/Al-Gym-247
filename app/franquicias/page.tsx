import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { FranchiseHero } from "@/components/franchise/franchise-hero"
import { FranchiseBenefits } from "@/components/franchise/franchise-benefits"
import { FranchiseForm } from "@/components/franchise/franchise-form"
import { FranchiseStats } from "@/components/franchise/franchise-stats"

export const metadata: Metadata = {
  title: "Abre tu Franquicia Algym247 | Inversión en Fitness 24/7",
  description:
    "Únete al éxito de Algym247. Invierte en una franquicia de gimnasio 24/7 con modelo de negocio probado, soporte completo y excelente retorno de inversión.",
  openGraph: {
    title: "Abre tu Franquicia Algym247 | Inversión en Fitness 24/7",
    description:
      "Únete al éxito de Algym247. Invierte en una franquicia de gimnasio 24/7 con modelo de negocio probado.",
    type: "website",
    url: "https://www.algym247.com/franquicias",
  },
}

export default function FranchisePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FranchiseHero />
        <FranchiseStats />
        <FranchiseBenefits />
        <FranchiseForm />
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
