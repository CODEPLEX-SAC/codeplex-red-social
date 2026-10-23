# Tokens y configuración global de diseño

## 1. Identificación

| Dato | Valor |
|---|---|
| Categoría | **C** (propio de CodePlex). Tailwind CSS 4.3.3 aporta el motor; los valores son del proyecto |
| Archivos | `montaje_local/index.css` (578 líneas), `redsocial/frontend/catalogos/capacidades/redsocial/compartido.json` (72 secciones de primer nivel), `redsocial/frontend/componentes/compartido/proveedor_tema_graficos.tsx` (tema de MUI) |
| Estado | Utilizado por todo el proyecto |

## 2. Cómo se relacionan los archivos

1. `montaje_local/index.css` contiene `@import "tailwindcss"` y `@source "../redsocial/frontend"`. Tailwind 4 se configura aquí (bloque `@theme`); **no hay `tailwind.config`**. Al escanear `redsocial/frontend` lee también los `.json`, por lo que las clases pueden vivir en los catálogos.
2. `@theme` define los **tokens** (colores, tipografía, espaciado, radios, sombras, puntos de quiebre). Cada token genera utilidades (`text-texto-suave`, `rounded-control`, `gap-md`, `text-auxiliar`…).
3. `compartido.json` agrupa las **clases y configuraciones** reutilizables de los componentes compartidos (variantes de `Boton`, clases de la tabla, configuración de `CodeplexMenu`, propiedades por defecto de campos, etc.).
4. `proveedor_tema_graficos.tsx` crea un tema de MUI (`createTheme`) con paleta `colores_graficos`, `placeholder_tema`, `elemento_menu_tema`, `pestanas_tema` y `fuente_heredada` de `compartido.json`; lo consumen los envoltorios de las librerías `@codeplex-sac/*` (que están construidas sobre MUI).

## 3. Valores verificados en `montaje_local/index.css`

| Aspecto | Token / valor | Línea aprox. |
|---|---|---|
| Familia tipográfica | `--fuente-base: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | 17 |
| Color primario | `--color-primario: #5a43f4` (`-oscuro #4630d7`, `-suave #f0edff`) | 19–21 |
| Texto | `--color-texto: #26243a`, `--color-texto-suave: #6c6a80` | 24–25 |
| Fondos | `--color-fondo: #f8f8fc`, `--color-superficie: #fff` | 27–28 |
| Bordes | `--color-borde: #e9e7f1`, `--color-gris-borde: #e5e7eb`, `--color-borde-suave: #f0eef5` | 26, 60, 89 |
| Estado | `--color-exito-texto: #177851`, `--color-peligro-texto: #ca2323` | 65–66 |
| Espaciado con nombre | `--spacing-xs/sm/md/lg/xl` = 4/8/16/24/32 px (la escala numérica de Tailwind, 0,25 rem por unidad, sigue disponible) | 132–136 |
| Radios | `--radius-control: 10px`, 3/5/7/9/14/20 px | 138–144 |
| Sombras | `--shadow-sombra`, `--shadow-t1 … t13` | 35, 183+ |
| Escala tipográfica | `--text-<rol>` (p. ej. `titulo-pagina 2rem`, `cuerpo 1rem`, `subtitulo 0.875rem`, `auxiliar 0.75rem`, `encabezado-tabla 0.75rem`) con pesos `--text-<rol>--font-weight`; versión tablet en `@media (width < 1024px)` y móvil en `(width < 768px)` | 195–260, ~390–450 |
| Pesos globales | `--font-weight-etiqueta 500`, `-control 600`, `-titulo 700`, `-pagina 800` | 126–129 |
| Puntos de quiebre | `--breakpoint-380 … 2130` (se usan `max-600:`, `max-768:`, `max-800:`, `max-900:`, `max-1100:`) | 146–164 |
| Foco | `:focus-visible { outline: 2px solid var(--color-foco); outline-offset: 2px }` | ~563–573 |
| Altura de control | `--control-height: 48px` y `--height-control: var(--control-height)` (genera `h-control` y `min-h-control`); campos, selectores estándar, botón `md`, disparador del selector de empresa y filas del acordeón derivan de él. `mini` e `integrado` no (40 px y el del campo) | 343, 368 |
| Altura de la barra superior | `--height-barra-superior: 4rem` (64 px; genera `h-barra-superior`). De ella derivan `--height-vh-navbar`, `--height-dvh-navbar` (`calc(100(d)vh - var(--height-barra-superior))`) e `--inset-bajo-barra` (`barra + 0.25rem`, clase `top-bajo-barra` de los paneles de la barra superior) | 340–346 |
| Tooltip | `--inset-tooltip: calc(100% + 4px)` es el desplazamiento de los paneles de filtro bajo su disparador (clase `top-tooltip`), no el estilo de los tooltips. El estilo de los tooltips de MUI sale de `compartido.json › tooltip_tema` | 345 |

**[CONFIRMADO] Hallazgo previo, sigue vigente:** `Inter` se declara pero **no se entrega** (sin `@font-face`, `<link>` ni paquete de fuente). El navegador usa la primera fuente disponible de la lista (`ui-sans-serif`, `system-ui`, `Segoe UI`…). Los campos de MUI usan `Roboto, Helvetica, Arial` salvo que el tema lo cambie (medido en la barra superior el 2026-10-15: input del buscador `Roboto, Helvetica, A…`, botones `Inter, ui-sans-serif…`). Ver `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md` §4.2. **Actualización 2026-10-17:** el tema MUI fija `typography.fontFamily: inherit`, de modo que los controles de MUI y los gráficos usan ahora la misma pila (`--fuente-base`); los componentes propios y los de MUI pintan con la fuente del sistema disponible (`Segoe UI` en Windows) mientras `Inter` no se entregue.

## 4. Qué aporta cada capa

| Capa | Aporta | Dónde |
|---|---|---|
| Librerías `@codeplex-sac/*` + MUI | Estructura, comportamiento y estilos base de cada control (campo, selector, paginación…) | `node_modules` |
| Tema de MUI de CodePlex | Colores de paleta, fuente heredada de pestañas/paginación/menú, estilo del placeholder, radio de campos de fecha | `proveedor_tema_graficos.tsx` + `compartido.json` |
| Propiedades por defecto por componente | `anchoCompleto`, `sx` con padding vertical `0.53125rem` (campos de texto y selectores estándar: 48 px de alto exterior con `--height-control`; `mini` e `integrado`: 40 px), `tamano`, colores | `compartido.json › controles`, `selector_libreria`, `paginacion`, `menu`, `pestanas` |
| Tailwind + tokens | Clases en JSX/JSON (`text-*`, `rounded-*`, `gap-*`) | `index.css` + JSON |

## 5. Modificaciones realizadas

- Modificaciones del código de las librerías: **ninguna verificada** ([procedencia_librerias_y_recursos.md](procedencia_librerias_y_recursos.md)).
- Cambios de tokens/estilos del proyecto durante las Fases 2 a 6: la barra superior pasó de 64 a 72 px en la Fase 2 y **volvió a 64 px en la Fase 5** (`--height-barra-superior`, porque el cambio a 72 px no estaba aprobado); el relleno izquierdo reservado para el botón de menú se mueve de `max-800` a `max-900`.
- 2026-10-19: `MuiTooltip` en el tema (`tooltip_tema`) y variante `compacto` de `Selector` con `minWidth: 0` en `selector_libreria` (también para `integrado`); clase `.degradado-bandera` con franjas verticales (bandera de Perú) en `index.css`.
- 2026-10-15/17: `--control-height` de 44 a 48 px; `typography.fontFamily: inherit` en el tema MUI; clases de botones, chips (`chip_filtro`), tamaños de icono por variante, `hover` de `secundario` y la variante `cta` en `compartido.json`; se eliminó `--color-overlay-15` por quedar sin uso.
- **Diferencia heredada, corregida en la Fase 5:** el tema MUI usaba `#7c3aed` como primario (paleta de gráficos) frente a `--color-primario: #5a43f4`; ahora `palette.primary.main` toma `compartido.json › tema_mui.primario` (`#5a43f4`). `colores_graficos.primario` (`#7c3aed`) queda solo para los gráficos.
- Informe de referencia: `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md` (3 031 líneas) detalla duplicados de gris, tokens `t-xxxxxx` y contrastes.

## 6. Recomendación para la librería compartida

- **Extraer** (cuando se decida) el conjunto de tokens (`@theme`) y los roles tipográficos como paquete de tema; hoy el README de las librerías asume `@codeplex-sac/tema` (`CodeplexProveedorTema`), que **no está instalado** en el proyecto.
- **Mantener en CodePlex** los valores concretos de `compartido.json` que son decisiones de producto (colores de módulo, clases de tabla).
- **Fase 2:** el tema MUI fija `typography.fontFamily: inherit` (`compartido.json › fuente_heredada`); ya no se pinta Roboto/Arial. Pendiente: entregar la fuente `Inter`.
- **Token de control:** `--control-height: 48px` en `montaje_local/index.css` (`--height-control` genera `h-control` y `min-h-control`).

## 7. Verificación

Pruebas existentes: `prevencion_tipografica.test.tsx`, `sistema_global_fase_a.test.tsx`, `sistema_tipografico_fase_b.test.tsx`, `quality_gate_*.test.tsx` y el gate `npm run calidad`. **Última ejecución completa (2026-10-19): todas las comprobaciones en verde**: tipografía, colores, contraste, componentes, catálogos, arquitectura, accesibilidad, Responsive (288 páginas, 0 desbordes), clases inexistentes, `t-*` no autorizados, botones no registrados, fronteras 3DD (0), tsc, build, Vitest (3 ejecuciones, 0 fallos), validador (0 errores), oxlint (0 errores nuevos; 152 históricos y 17 avisos) y **Regresión Empresas ✅ en las seis resoluciones** contra la línea base aprobada (`roles.json` `b1cce667…`, ver `diferencias_aceptadas_linea_base.md`). Limitación abierta: la intermitencia histórica de `proveedor_carrito_marketplace.test.tsx` no tiene causa raíz demostrada (ver `excepciones_y_limitaciones.md`).

## Color primario de MUI, foco y barra superior (Fase 5)
- **Primario del tema MUI:** `palette.primary.main` toma `compartido.json › tema_mui.primario` (`#5a43f4`, el mismo valor que `--color-primario`). `colores_graficos.primario` (`#7c3aed`) se conserva solo para gráficos.
- **Foco de los campos de MUI (`foco_campo`):** borde de 2 px en el primario del tema y halo de 4 px al 10 % de opacidad (en error, el color de error); borde normal `theme.palette.divider`. Se define una sola vez en el tema para `MuiOutlinedInput` y `MuiPickersOutlinedInput`, de modo que `CampoTexto`, `CampoBusqueda`, `CampoNumero`, `Selector`, `SelectorFecha` y `SelectorHora` comparten tratamiento. Medido a 1280 px: borde 2 px `rgb(90,67,244)` y halo `rgba(90,67,244,0.1) 0 0 0 4px` en campo de texto, multilínea, selector y fecha/hora. El foco de teclado de botones y enlaces sigue siendo `:focus-visible` (2 px `--color-foco`).
- **Corrección de la auditoría (INC-04):** el campo numérico medido en la Fase 4 era un campo deshabilitado (`Mui-disabled`, borde 0,26 de opacidad); no demostraba un foco distinto. En la Fase 6 se midió un `CampoNumero` habilitado (modal «Crear evento» con el límite de personas activado): borde de 2 px `rgb(90,67,244)` y halo de 4 px, igual que `CampoTexto`.
- **Altura de la barra superior:** 64 px (`--height-barra-superior`).
