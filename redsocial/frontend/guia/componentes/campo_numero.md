# Campo numérico (`CampoNumero`)

## 1. Identificación

- **Componente:** `CampoNumero`.
- **Propósito:** campo de entrada numérica con mínimo, máximo y paso.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/campo_numero.tsx`.
- **Estado:** existente.
- **Consumidores:** 1 uso JSX, en `formularios/eventos`.

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexCampoNumero` de `@codeplex-sac/formularios` 0.1.10 (MUI `TextField`).
- **Implementación:** `campo_numero.tsx` (aplica `controles.campo_numero` y el tema del proyecto).
- **Exportación:** barrel `componentes/compartido/index.ts`; props `CodeplexCampoNumeroProps`.
- **Elemento HTML nativo:** `<input>` de MUI.

## 3. Contrato y características

Props de la librería: `etiqueta`, `textoAyuda`, `minimo`, `maximo`, `paso`, `valor`, `valorPorDefecto`, `alineacion` (`izquierda`, `centro`, `derecha`), `mostrarControles`, `error`, `mensajeError`, `deshabilitado`, `soloLectura`, `anchoCompleto`, `alCambiar(number | null)`, `alDesenfocar` y `TextFieldProps`.

Predeterminados del proyecto: `anchoCompleto: true`, `minHeight: var(--height-control)`, relleno vertical 8,5 px y marcador en `--color-texto-suave`. Estados: normal, foco, error, `disabled`, `soloLectura`. Accesibilidad: igual que `CampoTexto`.

## 4. Diseño visual

Alto exterior 48 px (medido el 2026-10-16/17, escritorio y móvil), texto 16 px / 500, radio 12 px. Mismos tokens que `CampoTexto`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › controles.campo_numero`. Cambiar el alto en el token `--control-height` actualiza también este campo. Sin overrides locales.

## 6. Dependencias y procedencia de iconos

Sin iconos propios.

## 7. Historial de modificaciones

- 2026-10-16: alto a 48 px junto con el resto de campos.
- Sin modificaciones a la librería. Impacto: 1 consumidor.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Foco verificado (Fase 6)
Con el interruptor «Establecer límite de personas» activo, el `CampoNumero` habilitado muestra al enfocarlo borde de 2 px `rgb(90,67,244)` y halo `rgba(90,67,244,0.1) 0 0 0 4px`, igual que `CampoTexto`. (La medición anterior de la Fase 4 correspondía a un campo deshabilitado.)
