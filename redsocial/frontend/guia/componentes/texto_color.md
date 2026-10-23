# Texto de color (`TextoColor`)

## 1. Identificación

- **Componente:** `TextoColor`.
- **Propósito:** aplicar un color de texto de la paleta de categorías.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/texto_color.tsx`; paleta en `paleta_colores.ts`.
- **Estado:** existente.
- **Consumidores:** 7 archivos (Colaboradores, Eventos y otros).

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML:** configurable con `as` (predeterminado `<span>`).

## 3. Contrato y características

Props: `variante` (clave de `paleta_texto`), `className`, `children`, `as`. Sin variante conocida usa `text-texto-suave`.

## 4. Diseño visual

Colores de las 17 claves de `paleta_texto` de `compartido.json`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › paleta_texto`.

## 6. Dependencias y procedencia de iconos

Sin iconos.

## 7. Historial de modificaciones

Sin cambios documentados. Impacto: 7 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
