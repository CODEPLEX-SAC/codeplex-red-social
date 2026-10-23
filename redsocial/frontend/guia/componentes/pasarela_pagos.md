# Pasarela de pagos («Información de pago»)

## 1. Identificación y uso actual

| Dato | Valor |
|---|---|
| Nombre en CodePlex | Pasarela de pagos / Información de pago |
| Punto de montaje | `redsocial/frontend/paginas/marketplace/proveedor_carrito_marketplace.tsx` → `ModalPagoPlanes` |
| Categoría | **C** (propia), compuesta con controles **B** (`CampoTexto`, `Selector`, `Casilla`) y `Modal` (C) |
| Estado | Utilizada (flujo: «Ver planes» → carrito → «Proceder al pago» → pago → éxito). Es una **demostración**: no procesa pagos |

## 2. Cadena de montaje real

`ModalPagoPlanes` (`componentes/marketplace/bloques/modal_pago_planes.tsx`; `Modal` suave de `max-w-240`) → `CuerpoPagoPlanes` (`cuerpo_pago_planes.tsx`; grid `grid-cols-minmax400-1fr-minmax230-300`, una columna a ≤768 px) con:

| Paso | Componente (archivo en `componentes/marketplace/bloques/`) | Estado |
|---|---|---|
| 1 Método de pago | `SeccionPagoMetodo` (`seccion_pago_metodo.tsx`): **acordeón de dos filas (Tarjeta y Billeteras digitales)** con el envoltorio `Acordeon` (`componentes/compartido/interfaz/acordeon.tsx`; ver [acordeon.md](acordeon.md)) sobre `CodeplexAcordeon` (`@codeplex-sac/diseno`, `variante="separado"`); un panel abierto a la vez, se cierra al pulsar de nuevo la misma fila; **ninguna fila abierta al inicio**; filas de 48 px solo con icono y título | **Nuevo** (2026-10-16; categoría **A** para el acordeón) |
| 1a Tarjeta | `SeccionPagoTarjeta` (`seccion_pago_tarjeta.tsx`): título «Datos de la tarjeta», campos, tarjeta guardada, aviso de renovación | Modificado (ya no es la sección completa; es el panel de tarjeta) |
| 1c Billeteras digitales | `PanelPagoBilletera` (`panel_pago_billetera.tsx`): selector Yape/Plin, QR, pasos | **Nuevo** |
| Títulos de panel | `TituloPanelPago` (`titulo_panel_pago.tsx`) | **Nuevo** |
| 2 Datos de facturación | `SeccionPagoFacturacion` (`seccion_pago_facturacion.tsx`): documento, razón social, país, dirección, correo, celular, casillas WhatsApp/SMS, perfil guardado | Modificado (rótulos superiores) |
| (opcional) Super VIP | `SeccionPagoVip` (`seccion_pago_vip.tsx`; depende de `marketplace.json › super_vip.habilitado`) | Sin cambios |
| 3 ¿Cuándo se emiten tus facturas? | `SeccionPagoCalendario` (`seccion_pago_calendario.tsx`): solo texto e importes | Sin cambios |
| 4 Autorización y políticas | `<section>` dentro de `cuerpo_pago_planes.tsx` con `Casilla` | Sin cambios |
| Resumen del pedido | `ResumenPagoPlanes` (`resumen_pago_planes.tsx`): `aside` `sticky top-0`, importes y botón «Activar período de prueba» | Modificado (alineación) |
| Éxito | `ExitoPagoPlanes` (`exito_pago_planes.tsx`) | Sin cambios |
| Tarjetas/perfiles guardados | `ModalSeleccionPago` (`modal_seleccion_pago.tsx`) | Sin cambios |

Encabezado numerado común: `EncabezadoPasoPago`. Estado: `usar_pago_planes.ts` (campos de tarjeta, facturación, perfil/tarjeta elegidos, `billetera`, VIP, términos, resumen). El método abierto lo gestiona el propio acordeón (no hay estado `metodo`). Lógica de formato y precios: `logica_pago_planes.ts`. Contratos: `tipos/marketplace/modelo_pago.ts` (`BilleteraDigital`, `ConfiguracionPago`, `OpcionMetodoPagoProps`, entre otros). Datos: `servicios/marketplace/pago_planes.json` (VIP y países). Textos y clases: `catalogos/capacidades/redsocial/marketplace.json › pago` (`metodos`, `paso1…paso4`, `campos`, `canales`, `clases`).

## 3. Componentes base y procedencia de cada control

| Control | Componente | Procedencia |
|---|---|---|
| Campos de texto (tarjeta, vencimiento, CVV, titular, RUC/DNI, razón social, dirección, correo, celular) | `CampoTexto` dentro de `CampoEtiquetado` | **B** (`CodeplexCampoTexto`) + **C** (rótulo) |
| País o región | `Selector variant="colaboradores"` dentro de `CampoEtiquetado` | **B** (`CodeplexSelector`) |
| Casillas de notificación y autorización | `Casilla` | **B** (`CodeplexCasilla`) |
| Filas de método (Tarjeta / Billeteras digitales) | `Acordeon`: icono (`metodo_icono`) y título de `marketplace.json › pago.metodos.opciones`; el contenido de cada fila es el panel correspondiente | **B** (`CodeplexAcordeon` con envoltorio `Acordeon`: sin sombra y borde `var(--color-borde)`, como las tarjetas de la pasarela) |
| Selector Yape/Plin (dentro de Billeteras) | `OpcionMetodoPago`: `<button role="radio" aria-checked>`, icono, título, indicador con check (`marca-pequena`) | **C** (copia el patrón de `OpcionModalidadEvento`) |
| QR | Icono `codigo-qr` (56 px) en un recuadro; **marcador de posición** | **C** |
| Botones de Yape/Plin | Icono genérico `celular`; **no hay logos** en el proyecto | **C** |

## 4. Diseño e implementación

- Tarjeta de sección: `pago.clases.tarjeta` (`rounded-xl border border-borde bg-white p-5`); número del paso `h-7 w-7 rounded-full bg-primario`.
- Método: filas del acordeón de la librería (variante `separado`; el envoltorio `Acordeon` quita la sombra de elevación 1 y cambia el color de `divider` a `var(--color-borde)` en un tema anidado; al abrir, borde y título en el primario del tema) con el icono `metodo_icono`; las filas se apilan a cualquier ancho, por lo que **no hay rejilla de tres tarjetas** (se retiró porque se rompía en pantallas estrechas). `metodo` + `metodo_activo`/`metodo_inactivo` + `indicador` solo los usa el selector Yape/Plin. Billetera: `metodos_dos`, `billetera_fila`, `pasos`, `aviso_neutro`.
- Cuadrículas con `grid-cols-1` para que el contenido largo no ensanche la columna (corregido en la verificación a 400 px).
- Resumen alineado con la primera tarjeta (`sticky top-0`; antes `top-5` lo desplazaba 20 px).
- Medido el 2026-10-16 (1280/900/700/400 px): sin desbordamiento; controles de 48 px desde la Fase 2 (campos, selector, botones `md` y filas del acordeón; antes 40 px); resumen a la derecha hasta 768 px y al final por debajo.

## 5. Datos de demostración (conviene saberlo antes de reutilizar)

Los importes, países y las billeteras (Yape y Plin) son datos de demostración (`servicios/marketplace/pago_planes.json`, `marketplace.json › pago.metodos`). El código QR de Billeteras digitales es un **marcador de posición** y no hay logos de Yape ni Plin. Los datos bancarios de la antigua opción «Transferencia bancaria» (cuenta, CCI, referencia) se eliminaron el 2026-10-19.

## 6. Comportamiento que debe preservarse / limitaciones conocidas

- `activar()` en `usar_pago_planes.ts` no distingue el método de pago: crea el resumen con los datos de tarjeta (si hay). Con billetera la pantalla de éxito omite la fila de tarjeta (solo se muestra si hay `ultimos4`).
- No hay validaciones de formato ni mensajes de error; el botón «Activar» solo depende de la casilla de autorización.
- Filtros de dígitos: RUC/DNI (11), celular (9), CVV (4); formateo de número de tarjeta y vencimiento.

## 7. Modificaciones respecto a la librería

Ninguna **[CONFIRMADO]**. La librería `CodeplexCampoTexto` ofrece etiqueta flotante (`etiqueta`); la pasarela la usaba y se retiró el 2026-10-16 para igualar el patrón de Eventos.

## 8. Posible incorporación a la librería compartida

- `CampoEtiquetado` y `OpcionMetodoPago`/selector de tarjetas tipo radio: **extraer** como componentes genéricos (ver [campo_etiquetado.md](campo_etiquetado.md) y [opcion_metodo_pago.md](opcion_metodo_pago.md)); `OpcionMetodoPago` coincide con `OpcionModalidadEvento` de Eventos y con `OpcionCostoEvento` (refactorizar hacia un único «OpcionTarjeta»/`CodeplexGrupoRadio` con tarjetas: **investigar más** si `CodeplexGrupoRadio` lo admite).
- Paneles de pago: **mantener en CodePlex** (datos y reglas de Marketplace).
- Pendiente de producto: logos de Yape/Plin, QR real y datos bancarios reales; definir el flujo de activación por método.

## 9. Verificación

Pruebas existentes: `pruebas/marketplace/planes_marketplace.test.tsx` (abre antes la fila «Tarjeta» del acordeón para localizar el campo de número de tarjeta), `proveedor_carrito_marketplace.test.tsx` (intermitente, causa no determinada), `super_vip_marketplace.test.tsx` y `pruebas/compartido/acordeon.test.tsx`. **No hay pruebas específicas del panel de billeteras [PENDIENTE]**. Última ejecución completa (2026-10-17): 95 archivos y 733 pruebas en verde; el botón «Activar período de prueba» (variante `cta`, 40 px) y los campos de 48 px se midieron a 1280 y 400 px.

Componentes con documento propio: [seccion_pago_metodo.md](seccion_pago_metodo.md), [opcion_metodo_pago.md](opcion_metodo_pago.md), [panel_pago_billetera.md](panel_pago_billetera.md), [titulo_panel_pago.md](titulo_panel_pago.md), y [acordeon.md](acordeon.md). `BotonCopiarPago` y `PanelPagoTransferencia` ya no existen y sus documentos se eliminaron.


## Historial: método «Transferencia bancaria» (eliminado el 2026-10-19)
Por decisión de la usuaria, el método «Transferencia bancaria» se eliminó: opción del acordeón, `PanelPagoTransferencia`, `BotonCopiarPago`, datos de cuenta en `pago_planes.json`, textos y clases del catálogo y el tipo `DatosTransferencia`. La pasarela ofrece Tarjeta y Billeteras digitales. Este documento describe el estado posterior a la eliminación. Verificado: `tsc`, pruebas de `compartido` y `marketplace` y `npm run calidad` en verde el 2026-10-19.
