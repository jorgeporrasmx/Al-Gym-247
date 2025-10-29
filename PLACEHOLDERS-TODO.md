# Datos Placeholder que Requieren Actualización

Este documento lista todos los datos ficticios o placeholder que deben ser reemplazados con información real antes de desplegar a producción.

## 🔴 **ALTA PRIORIDAD - Información de Ubicaciones**

### Ubicación: Azcapotzalco
📍 **Archivo**: `app/ubicaciones/azcapotzalco/page.tsx` y `config/locations.ts`

- **Dirección**:
  - Actual: `"Calle Principal 123, Azcapotzalco, CDMX, CP 02000"`
  - Acción: Actualizar con dirección real y completa

- **Teléfono**:
  - Actual: `"+52 55 1234 5678"`
  - Acción: Actualizar con número real del gimnasio

- **WhatsApp**:
  - Actual: `"+525512345678"`
  - Acción: Actualizar con número WhatsApp real

- **Email**:
  - Actual: `"azcapotzalco@algym247.com"`
  - Acción: Verificar que el dominio y correo funcionen

- **Coordenadas GPS**:
  - Actual: `lat: 19.4569, lng: -99.1895`
  - Acción: Verificar coordenadas exactas del gimnasio

- **URL de mapa embebido**:
  - Actual: URL genérica
  - Acción: Generar URL específica desde Google Maps Embed API

### Ubicación: Polanco
📍 **Archivo**: `app/ubicaciones/polanco/page.tsx` y `config/locations.ts`

- **Dirección**:
  - Actual: `"Av. Ejército Nacional 843, Nuevo Polanco, Miguel Hidalgo, CDMX, CP 11510"`
  - Acción: Verificar que sea correcta

- **Teléfono**:
  - Actual: `"+52 55 8765 4321"`
  - Acción: Actualizar con número real del gimnasio

- **WhatsApp**:
  - Actual: `"+525587654321"`
  - Acción: Actualizar con número WhatsApp real

- **Email**:
  - Actual: `"polanco@algym247.com"`
  - Acción: Verificar que el dominio y correo funcionen

- **Coordenadas GPS**:
  - Actual: `lat: 19.44, lng: -99.2019`
  - Acción: Verificar coordenadas exactas del gimnasio

- **URL de mapa embebido**:
  - Actual: URL genérica
  - Acción: Generar URL específica desde Google Maps Embed API

---

## ⚠️ **MEDIA PRIORIDAD - Contenido y Testimonios**

### Testimonios en Páginas de Ubicación

#### Azcapotzalco
📍 **Archivo**: `app/ubicaciones/azcapotzalco/page.tsx:74-78`

```javascript
testimonial: {
  name: "María González",
  text: "Llevo 6 meses entrenando en Algym247 Azcapotzalco...",
  rating: 5,
}
```
- **Acción**: Reemplazar con testimonio real de cliente verificado

#### Polanco
📍 **Archivo**: `app/ubicaciones/polanco/page.tsx:78-82`

```javascript
testimonial: {
  name: "Carlos Mendoza",
  text: "El mejor gimnasio donde he estado...",
  rating: 5,
}
```
- **Acción**: Reemplazar con testimonio real de cliente verificado

### Schema.org - Ratings y Reviews

📍 **Archivo**: `components/schema-org.tsx`

**Azcapotzalco (líneas 52-58)**:
```javascript
"aggregateRating": {
  "ratingValue": "4.8",
  "reviewCount": "127",
}
```

**Polanco (líneas 162-168)**:
```javascript
"aggregateRating": {
  "ratingValue": "4.9",
  "reviewCount": "203",
}
```

- **Acción**:
  - ⚠️ **IMPORTANTE**: Solo usar datos verificables de Google My Business o plataformas reales
  - Google puede penalizar ratings falsos
  - Si no hay suficientes reviews, mejor NO incluir esta sección

---

## 📸 **IMÁGENES - Verificación Necesaria**

### Imágenes de Ubicaciones

#### Azcapotzalco
📍 **Archivo**: `app/ubicaciones/azcapotzalco/page.tsx:67`
- **Imágenes actuales**: `["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"]`
- **Acción**:
  - Verificar que sean fotos REALES de la ubicación de Azcapotzalco
  - Si son genéricas/stock photos, reemplazar con fotos del gimnasio real
  - Optimizar para web (< 200KB cada una)

#### Polanco
📍 **Archivo**: `app/ubicaciones/polanco/page.tsx:70`
- **Imágenes actuales**: `["/pic2.jpg", "/3.jpg", "/pic1.jpg"]`
- **Acción**:
  - Verificar que sean fotos REALES de la ubicación de Polanco
  - Si son genéricas/stock photos, reemplazar con fotos del gimnasio real
  - Optimizar para web (< 200KB cada una)

### Imagen Open Graph
📍 **Archivo**: `public/og-image.jpg`
- **Estado**: Actualmente es una copia de `pic2.jpg`
- **Acción**:
  - Crear imagen optimizada de 1200x630px
  - Incluir logo de Algym247
  - Texto promocional claro
  - Colores del branding

---

## 🌐 **SEO y Verificaciones**

### Google Search Console
📍 **Archivo**: `app/layout.tsx:83-87` (actualmente comentado)
- **Acción**:
  1. Registrar sitio en Google Search Console
  2. Obtener código de verificación
  3. Descomentar y agregar código real

### Robots.txt
📍 **Archivo**: `public/robots.txt:13`
- **Estado**: ✅ Configurado correctamente
- **URL Sitemap**: `https://al-gym-247.vercel.app/sitemap.xml`

### Sitemap
📍 **Archivo**: `app/sitemap.ts`
- **Estado**: ✅ Configurado correctamente
- Incluye:
  - Página principal
  - `/franquicias`
  - `/blog`
  - `/ubicaciones/azcapotzalco`
  - `/ubicaciones/polanco`

---

## 📞 **Información de Contacto General**

### Archivo: `config/locations.ts:95-113`

```javascript
COMPANY_INFO = {
  name: "Algym247",
  legalName: "Algym247 S.A. de C.V.",
  email: "contacto@algym247.com",
  phone: "+52 55 1234 5678",  // ← VERIFICAR
  website: "https://al-gym-247.vercel.app",
  social: {
    facebook: "https://www.facebook.com/algym247",    // ← VERIFICAR
    instagram: "https://www.instagram.com/algym247",  // ← VERIFICAR
    twitter: "https://twitter.com/algym247",          // ← VERIFICAR
    tiktok: "https://www.tiktok.com/@algym247",       // ← VERIFICAR
    youtube: "https://www.youtube.com/@algym247",     // ← VERIFICAR
    linkedin: "https://www.linkedin.com/company/algym247", // ← VERIFICAR
  },
}
```

**Acción**: Verificar que todas las URLs de redes sociales existan y estén activas

---

## ✅ **CHECKLIST ANTES DE PRODUCCIÓN**

### Datos de Ubicación
- [ ] Actualizar dirección real de Azcapotzalco
- [ ] Actualizar teléfono real de Azcapotzalco
- [ ] Actualizar WhatsApp real de Azcapotzalco
- [ ] Verificar dirección de Polanco
- [ ] Actualizar teléfono real de Polanco
- [ ] Actualizar WhatsApp real de Polanco
- [ ] Verificar coordenadas GPS de ambas ubicaciones
- [ ] Generar URLs de mapas embebidos específicas

### Contenido
- [ ] Reemplazar testimonios con casos reales
- [ ] Verificar/remover ratings si no son reales
- [ ] Usar fotos reales de cada ubicación específica
- [ ] Crear og-image.jpg personalizada (1200x630px)

### SEO
- [ ] Registrar en Google Search Console
- [ ] Agregar código de verificación
- [ ] Verificar todas las URLs de redes sociales
- [ ] Confirmar emails funcionan (contacto@, azcapotzalco@, polanco@)

### Testing
- [ ] Probar enlaces de WhatsApp en móvil
- [ ] Probar enlaces telefónicos en móvil
- [ ] Verificar mapas carguen correctamente
- [ ] Probar social sharing (Facebook, Twitter, LinkedIn)
- [ ] Validar Schema.org con Google Rich Results Test
- [ ] Verificar sitemap.xml accesible

---

## 📊 **Herramientas de Validación**

Antes de lanzar, validar con estas herramientas:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Validar Schema.org de ubicaciones

2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Validar Open Graph metadata

3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Validar Twitter Cards

4. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Verificar rendimiento y SEO

5. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
   - Asegurar compatibilidad móvil

---

## 🔧 **Notas Técnicas**

### Archivos Críticos Modificados
1. ✅ `app/ubicaciones/azcapotzalco/page.tsx` - Corregido error OpenGraph
2. ✅ `app/ubicaciones/polanco/page.tsx` - Corregido error OpenGraph
3. ✅ `config/locations.ts` - Corregido formato WhatsApp
4. ✅ `components/hero-section.tsx` - Corregido poster de video
5. ✅ `public/og-image.jpg` - Creado (placeholder)
6. ✅ `components/location-detail.tsx` - Agregadas traducciones
7. ✅ `lib/translations.ts` - Agregadas claves para ubicaciones
8. ✅ `app/layout.tsx` - Comentadas verificaciones placeholder

### Estado de la App
- ✅ Todas las páginas cargan sin errores (HTTP 200)
- ✅ No hay errores críticos en consola
- ✅ Schema.org implementado correctamente
- ✅ Traducciones completadas
- ⚠️ Datos placeholder pendientes de actualización

---

**Última actualización**: 2025-10-29
**Rama**: `claude/session-011CUZbdDd4jXWQvSxstE69E`
