# Selector de hora (`SelectorHora`)

## 1. Identificación

- **Componente:** `SelectorHora`.
- **Propósito:** campo para elegir una hora con el reloj de MUI X.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/selector_hora.tsx`.
- **Estado:** existente, adaptado (alto 48 px el 2026-10-16).
- **Consumidores:** 1 uso JSX, en `formularios/eventos`.

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexSelectorHora` de `@codeplex-sac/selectores-fecha` 0.0.24 (`@mui/x-date-pickers` 8.29.3, `dayjs`).
- **Implementación:** `selector_hora.tsx`; aplica `controles.selector_hora`.
- **Exportación:** barrel `componentes/compartido/index.ts`; requiere `CodeplexProveedorFechas`.
- **Elemento HTML nativo:** `<input>` de MUI X.

## 3. Contrato y características

Props de la librería (`CodeplexSelectorHoraProps`): `etiqueta`, `valor`, `alCambiar`, `textoAyuda`, `error`, `anchoCompleto`, `deshabilitado`, `lecturaSola`, `minHora`, `maxHora`, `deshabilitarPasado`, `deshabilitarFuturo`, `formato`, `marcador` y alias en inglés. Predeterminados del proyecto: `anchoCompleto: true`, tamaño pequeño y `minHeight` de 48 px. Estados: igual que `SelectorFecha`.

## 4. Diseño visual

Alto exterior 48 px (medido; ancho 123 px en el formulario de eventos), texto 16 px, radio 12 px.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › controles.selector_hora`. Sin overrides locales.

## 6. Dependencias y procedencia de iconos

El icono lo aporta la librería; no se determinó su nombre (no aparece `AccessTime` en el paquete). No se usa `Icono`.

## 7. Historial de modificaciones

- 2026-10-16: `minHeight` de 48 px. Sin modificación de la librería (paquete idéntico al publicado).
- Impacto: 1 archivo.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
