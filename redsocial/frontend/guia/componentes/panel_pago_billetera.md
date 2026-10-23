# Panel de pago con billetera (`PanelPagoBilletera`)

## 1. Identificación

- **Componente:** `PanelPagoBilletera`.
- **Propósito:** elegir Yape o Plin y ver el código QR con los pasos para pagar.
- **Ubicación:** `redsocial/frontend/componentes/marketplace/bloques/panel_pago_billetera.tsx`.
- **Estado:** **nuevo** (2026-10-16).
- **Consumidores:** `SeccionPagoMetodo`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `OpcionMetodoPago`, `TituloPanelPago` e `Icono`.
- **Elemento HTML:** `<div role="radiogroup">`, `<ol>`.

## 3. Contrato y características

Props: `estado` (billetera elegida, `elegirBilletera`, total). El QR es un marcador de posición (`role="img"` con etiqueta); no es un código real. Accesibilidad: grupo de radios con etiqueta.

## 4. Diseño visual

Dos opciones en rejilla (una en móvil), QR de 160 × 160 px (icono de 56 px), pasos numerados con círculos de 20 px.

## 5. Integración con el sistema compartido

Fuente de verdad: `marketplace.json › pago.clases` y `pago.metodos.billetera`.

## 6. Dependencias y procedencia de iconos

Iconos `celular`, `codigo-qr` (56 px, ilustración permitida), `candado`; ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10-16: creado. El QR sigue siendo ilustrativo (pendiente de integración real, no determinado).


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
