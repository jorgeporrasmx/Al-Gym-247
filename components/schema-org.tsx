/**
 * Schema.org Structured Data Component
 * Provides LocalBusiness and GymHealthClub structured data for SEO
 */

export function SchemaOrg() {
  const locations = [
    {
      "@context": "https://schema.org",
      "@type": "GymHealthClub",
      "@id": "https://al-gym-247.vercel.app/#azcapotzalco",
      "name": "Algym247 Azcapotzalco",
      "image": "https://al-gym-247.vercel.app/logo.png",
      "description": "Gimnasio 24 horas en Azcapotzalco, CDMX con equipos modernos, clases incluidas y acceso ilimitado.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Aquiles Serdán 1234",
        "addressLocality": "Azcapotzalco",
        "addressRegion": "CDMX",
        "postalCode": "02020",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.4569",
        "longitude": "-99.1895"
      },
      "url": "https://al-gym-247.vercel.app",
      "telephone": "+52-55-1234-5678",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$$",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Equipos modernos",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Clases grupales incluidas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Acceso 24/7",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Regaderas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Estacionamiento",
          "value": true
        }
      ],
      "sameAs": [
        "https://www.facebook.com/algym247",
        "https://www.instagram.com/algym247",
        "https://twitter.com/algym247"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "GymHealthClub",
      "@id": "https://al-gym-247.vercel.app/#polanco",
      "name": "Algym247 Nuevo Polanco",
      "image": "https://al-gym-247.vercel.app/logo.png",
      "description": "Gimnasio 24 horas en Nuevo Polanco, CDMX con equipos modernos, clases incluidas y acceso ilimitado.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Ejército Nacional 843",
        "addressLocality": "Nuevo Polanco",
        "addressRegion": "CDMX",
        "postalCode": "11550",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.4400",
        "longitude": "-99.2019"
      },
      "url": "https://al-gym-247.vercel.app",
      "telephone": "+52-55-8765-4321",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$$",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Equipos modernos",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Clases grupales incluidas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Acceso 24/7",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Regaderas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Estacionamiento",
          "value": true
        }
      ],
      "sameAs": [
        "https://www.facebook.com/algym247",
        "https://www.instagram.com/algym247",
        "https://twitter.com/algym247"
      ]
    }
  ]

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Algym247",
    "url": "https://al-gym-247.vercel.app",
    "logo": "https://al-gym-247.vercel.app/logo.png",
    "description": "Cadena de gimnasios 24 horas en Ciudad de México con equipos modernos y clases incluidas.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52-55-1234-5678",
      "contactType": "customer service",
      "areaServed": "MX",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/algym247",
      "https://www.instagram.com/algym247",
      "https://twitter.com/algym247"
    ]
  }

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization)
        }}
      />

      {/* Location Schemas */}
      {locations.map((location, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(location)
          }}
        />
      ))}
    </>
  )
}
