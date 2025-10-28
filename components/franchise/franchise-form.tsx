"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

export function FranchiseForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    investmentCapacity: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      investmentCapacity: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/franchise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          investmentCapacity: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
        setErrorMessage(
          data.errors?.join(", ") || data.message || "Error al enviar el formulario"
        )
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Error de conexión. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="franchise-form" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Solicita Información
            </CardTitle>
            <CardDescription className="text-lg">
              Completa el formulario y nos pondremos en contacto contigo para darte todos los
              detalles sobre la inversión en una franquicia Algym247.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitStatus === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-gray-600">
                  Gracias por tu interés en Algym247. Nuestro equipo de franquicias se
                  pondrá en contacto contigo en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad de Interés *</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Ciudad de México"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Investment Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="investmentCapacity">Capacidad de Inversión *</Label>
                  <Select
                    value={formData.investmentCapacity}
                    onValueChange={handleSelectChange}
                    disabled={isSubmitting}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$2M - $3M MXN">$2M - $3M MXN</SelectItem>
                      <SelectItem value="$3M - $5M MXN">$3M - $5M MXN</SelectItem>
                      <SelectItem value="$5M - $7M MXN">$5M - $7M MXN</SelectItem>
                      <SelectItem value="$7M+ MXN">$7M+ MXN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje Adicional (Opcional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos más sobre tu interés en abrir una franquicia..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Solicitud"
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  * Campos obligatorios
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
