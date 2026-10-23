# Sección de método de pago (`SeccionPagoMetodo`)

## 1. Identificación

- **Componente:** `SeccionPagoMetodo`.
- **Propósito:** primer paso de la pasarela: elegir Tarjeta o Billeteras digitales en un acordeón.
- **Ubicación:** `redsocial/frontend/componentes/marketplace/bloques/seccion_pago_metodo.tsx`.
- **Estado:** **nuevo** (2026-10-16). Sustituye las tres tarjetas seleccionables anteriores.
- **Consumidores:** el modal de pago de planes (`ModalPagoPlanes`).

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `Acordeon` (envoltorio de `CodeplexAcordeon`).
- **Contenido de las filas:** `SeccionPagoTarjeta` y `PanelPagoBilletera`.
- **Elemento HTML:** `<section>`.

## 3. Contrato y características

Props: `estado` (resultado de `usarPagoPlanes`), y `cantidadGuardadas` (la prop `pago` se retiró con la transferencia). Las filas salen de `marketplace.json › pago.metodos.opciones` (`tarjeta` y `billetera`; la opción `transferencia` se eliminó el 2026-10-19). Empieza con todas las filas cerradas. Accesibilidad: la del acordeón.

## 4. Diseño visual

Tarjeta con relleno de 20 px (16 px en móvil), borde `--color-borde`, encabezado numerado (círculo de 28 px) y acordeón de filas de 48 px.

## 5. Integración con el sistema compartido

Fuente de verdad: `marketplace.json › pago.metodos` y `pago.clases`; consume `acordeon.md`.

## 6. Dependencias y procedencia de iconos

Iconos de fila (`Icono`): `tarjeta-pago` y `celular`; ver `iconos.md`. El icono `banco` ya no se usa.

## 7. Historial de modificaciones

- 2026-10-16: creado; el tema del acordeón, las filas de 48 px y la ausencia de fila abierta por defecto se ajustaron en la misma fecha. Sin librería afectada.
- 2026-10-19: se elimina la fila «Transferencia bancaria» (y la prop `pago`); quedan dos filas.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
