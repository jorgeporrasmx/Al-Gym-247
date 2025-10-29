"use client"

import { Phone } from "lucide-react"
import { getPhoneURL, CONTACTS } from "@/config/contacts"

export function CallFloat() {
  const handleCallClick = () => {
    window.open(getPhoneURL(), '_self')
  }

  return (
    <button
      onClick={handleCallClick}
      className="fixed bottom-6 left-6 z-50 bg-secondary hover:bg-secondary/90 text-white p-4 rounded-full shadow-lg transition-colors duration-200 group"
      aria-label="Llamar a Algym247"
    >
      <Phone className="w-6 h-6" />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Llamar ahora
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  )
}
