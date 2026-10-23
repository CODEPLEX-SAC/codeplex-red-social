# Lista de opciones con búsqueda (`ListaOpcionesBuscables`)

## 1. Identificación

- **Componente:** `ListaOpcionesBuscables`.
- **Propósito:** lista de opciones del selector con búsqueda, con la opción activa marcada.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/lista_opciones_buscables.tsx`.
- **Estado:** **nuevo** (2026-10-15/16).
- **Consumidores:** `PanelSelectorBuscable`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex.
- **Elemento HTML nativo:** `<ul>` con `<li>` y `<button type="button">` por opción.
- **Exportación:** ruta directa (no está en el barrel).

## 3. Contrato y características

Props: `opciones`, `seleccionadaId`, `etiqueta` (nombre accesible de la lista), `alElegir(id)`. La opción activa lleva `aria-current` y un icono `verificado`. Cada opción muestra título (`strong`) y subtítulo.

## 4. Diseño visual

Opción con relleno 10 × 8 px, `hover` `--color-fondo`, activa con fondo `--color-primario-suave`; caja de icono de 28 × 28 px; lista con relleno de 6 px y scroll hasta 320 px.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › selector_buscable` (`opcion`, `opcion_seleccionada`, `titulo`, `subtitulo`, `icono_caja`, `lista`).

## 6. Dependencias y procedencia de iconos

Iconos `empresa` (caja de la opción) y `verificado` (opción activa) con `Icono`; el icono `empresa` está fijo en el componente (limita su reutilización a empresas).

## 7. Historial de modificaciones

- 2026-10-15/16: creado. Sin librería afectada. Impacto: 1 consumidor.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
