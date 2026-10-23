# Estructura de aplicación (`EstructuraApp`)

## 1. Identificación

- **Componente:** `EstructuraApp`.
- **Propósito:** esqueleto de todas las pantallas: barra lateral, barra superior y área principal.
- **Ubicación:** `redsocial/frontend/componentes/compartido/estructura/estructura_app.tsx`; tipos en `contrato_estructura_app.ts`.
- **Estado:** existente.
- **Consumidores:** todas las páginas.

## 2. Origen e implementación

- **Origen:** propio de CodePlex; compone `BarraLateral` y `BarraSuperior`.
- **Elementos HTML:** `<div>` y `<main>`.

## 3. Contrato y características

Props: `children`, `paginaActiva`, `alturaCompleta` (área principal con altura de pantalla y sin scroll propio). Mantiene el estado de colapso de la barra lateral.

## 4. Diseño visual

Desplazamiento a la izquierda: 240 px expandida y 80 px colapsada, 0 por debajo de 900 px. `main` con ancho máximo de 1872 px (`max-w-468`), relleno 24 px (12 px en móvil).

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › barra_lateral.desplazamiento` y clases del componente.

## 6. Dependencias y procedencia de iconos

Sin iconos propios.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: todas las pantallas.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
