# Instrucciones para Implementar Tipografía DIN PRO Bold

## Manual de Marca Algym - Tipografía Oficial

Según el Manual de Marca de Algym, la tipografía oficial es **DIN PRO** (preferentemente en peso Bold).

## Dónde Obtener la Fuente

Necesitarás los archivos de la fuente DIN Pro Bold. Puedes obtenerla de:

1. **Fuentes Comerciales**:
   - Adobe Fonts (si tienes Creative Cloud)
   - MyFonts.com
   - Fonts.com
   - Monotype

2. **Alternativa**: Si no tienes acceso a DIN PRO, puedes usar:
   - **Din Alternate Bold** (Google Fonts - gratis)
   - **Roboto Condensed Bold** (similar, gratis)
   - **Arial Bold** (sistema, gratis)

## Cómo Instalar DIN PRO en el Proyecto

### Paso 1: Obtener los archivos de fuente

Necesitas los siguientes formatos para máxima compatibilidad:
- `DINPro-Bold.woff2` (recomendado, mejor compresión)
- `DINPro-Bold.woff` (fallback)

### Paso 2: Colocar los archivos

Coloca los archivos de fuente en:
```
/public/fonts/DINPro-Bold.woff2
/public/fonts/DINPro-Bold.woff
```

### Paso 3: La configuración ya está lista

El proyecto ya está configurado para usar DIN PRO:

1. **app/fonts.ts** - Define la fuente con `localFont`
2. **app/globals.css** - Aplica DIN PRO a títulos y body
3. **app/layout.tsx** - Tiene fallback a Arial/Helvetica

### Paso 4: Verificar

Una vez que coloques los archivos, reinicia el servidor:

```bash
npm run dev
```

La fuente DIN PRO Bold se aplicará automáticamente a:
- Todos los encabezados (H1-H6)
- Botones (font-bold class)
- Textos importantes

## Alternativa Rápida (Sin archivos de fuente)

El proyecto actualmente usa **Arial Bold** como fallback, que es muy similar a DIN PRO.

Para mejorar aún más sin DIN PRO, puedes usar **Din Alternate** de Google Fonts:

### En `app/layout.tsx`, agrega:

```typescript
import { Inter } from "next/font/google"

// Agregar esta línea:
// Nota: "DIN Alternate" no existe en Google Fonts
// La mejor alternativa gratuita es "Roboto Condensed"
import { Roboto_Condensed } from "next/font/google"

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["700"], // Bold
  variable: "--font-roboto-condensed",
  display: "swap",
})
```

Y actualiza el body:
```typescript
<body className={robotoCondensed.className}>
```

## Colores de Marca Implementados

✅ **PANTONE 172C - Naranja Principal**: #FD3502 (RGB: 253, 53, 2)
✅ **PANTONE 7539 C - Gris Claro**: #949594 (RGB: 148, 149, 148)
✅ **PANTONE 424 C - Gris Oscuro**: #6F6F73 (RGB: 111, 111, 115)

Los colores ya están aplicados en:
- Botones primarios (naranja #FD3502)
- Textos secundarios (grises de marca)
- Hover states
- Focus rings

## Verificación de Cumplimiento del Manual de Marca

| Elemento | Manual de Marca | Implementado |
|----------|----------------|--------------|
| Color Principal | #FD3502 | ✅ |
| Gris Claro | #949594 | ✅ |
| Gris Oscuro | #6F6F73 | ✅ |
| Tipografía | DIN PRO Bold | ⚠️ Fallback a Arial Bold |
| Slogan | "El gimnasio para todos" | ✅ |
| Logo + Slogan unificado | Sí | ✅ |

## Próximos Pasos

1. Obtener licencia de DIN PRO Bold
2. Colocar archivos en `/public/fonts/`
3. La implementación ya está lista para usarlos automáticamente

## Soporte

Si necesitas ayuda con la implementación, contacta al equipo de desarrollo.
