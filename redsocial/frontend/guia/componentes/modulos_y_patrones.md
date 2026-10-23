# Módulos del proyecto y patrones susceptibles de compartirse

Inventario por módulo (`redsocial/frontend/componentes/<modulo>/`, `paginas/<modulo>/`, `pruebas/<modulo>/`) y patrones repetidos. Los números son una guía de uso, no una auditoría de calidad. Detalle por componente en los demás archivos de esta carpeta y por módulo en [modulos_detalle.md](modulos_detalle.md).

## 1. Tabla de módulos

Recuento del 2026-10-19 (etiquetas JSX `<Nombre` en `componentes/<módulo>/`, `paginas/<módulo>/` y `formularios/eventos/`, sin pruebas). La columna «Componentes compartidos más usados» indica el número de usos JSX. El detalle por ruta, pestaña y cambios de cada módulo está en [modulos_detalle.md](modulos_detalle.md).

| Módulo | Archivos en `bloques/` | Páginas | Archivos de prueba | Componentes compartidos más usados | Librería usada directamente (A) |
|---|---|---|---|---|---|
| Acceso (inicio de sesión, crear cuenta) | 13 | 1 | 3 | `Boton` 5, `CampoTexto` 4, `CampoEtiquetado` 4 | — |
| Inicio | 22 | 1 | 4 | `Boton` 14, `BotonIcono` 6, `Modal` 3 | — |
| Actividad | 3 | 7 | 8 | `Boton` 4, `BotonPieLista` 4, `Selector` 2, `Pestanas` | — |
| Notificaciones (carpeta `avisos`) | 9 | 6 | 6 | `Boton` 16, `BotonIcono` 14, `BannerInformativo` 3, `Menu` 3 | — |
| Mensajes (carpeta `mensajeria`) | 15 | 6 | 8 | `BotonIcono` 22, `Boton` 13, `CampoBusqueda` 4, 9 `<button>` nativos | — |
| Amigos | 6 | 4 | 4 | `Boton` 11, `BotonIcono` 6, `BotonPieLista` 4 | — |
| Grupos | 9 | 3 | 3 | `Boton` 9, `BotonIcono` 7, `BannerInformativo` 2 | — |
| Guardados | 3 | 1 | 1 | `BotonIcono` 8, `Selector` 1 | — |
| Marketplace | 49 | 2 | 6 | `Boton` 32, `BotonIcono` 14, `Insignia` 12, `CampoEtiquetado` 11 | — (acordeón por el envoltorio `Acordeon`) |
| Eventos | 52 | 9 | 13 | `Boton` 53, `BotonIcono` 22, `FiltroDesplegable` 5, 13 `<button>` nativos | `CodeplexProveedorFechas`, `CodeplexMapa`, `CodeplexCargadorArchivos` |
| Colaboradores | 63 | 2 | 16 | `CampoEtiquetado` 24, `Boton` 22, `CampoTexto` 17, `Selector` 17 | `CodeplexProveedorFechas`, `CodeplexPasos` |
| Empresas | 57 | 1 | 3 | `CampoEtiquetado` 28, `CampoTexto` 22, `Selector` 21, `Modal` 4 | `CodeplexMigasPan`, `CodeplexProveedorFechas` |
| Dashboard | 4 | 1 | 1 | `Selector` 2 | `CodeplexGraficoLineas`, `CodeplexGraficoBarras` |
| Estadísticas | 6 | 2 | 2 | `Boton` 4, `Selector` 4 | `CodeplexGraficoLineas`, `CodeplexGraficoBarras` |
| Indicadores | 5 | 1 | 1 | `Boton` 2, `Selector` 2 | `CodeplexGraficoLineas`, `CodeplexGraficoBarraLinea`, `CodeplexCaja` |
| Reportes | 2 | 1 | 1 | `BotonIcono` 6, `Boton` 2, `Selector` 2 | — (usa `DonaProgreso` y `Sparkline` propios) |

(«Archivos en `bloques/`» cuenta `.tsx` y `.ts`. La columna de librería directa procede del inventario del 2026-10-16 y no se revisó el 2026-10-19.)

## 2. Patrones repetidos entre módulos (candidatos a unificar)

| Patrón | Dónde aparece | Estado |
|---|---|---|
| Listado con tabla, filtros avanzados, paginación y selección | Colaboradores (`tabla_colaboradores.tsx`), Empresas (`tabla_empresas.tsx`) | Comparten `CLASES_TABLA` ([tabla_compartida.md](tabla_compartida.md)); relleno y celdas distintos |
| Panel de filtros avanzados flotante | Colaboradores (`panel_filtros_avanzados.tsx`), Empresas (`panel_filtros_avanzados_empresas.tsx`) | Cada uno con `FondoPanelFlotante`; estructura similar, sin componente común. Los paneles de filtro de Eventos ya usan `FiltroDesplegable` y `MarcoPanelFiltro` ([filtro_desplegable.md](filtro_desplegable.md)) |
| Modal con formulario de edición | Colaboradores (`modal_invitar_colaborador.tsx`), Empresas (`modal_empresa.tsx`, `modal_editar_empresa.tsx`), Eventos (`modal_crear_evento.tsx`), Inicio (`modal_crear_publicacion.tsx`) | Usan `Modal` ([modal.md](modal.md)); rótulos superiores con 4 variantes ([campo_etiquetado.md](campo_etiquetado.md)) |
| Tarjetas con opción tipo radio (`role="radio"`) | Eventos (`OpcionModalidadEvento`, `OpcionCostoEvento`), Marketplace (`OpcionMetodoPago`) | Dos implementaciones del mismo patrón |
| Carrusel horizontal con arrastre | Marketplace (`FilaDestacados`, `FilaPlanes`) | Hook compartido `usarCarrusel` |
| Estructura de página de tres columnas | Páginas de Actividad, Amigos, Avisos, Colaboradores, Estadísticas, Eventos, Grupos, Guardados, Inicio, Marketplace y Mensajería | Compartida (`compartido/estructura/estructura_tres_columnas.tsx`) |
| Pestañas con insignia | Notificaciones, Eventos, Marketplace, Mensajes, Colaboradores… | `Pestanas` compartido |
| Estados vacíos | Amigos, Grupos, Mensajería, Marketplace… | `MensajeVacio` compartido |

## 3. Elementos que esquivan los componentes compartidos

Hay 37 `<button>` nativos (conteo del 2026-10-19: Eventos 13, Compartido 9, Mensajería 9, Acceso 2, Marketplace 2, Inicio 1, Amigos 1), todos registrados en `pruebas/compartido/registro_componentes_permitidos.ts` con clasificación y motivo; y `<img>` nativos en algunos módulos (ver `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md` §6.3). Son candidatos a revisar al llevar `Boton`/`AvatarImagen` a la librería.

## 4. Decisiones y patrones de las Fases 5 y 6 (resumen)

El detalle está en [modulos_detalle.md](modulos_detalle.md) y [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md). Resumen de lo que sustituye a lo que decía este documento antes:

- **Notificaciones > Sistema:** tiene página (`PaginaAvisosSistema`) en `/notificaciones/sistema` con estado vacío; el contenido real queda fuera del alcance técnico (limitación funcional).
- **Selectores de cabecera:** los antiguos «desplegables» hechos con `Boton` + chevron son `Selector variant="mini"` con filtrado u orden real.
- **Píldoras de Inicio:** **resuelto en la Fase 6** con `Boton size="pildora"` (30 px, radio completo). La nota anterior «decisión pendiente: variante compartida» queda sustituida.
- **Patrones especiales conservados y registrados** (`registro_componentes_permitidos.ts`): controles de videollamada (clase G), tarjeta punteada de alta de lista (F), filas de opción (C), control segmentado Mes/Semana/Día de Eventos (C), tarjetas con `role="radio"` (B), disparador con forma de campo de la publicación (C) e indicadores de carrusel (C).
- **Barra superior:** 64 px; campana (36 px) y usuario (40 px) son excepciones nativas registradas.
- **Cabeceras de Actividad:** resueltas por jerarquía (cabecera 40 px, fila 30 px; INC-13).
- **Patrón nuevo compartido:** `FiltroDesplegable`/`MarcoPanelFiltro` (Eventos), `BannerInformativo`, `BotonPieLista` en Amigos y Grupos.

## 5. Verificación

Datos obtenidos recorriendo los archivos del repositorio el 2026-10-19 (tabla y patrones). No sustituyen la auditoría visual por módulo de `AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md` ni el inventario de iconos. `npm run calidad` del 2026-10-19: todas las comprobaciones en verde (Vitest 3 ejecuciones, 0 fallos).
