# Marketplace: tarjetas de aplicaciones, planes, carrito y compras

Módulo `redsocial/frontend/componentes/marketplace/` (45 archivos `.tsx`), páginas en `paginas/marketplace/`, datos en `servicios/marketplace/` (`marketplace.json`, `planes_aplicaciones.json`, `pago_planes.json`, `estilos_marketplace.json`), clases y textos en `catalogos/capacidades/redsocial/marketplace.json`. La pasarela de pagos y el asistente tienen archivos propios: [pasarela_pagos.md](pasarela_pagos.md), [asistente_contaplex.md](asistente_contaplex.md).

## 1. Componentes e inventario

| Función | Componente y archivo (`componentes/marketplace/bloques/`) | Base | Cat. |
|---|---|---|---|
| Sección «Destacados» | `SeccionDestacados3` (`seccion_destacados3.tsx`) | `FilaDestacados` + `TarjetaDestacado` | C |
| Carrusel de destacados | `FilaDestacados` (`fila_destacados.tsx`): pista `flex overflow-x-auto`, dos `BotonIcono variant="flotante"`, avance `0,9 × ancho` | `usarCarrusel` (`compartido/usar_carrusel.ts`) | C |
| Tarjeta de destacado | `TarjetaDestacado` (`tarjeta_destacado.tsx`): icono 48 px de color de módulo, nombre/publicador, insignia de categoría, descripción, 4 características con `verificado`, precio, botón «Ver planes». **Un solo componente para los 6 productos**; ancho `w-80` (320 px) de `destacados_fila.tarjeta` | `Boton`, `Insignia`, `Icono` | C |
| Popular esta semana | `SeccionPopularEstaSemana` | `Icono` | C |
| Modal «Ver planes» | `ModalPlanesAplicacion` (`modal_planes_aplicacion.tsx`) → `Modal` compartido | `CuerpoPlanes`, `AsistenteFlotante` | C |
| Contenido del modal | `CuerpoPlanes` (`cuerpo_planes.tsx`), `CabeceraPlanes`, `TabsTipoPlanes` (`Boton`), `SelectorPeriodoPlanes` (`Interruptor`), `FilaPlanes`/`RejillaPlanes` (`lista_planes.tsx`) | compartidos B/C | C |
| Tarjeta de plan | `TarjetaPlan` (`tarjeta_plan.tsx`) + `ItemCaracteristica` (`<button>` nativo registrado). **Un solo componente para los 6 productos y las dos pestañas de ContaPlex**; ancho fijo `w-53` (212 px) y 14 px de separación | `Boton`, `Insignia` | C |
| Ventanas auxiliares | `PanelPaquetesPlanes`, `VentanaCaracteristica`, `VisorCatalogoPlanes` (muestra un PDF en `<iframe src={catalogo.url}>`) | `Modal` | C |
| Carrito | `ProveedorCarritoMarketplace` (`paginas/marketplace/proveedor_carrito_marketplace.tsx`, **nuevo**), `contexto_carrito_marketplace.ts` (**nuevo**), `usar_carrito_marketplace.ts`, `ModalCarritoPlanes`, `FilaCarrito`, `ResumenCarrito`, `BotonCarritoTopbar` (**nuevo**, `compartido/navegacion`) | `Modal`, `Boton`, `BotonIcono` | C |
| Mis compras | `SeccionMisCompras`, `PanelMisCompras`, `TarjetaSuscripcion` (`Menu`), `TarjetaServicio`, `ConfirmacionDesinstalar`, `ModalDetalleCompra` (`Acordeon` compartido, variante `bordeado`) | `Pestanas`, `Menu`, `Modal` | C (+ **B**: `Acordeon`, también en la pasarela) |

## 2. Procedencia

Ningún componente de tarjeta procede de una librería: son HTML con clases del catálogo. Las únicas piezas de librería directas son `CodeplexAcordeon` (detalle de compra) y las que llegan por los envoltorios compartidos (`Menu`, `Pestanas`, `Casilla`, `CampoTexto`…).

## 3. Diseño del modal de planes (decisión de ancho vigente)

- Dos anchos compartidos por grupo, definidos en `marketplace.json › planes.clases.modal_por_grupo`: `amplio` = `w-[min(100%,1164px)]!` (ContaPlex ambas pestañas, GestiónPlex Comercial, Facturación Electrónica) y `compacto` = `w-[min(100%,712px)]!` (Restaurante, Transporte, Grifo). El grupo de cada producto está en `servicios/marketplace/planes_aplicaciones.json` (campo `modal`) y lo aplica `claseModalPlanes` (`logica_carrito_planes.ts`). El `!` se usa para vencer el `w-full` de `Modal` sin depender del orden del CSS.
- Tarjeta: `tarjeta_fila` = `w-53 flex-none max-600:w-full`; fila `overflow-x-auto` con el carrusel (arrastre/rueda) cuando no caben; en móvil (<600 px) el modal es pantalla completa y las tarjetas se apilan.
- Pestaña Empresarial de ContaPlex (`rejilla`): mismas tarjetas de 212 px, centradas con `flex flex-wrap justify-center`.
- Mediciones (2026-10-16) a 1280/820/400 px: modal 1164/773/400 px (amplio) y 712/712/400 px (compacto); tarjetas 212/212/368 px.

## 4. Modificaciones

Ninguna sobre librerías. Cambios recientes del proyecto (sin confirmar en Git): ancho por grupo; se retiró la etiqueta «Popular» de la tarjeta de destacados (campo `popular`, texto y prueba); carrito global con proveedor; pasarela con método de pago.

## 5. Posible incorporación a la librería compartida

- `TarjetaPlan` y `TarjetaDestacado`: **mantener en CodePlex** (contienen precios, planes y reglas de Marketplace).
- `FilaDestacados` + `usarCarrusel`: **extraer** el carrusel con flechas como componente genérico (no tiene lógica de producto).
- `Modal` (compartido): ver [modal.md](modal.md).
- `ModalDetalleCompra`: ya usa `CodeplexAcordeon` oficial; sin acción.

## 5b. Coherencia con Empresas (2026-10-19)

Las compras de «Mis compras» ya no son una lista fija: nacen de `suscripciones_demostracion.json` (ContaPlex Estándar y Facturación Electrónica Básico) y de las compras nuevas. `CompraRealizada` guarda `tipo` y `plan`; `logica_suscripciones.ts` deriva `SuscripcionContratada` (aplicación, plan y capacidad de empresas/sucursales leída de las etiquetas del plan con los patrones de `marketplace.json › capacidad.patrones`). Empresas lee esas suscripciones; la contratación y la mejora de plan solo se hacen aquí.

## 6. Verificación

Pruebas existentes: `pruebas/marketplace/` (`destacados_marketplace`, `iconos_marketplace`, `pagina_marketplace`, `planes_marketplace`, `proveedor_carrito_marketplace`, `super_vip_marketplace`). Ejecutadas el 2026-10-16: 6 archivos, 68 pruebas en verde (antes de las últimas modificaciones de la pasarela se repitió con compartido: 24 archivos, 399 pruebas). Medición en navegador de los seis productos a 1280, 820 y 400 px (2026-10-16).

## Mejora de plan desde Empresas (2026-10-20)

Empresas abre `ModalMejoraPlan` y, al elegir un plan superior, llama a `ContextoMejoraPlan.contratar` (`usarCarritoMarketplace.contratarMejora`): crea el ítem con `crearItem`, lo reemplaza o agrega en el carrito y abre directamente `ModalPagoPlanes`; `finalizar` sustituye la compra de ese aplicativo y `suscripcionesDeCompras` recalcula la capacidad. `SuscripcionContratada` incorpora `tipo`, `periodo` y `precio` para poder comparar planes del mismo tipo. El pago sigue siendo demostrativo. Detalle completo en [modulos_detalle.md](modulos_detalle.md).
