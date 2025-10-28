"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function FeaturedTestimonialSection() {
  const { t } = useLanguage()

  return (
    <section className="relative bg-gray-600 py-20 overflow-hidden">
      {/* Dotted pattern background */}
      <div className="absolute left-0 top-0 h-full w-80 opacity-20">
        <div className="grid grid-cols-8 gap-2 h-full p-8">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8">
            &ldquo;{t("featuredTestimonialQuote")}&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-400 relative">
              <Image
                src="/pic1.jpg"
                alt={`${t("featuredTestimonialAuthor")} - Miembro de Algym247`}
                fill
                sizes="48px"
                className="object-cover"
                loading="lazy"
                quality={90}
              />
            </div>
            <span className="text-white text-lg font-medium">{t("featuredTestimonialAuthor")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
