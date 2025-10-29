# Optimizaciones de Performance y SEO

Este documento lista optimizaciones implementadas y sugerencias adicionales para mejorar el rendimiento y SEO del sitio.

## ✅ **Optimizaciones Implementadas**

### 1. SEO y Structured Data

#### Schema.org Completo
- ✅ **Organization**: Datos de la empresa con logo, contacto y redes sociales
- ✅ **WebSite**: Con SearchAction para search box en Google
- ✅ **GymHealthClub**: Por cada ubicación con todos los detalles
- ✅ **BreadcrumbList**: Navegación en páginas de ubicación

#### Metadata Optimizada
- ✅ Titles únicos por página
- ✅ Descriptions optimizadas (150-160 caracteres)
- ✅ Keywords locales por ubicación
- ✅ Open Graph completo
- ✅ Twitter Cards
- ✅ Canonical URLs

#### SEO Técnico
- ✅ Sitemap dinámico (`/sitemap.xml`)
- ✅ robots.txt configurado
- ✅ URLs limpias y semánticas
- ✅ Alt text en todas las imágenes (implementar)
- ✅ Headings jerárquicos (H1, H2, H3)

### 2. Performance Web

#### Imágenes
- ✅ Next.js Image component para optimización automática
- ✅ Lazy loading en imágenes no críticas
- ✅ Priority en hero images
- ✅ Sizes responsivos configurados

#### Code Splitting
- ✅ App Router de Next.js (automático)
- ✅ Dynamic imports donde es apropiado
- ✅ Componentes de UI separados

#### Loading States
- ✅ Loading skeleton personalizado
- ✅ Suspense boundaries
- ✅ 404 page personalizada

### 3. Accesibilidad

- ✅ Semantic HTML
- ✅ ARIA labels en botones flotantes
- ✅ Contraste de colores apropiado
- ✅ Keyboard navigation funcional

### 4. Internacionalización

- ✅ Sistema de traducciones completo
- ✅ Persistencia de idioma
- ✅ Cambio dinámico sin reload
- ✅ Lang attribute en HTML

### 5. Mobile Optimization

- ✅ Responsive design mobile-first
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Botones flotantes de contacto
- ✅ Video con controls nativos
- ✅ Viewport meta tag configurado

---

## 🚀 **Optimizaciones Adicionales Recomendadas**

### Performance

#### 1. Conversión de Imágenes a WebP
**Prioridad**: Alta
**Impacto**: 30-50% reducción en tamaño de archivos

```bash
# Convertir imágenes existentes
npm install sharp
node scripts/convert-to-webp.js
```

Actualizar componentes para usar WebP con fallback:
```jsx
<Image
  src="/pic1.webp"
  fallback="/pic1.jpg"
  alt="..."
/>
```

#### 2. Lazy Load del Video Hero
**Prioridad**: Media
**Impacto**: Mejora First Contentful Paint

```jsx
<video preload="none" poster="/pic1.jpg">
  <source src="/Conoce-Al-Gym.mp4" type="video/mp4" />
</video>
```

#### 3. Implementar Service Worker (PWA)
**Prioridad**: Baja
**Beneficio**: Offline support, install app

```bash
npm install next-pwa
```

#### 4. Optimizar Fuentes
**Prioridad**: Alta
**Impacto**: Reduce layout shift

Configurar `font-display: swap` en fonts.ts:
```typescript
const dinPro = localFont({
  src: './DINPro.woff2',
  display: 'swap',
  preload: true,
})
```

#### 5. Implementar Cache Headers
**Prioridad**: Media
**Ubicación**: `next.config.js`

```javascript
async headers() {
  return [
    {
      source: '/images/:all*(svg|jpg|png|webp)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

### SEO Avanzado

#### 6. Implementar JSON-LD de Reviews
**Prioridad**: Media
**Requiere**: Reviews reales verificadas

```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "..." },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "..."
}
```

#### 7. Agregar Preguntas Frecuentes (FAQPage)
**Prioridad**: Alta
**Beneficio**: Rich snippets en Google

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuál es el horario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24 horas, 7 días a la semana"
      }
    }
  ]
}
```

#### 8. Google My Business Integration
**Prioridad**: Crítica
**Pasos**:
1. Crear perfiles GMB para cada ubicación
2. Usar mismo NAP que en el sitio
3. Solicitar reviews de clientes
4. Publicar posts regulares

#### 9. Local Business Citations
**Prioridad**: Alta
**Directorios Recomendados**:
- Google My Business ⭐⭐⭐⭐⭐
- Facebook Business
- Yelp México
- Foursquare
- Apple Maps
- Bing Places

#### 10. Implementar Hreflang Tags
**Prioridad**: Baja (si se expande a otros países)

```html
<link rel="alternate" hreflang="es-MX" href="..." />
<link rel="alternate" hreflang="en-US" href="..." />
```

### User Experience

#### 11. Agregar Chatbot o Live Chat
**Prioridad**: Media
**Opciones**:
- Tidio
- Tawk.to (gratis)
- Intercom

#### 12. Sistema de Reservas Online
**Prioridad**: Alta
**Beneficio**: Aumenta conversiones

Integrar con:
- Calendly
- MindBody
- Sistema propio

#### 13. Galería de Fotos 360°
**Prioridad**: Baja
**Beneficio**: Mayor engagement

```jsx
import { Pannellum } from '@/components/panorama-viewer'

<Pannellum
  image="/360/gym-azcapotzalco.jpg"
  autoLoad
/>
```

#### 14. Calculadora de Membresías
**Prioridad**: Media
**Beneficio**: Transparencia de precios

Componente interactivo que calcule costos según:
- Tipo de membresía
- Duración del contrato
- Servicios adicionales

#### 15. Testimonios en Video
**Prioridad**: Media
**Beneficio**: Mayor credibilidad

Grabar testimonios de clientes reales y embeber en páginas de ubicación.

### Analytics y Tracking

#### 16. Implementar Google Analytics 4
**Prioridad**: Crítica
**Eventos a trackear**:
- Click en botón WhatsApp
- Click en botón llamar
- Visualización de video
- Tiempo en página
- Scroll depth
- Clicks en ubicaciones

```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
```

#### 17. Hotjar o Clarity
**Prioridad**: Media
**Beneficio**: Entender comportamiento de usuarios

- Heatmaps
- Session recordings
- Funnel analysis

#### 18. Conversion Tracking
**Prioridad**: Alta
**Eventos críticos**:
- Formulario de contacto enviado
- Click en "Primera clase gratis"
- Click en teléfono/WhatsApp
- Tiempo de permanencia > 2 min

### Seguridad

#### 19. Content Security Policy
**Prioridad**: Media
**Ubicación**: `next.config.js`

```javascript
headers: [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; ..."
  }
]
```

#### 20. Protección Anti-Spam en Formularios
**Prioridad**: Alta si hay formularios

Implementar:
- Google reCAPTCHA v3
- Honeypot fields
- Rate limiting

---

## 📊 **Métricas Objetivo**

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s ⭐
- **FID** (First Input Delay): < 100ms ⭐
- **CLS** (Cumulative Layout Shift): < 0.1 ⭐

### SEO
- **Page Speed (Mobile)**: > 90 🎯
- **Page Speed (Desktop)**: > 95 🎯
- **SEO Score**: 100 ✅

### Accessibility
- **Lighthouse Accessibility**: > 95 ✅

---

## 🔧 **Herramientas de Testing**

### Performance
1. **Lighthouse** (Chrome DevTools)
2. **WebPageTest**: https://www.webpagetest.org/
3. **GTmetrix**: https://gtmetrix.com/
4. **PageSpeed Insights**: https://pagespeed.web.dev/

### SEO
1. **Google Search Console**: https://search.google.com/search-console
2. **Google Rich Results Test**: https://search.google.com/test/rich-results
3. **Schema Validator**: https://validator.schema.org/
4. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Accessibility
1. **WAVE**: https://wave.webaim.org/
2. **axe DevTools**: Browser extension
3. **Lighthouse Accessibility Audit**

---

## 📈 **KPIs a Monitorear**

### Traffic
- Visitas totales
- Visitas orgánicas (SEO)
- Bounce rate (objetivo: < 50%)
- Tiempo promedio en sitio (objetivo: > 2 min)

### Conversiones
- Clicks en WhatsApp
- Clicks en teléfono
- Formularios enviados
- Visitas a páginas de ubicación

### SEO
- Posiciones en Google (keywords target)
- Impresiones en Google Search
- CTR en resultados de búsqueda
- Backlinks

### Technical
- Uptime (objetivo: > 99.9%)
- Response time (objetivo: < 500ms)
- Error rate (objetivo: < 0.1%)

---

## 🎯 **Plan de Acción Prioritario**

### Semana 1 (Crítico)
1. ✅ Actualizar datos placeholder con información real
2. ⬜ Crear og-image.jpg personalizada (1200x630px)
3. ⬜ Registrar en Google Search Console
4. ⬜ Configurar Google Analytics 4
5. ⬜ Crear perfiles Google My Business

### Semana 2 (Alto Impacto)
6. ⬜ Convertir imágenes a WebP
7. ⬜ Optimizar fuentes (font-display)
8. ⬜ Implementar FAQPage schema
9. ⬜ Testing completo mobile
10. ⬜ Configurar analytics events

### Semana 3 (Mejoras)
11. ⬜ Lazy load de video hero
12. ⬜ Implementar chatbot
13. ⬜ Agregar calculadora de membresías
14. ⬜ Sistema de reviews
15. ⬜ Hotjar o Clarity

### Semana 4 (Crecimiento)
16. ⬜ Local business citations
17. ⬜ Content marketing strategy
18. ⬜ Link building
19. ⬜ Social media integration
20. ⬜ Email marketing setup

---

**Última actualización**: 2025-10-29
**Responsable**: Development Team
**Revisión**: Mensual
