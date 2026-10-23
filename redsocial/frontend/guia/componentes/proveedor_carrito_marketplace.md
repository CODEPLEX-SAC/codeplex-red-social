# Proveedor del carrito (`ProveedorCarritoMarketplace`)

## 1. Identificación

- **Componente:** `ProveedorCarritoMarketplace` y el contexto `ContextoCarritoMarketplace`.
- **Propósito:** estado del carrito disponible en cualquier pantalla y sus modales (carrito, planes y pago).
- **Ubicación:** `redsocial/frontend/paginas/marketplace/proveedor_carrito_marketplace.tsx`; contexto en `componentes/marketplace/contexto_carrito_marketplace.ts`; tipos en `tipos/marketplace/contrato_proveedor_carrito.ts`.
- **Estado:** **nuevo** (2026-10).
- **Consumidores:** raíz de la aplicación y `PaginaMarketplace`; la barra superior lee el acceso mediante `ContextoAccesoCarrito`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; usa `usarCarritoMarketplace` y compone `ModalCarritoPlanes`, `ModalPlanesAplicacion` y `ModalPagoPlanes`.
- **Elemento HTML:** ninguno propio (renderiza modales).

## 3. Contrato y características

Props: `children`, `suscripcionesIniciales` (opcional; `SeleccionPlan[]` que se convierten en compras iniciales, sin cobro). Provee además `ContextoSuscripciones` (compartido), calculado con `suscripcionesDeCompras`, que consume Empresas para mostrar plan y capacidad contratados. Provee `CarritoMarketplace` (artículos, modales abiertos, historial, servicios) y `AccesoCarrito` (`cantidad`, `etiqueta`, `abrir`). `usarCarritoCompartido` lanza error si falta el proveedor. Estados: carrito abierto, planes abiertos, pago abierto.

## 4. Diseño visual

Sin diseño propio; los modales usan `Modal` y los anchos acordados por grupo de producto.

## 5. Integración con el sistema compartido

Datos de `marketplace.json` (carrito y pago) y `rutas/marketplace`.

## 6. Dependencias y procedencia de iconos

Sin iconos propios.

## 7. Historial de modificaciones

- 2026-10: creado para elevar el carrito a la barra superior. `proveedor_carrito_marketplace.test.tsx` presenta fallos intermitentes cuyo origen no se ha determinado (investigación del 2026-10-17 sin reproducción).


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
