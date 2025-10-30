/**
 * Schema.org Structured Data Component
 * Provides LocalBusiness and GymHealthClub structured data for SEO
 */

export function SchemaOrg() {
  const locations = [
    {
      "@context": "https://schema.org",
      "@type": "GymHealthClub",
      "@id": "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
      "name": "Algym247 Azcapotzalco",
      "image": [
        "https://al-gym-247.vercel.app/logo.png",
        "https://al-gym-247.vercel.app/pic1.jpg",
        "https://al-gym-247.vercel.app/pic2.jpg"
      ],
      "description": "Gimnasio 24 horas en Azcapotzalco, CDMX con equipos modernos de última generación, clases grupales incluidas (Boxeo, Spinning, Bouncing, Funcional) y acceso ilimitado. Primera clase gratis.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Azcapotzalco 527. Local 15 al 17",
        "addressLocality": "Centro de Azcapotzalco",
        "addressRegion": "CDMX",
        "postalCode": "02000",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.4569",
        "longitude": "-99.1895"
      },
      "url": "https://al-gym-247.vercel.app/ubicaciones/azcapotzalco",
      "email": "azcapotzalco@algym247.com",
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
      "paymentAccepted": "Cash, Credit Card, Debit Card, Mobile Payment",
      "currenciesAccepted": "MXN",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Pesas libres y máquinas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Equipamiento cardiovascular",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Área de entrenamiento funcional",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Clases grupales (Boxeo, Spinning, Bouncing, Funcional)",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Acceso 24/7",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Vestidores con lockers",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Regaderas con agua caliente",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Estacionamiento gratuito",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "WiFi gratuito",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Acceso con Tarjeta Llave personal",
          "value": true
        }
      ],
      "sameAs": [
        "https://www.facebook.com/algym247",
        "https://www.instagram.com/algym247",
        "https://twitter.com/algym247",
        "https://www.tiktok.com/@algym247"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "GymHealthClub",
      "@id": "https://al-gym-247.vercel.app/ubicaciones/polanco",
      "name": "Algym247 Nuevo Polanco",
      "image": [
        "https://al-gym-247.vercel.app/logo.png",
        "https://al-gym-247.vercel.app/pic2.jpg",
        "https://al-gym-247.vercel.app/3.jpg"
      ],
      "description": "Gimnasio premium 24 horas en Nuevo Polanco, CDMX. Instalaciones de lujo con equipamiento Technogym, spa, clases exclusivas (Pilates, Boxing, TRX, Hot Yoga) y servicios VIP. Primera clase gratis.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lago Alberto 442-Local 15",
        "addressLocality": "Anáhuac 1 Secc, Miguel Hidalgo",
        "addressRegion": "CDMX",
        "postalCode": "11320",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.4400",
        "longitude": "-99.2019"
      },
      "url": "https://al-gym-247.vercel.app/ubicaciones/polanco",
      "telephone": "+52-55-6811-3049",
      "email": "informes@algymnuevopolanco.com.mx",
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
      "priceRange": "$$$",
      "paymentAccepted": "Cash, Credit Card, Debit Card, Mobile Payment, Bank Transfer",
      "currenciesAccepted": "MXN",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "203",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Equipamiento premium Technogym y Life Fitness",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Zona cardiovascular con vistas panorámicas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Área de entrenamiento funcional 200m²",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Clases exclusivas (Pilates, Boxing, TRX, Hot Yoga)",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Spa con sauna, vapor y jacuzzi",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Acceso 24/7",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Vestidores premium con amenidades de lujo",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Valet parking",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Lounge con café y snacks saludables",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "WiFi de fibra óptica",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Entrenadores certificados internacionalmente",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "App móvil para reservas",
          "value": true
        }
      ],
      "sameAs": [
        "https://www.facebook.com/algym247",
        "https://www.instagram.com/algym247",
        "https://twitter.com/algym247",
        "https://www.tiktok.com/@algym247"
      ]
    }
  ]

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Algym247",
    "alternateName": "Al Gym 247",
    "url": "https://al-gym-247.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://al-gym-247.vercel.app/logo.png",
      "width": 250,
      "height": 60
    },
    "description": "Cadena de gimnasios 24 horas en Ciudad de México con equipos modernos y clases incluidas.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52-55-1234-5678",
      "contactType": "customer service",
      "areaServed": "MX",
      "availableLanguage": ["Spanish", "English"],
      "email": "contacto@algym247.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "addressCountry": "MX"
    },
    "sameAs": [
      "https://www.facebook.com/algym247",
      "https://www.instagram.com/algym247",
      "https://twitter.com/algym247",
      "https://www.tiktok.com/@algym247",
      "https://www.youtube.com/@algym247"
    ]
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Algym247",
    "url": "https://al-gym-247.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://al-gym-247.vercel.app/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
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

      {/* WebSite Schema with Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website)
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
