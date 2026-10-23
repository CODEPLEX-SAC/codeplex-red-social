# Eventos: calendario, formulario de creación/edición, mapa y filtros

## 1. Identificación y uso actual

Módulo: **Eventos** (9 páginas en `redsocial/frontend/paginas/eventos/`: calendario, invitaciones y sus variantes, mis eventos, para ti, populares, próximos). Componentes en `redsocial/frontend/componentes/eventos/` (52 archivos `.tsx` en `bloques/`), formulario en `redsocial/frontend/formularios/eventos/` (9 archivos), tabla del mini calendario en `redsocial/frontend/tablas/eventos/tabla_calendario_mini.tsx`, datos en `servicios/eventos/` y textos/clases en `catalogos/capacidades/redsocial/eventos.json`.

| Parte | Componentes principales | Categoría |
|---|---|---|
| Calendario (vistas Mes/Semana/Día) | `SeccionEventosDeHoy` (`seccion_eventos_de_hoy.tsx`, `seccion_eventos_de_hoy2.tsx`), `BloqueCalendario`, `BloqueHoy`, `BloqueEventosCalendario1`, `BloqueTodoElDia`, `BloqueTodoElDia2`, `PestanasEventos`; página `pagina_eventos_calendario.tsx` | **C** (propio; **no existe un calendario en las librerías** `@codeplex-sac/*`) |
| Mini calendario lateral | `SeccionCalendario` (`seccion_calendario.tsx` y variantes `3`, `11`, `13`), `PanelCalendarioMini`, `TablaCalendarioMini` (`<table>` propio: encabezados con `text-encabezado-tabla uppercase`, celdas `h-6 w-6 rounded-full`, punto de evento) | **C** |
| Formulario de crear/editar | `ModalCrearEvento` (`bloques/modal_crear_evento.tsx`), `EditarEvento` (`editar_evento.tsx`), `CuerpoFormularioEvento` y secciones (`formularios/eventos/*`), `TarjetaFormularioEvento`, `CampoFechaHoraEvento`, `OpcionModalidadEvento`, `OpcionCostoEvento`, `FilaInterruptorEvento`, `AvisoFormularioEvento` (`formulario_evento.tsx`) | **C** que compone controles B |
| Controles del formulario | `CampoTexto`, `CampoNumero`, `Selector variant="colaboradores"`, `SelectorFecha`, `SelectorHora`, `Radio`, `Interruptor`, `Boton`, `BotonIcono`, `Modal` | **B** / **C** compartidos |
| Carga de imagen | `CodeplexCargadorArchivos` en `formularios/eventos/seccion_imagen_evento.tsx` | **A** (sin envoltorio) |
| Proveedor de fechas | `CodeplexProveedorFechas` en `modal_crear_evento.tsx` y `editar_evento.tsx` | **A** |
| Mapa | `CodeplexMapa` (`@codeplex-sac/mapas` 0.1.7) en `seccion_descripcion.tsx` y `seccion_titulo_buscar.tsx`; `leaflet` 1.9.4 importado directamente en `detalle_evento.tsx` (`L.divIcon`, CSS) y `panel_filtro_ubicacion.tsx` (CSS de Leaflet y tipo `CodeplexMapaMarcador`) | **A** (uso directo de la librería y de Leaflet) |
| Filtros | `PanelFiltroCategoria`, `PanelFiltroEstado`, `PanelFiltroFecha`, `PanelFiltroUbicacion` dentro de `MarcoPanelFiltro`, con el disparador `FiltroDesplegable` (compartidos desde la Fase 5; ver [filtro_desplegable.md](filtro_desplegable.md)) | **C** (contenido de cada panel) sobre componentes compartidos |

## 2. Procedencia

- Mapas: `@codeplex-sac/mapas` 0.1.7 (basada en Leaflet 1.9.4, ambos confirmados en `package.json` y el lock). El código de Eventos importa también Leaflet directamente para crear marcadores personalizados.
- Calendario: **propio**; los datos (`CELDAS`, `EVENTOS_POR_DIA`, `HORAS_SEMANA`, …) vienen de `servicios/eventos/calendario*.json` (datos de demostración estáticos), no de un cálculo con `dayjs`.
- Formularios: el rótulo superior de los campos usa el componente compartido `CampoEtiquetado` (antes un componente propio de Eventos, `CampoFormularioEvento`, que ya no existe); ver [campo_etiquetado.md](campo_etiquetado.md).

## 3. Diseño e implementación

- Tarjetas del formulario: `rounded-14 border border-borde-suave bg-white p-4` con icono de 36 px `bg-primario-suave`, título `text-nombre-entidad`.
- Rótulo: `text-etiqueta text-texto`, `mb-1.5`; asterisco `text-peligro-texto`.
- Distribución del modal de crear: `@container` con `grid-cols-1` y a partir de `@3xl` dos columnas (`minmax(0,1fr)_22rem`), `max-w-275`.
- Estilos del calendario: `estilos_calendario.json`, `estilos_mis_eventos.json`, tokens de color de categoría.
- El diseño responsive del calendario tiene una prueba específica (`calendario_cuadricula.test.tsx`): las cuadrículas no imponen anchos mínimos que superen al contenedor (causa de un recorte a 1280 px ya corregido).

## 4. Modificaciones

Sin modificación de librerías **[CONFIRMADO]**. Personalizaciones: el calendario completo, el formulario (rótulos, tarjetas), el uso de `Leaflet` para marcadores. El modal de crear evento ya usa el `Modal` compartido (en documentos anteriores figuraba como modal propio).

## 5. Posible incorporación a la librería compartida

- **Calendario (mes/semana/día) y mini calendario:** **investigar más**. Es genérico en su presentación, pero hoy se alimenta de datos estáticos y de tipos de Eventos. Candidato a extraer como `CodeplexCalendario` si el equipo de la librería lo necesita; antes habría que separar datos, estilos y reglas.
- **Formulario de evento:** **mantener en CodePlex** (campos y reglas del producto); sus piezas genéricas (`TarjetaFormularioEvento`) podrían unificarse; el rótulo ya usa `CampoEtiquetado`.
- **Mapa:** **utilizar directamente** la librería; evaluar si el uso de `L.divIcon` puede moverse a una prop de `CodeplexMapa`.
- **`TablaCalendarioMini`:** **mantener** (es la única tabla que no usa `CLASES_TABLA`; ver [tabla_compartida.md](tabla_compartida.md)).

## 6. Verificación

Pruebas existentes: `pruebas/eventos/` (13 archivos el 2026-10-19: `calendario_cuadricula`, `modal_crear_evento`, `navegacion_eventos`, `pagina_eventos_*`). Última ejecución del módulo: `npm run calidad` del 2026-10-16 (código de salida 0). **[PENDIENTE]** Revisión visual actual del calendario y del mapa (no se realizó en esta investigación).

## Filtros de Eventos (Fase 5 y 6)
Fecha, Categoría, Ubicación y Estado usan `FiltroDesplegable` y `MarcoPanelFiltro` (ver `filtro_desplegable.md`). El calendario propio, los atajos y rangos de Fecha, la selección múltiple de Categoría y el mapa de Ubicación no cambian. Categoría devuelve su selección al estado compartido (`usarFiltrosEventos`), muestra «Categoría: n» y filtra las listas cuyos eventos declaran categoría (Próximos, Populares y el carrusel de Para ti). Ubicación a ≤899 px apila lista y mapa (440 px) y el marco se desplaza para no superar el viewport. El control para quitar la ubicación seleccionada es ahora un `BotonIcono` hermano del disparador (antes un `span role="button"` dentro del botón).
