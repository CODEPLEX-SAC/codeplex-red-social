# Casilla (`Casilla`)

## 1. Identificación

- **Componente:** `Casilla`.
- **Propósito:** casilla de verificación.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/casilla.tsx`.
- **Estado:** existente.
- **Consumidores:** 18 usos JSX en 14 archivos (tablas de Colaboradores y Empresas, filtros, Avisos, Eventos, Marketplace).

## 2. Origen e implementación

- **Origen:** envoltorio de `CodeplexCasilla` de `@codeplex-sac/formularios` 0.1.10 (MUI `Checkbox`).
- **Implementación:** `casilla.tsx`; fija `tamano` desde `controles.casilla_tamano` (`pequeno`) y aplica el tema del proyecto.
- **Exportación:** barrel `componentes/compartido/index.ts`.
- **Elemento HTML nativo:** `<input type="checkbox">` generado por MUI.

## 3. Contrato y características

Props de la librería (`CodeplexCasillaProps`): `etiqueta`, `posicionEtiqueta`, `seleccionado`, `indeterminado`, `deshabilitado`, `soloLectura`, `requerido`, `error`, `tamano` (`pequeno`, `mediano`, `grande`), `color`, `variante` (`estandar`, `suave`, `borde`), `alCambiar(evento, seleccionado)` y `CheckboxProps`. Predeterminado del proyecto: `tamano="pequeno"`. Estados: marcada, sin marcar, indeterminada, `disabled`, error, foco con anillo global. Accesibilidad: el consumidor pasa nombre accesible por `inputProps`.

## 4. Diseño visual

Caja medida de 32 × 32 px (área del control MUI, no solo el cuadro visible). Color sin marcar `--color-texto-suave`. Sin cambios por ancho.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › controles.casilla_tamano` y el tema MUI. Sin overrides locales de dimensiones.

## 6. Dependencias y procedencia de iconos

Los iconos de marcado los dibuja la librería (MUI); no se usa `Icono`. No se comprobó su nombre exacto.

## 7. Historial de modificaciones

- Sin cambios propios documentados salvo el tamaño predeterminado y el tema. No se modificó la librería: el contenido de `@codeplex-sac/formularios@0.1.10` coincide byte a byte con el paquete publicado y con la integridad del `package-lock.json` (comprobado el 2026-10-17).
- Impacto: 14 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
