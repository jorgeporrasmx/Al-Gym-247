# Algym247 - Sitio Web Oficial

Sitio web para Algym247, cadena de gimnasios 24/7 en Ciudad de México.

## 🚀 **Stack Tecnológico**

- **Framework**: Next.js 14.2.32 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **UI Components**: Radix UI
- **Fuente**: DIN Pro (custom)
- **Analytics**: Vercel Analytics
- **GTM**: Google Tag Manager

## 📁 **Estructura del Proyecto**

```
ALGYM247-main/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal con providers
│   ├── page.tsx                 # Página principal
│   ├── loading.tsx              # Loading skeleton
│   ├── not-found.tsx            # Página 404 personalizada
│   ├── sitemap.ts               # Sitemap dinámico
│   ├── ubicaciones/             # Páginas de ubicaciones
│   │   ├── azcapotzalco/
│   │   │   └── page.tsx        # Página Azcapotzalco
│   │   └── polanco/
│   │       └── page.tsx        # Página Polanco
│   ├── franquicias/
│   └── blog/
│
├── components/                  # Componentes React
│   ├── header.tsx              # Navegación principal
│   ├── footer.tsx              # Pie de página
│   ├── hero-section.tsx        # Sección hero con video
│   ├── features-section.tsx    # Características
│   ├── locations-section.tsx   # Sección de ubicaciones
│   ├── location-detail.tsx     # Detalle de ubicación
│   ├── schema-org.tsx          # Structured data (Schema.org)
│   ├── whatsapp-float.tsx      # Botón flotante WhatsApp
│   ├── call-float.tsx          # Botón flotante llamada
│   └── ui/                     # Componentes UI reutilizables
│
├── config/                      # Archivos de configuración
│   ├── locations.ts            # Datos de ubicaciones (NAP)
│   └── contacts.ts             # Configuración de contacto
│
├── contexts/                    # React Contexts
│   └── language-context.tsx    # Context de idioma (ES/EN)
│
├── lib/                         # Utilidades y helpers
│   └── translations.ts         # Sistema de traducciones
│
├── public/                      # Assets estáticos
│   ├── logo.png
│   ├── og-image.jpg            # Open Graph image
│   ├── robots.txt              # Configuración SEO
│   ├── pic1.jpg, pic2.jpg...   # Imágenes del gimnasio
│   └── Conoce-Al-Gym.mp4       # Video hero
│
├── PLACEHOLDERS-TODO.md         # Lista de datos placeholder
└── README-DEV.md                # Este archivo
```

## 🎯 **Características Principales**

### SEO Optimizado
- ✅ Metadata completa en todas las páginas
- ✅ Schema.org structured data:
  - Organization
  - WebSite (con SearchAction)
  - GymHealthClub (por ubicación)
  - BreadcrumbList (navegación)
- ✅ Sitemap dinámico
- ✅ robots.txt configurado
- ✅ Open Graph y Twitter Cards
- ✅ Canonical URLs

### Multiidioma
- ✅ Soporte para Español e Inglés
- ✅ Sistema de traducciones centralizado
- ✅ Persistencia en localStorage
- ✅ Cambio dinámico sin reload

### Responsive Design
- ✅ Mobile-first approach
- ✅ Diseño adaptativo en todas las páginas
- ✅ Optimizado para tablets y desktop
- ✅ Componentes loading skeleton

### Performance
- ✅ Lazy loading de imágenes
- ✅ Next.js Image optimization
- ✅ Code splitting automático
- ✅ SSR para SEO

## 🛠️ **Desarrollo Local**

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Correr servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 📍 **Configuración de Ubicaciones**

Las ubicaciones se manejan de forma centralizada en `config/locations.ts`.

### Estructura de Datos

```typescript
interface Location {
  id: string
  name: string
  fullName: string
  address: {
    street: string
    neighborhood: string
    municipality: string
    state: string
    postalCode: string
    country: string
    full: string
  }
  phone: string
  whatsapp: string
  email: string
  coordinates: { lat: number; lng: number }
  hours: {
    display: string
    structured: { opens: string; closes: string }
  }
}
```

### Agregar Nueva Ubicación

1. Agregar datos en `config/locations.ts`:
```typescript
export const LOCATIONS: Record<string, Location> = {
  // ...ubicaciones existentes
  nuevaUbicacion: {
    id: "nuevaUbicacion",
    name: "Nueva Ubicación",
    // ...resto de datos
  }
}
```

2. Crear página en `app/ubicaciones/nueva-ubicacion/page.tsx`
3. Actualizar `app/sitemap.ts`
4. Agregar a `components/locations-section.tsx`

## 🌐 **Sistema de Traducciones**

Las traducciones se gestionan en `lib/translations.ts`.

### Agregar Nueva Traducción

```typescript
export const translations = {
  es: {
    // ...
    nuevaClave: "Texto en español",
  },
  en: {
    // ...
    nuevaClave: "Text in English",
  },
}
```

### Usar en Componentes

```typescript
import { useLanguage } from "@/contexts/language-context"

function MiComponente() {
  const { t, language } = useLanguage()

  return <h1>{t("nuevaClave")}</h1>
}
```

## 🔍 **SEO y Structured Data**

### Schema.org

El sitio implementa múltiples tipos de structured data:

#### Organization (Global)
```json
{
  "@type": "Organization",
  "name": "Algym247",
  "url": "https://al-gym-247.vercel.app",
  "logo": {...},
  "contactPoint": {...}
}
```

#### GymHealthClub (Por Ubicación)
```json
{
  "@type": "GymHealthClub",
  "name": "Algym247 Azcapotzalco",
  "address": {...},
  "geo": {...},
  "openingHoursSpecification": {...}
}
```

#### BreadcrumbList (Navegación)
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### Validar Schema.org

Usa estas herramientas:
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

## 📱 **Componentes de Contacto**

### WhatsApp Float
- Botón flotante en esquina inferior derecha
- Configurable desde `config/contacts.ts`
- Mensaje personalizable por idioma

### Call Float
- Botón flotante para llamadas
- Solo visible en móvil
- Usa `tel:` protocol

## 🎨 **Estilos y Diseño**

### Tailwind CSS
El proyecto usa Tailwind CSS para estilos. Configuración en `tailwind.config.ts`.

### Variables CSS
Colores principales definidos en `globals.css`:
```css
:root {
  --primary: ...
  --secondary: ...
  --accent: ...
}
```

### Fuente Personalizada
DIN Pro cargada desde `app/fonts.ts`.

## ⚠️ **Datos Placeholder**

**IMPORTANTE**: Antes de producción, actualizar datos en:

Ver `PLACEHOLDERS-TODO.md` para lista completa de:
- ❌ Direcciones reales
- ❌ Teléfonos reales
- ❌ Coordenadas GPS verificadas
- ❌ Testimonios reales
- ❌ Fotos específicas de cada ubicación

## 🚢 **Despliegue**

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Variables de Entorno

Crear `.env.local`:
```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Otros...
```

## 📊 **Analytics**

- **Vercel Analytics**: Integrado automáticamente
- **Google Tag Manager**: Configurado en `components/google-tag-manager.tsx`

## 🐛 **Debugging**

### Errores Comunes

**Error: Invalid OpenGraph type**
- Solución: Usar `type: "website"` en metadata OpenGraph

**Error: t is not defined**
- Solución: Extraer `t` desde `useLanguage()` hook

**Error: 404 en imágenes**
- Verificar que archivos existen en `/public`
- Verificar rutas relativas (`/imagen.jpg`)

## 📝 **Convenciones de Código**

### Componentes
- PascalCase para nombres de componentes
- Props con TypeScript interfaces
- "use client" solo cuando necesario

### Archivos
- kebab-case para archivos de componentes
- `page.tsx` para rutas en App Router
- `layout.tsx` para layouts

### Comentarios
- Usar `// TODO:` para tareas pendientes
- Documentar funciones complejas
- Schema.org con comentarios explicativos

## 🔐 **Seguridad**

- No commitear credenciales en el código
- Usar variables de entorno para secretos
- Validar inputs en formularios
- Sanitizar datos antes de mostrar

## 📞 **Soporte**

Para preguntas o issues:
- Ver `PLACEHOLDERS-TODO.md` para tareas pendientes
- Revisar commits recientes en git
- Consultar documentación de Next.js

## 🎯 **Próximos Pasos**

1. ✅ Actualizar datos placeholder con información real
2. ⚠️ Crear og-image.jpg personalizada
3. ⚠️ Registrar en Google Search Console
4. ⚠️ Configurar Google Analytics 4
5. ⚠️ Testing completo en móviles reales
6. ⚠️ Optimizar imágenes (WebP)
7. ⚠️ Implementar lazy loading de videos

---

**Última actualización**: 2025-10-29
**Versión**: 1.0.0
**Rama actual**: `claude/session-011CUZbdDd4jXWQvSxstE69E`
