"use client"

import { useLanguage } from "@/contexts/language-context"

export function MemberTestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: t("testimonial1Name"),
      quote: t("testimonial1Quote"),
    },
    {
      name: t("testimonial2Name"),
      quote: t("testimonial2Quote"),
    },
    {
      name: t("testimonial3Name"),
      quote: t("testimonial3Quote"),
    },
    {
      name: t("testimonial4Name"),
      quote: t("testimonial4Quote"),
    },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy-900 mb-4">
          {t("memberTestimonialsTitle")}
        </h2>

        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">{t("memberTestimonialsSubtitle")}</p>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <p className="text-gray-700 font-medium mb-2">
                    {testimonial.name}: <span className="text-secondary font-normal">&ldquo;{testimonial.quote}&rdquo;.</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
