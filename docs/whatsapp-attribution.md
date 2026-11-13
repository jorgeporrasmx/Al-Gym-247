# Referencia web → WhatsApp — preparación 13 noviembre 2026

Rama para revisión; sin despliegue ni cambios en Monday.

Todos los botones WhatsApp usan `openWhatsApp`: abren una pestaña con el gesto del usuario,
solicitan una referencia a `/api/whatsapp` y abren el contacto con `[AGREF.…]` en el texto.
El enlace de la página 404 usa el mismo recorrido mediante un componente cliente.
Si el navegador bloquea ventanas emergentes, se abre en la pestaña actual.
Si falla la referencia, el contacto sigue disponible sin inventar datos de origen;
se emite `whatsapp_reference_unavailable`, sin datos personales ni identificadores.

El POST comprueba Origin y no almacena en caché. El servidor web solicita la referencia al
backend, usando exclusivamente `ALGYM_WEB_ATTRIBUTION_SECRET` del entorno de servidor.
La respuesta al navegador sólo contiene el enlace WhatsApp con la referencia opaca, nunca el secreto
ni los GCLID/UTM en el mensaje. No se envía ningún mensaje automáticamente.

El backend valida y guarda el conjunto en SQLite; caduca 30 minutos después de la captura
original y sólo se consume una vez al persistir el mensaje entrante. El contrato completo está en
el repositorio privado `jorgeporrasmx/algym-whatsapp-attribution-review`, archivo `docs/attribution-review.md`.

## Verificación

- `node --import tsx --test lib/lead-attribution.test.ts lib/whatsapp-attribution.test.ts`
- `npx tsc --noEmit --incremental false`
- `npm run build`
- Con ambos checkouts locales, definir `ALGYM_BACKEND_REVIEW_DIR` y ejecutar
  `node --require <backend>/tests/no-external.cjs --import tsx scripts/test-whatsapp-contract.ts`.
  Usa HTTP local, SQLite en memoria y Monday simulado, sin conversiones ni mensajes externos.

## Publicación pendiente

Juan debe integrar y revisar el backend completo, disponer del respaldo recuperable y configurar
el mismo secreto seguro en ambos servidores antes de publicar. Desplegar primero el backend;
publicar después la web. El cambio no modifica presupuestos ni objetivos de campañas.
La conversión Google seguirá secundaria hasta acreditar una importación real válida.

La web transmite atribución, pero una visita o clic no prueba un prospecto confirmado.
La prueba local no acredita el recorrido productivo ni la exclusión entre Zapier, formularios y voz.

Referencia de Next.js 14 consultada el 13-nov-2026:
[POST dinámico y variables de servidor](https://github.com/vercel/next.js/blob/v14.2.35/docs/02-app/01-building-your-application/01-routing/12-route-handlers.mdx).
