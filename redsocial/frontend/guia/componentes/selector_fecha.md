# Selector de fecha (`SelectorFecha`)

## 1. Identificación

- **Componente:** `SelectorFecha`.
- **Propósito:** campo con calendario desplegable para elegir una fecha.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/selector_fecha.tsx`.
- **Estado:** existente, adaptado (alto de 40 a 48 px el 2026-10-16).
- **Consumidores:** 6 usos JSX en 4 archivos: filtros de vigencia de Colaboradores, historial y filtros avanzados de Empresas, y formulario de eventos.

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexSelectorFecha` de `@codeplex-sac/selectores-fecha` 0.0.24, que usa `@mui/x-date-pickers` 8.29.3 y `dayjs` 1.11.23.
- **Implementación:** `selector_fecha.tsx`; aplica `controles.selector_fecha` y el tema del proyecto.
- **Exportación:** barrel `componentes/compartido/index.ts`. Necesita `CodeplexProveedorFechas` (de `@codeplex-sac/selectores-fecha`) por encima; los consumidores lo declaran en `panel_filtros_avanzados` (Colaboradores), `filtros_historial_empresa` y `panel_filtros_avanzados_empresas` (Empresas), `editar_evento` y `modal_crear_evento` (Eventos).
- **Elemento HTML nativo:** `<input>` de MUI X.

## 3. Contrato y características

Props de la librería (`CodeplexSelectorFechaProps`): `etiqueta`, `valor` (`Dayjs | null`), `alCambiar`, `textoAyuda`, `error`, `anchoCompleto`, `deshabilitado`, `lecturaSola`, `minFecha`, `maxFecha`, `deshabilitarPasado`, `deshabilitarFuturo`, `vistas`, `formato`, `marcador` y los alias en inglés. Predeterminado del proyecto: `anchoCompleto: true`, `slotProps.textField.size: small` y `minHeight: var(--height-control)` en `.MuiPickersInputBase-root`. Estados: normal, foco, error, `disabled`, calendario abierto. No verificado: teclado del calendario.

## 4. Diseño visual

Alto exterior 48 px (medido en «Crear evento», escritorio y móvil; la librería sin envoltorio mide 56 px). Texto 16 px, radio 12 px (tema `MuiPickersOutlinedInput` con `radio_campos`). Calendario desplegable con el tema MUI X.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › controles.selector_fecha` y el tema en `proveedor_tema_graficos.tsx` (`MuiPickersOutlinedInput`). Sin overrides locales de dimensiones.

## 6. Dependencias y procedencia de iconos

El icono del campo lo aporta la librería (`@codeplex-sac/selectores-fecha` contiene el icono `DateRange`); no se usa `Icono`.

## 7. Historial de modificaciones

- 2026-10-16: `minHeight` de 48 px.
- No se modificó la librería: `@codeplex-sac/selectores-fecha@0.0.24` coincide byte a byte con el paquete publicado (2026-10-17).
- Impacto: 4 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
