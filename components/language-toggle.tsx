"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <Globe className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      <span className="relative z-10 font-medium">{language === "es" ? "EN" : "ES"}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  )
}
