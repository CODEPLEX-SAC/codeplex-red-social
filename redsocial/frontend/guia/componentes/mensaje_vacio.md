# Mensaje de estado vacío (`MensajeVacio`)

## 1. Identificación

- **Componente:** `MensajeVacio`.
- **Propósito:** texto de «no hay resultados» con título opcional.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/mensaje_vacio.tsx`; tipo en `tipos/compartido/contrato_mensaje_vacio.ts`.
- **Estado:** existente.
- **Consumidores:** 16 usos JSX en 15 archivos (conteo del 2026-10-19; incluye la página Notificaciones > Sistema, que muestra `mensajes.sin_notificaciones`).

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<div>`, `<h3>` (título opcional) y `<p>`.

## 3. Contrato y características

Props: `titulo?`, `texto`, `className?`. Sin estados. Accesibilidad: texto estático; no es una región `aria-live`.

## 4. Diseño visual

Contenedor `flex flex-col items-center gap-1 text-center`; título `text-nombre-entidad` en `--color-texto`; texto `text-subtitulo` en `--color-texto-suave`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › mensaje_vacio`. Sin overrides locales de estilo.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 13 archivos.


Verificado el 2026-10-19 contra el código (consumidores y contrato). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
