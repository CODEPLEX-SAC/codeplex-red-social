# Contexto técnico para la tabla compartida de la librería oficial

Documento de contexto para quien diseñe e implemente el componente de tabla de la librería oficial (`@codeplex-sac`). Reúne evidencia verificada sobre las tablas de Red Social y propone, **como propuesta pendiente de aprobación**, un contrato de uso. **No existe todavía ningún componente de tabla compartido**, ni en la librería ni en Red Social.

- Última auditoría: 15/10/2026.
- Primera adopción prevista: **Colaboradores y Empresas**. Las otras siete tablas del proyecto (sección 1.5) no se deben migrar sin estudiarlas antes.
- Rutas relativas a `redsocial/frontend/`, salvo `package.json`, `package-lock.json`, `node_modules/`, `scripts/` y `montaje_local/`, que están en la raíz del repositorio.

> **Nota 2026-10-22.** Este documento es el contexto de la propuesta para la librería oficial y refleja el estado del 15/10/2026. La base compartida vigente (clases en `compartido.json › tabla_datos`, sin encabezado `uppercase` en Colaboradores y sin casillas de selección) está descrita en `AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md`, sección «Tabla compartida».

## 0. Cómo leer este documento

| Marca | Significado |
|---|---|
| **[H]** | Hecho verificado leyendo el código o los manifiestos |
| **[P]** | Comportamiento comprobado con pruebas automáticas |
| **[N]** | Comprobado manualmente en navegador real (en sesiones anteriores; no repetido en la última auditoría) |
| **[PROPUESTA]** | Diseño sugerido, pendiente de aprobación e implementación; no existe |
| **[PENDIENTE]** | Decisión o trabajo sin resolver |
| **[ND]** | No determinado: no se pudo comprobar |

## 1. Estado actual

### 1.1 La librería oficial no tiene tabla

**[H]** Los siete paquetes `@codeplex-sac/*` instalados no exportan ningún componente de tabla. Solo hay tres iconos con «tabla» en el nombre (`CodeplexIconoTabla`, `CodeplexIconoTablaDinamica`, `CodeplexIconoTablaEditar`). Lo que sí ofrece y las tablas actuales usan: casilla, selector, campo de texto, paginación, menú, pestañas e iconos. Toda la funcionalidad de tabla (cabeceras, filas, selección, estado vacío, acciones) la ha construido Red Social.

### 1.2 Qué se comparte realmente entre Colaboradores y Empresas

**[H]** Ambas pantallas **no comparten ningún componente React de tabla**: no hay un `<Tabla>` común, ni fila, ni hook, ni columnas, ni tipos comunes. Cada una dibuja su propio `<table>`. Lo único común es:

| Qué | Dónde | Naturaleza |
|---|---|---|
| Clases CSS de contenedor, tabla, encabezado, fila y mensaje vacío | `componentes/compartido/clases_tabla.ts` → `catalogos/capacidades/redsocial/compartido.json › tabla_datos` | **Cadenas de clases** (no un componente). Las leen Colaboradores, Empresas y las subtablas de usuarios e historial de Empresas |
| Envoltorios de componentes de la librería | `componentes/compartido/interfaz/{casilla,paginacion,menu,selector,campo_busqueda}.tsx` | Componentes React compartidos, pero no son «la tabla» |
| Componentes propios de interfaz | `interfaz/{boton,boton_icono,insignia,avatar_imagen}.tsx` | HTML + clases del catálogo |
| Mecanismo de iconos | `componentes/compartido/icono.tsx` + `compartido.json` | Utilidad compartida |
| Tokens de diseño | `montaje_local/index.css` | CSS global |

Esta reutilización de clases **no equivale** a un componente compartido: el siguiente desarrollador debe tratar la tabla como un componente que **falta construir**.

Diferencia importante: el relleno (padding) de encabezados y celdas **no** es común (sección 5.3).

### 1.3 Arquitectura de cada pantalla

| | Colaboradores | Empresas |
|---|---|---|
| Ruta | `/colaboradores` | `/empresas` |
| Página | `paginas/colaboradores/pagina_colaboradores.tsx` | `paginas/empresas/pagina_empresas.tsx` |
| Sección | `componentes/colaboradores/bloques/seccion_listado.tsx` | `componentes/empresas/bloques/seccion_listado_empresas.tsx` |
| Tabla | `tabla_colaboradores.tsx` | `tabla_empresas.tsx` |
| Fila | `bloque_reenviar.tsx` (`BloqueReenviar`) | `fila_empresa.tsx` (`FilaEmpresa`) |
| Estado de la tabla | `usar_tabla_colaboradores.ts` con **TanStack Table** (`@tanstack/react-table/legacy`, modo sin interfaz) | `usar_listado_empresas.ts` con `useState`/`useMemo`, **sin biblioteca de tablas** |
| Estado de los datos | `usar_gestion_colaboradores.ts` (lista en memoria, avisos) | `usar_acciones_empresas.ts` (modales y ediciones en memoria) |
| Columnas | `colaboradores_tabla_config.ts` define solo `id` y `accessorFn`; **no controla lo que se dibuja** | Encabezados desde `empresas.json › tabla`; celdas escritas en la fila |
| Tamaño de página | 3, constante en código | 10 / 20 / 50, desde el catálogo |
| Orden | Selector «Ordenar por» (encabezados no pulsables) | No hay |
| Filtros | Búsqueda, rol, aplicación, estado (pestañas) y filtros avanzados (conectados) | Búsqueda, estado y filtros avanzados |
| Selección | Casilla por página, estado intermedio, sin acción asociada | Igual |
| Acciones de fila | Menú «Más opciones» o botón «Reenviar», según el estado | 3 botones de icono en escritorio; un menú con las mismas opciones a 600 px o menos |
| Exportación | Excel y PDF (sección 2.2) | No hay |
| Datos | `servicios/colaboradores/colaboradores.json` (6) | `servicios/empresas/empresas.json` (28) |

Las columnas de Colaboradores están repartidas en tres sitios: la configuración de TanStack, el encabezado en `tabla_colaboradores.tsx` y la celda en `bloque_reenviar.tsx`.

Acciones de Colaboradores según el estado (**[P]** `pruebas/colaboradores/acciones_estado_colaboradores.test.tsx`, reglas en `reglas_estado_colaboradores.ts`):

| Estado | Acciones de fila |
|---|---|
| Activo | Ver, Editar, Dar de baja |
| Invitado | Botón «Reenviar» (sin menú); reenviar actualiza la fecha de invitación y no crea otro colaborador |
| Inactivo | Ver, Editar, Dar de baja |
| Baja | Ver, Editar (no se ofrece «Dar de baja»; la lógica tampoco lo permite) |

Inactivo y Baja son estados distintos en los datos y en el código. Las operaciones (guardar, baja, invitar, reenviar) cambian el estado en memoria; **no hay servidor ni persistencia**, y los avisos lo dicen.

### 1.4 Estados de la tabla que existen y que no

| Estado | ¿Existe? | Evidencia |
|---|---|---|
| Vacío | Sí: una fila con el mensaje del catálogo (`mensaje_vacio`) | `tabla_colaboradores.tsx`, `tabla_empresas.tsx` |
| Selección (por fila y por página, con estado intermedio) | Sí; **solo se ve en la casilla**, la fila no cambia de aspecto | `bloque_reenviar.tsx`, `fila_empresa.tsx` (la clase de la fila es solo `CLASES_TABLA.fila`) |
| Carga | **No** (los datos son JSON en memoria) | — |
| Error de carga | **No** (solo existe el aviso de error de exportación en Colaboradores) | `aviso_invitacion_enviada.tsx` |
| Orden por encabezado (`aria-sort`) | **No** | — |

### 1.5 Otras tablas identificadas

Siete tablas más tienen su propio `<table>` y **no se analizaron en profundidad** (solo localizadas por búsqueda de `<table>`): `colaboradores/bloques/bloque_columna_permiso.tsx` (asistente de invitación), `dashboard/bloques/seccion_ratios_financieros.tsx`, `reportes/bloques/seccion_reportes_recientes.tsx`, `paginas/estadisticas/pagina_estadisticas_modulo.tsx`, `pagina_estadisticas_todos_modulos.tsx`, `paginas/indicadores/pagina_indicadores_clave.tsx` y `tablas/eventos/tabla_calendario_mini.tsx`. Reportes, estadísticas e indicadores usan la clase global `.tabla-ultima-fila-sin-borde` (`montaje_local/index.css`, regla `tbody tr:last-child td`), distinta de `tabla_datos`. Las subtablas de Empresas (`tabla_usuarios_empresa.tsx`, `tabla_historial_empresa.tsx`) sí usan `tabla_datos`.

## 2. Funcionalidades de Colaboradores implementadas

### 2.1 Aplicaciones asignables (decisión de datos)

**[H]** Antes de esta etapa la columna «Aplicaciones» mostraba secciones de la plataforma (Calendario, Mensajes, Actividad, Marketplace, Estadísticas, Reportes) que no son aplicaciones asignables. La autoridad elegida es **la lista de módulos del asistente de invitación** (`servicios/colaboradores/permisos.json › modulos`), porque:

- es el mecanismo de asignación del propio módulo («Seleccionar módulo»: Planillas, Contabilidad, Inventario, Ventas, Compras, Proyectos, Reportes, Configuración);
- el tipo `Modulo` tiene la misma forma que `Aplicacion` (icono, clase, nombre);
- el diseño original (`CodePlex_RedSocial_HTML_nativo/paginas/29-10-colaboradores-todos.html`) mostraba «+5» junto a 3 iconos, lo que suma 8.

`APLICACIONES_DISPONIBLES` (`servicios/colaboradores/colaboradores.ts`) se **deriva** de esos módulos (nombre e icono), con el color de `servicios/colaboradores/colaboradores.json › clasesAplicacion`. Los filtros de aplicación (tabla y panel avanzado) ofrecen exactamente esos nombres (**[P]** `pruebas/colaboradores/iconos_aplicaciones_colaboradores.test.tsx`, `aplicaciones_en_tabla_colaboradores.test.tsx`).

Cada colaborador lleva **su lista completa**; la celda muestra las 3 primeras (`colaboradores.json › celda_aplicaciones.max_iconos`) y `+N` calculado. Los datos de demostración conservan el total de cada colaborador (Carlos 8, María 6, Jorge 3, Ana 3, Luis 2, Rosa 2) con módulos coherentes con su rol; **esa elección por persona es dato de demostración, no una regla de negocio**.

**[PENDIENTE]** El asistente tiene 8 módulos; la barra lateral («Módulos disponibles») tiene 6 (sin Compras ni Configuración) y usa otros iconos para los mismos módulos. Marketplace vende **productos** (ContaPlex, GestiónPlex…), entidades distintas; no hay catálogo común y no se forzó una unificación. La tabla compartida no debe depender de esta decisión.

### 2.2 Exportación (comprobada por Angie; no modificar)

Excel y PDF están implementados y **Angie los comprobó manualmente y los considera terminados**.

| Opción del menú | Contenido |
|---|---|
| Exportar a Excel / Exportar a PDF | **Todos los registros de la pestaña de estado seleccionada**, de todas las páginas, con el orden elegido. No aplica búsqueda, filtros de columna ni filtros avanzados |
| Exportar filtrados a Excel / a PDF | Todos los registros que cumplen pestaña, búsqueda, rol, aplicación y filtros avanzados, de todas las páginas, con el orden elegido. **Deshabilitada si no hay búsqueda ni filtros** (cambiar solo de pestaña no cuenta, por ser idéntica a la general) |

**CSV está retirado [H]**: no hay opción en el menú (`colaboradores.json › menu_exportar` solo tiene `excel`, `pdf`, `excel_filtrados`, `pdf_filtrados`), ni código (`exportar_colaboradores.ts` solo conoce `excel` y `pdf`), y una prueba lo verifica (`pruebas/colaboradores/exportar_colaboradores.test.ts`).

Rutas (todas en `componentes/colaboradores/bloques/`):

| Archivo | Responsabilidad |
|---|---|
| `bloque_exportar_colaboradores.tsx` | Botón y menú; deshabilita las opciones sin acción |
| `exportar_colaboradores.ts` | Orquesta: construye el reporte, carga el generador bajo demanda (`import()`), descarga el archivo y crea las acciones del menú; si falla, llama a un callback de fallo |
| `reporte_colaboradores.ts` | Reporte: título, fecha, criterios, 11 columnas (clave, título, ancho, `enPdf`) y filas de texto |
| `criterios_exportacion_colaboradores.ts` | Describe en texto los criterios aplicados, con plantillas del catálogo |
| `exportar_excel_colaboradores.ts` | `.xlsx` con `exceljs`: 11 columnas, anchos, estilo de cabecera, filtro automático, cabecera congelada, impresión horizontal; todo valor como texto (formato `@`) |
| `exportar_pdf_colaboradores.ts` | PDF con `jspdf` + `jspdf-autotable`: A4 horizontal, 8 columnas (sin descripción del rol, fecha de invitación ni último acceso), encabezado repetido, «Página X de Y» |

- **Dependencias:** `exceljs` 4.4.0, `jspdf` 4.2.1, `jspdf-autotable` 5.0.9 (directas, declaradas en `package.json`; solo las usan estos dos archivos; se cargan bajo demanda y el `build` las separa en dos fragmentos de ~0,9 MB y ~0,4 MB).
- **Relación con filtros y orden:** la tabla (`usar_tabla_colaboradores.ts`) expone las filas filtradas y ordenadas; una segunda instancia de TanStack ordena las de la pestaña. No hay un segundo sistema de filtrado.
- **Errores:** si falla la generación o la descarga, `usar_gestion_colaboradores.ts` muestra un aviso de error con `role="alert"` (**[P]** `exportacion_colaboradores_ui.test.tsx`).
- **Responsabilidad:** la exportación es de la **pantalla**, no del componente visual. La tabla compartida no debe incluir generación de Excel ni PDF (sección 8).
- Los estilos de las opciones de PDF están en `compartido.json › reporte_pdf` porque el validador de tipografía no admite `fontSize` ni `fontStyle` en código fuera de ese catálogo.

### 2.3 Invitaciones

**[H]** El asistente conserva sus pasos y los métodos Correo y WhatsApp, pero la elección **no se guarda** (los radios no tienen estado y `Colaborador` no tiene campo de método); por eso el filtro avanzado «Método de invitación» aparece deshabilitado. El envío real, los enlaces con vencimiento y la persistencia del método son **[PENDIENTE]**, fase futura.

## 3. Tecnologías, versiones y dependencias verificadas

Fuentes: `package.json` (declaradas), `package-lock.json` (resueltas) y `node_modules/*/package.json` (instaladas). Entorno de ejecución usado: Node v22.14.0, npm 9.8.1 (jsdom y undici avisan de motores más nuevos; las pruebas funcionan).

### 3.1 Núcleo

| Dependencia | Declarada (`package.json`) | Instalada | Tipo | Uso en la tabla | ¿Indispensable para el componente compartido? |
|---|---|---|---|---|---|
| `react`, `react-dom` | ^19.2.8 | 19.2.8 | directa | Todo | Sí |
| `typescript` | ~6.0.2 | 6.0.3 | directa (dev) | Tipos; `tsc -b` en el `build` | Sí |
| `vite` | ^8.2.2 | 8.2.2 | directa (dev) | Build y servidor | No (infraestructura) |
| `@vitejs/plugin-react` | ^6.1.0 | 6.1.1 | directa (dev) | `vite.config.ts` | No |
| `tailwindcss`, `@tailwindcss/vite` | ^4.3.3 | 4.3.3 | directas (dev) | Todas las clases; configurado en `montaje_local/index.css` (`@import "tailwindcss"`, `@source`, `@theme`); **no hay `tailwind.config`** | Depende de cómo la librería entregue estilos (sección 5.7) |

### 3.2 Librería oficial

| Paquete | Declarada | Instalada | Tipo | Uso en las tablas |
|---|---|---|---|---|
| `@codeplex-sac/formularios` | ^0.1.10 | 0.1.10 | directa | `CodeplexCasilla`, `CodeplexSelector`, `CodeplexCampoTexto` (vía envoltorios) |
| `@codeplex-sac/navegacion` | ^0.0.16 | 0.0.16 | directa | `CodeplexPaginacion`, `CodeplexMenu`, `CodeplexPestanas` (vía envoltorios) |
| `@codeplex-sac/iconos` | ^0.0.11 | 0.0.11 | directa | `CodeplexIcono` (vía `Icono`) |
| `@codeplex-sac/selectores-fecha` | ^0.0.24 | 0.0.24 | directa | Filtros avanzados (no la tabla) |
| `@codeplex-sac/diseno`, `graficos`, `mapas` | ^0.0.20, ^0.0.24, ^0.1.7 | 0.0.20, 0.0.24, 0.1.7 | directas | No intervienen en las tablas |

### 3.3 Bibliotecas relacionadas

| Dependencia | Declarada | Instalada | Tipo | Uso real |
|---|---|---|---|---|
| `@tanstack/react-table` | ^9.2.4 | 9.2.4 | directa | **Solo Colaboradores** (`@tanstack/react-table/legacy` en `usar_tabla_colaboradores.ts`, `colaboradores_tabla_config.ts`, `contrato_listado_colaboradores.ts`). Empresas no la usa |
| `@tanstack/table-core` | ^9.2.4 | 9.2.4 | directa | Solo tipos (`SortingState`, `ColumnFiltersState`) en Colaboradores |
| `@mui/material` | ^7.3.11 | 7.3.11 | directa (declarada en una tarea anterior) | Importada directamente en `interfaz/pestanas.tsx`, `interfaz/modal.tsx`, temas y tipos; **la tabla no la importa**: llega a través de los componentes de la librería |
| `@mui/x-date-pickers` | ^8.29.3 | 8.29.3 | directa | Tema de selectores de fecha (filtros avanzados) |
| `dayjs` | ^1.11.23 | 1.11.23 | directa | Fechas de filtros y reportes |
| `@emotion/react`, `@emotion/styled`, `@mui/system`, `@mui/icons-material` | no declaradas | 11.14.0, 11.14.1, 7.3.11, 7.3.11 | **transitivas** (dependencias de los paquetes `@codeplex-sac`, según `package-lock.json`) | Las usa MUI; el código del proyecto no las importa |
| `react-router-dom` | no declarada | 7.18.4 | transitiva (peer de `diseno` y `navegacion`) | El código del proyecto no la importa |
| `exceljs` | ^4.4.0 | 4.4.0 | directa | Solo `exportar_excel_colaboradores.ts` (carga diferida) |
| `jspdf`, `jspdf-autotable` | ^4.2.1, ^5.0.9 | 4.2.1, 5.0.9 | directas | Solo `exportar_pdf_colaboradores.ts` (carga diferida) |

**Para el componente compartido:** solo son necesarios React, TypeScript y lo que decida la librería (probablemente MUI, que ya usan sus paquetes). TanStack, `exceljs`, `jspdf`, `dayjs` y `@mui/x-date-pickers` son de Red Social y **no deben asumirse** dentro de la librería.

### 3.4 Pruebas, lint y calidad

| Herramienta | Declarada | Instalada | Uso |
|---|---|---|---|
| `vitest` | ^5.0.1 | 5.0.1 | Pruebas (`npm test` = `vitest run`; `include`: `redsocial/frontend/pruebas/**/*.test.{ts,tsx}` en `vite.config.ts`) |
| `@testing-library/react` | ^16.3.3 | 16.3.3 | Render y consultas |
| `@testing-library/jest-dom` | ^7.0.1 | 7.0.1 | Aserciones |
| `jsdom` | ^30.0.1 | 30.0.1 | Entorno de pruebas |
| `@testing-library/dom` | no declarada | 10.4.2 | Transitiva de Testing Library |
| `@testing-library/user-event` | no declarada | **no instalada** | No se puede simular teclado real con ella; el teclado se probó en navegador |
| `oxlint` | ^1.79.0 | 1.81.0 | `npm run lint` |
| `scripts/quality_gate.mjs` | — | — | `npm run calidad` (Quality Gate) |

Scripts de `package.json`: `dev`, `build` (`tsc -b && vite build`), `lint`, `preview`, `test`, `calidad`, `desplegar`.

## 4. Inventario de archivos

### 4.1 Colaboradores (`componentes/colaboradores/bloques/` salvo indicación)

| Archivo | Responsabilidad | Reutilizar / adaptar / separado |
|---|---|---|
| `seccion_listado.tsx` | Compone cabecera, pestañas, buscador, filtros, exportar, selectores, tabla y paginación | Separado (es la pantalla) |
| `tabla_colaboradores.tsx` | `<table>`: encabezados y cuerpo, estado vacío | **Candidato a migrar** a la tabla compartida |
| `bloque_reenviar.tsx` | Fila: casilla, avatar, rol, aplicaciones, estado, vigencia y acciones | Contenido de celdas: separado; estructura `<tr>`/`<td>`: candidato |
| `bloque_colaboradores3.tsx` | Celda de vigencia | Separado |
| `bloque_colaboradores1.tsx` | Selectores rol / aplicación / orden | Separado |
| `usar_tabla_colaboradores.ts` | Estado de TanStack (filtro, orden, paginación, selección), filas filtradas y para exportar | Separado (lógica del módulo) |
| `colaboradores_tabla_config.ts` | Columnas de TanStack, filtro global, orden por opción, `TAMANO_PAGINA_COLABORADORES` | Separado |
| `usar_gestion_colaboradores.ts` | Lista en memoria, edición, baja, invitación, reenvío, avisos | Separado |
| `usar_edicion_colaborador.ts`, `seccion_editar_colaborador.tsx`, `bloque_editar_*.tsx` | Edición | Separado |
| `bloque_confirmar_baja_colaborador.tsx` | Diálogo de baja | Separado |
| `logica_colaboradores.ts`, `reglas_estado_colaboradores.ts`, `reglas_acceso_colaboradores.ts`, `reglas_cuenta_colaboradores.ts`, `logica_filtros_avanzados_colaboradores.ts` | Lógica pura: fechas, estados, acciones por estado, filtros avanzados | Separado |
| `bloque_filtros_avanzados.tsx`, `panel_filtros_avanzados.tsx`, `usar_filtros_avanzados.ts` | Panel de filtros avanzados | Separado |
| Archivos de exportación (sección 2.2) | Excel/PDF | Separado |
| `aviso_invitacion_enviada.tsx` | Aviso de éxito/error | Separado |
| `paginas/colaboradores/pagina_colaboradores.tsx` | Página: estado de paneles y modales | Separado |
| `tipos/colaboradores/modelo_colaboradores.ts`, `contrato_listado_colaboradores.ts`, `contrato_gestion_colaboradores.ts`, `contrato_invitar_colaborador.ts` | Tipos | Separado |
| `servicios/colaboradores/colaboradores.json` / `colaboradores.ts`, `estilos_colaboradores.json` / `.ts`, `permisos.json` / `.ts` | Datos de demostración y clases de rol/estado | Separado |
| `catalogos/capacidades/redsocial/colaboradores.json` | Textos, clases (`clases_tabla`), filtros, exportación | Separado |

### 4.2 Empresas (`componentes/empresas/bloques/` salvo indicación)

| Archivo | Responsabilidad | Reutilizar / adaptar / separado |
|---|---|---|
| `seccion_listado_empresas.tsx` | Compone filtros, tabla, pie y 4 modales | Separado |
| `tabla_empresas.tsx` | `<table>`: encabezados desde el catálogo, estado vacío | **Candidato a migrar** |
| `fila_empresa.tsx` | Fila: casilla, logo, datos, plan, estado y acciones (botones o menú) | Contenido: separado; estructura: candidato |
| `estado_empresa.tsx` | Celda de estado | Separado |
| `usar_listado_empresas.ts` | Búsqueda, estado, filtros, página, tamaño, selección | Separado |
| `logica_listado_empresas.ts` | `filtrarEmpresas`, `opcionesDeFila`, `CLASE_FILA_EMPRESA` | Separado |
| `usar_acciones_empresas.ts` | Despacho de acciones y modales | Separado |
| `filtros_empresas.tsx`, `pie_listado_empresas.tsx` | Barra de filtros y paginación | Separado |
| `tabla_usuarios_empresa.tsx`, `tabla_historial_empresa.tsx`, `fila_usuario_empresa.tsx` | Subtablas (dentro de modales) | **[ND]** si migrarlas; se analizaron solo en parte |
| `paginas/empresas/pagina_empresas.tsx` | Página | Separado |
| `tipos/empresas/contrato_listado_empresas.ts`, `modelo_empresas.ts` | Tipos | Separado |
| `servicios/empresas/empresas.json` / `.ts` | Datos | Separado |
| `catalogos/capacidades/redsocial/empresas.json` | Textos, clases (`tabla`, `clases`), menús, tamaños | Separado |

### 4.3 Compartido

| Archivo | Responsabilidad |
|---|---|
| `componentes/compartido/clases_tabla.ts` | `CLASES_TABLA` y `claseEncabezadoTabla(relleno)` |
| `componentes/compartido/interfaz/casilla.tsx`, `paginacion.tsx`, `menu.tsx`, `selector.tsx`, `campo_busqueda.tsx` | Envoltorios de la librería (único punto de importación) |
| `componentes/compartido/interfaz/boton.tsx`, `boton_icono.tsx`, `insignia.tsx`, `avatar_imagen.tsx`, `pestanas.tsx` | Componentes propios o con MUI directo |
| `componentes/compartido/icono.tsx`, `iconos_svg.ts`, `fuente_iconos.ts` | Mecanismo de iconos |
| `componentes/compartido/proveedor_tema_graficos.tsx` | Tema MUI de los controles de la librería |
| `tipos/compartido/contrato_menu.ts`, `contrato_boton_icono.ts`, `contrato_icono.ts` | Tipos |

### 4.4 Pruebas

| Grupo | Archivos (`pruebas/…`) | Cubre |
|---|---|---|
| Tabla de Colaboradores | `colaboradores/tabla_colaboradores.test.tsx`, `pagina_colaboradores.test.tsx` | Cabeceras, búsqueda, pestañas, filtros, orden, paginación, selección, menú, estado vacío, nombres accesibles |
| Gestión | `colaboradores/gestion_colaboradores.test.tsx`, `acciones_estado_colaboradores.test.tsx`, `logica_colaboradores.test.ts` | Edición, baja, invitación, reenvío, filtros avanzados desde la interfaz, reglas por estado |
| Filtros | `colaboradores/filtros_avanzados_colaboradores.test.ts` | Reglas de filtros avanzados |
| Aplicaciones/iconos | `colaboradores/iconos_aplicaciones_colaboradores.test.tsx`, `aplicaciones_en_tabla_colaboradores.test.tsx` | Catálogo, glifos, `+N` |
| Exportación | `colaboradores/exportar_colaboradores.test.ts`, `exportar_excel_colaboradores.test.ts`, `exportar_pdf_colaboradores.test.ts`, `exportacion_colaboradores_ui.test.tsx`, `apoyo_exportacion.ts` | Reporte, `.xlsx` releído con `exceljs`, PDF, menú, filtros, orden, aviso de error |
| Asistente / detalle | `colaboradores/modal_invitar_colaborador.test.tsx`, `seccion_detalle_colaborador.test.tsx`, `pagina_colaborador_perfil.test.tsx` | Invitación, detalle, perfil |
| Empresas | `empresas/pagina_empresas.test.tsx`, `normalizacion_tipografica.test.tsx`, `clases_tabla_compartidas.test.tsx` | Listado, filtros, paginación, selección, acciones, edición, usuarios, historial, contraste/tipografía, clases comunes |
| Sistema | `compartido/quality_gate_*.test.tsx`, `prevencion_*.test.tsx`, `sistema_*.test.tsx` | Validaciones de arquitectura, catálogos, tipografía, contraste |

No existen pruebas de ancho/responsive (no hay `matchMedia`, `innerWidth` ni cambios de viewport en `pruebas/`).

## 5. Sistema visual de las tablas

### 5.1 Archivos de estilo

**[H]** El único CSS de la aplicación es `montaje_local/index.css` (577 líneas; importado en `montaje_local/main.tsx`). No hay módulos CSS ni `tailwind.config`. Contiene: `@import "tailwindcss"`, `@source "../redsocial/frontend"` (Tailwind escanea también los JSON de catálogo, de ahí que las clases puedan vivir en ellos), `@theme` (tokens, líneas 12–~260), escala tipográfica responsive (líneas ~389–450), reglas de diseño de página de Colaboradores (`.area-colaboradores`, `.panel-colaboradores-*`, ~502–530), `.tabla-ultima-fila-sin-borde` (línea 533) y foco visible (líneas 561–573). Las clases utilitarias viven en JSX y en los JSON de `catalogos/` y `servicios/`. La carpeta `CodePlex_RedSocial_HTML_nativo/` tiene sus propios CSS pero **no está conectada al build**.

### 5.2 Clases compartidas (`compartido.json › tabla_datos`)

| Clave | Valor | Consumidores |
|---|---|---|
| `contenedor` | `overflow-x-auto rounded-xl border border-gris-borde bg-white` | `tabla_colaboradores.tsx`, `tabla_empresas.tsx`, `tabla_usuarios_empresa.tsx`, `tabla_historial_empresa.tsx` |
| `tabla` | `w-full border-collapse text-cuerpo` | Igual (usuarios usa su propia `tabla` de `empresas.json`: `w-full min-w-208 border-collapse text-cuerpo`) |
| `encabezado` | `whitespace-nowrap border-b border-gris-borde text-left text-encabezado-tabla text-texto-suave` + relleno propio de cada tabla | Cada `<th>` |
| `fila` | `border-b border-borde-suave last:border-b-0 hover:bg-fondo` | Cada `<tr>` de datos (excepto la fila de edición de usuarios) |
| `mensaje_vacio` | `p-6 text-center text-subtitulo text-texto-suave` | Fila de estado vacío |

La reutilización es **por lectura de un catálogo**, no por herencia de un componente. Pruebas: `empresas/clases_tabla_compartidas.test.tsx`.

### 5.3 Qué es específico de cada pantalla

| Elemento | Colaboradores | Empresas | Origen |
|---|---|---|---|
| Relleno de encabezado | `p-3.5 uppercase` (mayúsculas) | `px-2 py-3.5` (sin mayúsculas) | `colaboradores.json › clases_tabla.relleno_encabezado` / `empresas.json › clases.relleno_encabezado` |
| Fondo del encabezado | `<thead className="bg-fondo">` (`#f8f8fc`) | `<thead>` sin clase (blanco del contenedor) | Literal en `tabla_colaboradores.tsx` / sin fondo en `tabla_empresas.tsx`; el historial de Empresas usa `bg-fondo` (`empresas.json › historial_empresa.clases.encabezado`) |
| Relleno de celda | `p-3.5 align-middle` (14 px) | `px-2 py-3 text-left align-middle` (8 × 12 px) | **Literal repetido en TSX** (`bloque_reenviar.tsx`, `bloque_colaboradores3.tsx`) / `empresas.json › clases.celda` |
| Texto de datos | `text-nombre-entidad` (nombre), `text-auxiliar` | `text-nombre-fila`, `text-subtitulo` | Clases del catálogo / TSX |

**Duplicaciones existentes (no corregidas en esta tarea):** el relleno `p-3.5 align-middle` está repetido a mano en cada `<td>` de Colaboradores; `tabla-ultima-fila-sin-borde` (CSS global) hace lo mismo que `last:border-b-0` de `tabla_datos`; las otras siete tablas escriben sus propias clases.

### 5.4 Tokens que intervienen (`montaje_local/index.css`, bloque `@theme`)

| Aspecto | Token | Valor | Línea |
|---|---|---|---|
| Texto | `--color-texto` | `#26243a` | 24 |
| Texto secundario (encabezados) | `--color-texto-suave` | `#6c6a80` | 25 |
| Borde de fila | `--color-borde-suave` | `#f0eef5` | 89 |
| Borde de contenedor y encabezado | `--color-gris-borde` | `#e5e7eb` | 60 |
| Otros bordes | `--color-borde` | `#e9e7f1` | 26 |
| Fondo (encabezado de Colaboradores y hover de fila) | `--color-fondo` | `#f8f8fc` | 27 |
| Superficie | `--color-superficie` | `#fff` | 28 |
| Primario / foco | `--color-primario` / `--color-foco` | `#5a43f4` | 19 / 29 |
| Hover suave de botones | `--color-fondo-hover-suave` | `#f5f3ff` | 84 |
| Hover neutro | `--color-fondo-hover-neutro` | `#f2f1f6` | 85 |
| Éxito / peligro (texto) | `--color-exito-texto` / `--color-peligro-texto` | `#177851` / `#ca2323` | 65 / 66 |
| Fondos de insignia y aplicación | `--color-fondo-categoria-*` | morado `#ede9fe`, azul `#dbeafe`, verde `#dcfce7`, rojo `#fee2e2`, naranja `#ffedd5`, rosa `#fce7f3`, amarillo `#fef3c7`, cian `#cffafe` | 90–97 |
| Radio del contenedor | clase `rounded-xl` (Tailwind) | 12 px | — |
| Sombras | `--shadow-*` | **la tabla no usa sombra** | 35, 183–195 |
| Espaciado | `--spacing-xs…xl` | 4, 8, 16, 24, 32 px (las tablas usan la escala de Tailwind: `p-3.5`, `px-2 py-3`) | 132–136 |
| Breakpoints | `--breakpoint-*` | 380…2130 px; las tablas usan `max-600:` | 146–164 |

No se han creado tokens nuevos en esta tarea.

### 5.5 Tipografía

- **Familia efectiva:** `--fuente-base: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (`montaje_local/index.css` línea 17), aplicada globalmente con `font-family: var(--fuente-base)` en `:root` (dentro de `@layer base`, ~línea 362). Los controles de MUI la heredan (`ProveedorTemaGraficos` con `fuente_heredada: { fontFamily: "inherit" }` en `proveedor_tema_graficos.tsx`).
- **[H] Inter no se entrega**: no hay `@font-face`, ni `<link>`, ni dependencia (`montaje_local/index.html` no carga fuentes; el propio CSS lo declara como «DECISIÓN PENDIENTE»). La fuente que se muestra depende del sistema operativo (la primera disponible tras `Inter`). **[ND]** cuál es en cada equipo.
- Fuente de iconos: Material Symbols Rounded, cargada por `fuente_iconos.ts` desde `fonts.googleapis.com` (URL en `compartido.json › icono_libreria.url_fuente`).
- **Pesos y tamaños** (escritorio / tablet 768–1023 px / móvil < 768 px):

| Uso | Token | Escritorio | Tablet | Móvil | Peso |
|---|---|---|---|---|---|
| Encabezado de columna | `--text-encabezado-tabla` | 0,75 rem | 0,75 rem | 0,6875 rem | 600 |
| Texto de celda (Colaboradores) | `--text-cuerpo` | 1 rem | 0,9375 rem | 0,875 rem | por defecto |
| Nombre de persona | `--text-nombre-entidad` | 1 rem | 0,9375 rem | 0,875 rem | 700 |
| Datos de Empresas | `--text-subtitulo` | 0,875 rem | 0,875 rem | 0,875 rem | por defecto |
| Nombre de empresa | `--text-nombre-fila` | 0,875 rem | 0,875 rem | 0,875 rem | 700 |
| Subtexto (correo, teléfono, descripción) | `--text-auxiliar` | 0,75 rem | 0,75 rem | 0,75 rem | por defecto |
| Insignia de rol / plan | `--text-badge` | 0,75 rem | 0,75 rem | 0,6875 rem | 700 |
| Estado | `--text-estado` | 0,75 rem | 0,75 rem | 0,6875 rem | 500 |
| Contador `+N` | `--text-conteo` | 0,875 rem | 0,8125 rem | 0,75 rem | 700 |

Interlineado: `--leading-texto: 1.45` (línea 257). Una prueba del proyecto prohíbe estilos tipográficos en JavaScript fuera de `compartido.json` y del mecanismo de iconos (`pruebas/compartido/sistema_tipografico_fase_b.test.tsx`).

### 5.6 Estados visuales y responsive

| Estado | Comportamiento | Dónde se define |
|---|---|---|
| Hover de fila | fondo `#f8f8fc` | `hover:bg-fondo` en `tabla_datos.fila` |
| Foco de teclado | contorno de 2 px de `--color-foco`, separación de 2 px | `index.css` líneas 563–573 (`:focus-visible`, casillas MUI, pestañas) |
| Hover de botones de icono | fondo según variante (p. ej. `hover:bg-fondo-hover-suave`) | `compartido.json › boton_icono_variantes` |
| Deshabilitado | opacidad 0,4 y cursor `not-allowed` | `boton_icono.tsx` |
| Seleccionado | solo la casilla (sin estilo de fila) | — |
| Activo (`:active`) | **[ND]** no medido | — |
| Vacío | fila con `mensaje_vacio` | `tabla_datos` |
| Altura de fila | no fija: la determina el contenido (Colaboradores 89 px, Empresas 64 px a 1280 px **[N]**) | — |
| Anchos de columna | automáticos; casilla `w-10`; bloque de persona `w-44`; sin anchos fijos por columna | Literales en TSX |
| Tablas pequeñas | el contenedor hace scroll horizontal (`overflow-x-auto`); la página no desborda **[N]**; Empresas sustituye 3 botones por un menú con `max-600:hidden` / `hidden max-600:block`; los botones de icono pasan de 32 a 28 px con `max-600:` | `tabla_datos.contenedor`, `fila_empresa.tsx`, `boton_icono_tamanos` |

Mediciones manuales previas **[N]** a 1280 / 820 / 400 px: tabla y contenedor 975 / 975 px a 1280 px en ambos módulos; a 820 y 400 px hay scroll interno y la página no desborda. Estas mediciones **no se repitieron** en la última auditoría. El violeta de la paginación (`rgb(124,58,237)`) procede de `compartido.json › colores_graficos.primario` (`#7c3aed`) a través del tema MUI (`proveedor_tema_graficos.tsx`), **no** del token `--color-primario`.

### 5.7 Restricción para la librería

**[ND]** Cómo entrega estilos la librería oficial (qué clases, qué tokens, si usa Tailwind o `sx`/Emotion) no es verificable desde este repositorio, que solo contiene su código compilado. La tabla compartida debe poder tomar colores, bordes y tipografía de los tokens existentes sin introducir valores nuevos.

## 6. Iconografía

- **Mecanismo [H]:** `Icono` (`componentes/compartido/icono.tsx`) resuelve la clave en `compartido.json › iconos` (alias) y `iconos_libreria` (glifo). Si hay glifo, dibuja `CodeplexIcono nombre=<glifo>` de `@codeplex-sac/iconos` 0.0.11; si no, un SVG propio de `redsocial/recursos/iconos/*.svg` (registrado en `iconos_svg.ts` y `nombres_iconos`). No importa los componentes con nombre (`CodeplexIconoBorrar`, etc.).
- **Acciones de las tablas:** `puntos`→`more_horiz`, `ver`→`visibility`, `editar-oficial`→`edit`, `eliminar`→`delete`, `filtro`→`filter_alt`, `descargar`→`download`, `planillas`→`table_chart`, `documento`→`description` (todas de la librería). No hay iconos de terceros.
- **Aplicaciones de Colaboradores**, verificadas siguiendo módulo → clave → alias/glifo → componente de la librería instalada:

| Aplicación | Clave | Glifo | Componente con nombre | Procedencia |
|---|---|---|---|---|
| Planillas | `planillas` | `table_chart` | **Ninguno** (la librería solo exporta `pivot_table_chart` y `table_view`) | Glifo de la librería vía componente base; carencia registrada |
| Contabilidad | `contabilidad` | `calculate` | `CodeplexIconoCalculadora` | Oficial |
| Inventario | `inventario` | — | — | **SVG propio** (`inventario.svg`) por decisión registrada de Angie (IC-249 del Excel maestro de auditoría; `CodeplexIconoInventario` existe con glifo `inventory`, pero se descartó) |
| Ventas | `ventas` | `trending_up` | `CodeplexIconoTendenciaSubir` | Oficial |
| Compras | `compras` | `shopping_bag` | `CodeplexIconoBolsaCompras` | Oficial |
| Proyectos | `maletin` | `work` | `CodeplexIconoTrabajo` | Oficial |
| Reportes | `reportes`→`reporte` | `description` | `CodeplexIconoDescripcion` | Oficial |
| Configuración | `configuracion` | `settings` | `CodeplexIconoConfiguracion` | Oficial |

Se conservan sin cambios las decisiones de iconografía previas. La tabla compartida **no debe decidir iconos**: los recibe ya resueltos por el consumidor.

## 7. Contrato de la futura tabla compartida **[PROPUESTA]**

> Todo lo de esta sección es una **propuesta pendiente de aprobación e implementación**. Nada de esto existe en el código. Las interfaces son ilustrativas y siguen las convenciones observadas en la librería instalada: prefijo `Codeplex`, propiedades en español con alias en inglés compatibles con MUI (p. ej. `CodeplexCasillaProps`: `seleccionado`, `indeterminado`, `alCambiar`; `CodeplexMenuProps`: `elementos`, `abierto`, `alCerrar`), carpeta por componente en `lib/<nombre-en-kebab>/`.

### 7.1 Necesidades reales que debe cubrir (de las dos tablas actuales)

Encabezados y celdas configurables; identificador estable por fila; selección por página con estado intermedio y nombre accesible por fila; contenedor con scroll horizontal; estado vacío; hover y foco; acciones por fila que dependen del registro; contenido de celda muy distinto entre módulos. **No** requeridas hoy: orden por encabezado, estados de carga y error, edición en línea.

### 7.2 Esbozo de contrato

```ts
// PROPUESTA — no existe
export interface CodeplexColumnaTabla<F> {
  clave: string
  encabezado: React.ReactNode
  renderizarCelda: (fila: F) => React.ReactNode   // el módulo decide el contenido
  alinear?: 'izquierda' | 'centro' | 'derecha'
  claseEncabezado?: string                         // p. ej. relleno y mayúsculas del módulo
  claseCelda?: string
}

export interface CodeplexTablaProps<F> {
  etiqueta: string                                 // nombre accesible de la tabla
  columnas: readonly CodeplexColumnaTabla<F>[]
  filas: readonly F[]
  idFila: (fila: F) => string                      // Colaboradores usa el correo; Empresas, el código
  mensajeVacio: React.ReactNode
  seleccion?: {
    idsSeleccionados: ReadonlySet<string>
    alCambiar: (ids: ReadonlySet<string>) => void
    etiquetaSeleccionarTodos: string
    etiquetaFila: (fila: F) => string              // nombre accesible de cada casilla
  }
  claseFila?: (fila: F) => string | undefined
  clases?: { contenedor?: string; tabla?: string; fila?: string }  // entran del consumidor
  // Orden, carga y error: NO incluidos hasta que una pantalla lo necesite.
}
```

Decisiones del contrato **[PENDIENTE]** de aprobación:

- **Acciones por fila:** hoy son celdas con contenido propio (botón «Reenviar», menú «Más opciones», 3 botones). Lo mínimo es que sean una columna más con `renderizarCelda`; una API `acciones(fila)` dentro de la tabla solo se justifica si ambos módulos terminan compartiendo el patrón botones/menú (Empresas cambia a menú a 600 px; Colaboradores no).
- **Textos, iconos y clases:** entran por props; la librería **no** puede leer los catálogos JSON de Red Social.
- **Paginación y resumen:** hoy viven fuera de la tabla (`Paginacion` + texto «Mostrando X a Y de Z»). Se propone mantenerlas fuera.
- **Orden:** si se agrega, necesita `aria-sort` y encabezados pulsables; hoy ninguna pantalla lo usa.
- **Carga y error:** no existen; no agregarlos sin un consumidor real.

### 7.3 Accesibilidad y teclado

Hecho hoy **[H]/[P]**: casilla de cabecera y de fila con nombre accesible (`aria-label`); menú de fila abre con Enter, mueve el foco al primer elemento, Escape cierra y devuelve el foco al botón **[N]**; foco visible global. **Faltan [H]:** `scope` en `<th>`; `<caption>` o `aria-label` en la tabla (Empresas solo lo tiene en la sección); nombre del botón «Más opciones» de Colaboradores sin el nombre de la fila (Empresas sí lo incluye); `html lang="en"` en `montaje_local/index.html`; `aria-label` de la paginación en inglés («Go to page 2»). Una tabla compartida debería resolver encabezados, nombre de tabla y estado intermedio; los nombres de fila y de acción los aporta el consumidor. Navegación por flechas entre celdas y lector de pantalla: **[ND]**.

## 8. Separación entre la tabla y la lógica de negocio **[PROPUESTA]**

| Responsabilidad | Componente compartido | Consumidor (módulo) | Estado actual |
|---|---|---|---|
| Estructura `<table>`, encabezados, filas, celdas, scroll, hover, foco | **Sí** | — | Duplicado en cada módulo (clases comunes, estructura propia) |
| Estado vacío visual | **Sí** (con mensaje recibido) | Mensaje | Implementado en ambos |
| Casilla de cabecera con estado intermedio | **Sí** | Qué ids están seleccionados | Implementado en ambos |
| Contenido de cada celda | No | **Sí** | Específico |
| Menús y botones de acción | No (o solo el contenedor visual; ver 7.2) | **Sí**: qué acciones, visibilidad y qué hacen | Específico |
| Ordenamiento | No hasta que se necesite | **Sí** | Colaboradores: TanStack + selector externo; Empresas: ninguno |
| Búsqueda y filtros | No | **Sí** | Específico |
| Paginación | No (componente aparte) | **Sí** | `Paginacion` + hooks propios |
| Permisos y reglas de acceso | No | **Sí** | Claves en catálogos sin consumo **[H]**: no se aplican |
| Edición, baja, invitación, reenvío | No | **Sí** | Colaboradores, en memoria |
| Obtención y transformación de datos | No | **Sí** | JSON en memoria |
| Exportación Excel/PDF | No | **Sí** (la pantalla) | Colaboradores (sección 2.2) |

Comportamientos comprobados hoy: filtros, orden por selector, paginación, selección, menús por estado, baja, edición, invitación y reenvío, exportación (**[P]**, sección 9). Requieren decisión posterior: acciones dentro de la tabla, orden por encabezado, carga/error, permisos.

## 9. Pruebas y validación

### 9.1 Ejecutado en la última auditoría (15/10/2026)

| Comprobación | Comando | Resultado |
|---|---|---|
| Tipos | `npx tsc -b` | Sin errores |
| Validador de arquitectura | `powershell -NoProfile -ExecutionPolicy Bypass -File herramientas/validacion/validar_capacidad.ps1` | Correcto, 0 errores |
| Pruebas de Colaboradores y Empresas | `npx vitest run redsocial/frontend/pruebas/colaboradores redsocial/frontend/pruebas/empresas` | 18 archivos, **206 pruebas, todas pasan** (Colaboradores 125, Empresas 81) |

### 9.2 Resultados heredados de tareas anteriores (no repetidos ahora)

- Suite completa (`npx vitest run`): 93 archivos, 719 pruebas, todas pasan (tarea de exportación); focalizada posterior de `colaboradores`, `empresas` y `compartido`: 528 pruebas, todas pasan.
- Quality Gate (`npm run calidad`) en verde, con Vitest en 3 ejecuciones, Validador 0, Fronteras 3DD 0, `tsc`, `vite build` y oxlint (0 errores nuevos; 144 avisos históricos de `rules-of-hooks` por nombres `usar_*`, y 15 avisos existentes). Última ejecución completa: tarea de exportación.
- Comprobaciones en navegador real a 1280, 820 y 400 px (**[N]**): sin desbordes de página; menús, paneles y descargas dentro de pantalla; foco con teclado en el menú de fila.

### 9.3 NO DETERMINADO

- **Responsive** y **Regresión Empresas** del Quality Gate: requieren archivos de medición privados (`--visual=<roles.json>`) que no están disponibles.
- Lector de pantalla y navegación por flechas entre celdas; estado `:active`; Excel abierto en Microsoft Excel (solo se releyó con `exceljs`).
- Qué fuente se muestra realmente (Inter no se entrega).
- Un fallo intermitente de Vitest («failed to find the current suite») visto en sesiones anteriores no se reprodujo; su causa no está determinada.

## 10. Requisitos que la tabla compartida debería contemplar

1. **Encabezados y celdas configurables**: el contenido de las celdas es específico de cada módulo.
2. **Selección por página** con **estado intermedio**, sin acción asociada obligatoria.
3. **Scroll horizontal dentro del contenedor**, sin desbordar la página.
4. **Estado vacío** dentro de la tabla, con mensaje recibido.
5. **Hover y foco visibles** con los tokens actuales.
6. **Acciones por fila configurables**, también dependientes del estado de cada fila (botón «Reenviar» frente al menú).
7. **Accesibilidad**: nombre accesible de cada casilla (la librería aporta por defecto `aria-label="Casilla"`, que pisa la etiqueta visible; hay que pasar `inputProps={{ 'aria-label': … }}`), `scope` en encabezados, nombre de la tabla, y devolver el foco al disparador al cerrar menús y diálogos.
8. **Textos, iconos y clases** entran por propiedades; ninguna lectura de catálogos de Red Social.
9. Compatibilidad con **estado externo** (TanStack en Colaboradores, hooks propios en Empresas).
10. La exportación y la paginación **no** son de la tabla.

## 11. Diferencias que deben preservarse

- Colaboradores usa TanStack para parte de su estado; Empresas usa lógica propia.
- Tamaños de página distintos (3 fijo frente a 10/20/50).
- Densidad, relleno y mayúsculas del encabezado difieren. Poner mayúsculas en Empresas ensanchó su tabla de 975 a 990 px y creó scroll horizontal a 1280 px **[N]**, por lo que se descartó.
- El fondo del encabezado difiere (Colaboradores con `bg-fondo`, Empresas sin fondo).
- Colaboradores usa un menú de acciones (o «Reenviar»); Empresas, botones en escritorio y menú a 600 px o menos.
- Cada módulo conserva sus filtros, datos, reglas de negocio y acciones.
- Las operaciones son simulaciones en memoria; la tabla no debe asumir persistencia.

## 12. Comparación de funcionalidades

| Funcionalidad | Colaboradores | Empresas | ¿Compartida hoy? |
|---|---|---|---|
| Columnas | 7: casilla, Colaborador, Rol / Perfil, Aplicaciones, Estado, Vigencia, Acciones | 10: casilla, Logo, Empresa, RUC, Rubro, Plan, Usuarios, Estado, Fecha registro, Acciones | No |
| Búsqueda | Nombre, correo, teléfono | Nombre, RUC, código, correo | No |
| Filtro de estado | Pestañas con contador | Selector | No |
| Filtros adicionales | Rol, aplicación, avanzados | Avanzados (rubro, plan, fechas) | No |
| Orden | Selector externo | No | No |
| Paginación | `Paginacion` + resumen; 3 | `Paginacion` + resumen; 10/20/50 | Solo el envoltorio `Paginacion` |
| Selección | Casilla por página, estado intermedio | Igual | Solo el envoltorio `Casilla` |
| Acciones | Menú por estado / «Reenviar» | Botones o menú | Solo `BotonIcono` y `Menu` |
| Exportación | Excel y PDF | No | No |
| Estado vacío | Sí | Sí | Clase `mensaje_vacio` |
| Carga / error | No | No | — |
| Permisos | No aplicados | No aplicados | — |
| Adaptaciones para la tabla compartida | Pasar columnas e `idFila` = correo; mantener TanStack fuera | Pasar columnas del catálogo e `idFila` = código; mantener botones/menú en su celda | — |

## 13. Guía de integración para el siguiente desarrollador

1. **Revisar primero:** `tabla_colaboradores.tsx`, `bloque_reenviar.tsx`, `tabla_empresas.tsx`, `fila_empresa.tsx`, `componentes/compartido/clases_tabla.ts`, `compartido.json › tabla_datos`, `interfaz/casilla.tsx` y `menu.tsx`, `montaje_local/index.css` (tokens y foco) y las pruebas de la sección 4.4.
2. **Reutilizar:** los tokens de `index.css`; las clases de `tabla_datos` como referencia de apariencia; `Casilla` (con `aria-label` explícito), `BotonIcono` y `Menu` desde el consumidor; `Icono`.
3. **Ubicación en la librería:** **[ND]** el código fuente de `@codeplex-sac` no está en este repositorio; solo su paquete compilado. Convenciones verificadas en `node_modules/@codeplex-sac/*/lib`: una carpeta por componente en kebab-case, exportaciones con prefijo `Codeplex`, propiedades en español con alias en inglés, extensión de las props de MUI con `Omit`. **Propuesta:** `lib/tabla` dentro de `@codeplex-sac/diseno` (junto a `caja`, `fila`, `columna`, `contenedor`); la elección del paquete queda **[PENDIENTE]**.
4. **Verificar antes de fijar la API:** si el contrato necesita orden, carga o acciones integradas (hoy ninguna pantalla lo exige); cómo entrega estilos la librería (5.7); qué fuente se entregará (Inter); si se migran las subtablas de Empresas.
5. **Integrar en Colaboradores:** sustituir `tabla_colaboradores.tsx` conservando `usar_tabla_colaboradores.ts` y `colaboradores_tabla_config.ts`; `idFila` = correo; las celdas actuales de `bloque_reenviar.tsx` pasan a `renderizarCelda`; el relleno `p-3.5 uppercase` entra por `claseEncabezado`.
6. **Integrar en Empresas:** sustituir `tabla_empresas.tsx` conservando `usar_listado_empresas.ts`; `idFila` = código; encabezados del catálogo; el relleno `px-2 py-3.5` y la ausencia de mayúsculas se conservan; botones y menú móvil se quedan en la celda de acciones.
7. **Lógica que queda en cada módulo:** filtros, orden, paginación, selección, acciones, permisos, edición, baja, invitación, reenvío, datos y exportación (sección 8).
8. **Pruebas durante la implementación:** `npx vitest run redsocial/frontend/pruebas/colaboradores redsocial/frontend/pruebas/empresas` (206 pruebas hoy, deben seguir pasando sin cambios), `pruebas/empresas/clases_tabla_compartidas.test.tsx` (se adaptará si las clases pasan a la librería), `npx tsc -b`, `npm run lint`, el validador y `npm run calidad`; más pruebas propias de la tabla (accesibilidad, estado vacío, selección).
9. **Pendiente de decisión:** ver sección 14.

## 14. Decisiones pendientes y limitaciones

- Paquete y ruta de la tabla en la librería; contrato definitivo (7.2); si las acciones viven dentro de la tabla.
- Si se migran las subtablas de Empresas y las otras siete tablas (no se debe asumir).
- Fuente tipográfica real (Inter no se entrega) y `lang` del documento.
- Corrección de accesibilidad existente: `scope`, nombre de tabla, nombre de «Más opciones», etiquetas de paginación en inglés.
- Módulos asignables: 8 (asistente) frente a 6 (barra lateral); método de invitación sin persistencia.
- Cambios sin confirmar en Git (sección 15) y comprobaciones **NO DETERMINADO** de la sección 9.3.
- El patrón `evento.currentTarget` dentro de un actualizador de estado de React sigue en `componentes/inicio/bloques/cabecera_publicacion.tsx` (corregido solo en el menú de exportación).

## 15. Estado de Git y patrones a evitar

**[H]** Último commit `a0144da`; hay cambios sin confirmar de varios trabajos que incluyen todo lo descrito aquí (`tabla_colaboradores.tsx`, `clases_tabla.ts`, archivos de lógica y exportación, contratos de `tipos/colaboradores/`, pruebas nuevas, cambios de catálogos, `package.json` y `package-lock.json`). Quien consulte el código por Git sin esos cambios verá un estado anterior.

Patrones que no deben duplicarse: no escribir a mano las clases de `tabla_datos`; no importar componentes de la librería fuera de su envoltorio de `compartido/interfaz/`; no poner textos, rutas ni clases como literales en TSX (van en los catálogos JSON); no crear otro mecanismo de iconos; no leer `evento.currentTarget` dentro de un actualizador de estado; no crear un segundo sistema de filtrado para exportar. Convenciones del validador: las páginas importan solo por barrels, los componentes no importan `servicios/`, hay límite de imports y de complejidad por archivo, un archivo de lógica no mezcla tipos y funciones, y no se permiten comentarios en el código.

## 16. Criterios de aceptación

La solución debería permitir que Colaboradores y Empresas adopten la tabla compartida **sin cambiar** sus columnas, acciones, reglas de negocio ni la apariencia justificada (sección 11), y:

1. Reutilizar lo que ya existe (envoltorios, `Icono`, tokens y clases de `tabla_datos`) sin crear valores de diseño nuevos.
2. Mantener a 1280 px 975 px de tabla en 975 px de contenedor en ambos módulos, y el scroll interno a 820 y 400 px **[N]**.
3. Superar sin cambios las pruebas existentes de ambos módulos.
4. Pasar el validador, las fronteras 3DD y el Quality Gate del proyecto.
5. No acoplar la librería a catálogos, reglas o dependencias de Red Social (TanStack, `exceljs`, `jspdf`, `dayjs`).
6. No requerir una migración masiva ni modificar las otras siete tablas.
