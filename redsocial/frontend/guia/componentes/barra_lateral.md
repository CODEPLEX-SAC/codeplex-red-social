# Barra lateral (`BarraLateral`)

## 1. Identificación

- **Componente:** `BarraLateral` y `elementosDeLaBarra`.
- **Propósito:** navegación principal, espacio de trabajo y módulos disponibles, con modo colapsado.
- **Ubicación:** `redsocial/frontend/componentes/compartido/navegacion/barra_lateral.tsx` y `elementos_barra_lateral.tsx`; tipos en `tipos/compartido/contrato_barra_lateral.ts`.
- **Estado:** existente.
- **Consumidores:** `EstructuraApp`.

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexBarraLateral` de `@codeplex-sac/diseno` 0.0.20 (MUI), con un `ThemeProvider` anidado que fija el punto de quiebre `md` en 900 px.
- **Implementación:** `barra_lateral.tsx` (tema y navegación con `irARuta`), `elementos_barra_lateral.tsx` (elementos desde catálogo).
- **Elementos HTML:** `<nav>` y botones de MUI (`ListItemButton`, `IconButton`).

## 3. Contrato y características

Props: `paginaActiva`, `colapsado` (predeterminado `false`) y `alAlternarColapsado`. Estados: expandida (240 px), colapsada (80 px de desplazamiento), ítem activo; por debajo de 900 px la barra se convierte en cajón (el contenido pierde el desplazamiento). Accesibilidad: la de la librería (botón «colapsar barra lateral» con etiqueta). No verificado: navegación con teclado en modo cajón.

## 4. Diseño visual

Ancho de 240 px (`barra_lateral.ancho`), ítems de ≈ 40,8 px de alto (módulos ≈ 55 px), botón de colapsar de 34 × 34 px, iconos y texto con el tema MUI y tipografía heredada.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › barra_lateral` (ancho, puntos de quiebre, desplazamiento, ids, clases de severidad, de punto y de módulo) y el catálogo `navegacion`.

## 6. Dependencias y procedencia de iconos

Iconos con `Icono` (nombres del catálogo); ver `iconos.md`.

## 7. Historial de modificaciones

- Sin cambios propios distintos de configuración. No se modificó la librería: `@codeplex-sac/diseno@0.0.20` es idéntico al paquete publicado (2026-10-17).
- Impacto: todas las pantallas.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
