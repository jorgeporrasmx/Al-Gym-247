import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CallFloat } from "@/components/call-float"
import { BlogList } from "@/components/blog/blog-list"
import { getBlogPosts, getBlogCategories } from "@/lib/monday-blog"

export const metadata: Metadata = {
  title: "Blog - Fitness, Nutrición y Bienestar | Algym247",
  description:
    "Descubre artículos sobre fitness, nutrición, rutinas de ejercicio y consejos de bienestar. Tu guía completa para un estilo de vida saludable 24/7.",
  openGraph: {
    title: "Blog - Fitness, Nutrición y Bienestar | Algym247",
    description:
      "Descubre artículos sobre fitness, nutrición, rutinas de ejercicio y consejos de bienestar.",
    type: "website",
    url: "https://www.algym247.com/blog",
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  // Fetch blog posts and categories from Monday.com
  const posts = await getBlogPosts()
  const categories = await getBlogCategories()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Blog Algym247
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre consejos de fitness, nutrición y bienestar para alcanzar tus objetivos.
            </p>
          </div>
        </section>

        {/* Blog List Section */}
        <section className="py-12 px-4 md:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <BlogList posts={posts} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
    </div>
  )
}
