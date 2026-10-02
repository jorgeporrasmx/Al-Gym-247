/**
 * Schema.org Structured Data Component
 * Provides organization and website structured data for SEO
 */

export function SchemaOrg() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Algym247",
    "alternateName": "Al Gym 247",
    "url": "https://www.algym247.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.algym247.com/logo.png",
      "width": 250,
      "height": 60
    },
    "description": "Cadena de gimnasios 24 horas en Ciudad de México con equipos modernos y clases incluidas.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-672-207-2221",
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
    "url": "https://www.algym247.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.algym247.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website)
        }}
      />
    </>
  )
}
