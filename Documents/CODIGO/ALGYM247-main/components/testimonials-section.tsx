"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Algym247 cambió completamente mi rutina de ejercicio. Poder entrenar a cualquier hora me dio la flexibilidad que necesitaba para mantenerme en forma.",
      name: "María González",
      role: "Socia desde 2023",
      rating: 5,
      avatar: "/professional-woman-smiling.png",
    },
    {
      quote:
        "Los equipos son de primera calidad y siempre están en perfecto estado. El personal es muy amable y siempre dispuesto a ayudar.",
      name: "Carlos Rodríguez",
      role: "Socio desde 2022",
      rating: 5,
      avatar: "/professional-man-smiling.png",
    },
    {
      quote:
        "Las clases grupales son increíbles. He probado yoga, spinning y crossfit, todas con instructores muy profesionales.",
      name: "Ana Martínez",
      role: "Socia desde 2024",
      rating: 5,
      avatar: "/young-woman-athlete-smiling.jpg",
    },
    {
      quote:
        "La ubicación es perfecta para mí. Puedo ir antes del trabajo o después, sin importar la hora. ¡Es genial!",
      name: "Luis Hernández",
      role: "Socio desde 2023",
      rating: 5,
      avatar: "/middle-aged-man-fitness.jpg",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Lo que dicen nuestros socios.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre por qué miles de personas han elegido Algym247 para transformar su estilo de vida.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl italic mb-8 text-balance">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
