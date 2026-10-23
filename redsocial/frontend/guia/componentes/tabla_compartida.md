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
