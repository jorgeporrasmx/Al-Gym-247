# Instrucciones para Copiar Fuentes DIN Pro

## Problema Actual

Los archivos de fuentes DIN Pro están en Google Drive y tienen problemas de sincronización.
**Solución temporal:** Estamos usando **Oswald** de Google Fonts (muy similar a DIN Pro).

## Para Usar DIN Pro Original

### Opción 1: Esperar Sincronización y Ejecutar Script

1. Espera a que Google Drive sincronice completamente los archivos
2. Ejecuta este comando en la terminal:

```bash
cd /Users/jorgeporras/Documents/CODIGO/ALGYM247-main
./copy-fonts.sh
```

3. Una vez copiadas las fuentes, actualiza `app/globals.css`:

Reemplaza esta sección:
```css
/* Importar fuente similar a DIN Pro desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap');
```

Por:
```css
/* DIN Pro - Tipografía oficial según Manual de Marca Algym */
@font-face {
  font-family: 'DIN Pro';
  src: url('/fonts/DINPro-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DIN Pro';
  src: url('/fonts/DINPro-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DIN Pro';
  src: url('/fonts/DINPro-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Y cambia 'Oswald' por 'DIN Pro':
```css
font-family: 'DIN Pro', 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif;
```

### Opción 2: Copiar Manualmente

1. Abre Finder y navega a:
   `/Users/jorgeporras/Library/CloudStorage/GoogleDrive-jorge.sutilde@gmail.com/My Drive/AL GYM/1. Marca Al Gym/MARKETING AL GYM/CAPACITACIONES/RECURSOS CAPACITACIONES/TIPOGRAFIA AL GYM/`

2. Copia estos archivos:
   - `DIN Pro 400.otf` → renombra a `DINPro-Regular.otf`
   - `DIN Pro Medium 500.otf` → renombra a `DINPro-Medium.otf`
   - `DIN Pro Bold 700.otf` → renombra a `DINPro-Bold.otf`

3. Pégalos en:
   `/Users/jorgeporras/Documents/CODIGO/ALGYM247-main/public/fonts/`

4. Sigue las instrucciones del paso 3 de la Opción 1

## Estado Actual

✅ **Colores de marca:** Implementados al 100%
⚠️ **Tipografía:** Usando Oswald (similar a DIN Pro) temporalmente
  - Oswald es una fuente sans-serif condensada muy similar a DIN Pro
  - Está cargando correctamente desde Google Fonts
  - Funciona como excelente sustituto hasta que se copien las fuentes originales

## Verificar que la Fuente Actual Funciona

Abre el navegador en http://localhost:3000 y:
1. Inspecciona cualquier texto
2. En las herramientas de desarrollador, busca "Computed" → "font-family"
3. Deberías ver: `Oswald, Arial, Helvetica Neue, Helvetica, sans-serif`

Si ves Times New Roman o una fuente serif, significa que hay un error en la carga.
