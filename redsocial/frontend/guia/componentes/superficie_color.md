# Superficie de color (`SuperficieColor`)

## 1. Identificación

- **Componente:** `SuperficieColor`.
- **Propósito:** contenedor con un fondo o degradado de la paleta de categorías.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/superficie_color.tsx`; paleta en `paleta_colores.ts`.
- **Estado:** existente.
- **Consumidores:** 13 archivos (Amigos, Avisos, Dashboard, Eventos, Guardados y otros).

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML:** configurable con `as` (predeterminado `<div>`).

## 3. Contrato y características

Props: `variante` (clave de `paleta_superficie`), `degradado` (clave de `paleta_degradado`), `className`, `children`, `as`. Sin variante, usa `bg-gris-categoria`. Siempre añade `bg-cover bg-center`.

## 4. Diseño visual

Colores de las 21 variantes de `paleta_superficie` y 14 degradados de `paleta_degradado` de `compartido.json`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › paleta_superficie` y `paleta_degradado` (leídas por `paleta_colores.ts`).

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 13 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
