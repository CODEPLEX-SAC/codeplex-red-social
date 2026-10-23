# Menú desplegable (`Menu`)

## 1. Identificación

- **Componente:** `Menu` y la función `irARuta`.
- **Propósito:** menú contextual anclado a un elemento, con iconos, divisores, elementos de peligro y navegación opcional.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/menu.tsx`; tipos en `tipos/compartido/contrato_menu.ts`.
- **Estado:** existente.
- **Consumidores:** 11 usos JSX en 11 archivos (acciones por fila en Colaboradores y Empresas, Avisos, Eventos, Inicio y otros).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexMenu` de `@codeplex-sac/navegacion` 0.0.16 (MUI `Menu`).
- **Implementación:** `menu.tsx`; convierte `ElementoMenu` en elementos de la librería y llama a `irARuta` creando un `<a>` temporal si el elemento tiene `ruta`.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<ul role="menu">` con `<li role="menuitem">` de MUI.

## 3. Contrato y características

Props (`MenuProps`): `elementos` (`{ etiqueta, icono?, ruta?, peligro?, deshabilitado?, divisor?, alHacerClick? }`), `ancla` (elemento HTML o `null`; abierto si no es `null`) y `alCerrar`. Cada clic ejecuta `alHacerClick`, navega a `ruta` y cierra. Estados: cerrado, abierto, elemento `hover`/foco (`--color-fondo-hover-neutro`), `disabled`, peligro (`error.main`). Accesibilidad: la del `Menu` de MUI (foco, Escape, flechas); no verificado en las pruebas del proyecto.

## 4. Diseño visual

Anclaje inferior derecho (`anchorOrigin` bottom/right, `transformOrigin` top/right), sin bloqueo de scroll. Elementos con texto `var(--text-cuerpo)` e icono de 14 × 14 px (`h-3.5 w-3.5`). Sin tamaño fijo del panel.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › menu` y `elemento_menu_tema` (tema). Sin overrides locales.

## 6. Dependencias y procedencia de iconos

Los iconos de los elementos son `Icono` (nombres del catálogo; ver `iconos.md`).

## 7. Historial de modificaciones

- Sin cambios documentados del proyecto distintos de la configuración. No se modificó la librería: el contenido de `@codeplex-sac/navegacion@0.0.16` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto: 11 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
