#!/bin/bash

# Script para copiar fuentes DIN Pro al proyecto
# Ejecuta este script cuando Google Drive esté sincronizado

echo "Copiando fuentes DIN Pro al proyecto..."

FONT_SOURCE="/Users/jorgeporras/Library/CloudStorage/GoogleDrive-jorge.sutilde@gmail.com/My Drive/AL GYM/1. Marca Al Gym/MARKETING AL GYM/CAPACITACIONES/RECURSOS CAPACITACIONES/TIPOGRAFIA AL GYM"
FONT_DEST="/Users/jorgeporras/Documents/CODIGO/ALGYM247-main/public/fonts"

# Crear directorio si no existe
mkdir -p "$FONT_DEST"

# Copiar fuentes
cp "$FONT_SOURCE/DIN Pro 400.otf" "$FONT_DEST/DINPro-Regular.otf"
cp "$FONT_SOURCE/DIN Pro Medium 500.otf" "$FONT_DEST/DINPro-Medium.otf"
cp "$FONT_SOURCE/DIN Pro Bold 700.otf" "$FONT_DEST/DINPro-Bold.otf"

echo "✅ Fuentes copiadas exitosamente!"
echo "Ahora actualiza globals.css para usar las fuentes locales"
