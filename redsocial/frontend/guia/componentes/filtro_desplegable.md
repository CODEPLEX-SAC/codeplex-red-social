# FiltroDesplegable y MarcoPanelFiltro

- **Propósito:** disparador + estado abierto/cerrado + panel flotante comunes de los filtros con panel propio (Fecha, Categoría, Ubicación y Estado de Eventos).
- **Origen:** propio (Fase 5, hallazgo INC-05). Sin librería. **Estado:** nuevo.
- **Archivos:** `componentes/compartido/interfaz/filtro_desplegable.tsx`, `tipos/compartido/contrato_filtro_desplegable.ts`, configuración `compartido.json › filtro_desplegable`.

## Contrato
`FiltroDesplegable`: `id` (id del panel), `abierto`, `alCambiarAbierto(abierto)`, `icono`, `etiqueta`, `activo?` (por defecto, abierto), `quitar?` (`{ etiqueta, alQuitar }`) y `children` (el panel, que solo se monta si está abierto).
`MarcoPanelFiltro`: `id?`, `className?`, `children`. Es la raíz de cada panel: posición absoluta bajo el disparador, `rounded-xl`, borde, sombra `shadow-t13` y hoja inferior por debajo de 600 px.

## Responsabilidades
- Disparador: `Boton variant="filtro" size="filtro"` (32 px) con icono de 14 px y chevron según el estado. `aria-expanded` refleja el estado real y `aria-controls` apunta al panel solo mientras está abierto.
- Cierre: `FondoPanelFlotante` (clic fuera, Escape y devolución del foco al disparador).
- Quitar filtro: `BotonIcono` hermano del disparador (no anidado dentro del `<button>`); el disparador reserva `pr-9`.
- Ajuste al viewport: `MarcoPanelFiltro` desplaza horizontalmente el panel (variable CSS `--desplazamiento-panel`) cuando su borde derecho superaría el viewport menos 16 px; en hoja inferior (≤600 px) no se desplaza.
- No gestiona: el contenido de cada panel, la lógica de selección ni el calendario propio de Fecha.

## Consumidores
`BloqueCategoria` (Fecha, Categoría), `BloqueEventosParaTi1` (Ubicación) y `SeccionEventosOrganizas` (Estado, Fecha). Anchos de panel por consumidor (medidos en la Fase 4 y la Fase 5; no se volvieron a medir el 2026-10-19): Categoría 290 px (`w-72.5`), Estado 260 px (`w-65`), Fecha 502 px (altura máxima 540 px, `max-h-135`), Ubicación 730 px (apilado a 440 px por debajo de 900 px, `max-900:w-110`).

## Notas
- La selección de Categoría vive en `usarFiltrosEventos` (`categoriasSeleccionadas`), se muestra en el disparador («Categoría: n») y filtra los eventos que declaran categoría (`filtrarEventosPorCategoria`, que compara las etiquetas con `normalizarTexto`: sin distinguir tildes ni mayúsculas).
- No se sustituyó el calendario propio por `CodeplexSelectorRangoFecha` (MUI X Pro, licencia comercial).
- Verificado: 1280, 900, 820, 601, 400 y 320 px sin desborde del panel de Ubicación; Enter abre, Escape cierra y devuelve el foco; foco por Tab visible (2 px #5a43f4).

## Categoría y «Para ti» (Fase 6)
Categoría también filtra los eventos destacados de «Para ti» (todos declaran `categoriaEtiqueta`): con varias categorías el carrusel recorre solo las coincidentes; sin coincidencias en destacados ni en próximos se muestra `mensajes.sin_eventos`. Verificado en navegador: Música → destacado «Concierto Codeplex Live 2026»; Salud → estado vacío. Recorrido de 49 rutas: 0 controles interactivos anidados.

## Reutilización
- Para un filtro nuevo con panel propio, usar `FiltroDesplegable` como disparador y `MarcoPanelFiltro` como raíz del panel; no reescribir el estado abierto/cerrado, el fondo ni el marco.
- Para elegir una opción de una lista corta (ordenar o filtrar por una sola variable), usar `Selector variant="mini"` (ver [selector.md](selector.md)); este componente es para paneles con contenido propio.
- Excepción: el botón «quitar filtro» es un `BotonIcono` hermano; no anidar controles dentro del `<button>` del disparador (hallazgo ACC-01).

## Verificación
- **Verificado:** pruebas `filtro_desplegable` y `filtros_eventos`; navegador a 1280, 900, 820, 601, 400 y 320 px sin desborde del panel de Ubicación; Enter abre, Escape cierra y devuelve el foco; recorrido de 49 rutas sin controles interactivos anidados (2026-10-17).
- **No verificado:** estados de error y búsqueda sin resultados dentro de los paneles; estados tras clic a 820 y 320 px más allá de la medida del panel de Ubicación.
- Código contrastado el 2026-10-19 (`filtro_desplegable.tsx`, `compartido.json › filtro_desplegable`).
