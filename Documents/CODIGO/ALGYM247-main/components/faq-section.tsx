"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FAQSection() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
    {
      question: t("faqTrialQuestion"),
      answer: t("faqTrialAnswer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faqRequirementsQuestion"),
      answer: t("faqRequirementsAnswer"),
    },
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer"),
      locations: [
        {
          name: t("location1Name"),
          address: t("location1Address"),
          mapUrl: "https://maps.google.com/?q=Azcapotzalco+CDMX",
        },
        {
          name: t("location2Name"),
          address: t("location2Address"),
          mapUrl: "https://maps.google.com/?q=Nuevo+Polanco+CDMX",
        },
      ],
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance transition-all duration-300 hover:scale-105">
            {t("faqTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            {t("faqSubtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border rounded-lg px-6 bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform-gpu animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 transition-all duration-300 group-hover-brand-orange">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                    <p>{faq.answer}</p>

                    {faq.locations && (
                      <div className="mt-4 space-y-3">
                        {faq.locations.map((location, locationIndex) => (
                          <div
                            key={locationIndex}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-md transition-all duration-300 hover:bg-muted/70 hover:scale-[1.01] transform-gpu"
                          >
                            <div>
                              <div className="font-medium text-foreground transition-colors duration-300 hover-brand-orange">
                                {location.name}
                              </div>
                              <div className="text-sm">{location.address}</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(location.mapUrl, "_blank")}
                              className="transition-all duration-300 hover:scale-105 hover:shadow-md hover-bg-brand-orange-light hover-border-brand-orange hover-brand-orange"
                            >
                              <ExternalLink className="w-4 h-4 mr-1 transition-transform duration-300 hover:scale-110" />
                              {t("viewMap")}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg animate-fade-in-up animation-delay-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform-gpu">
          <h3 className="text-2xl font-bold mb-4 transition-all duration-300 hover-brand-orange">{t("ctaTitle")}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto transition-colors duration-300 hover:text-foreground">
            {t("ctaSubtitle")}
          </p>
          <Button
            size="lg"
            className="group relative overflow-hidden bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {t("reserveSpot")}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </div> */}
      </div>
    </section>
  )
}
