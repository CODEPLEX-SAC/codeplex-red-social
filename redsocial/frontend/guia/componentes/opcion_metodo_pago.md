# Opción de método de pago (`OpcionMetodoPago`)

## 1. Identificación

- **Componente:** `OpcionMetodoPago`.
- **Propósito:** botón de radio tipo tarjeta para elegir la billetera (Yape o Plin).
- **Ubicación:** `redsocial/frontend/componentes/marketplace/bloques/opcion_metodo_pago.tsx`; tipo `OpcionMetodoPagoProps` en `tipos/marketplace/modelo_pago.ts`.
- **Estado:** **nuevo** (2026-10-16).
- **Consumidores:** `PanelPagoBilletera`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Elemento HTML nativo:** `<button type="button" role="radio" aria-checked>`.

## 3. Contrato y características

Props: `titulo`, `detalle?`, `icono`, `activa`, `alElegir`. Estados: activa (borde primario y fondo `--color-fondo-hover-suave`) e inactiva (con `hover` de borde primario). Accesibilidad: `role="radio"` dentro de un `role="radiogroup"`.

## 4. Diseño visual

Fila con relleno de 14 px, radio 12 px, icono de 36 × 36 px (fondo `--color-primario-suave`), indicador circular de 18 px (con marca cuando está activa).

## 5. Integración con el sistema compartido

Fuente de verdad: `marketplace.json › pago.clases` (`metodo`, `metodo_activo`, `metodo_inactivo`, `metodo_icono`, `indicador*`). No usa `Boton`.

## 6. Dependencias y procedencia de iconos

`celular` (icono de la opción) y `marca-pequena` (marca de activa; símbolo `check`) con `Icono`; ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-16: creado; antes se usaba también para los tres métodos principales, hoy solo para billeteras.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
