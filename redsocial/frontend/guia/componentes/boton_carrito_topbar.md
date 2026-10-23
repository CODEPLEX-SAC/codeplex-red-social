# Botón de carrito de la barra superior (`BotonCarritoTopbar`)

## 1. Identificación

- **Componente:** `BotonCarritoTopbar` y el contexto `ContextoAccesoCarrito`.
- **Propósito:** icono de carrito con contador que abre el carrito del Marketplace desde cualquier pantalla.
- **Ubicación:** `redsocial/frontend/componentes/compartido/navegacion/boton_carrito_topbar.tsx`; contexto en `componentes/compartido/carrito/contexto_acceso_carrito.ts`; tipo en `tipos/compartido/contrato_acceso_carrito.ts`.
- **Estado:** **nuevo** (2026-10).
- **Consumidores:** `BarraSuperior`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `BotonIcono` e `Insignia`.
- **Proveedor del valor:** `ProveedorCarritoMarketplace` (`paginas/marketplace/proveedor_carrito_marketplace.tsx`); si no hay proveedor, el botón no se muestra.

## 3. Contrato y características

Sin props. Lee `AccesoCarrito` (`cantidad`, `etiqueta`, `abrir`). El contador solo aparece si `cantidad > 0`. Accesibilidad: `aria-label` con la etiqueta del acceso (`carrito.boton`).

## 4. Diseño visual

`BotonIcono` `sutil` `default` (32 × 32 px; 28 en móvil) y contador `Insignia counter` (18 px) en la esquina superior derecha, sin capturar clics.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › barra_superior.carrito` (contenedor e insignia).

## 6. Dependencias y procedencia de iconos

Icono `carrito` (`Icono`, glifo `shopping_cart` de la librería de iconos); ver `iconos.md`.

## 7. Historial de modificaciones

- 2026-10: creado con el trabajo de Marketplace; el botón se retira del encabezado de Marketplace. Sin librería afectada. Impacto: la barra superior.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
