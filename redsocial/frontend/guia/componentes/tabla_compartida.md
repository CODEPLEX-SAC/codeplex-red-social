# Tablas compartidas (`CLASES_TABLA`, `TablaColaboradores` y tablas de Empresas)

## 1. Identificación

- **Componente:** conjunto de clases `CLASES_TABLA` y `claseEncabezadoTabla`, y las tablas que las usan.
- **Propósito:** presentación común de las tablas de datos de Colaboradores y Empresas.
- **Ubicación:** `redsocial/frontend/componentes/compartido/clases_tabla.ts`; consumidores en `componentes/colaboradores/bloques/` (`tabla_colaboradores.tsx`, `bloque_reenviar.tsx`) y `componentes/empresas/bloques/` (`tabla_empresas.tsx`, `tabla_historial_empresa.tsx`, `tabla_usuarios_empresa.tsx`, `fila_usuario_empresa.tsx`, `logica_listado_empresas.ts`).
- **Estado:** existente; `tabla_colaboradores.tsx` es **nuevo**.
- **Consumidores:** 7 archivos.

## 2. Origen e implementación

- **Origen:** propio de CodePlex. Las tablas son `<table>` HTML con las clases del catálogo; no se usa un componente de tabla de librería.
- **Estado de tabla:** Colaboradores usa `@tanstack/react-table` 9.2.4 (API `legacy`: `useLegacyTable`) con `@tanstack/table-core` 9.2.4 (`usar_tabla_colaboradores.ts`, `colaboradores_tabla_config.ts`); las tablas de Empresas no usan TanStack (comprobado por búsqueda de importaciones).
- **Exportación:** `CLASES_TABLA` y `claseEncabezadoTabla` desde `clases_tabla.ts` (importación directa).

## 3. Contrato y características

`CLASES_TABLA`: `contenedor`, `tabla`, `fila`, `mensajeVacio`; `claseEncabezadoTabla(relleno)` añade el relleno propio de cada módulo (`p-3.5 uppercase` en Colaboradores). Estados: fila con `hover` (`--color-fondo`), mensaje vacío, selección con `Casilla` y orden y filtro (TanStack) en Colaboradores. Accesibilidad: `<th>`, casillas con `aria-label`; no verificada la navegación de teclado de las filas.

## 4. Diseño visual

Contenedor con `overflow-x-auto`, `rounded-xl` y borde `--color-gris-borde`; encabezado `text-encabezado-tabla` en `--color-texto-suave` con borde inferior; filas con borde `--color-borde-suave` y `hover` suave; mensaje vacío con relleno de 24 px y `text-subtitulo`; texto de celda `text-cuerpo`.

## 5. Integración con el sistema compartido

Fuente de verdad: `compartido.json › tabla_datos`. Un cambio ahí afecta a las tablas de ambos módulos. Cada módulo conserva su relleno de encabezado (`colaboradores.json › clases_tabla.relleno_encabezado`).

## 6. Dependencias y procedencia de iconos

Iconos de acciones por fila con `BotonIcono` (`Icono`): ver, editar, menú de acciones; `Casilla` para la selección.

## 7. Historial de modificaciones

- 2026-10-16: `tabla_colaboradores.tsx` y sus utilidades de filtros, estado, exportación y reglas (`logica_colaboradores.ts`, `reglas_*.ts`, `usar_gestion_colaboradores.ts`) creados con el trabajo de Colaboradores.
- Sin librería modificada. Impacto: 7 archivos.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.

## Tabla de Planes asignados (2026-10-20)

`TablaPlanesAsignados` reutiliza `CLASES_TABLA` y `claseEncabezadoTabla` igual que el historial de empresa; solo añade `tabla_envoltorio` y `tabla` (ancho mínimo) desde `empresas.json › planes_asignados.edicion.clases`. Cuatro columnas: Aplicativo, Capacidad y uso, Asignación, Acciones (sin «Plan vigente»).

## Variante compacta y tablas con implementación propia (2026-10-28)

`compartido.json › tabla_datos.compacta` (`CLASES_TABLA.compacta`: `tabla`, `encabezado`, `celda`, `celda_nombre`) es la variante de lista dentro de una tarjeta (encabezado 12/600 en mayúsculas, filas con borde `borde-suave`, sin contenedor propio). La usan 7 tablas: las 3 de «Todos los módulos» de Estadísticas, las 3 de Indicadores Clave y «Ratios financieros» del Dashboard. Las clases de las 6 primeras no cambiaron (eran las mismas cadenas duplicadas en `estilos_todos_modulos.json` y `estilos_indicadores_clave.json`); el Dashboard pasó de encabezado sin mayúsculas ni bordes de fila a la variante compacta, igual que su equivalente de Estadísticas (cambio intencional; la tabla crece 7 px a 1280 px).

Implementaciones propias que se conservan, por su función:
- `tabla_calendario_mini.tsx` (Eventos): rejilla de fechas, no tabla de registros; celdas circulares y marcadores.
- `paso_resumen_mejora.tsx` (Empresas): comparación concepto / actual / nuevo con `th scope="row"` dentro de un modal; no es una lista de registros.
- `bloque_columna_permiso.tsx` (Colaboradores): matriz de permisos con iconos centrados en el encabezado.

Divergencias sin decidir (misma semántica, distinta apariencia): «Reportes recientes» (relleno de 10 px frente a 6/7 px) y el «Detalle» de `/estadisticas/{ventas,contabilidad,planillas}` (relleno `px-3.5 py-3`, mayúsculas con interletraje, dentro de un contenedor con scroll).

## Reglas globales y variantes (2026-10-28)

**Globales** (fuente `compartido.json › tabla_datos`, `CLASES_TABLA`): encabezado 12/600 `text-encabezado-tabla` en `texto-suave`, `whitespace-nowrap`, alineado a la izquierda; celdas de 16 px (14 px en móvil) en `texto`; relleno de encabezado `14 14 14 20` y de celda `12 14 12 20` (`first:pl-5 last:pr-5`); columna de acciones fija a la derecha (`celdaFija`); mensaje vacío; contenedor con `overflow-x-auto`, radio 12 px y borde `gris-borde`. Medido a 1280 y 390 px, **Colaboradores, Empresas y el Historial del detalle de empresa (dentro del modal) producen exactamente las mismas medidas** (encabezado 12/600 con 14 px de relleno, celdas 16/400 con 12 px; a 390 px 11 y 14 px) y las tres hacen scroll horizontal propio (975/975, 1358/975 y 835/837 px a 1280 px; 846/364, 1341/364 y 736/356 px a 390 px), con «Acciones» fija en Empresas.

**Variante `compacta`** (listas de cifras dentro de una tarjeta; 7 tablas de Dashboard, Estadísticas e Indicadores): encabezado en mayúsculas, bordes de fila `borde-suave`, relleno `6/7 px` sin margen lateral, sin contenedor propio.

**Diferencias justificadas por función**: la compacta solo existe dentro de tarjetas con título; la tabla de datos completa tiene su propio contenedor y barra de acciones.

**Evaluadas y sin cambio** (no consumen el contrato porque su presentación es distinta, no por descuido):
| Tabla | Medido | Por qué no consume `tabla_datos` |
|---|---|---|
| «Reportes recientes» (`/reportes`) | encabezado en mayúsculas, relleno `10 10 10 0`, borde `borde-suave`, sin contenedor | cuerpo con avatares e iconos de acción en una tarjeta con `p-5`; el contrato sumaría un segundo borde y un relleno lateral de 20 px |
| «Detalle» (`/estadisticas/{ventas,contabilidad,planillas}`) | encabezado con fondo `bg-fondo`, mayúsculas con interletraje 0,48 px, relleno `12 14`, borde `borde-suave` | encabezado con relleno de color y superficie propia; el contrato no tiene encabezado con fondo |
Ambas podrían unificarse con una variante «en tarjeta», pero no hay dos usos con la misma medida que justifiquen definirla.

**Excepciones que no son tablas de datos**: `tabla_calendario_mini`, `paso_resumen_mejora`, `bloque_columna_permiso`.

Diferencia global pendiente: el contenedor y el encabezado de `tabla_datos` usan el borde `gris-borde` (`#e5e7eb`), las tarjetas usan `borde` (`#e9e7f1`).

## Decisión sobre las tablas en tarjeta (2026-10-29)
«Reportes recientes» y el «Detalle» de Estadísticas mantienen sus implementaciones actuales: no hay evidencia de que compartan un contrato reutilizable (relleno de 10 px sin contenedor frente a encabezado con fondo y relleno de 12/14 px), así que no se crea ninguna variante de `tabla_datos`. Se conservan también la variante `compacta` y las excepciones del calendario mini, el resumen de pasos y la matriz de permisos; las tablas de Empresas, Colaboradores e Historial no cambian. El borde `gris-borde` del contenedor es regla de la tabla de datos (ver `tokens_y_diseno_global.md`).

