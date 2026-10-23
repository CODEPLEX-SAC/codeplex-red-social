# Título de panel de pago (`TituloPanelPago`)

## 1. Identificación

- **Componente:** `TituloPanelPago`.
- **Propósito:** título y detalle opcional de cada panel interno de la pasarela.
- **Ubicación:** `redsocial/frontend/componentes/marketplace/bloques/titulo_panel_pago.tsx`.
- **Estado:** **nuevo** (2026-10-16).
- **Consumidores:** `PanelPagoBilletera`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex. Elementos `<h4>` y `<p>`.

## 3. Contrato y características

Props: `titulo` y `detalle?`. Sin estados.

## 4. Diseño visual

Título `text-titulo-subseccion`, detalle `text-auxiliar` en `--color-texto-suave`.

## 5. Integración con el sistema compartido

Fuente de verdad: `marketplace.json › pago.clases` (`panel_titulo`, `panel_detalle`).

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

- 2026-10-16: creado. Sin librería afectada.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
