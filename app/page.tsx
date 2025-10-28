import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LocationsSection } from "@/components/locations-section"
import { FAQSection } from "@/components/faq-section"
import { ReserveSection } from "@/components/reserve-section"
import { MemberTestimonialsSection } from "@/components/member-testimonials-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { Footer } from "@/components/footer"
import { FeaturedTestimonialSection } from "@/components/featured-testimonial-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LocationsSection />
        <FeaturedTestimonialSection />
        {/* <TestimonialsSection /> */}
        <FAQSection />
        <ReserveSection />
        <MemberTestimonialsSection />
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
