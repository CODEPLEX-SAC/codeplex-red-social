# Procedencia de librerías, versiones y recursos

Fecha de la investigación: 2026-10-16; actualizada el 2026-10-17 con la comparación de los paquetes publicados y el 2026-10-19 (versiones contrastadas con `package.json`; la comparación byte a byte con los paquetes publicados es la del 2026-10-17 y no se repitió). Evidencia: `package.json`, `package-lock.json`, `node_modules/*/package.json`, historial Git y el contenido de las carpetas del repositorio. Etiquetas: **[CONFIRMADO]** (comprobado en archivos), **[DERIVADO]** (conclusión a partir del código), **[PENDIENTE]** (no se pudo comprobar).

## 1. Dependencias que intervienen en los componentes

| Paquete | Declarada (`package.json`) | Resuelta (`package-lock.json`) | Origen del tarball | Uso en el proyecto |
|---|---|---|---|---|
| `react`, `react-dom` | `^19.2.8` | 19.2.8 | `registry.npmjs.org` | Todo el frontend |
| `typescript` | `~6.0.2` | 6.0.3 | `registry.npmjs.org` | Tipado |
| `tailwindcss`, `@tailwindcss/vite` | `^4.3.3` | 4.3.3 | `registry.npmjs.org` | Estilos (clases en JSX y JSON) |
| `vite` / `vitest` / `oxlint` | `^8.2.2` / `^5.0.1` / `^1.79.0` | 8.2.2 / 5.0.1 / 1.81.0 | `registry.npmjs.org` | Compilación, pruebas, lint |
| `@codeplex-sac/formularios` | `^0.1.10` | 0.1.10 | `registry.npmjs.org` | Campos, selector, casilla, radio, interruptor, cargador de archivos |
| `@codeplex-sac/navegacion` | `^0.0.16` | 0.0.16 | `registry.npmjs.org` | Menú, paginación, pestañas, migas, pasos |
| `@codeplex-sac/selectores-fecha` | `^0.0.24` | 0.0.24 | `registry.npmjs.org` | Selector de fecha y hora, proveedor de fechas |
| `@codeplex-sac/iconos` | `^0.0.11` | 0.0.11 | `registry.npmjs.org` | Iconos Material Symbols mediante `Icono` |
| `@codeplex-sac/diseno` | `^0.0.20` | 0.0.20 | `registry.npmjs.org` | Barra lateral, acordeón, caja |
| `@codeplex-sac/graficos` | `^0.0.24` | 0.0.24 | `registry.npmjs.org` | Gráficos de Dashboard, Estadísticas e Indicadores |
| `@codeplex-sac/mapas` | `^0.1.7` | 0.1.7 | `registry.npmjs.org` | Mapa de Eventos |
| `@mui/material`, `@mui/x-date-pickers` | `^7.3.11`, `^8.29.3` | 7.3.11, 8.29.3 | `registry.npmjs.org` | Base de las librerías `@codeplex-sac/*`, tema (`ProveedorTemaGraficos`) y uso directo de `Tab` (`Pestanas`) y `Tooltip` (`SelectorBuscable`) |
| `@tanstack/react-table`, `@tanstack/table-core` | `^9.2.4` | 9.2.4 | `registry.npmjs.org` | Solo el estado (orden, filtro, paginación, selección) de la tabla de Colaboradores |
| `dayjs` | `^1.11.23` | 1.11.23 | `registry.npmjs.org` | Fechas |
| `leaflet` | `^1.9.4` | 1.9.4 | `registry.npmjs.org` | Mapa de Eventos |
| `exceljs`, `jspdf`, `jspdf-autotable` | `^4.4.0`, `^4.2.1`, `^5.0.9` | 4.4.0, 4.2.1, 5.0.9 | `registry.npmjs.org` | Exportación de Colaboradores (no es parte del diseño de componentes) |

**[CONFIRMADO]** Las versiones instaladas en `node_modules/<paquete>/package.json` coinciden con las del lock.

**[CONFIRMADO]** `@mui/material`, `@mui/x-date-pickers`, `dayjs`, `exceljs`, `jspdf` y `jspdf-autotable` figuraban en `package.json` como cambios sin confirmar en Git el 2026-10-17; el 2026-10-19 `package.json` ya no tiene diferencias frente a `HEAD` (commit `6c11e0f`). Las dependencias `@codeplex-sac/*` entraron en el commit `947804b` (2026-10-02, «Avance Diseño de red social»).

**[CONFIRMADO]** No están instalados `lucide-react`, `lucide-static` ni `react-icons`. `@mui/icons-material` sí está instalado, pero solo como dependencia transitiva de las librerías `@codeplex-sac/*`; el código del proyecto no lo importa. Tampoco está instalado `@codeplex-sac/tema`, que los README de `formularios` e `iconos` piden para `CodeplexProveedorTema`; el proyecto lo sustituye con su propio tema (`componentes/compartido/proveedor_tema_graficos.tsx`).

**[CONFIRMADO]** `react-router-dom` 7.18.4 está instalado porque es dependencia par de `@codeplex-sac/diseno` y `@codeplex-sac/navegacion`; el código del proyecto no lo importa (la navegación se hace con `irARuta` y `usarInterceptarEnlaces`).

## 2. ¿Se ha modificado alguna librería?

**Modificaciones directas verificadas del código fuente de una librería: ninguna.**

Evidencia:
- `node_modules/` no está en Git; el código de las librerías se obtiene de `registry.npmjs.org` con las sumas de integridad `sha512` del lock.
- No existe carpeta `patches/` ni `patch-package`, ni `.npmrc` ni archivos `.tgz` locales.
- No hay en el repositorio copias del código fuente de las librerías ni alias de Vite que sustituyan sus módulos (se revisó `vite.config.ts`).
- Las diferencias de aspecto frente a la librería se obtienen siempre con los mecanismos descritos en cada archivo de esta carpeta: envoltorios (`componentes/compartido/interfaz/`), el tema de MUI (`proveedor_tema_graficos.tsx`), propiedades por defecto en `catalogos/capacidades/redsocial/compartido.json`, clases Tailwind y tokens de `montaje_local/index.css`.

**[CONFIRMADO el 2026-10-17]** Se descargó el tarball publicado de cada paquete `@codeplex-sac/*` (`npm pack`, a una carpeta temporal, sin instalar nada) y se comparó archivo a archivo con `node_modules/@codeplex-sac/<paquete>` (`diff -rq`): **0 diferencias** en los siete paquetes y las sumas `sha512` del `package-lock.json` coinciden con las del registro.

| Paquete | Versión | Archivos (tarball = instalado) |
|---|---|---|
| `@codeplex-sac/diseno` | 0.0.20 | 18 |
| `@codeplex-sac/formularios` | 0.1.10 | 16 |
| `@codeplex-sac/graficos` | 0.0.24 | 49 |
| `@codeplex-sac/iconos` | 0.0.11 | 5 |
| `@codeplex-sac/mapas` | 0.1.7 | 5 |
| `@codeplex-sac/navegacion` | 0.0.16 | 22 |
| `@codeplex-sac/selectores-fecha` | 0.0.24 | 10 |

Conclusión: ninguna librería `@codeplex-sac/*` está modificada. Las diferencias de aspecto son adaptaciones del proyecto (envoltorios, tema MUI, catálogo `compartido.json`, clases Tailwind y tokens). No se comparó el contenido de `@mui/*` ni de otros paquetes con sus tarballs (no determinado, aunque coinciden las versiones del lock).

**Uso de las exportaciones de la librería** (recuento de importaciones `import { … } from '@codeplex-sac/…'` en el código sin pruebas, 2026-10-17; los nombres terminados en `Props` se excluyen y algunos símbolos son tipos):

| Paquete | Exportaciones `Codeplex*` | Símbolos usados por el proyecto |
|---|---|---|
| `diseno` | 15 | `CodeplexAcordeon`, `CodeplexBarraLateral`, `CodeplexCaja`, `CodeplexElementoAcordeon`, `CodeplexElementoMenuLateral` |
| `formularios` | 22 | `CodeplexCampoNumero`, `CodeplexCampoTexto`, `CodeplexCargadorArchivos`, `CodeplexCasilla`, `CodeplexInterruptor`, `CodeplexRadio`, `CodeplexSelector`, `CodeplexArchivoInfo` |
| `graficos` | 20 | `CodeplexGraficoBarraLinea`, `CodeplexGraficoBarras`, `CodeplexGraficoColor`, `CodeplexGraficoLineas` |
| `iconos` | 566 | `CodeplexIcono` |
| `mapas` | 1 | `CodeplexMapa`, `CodeplexMapaMarcador` |
| `navegacion` | 12 | `CodeplexMenu`, `CodeplexMigasPan`, `CodeplexPaginacion`, `CodeplexPasos`, `CodeplexPestanas` |
| `selectores-fecha` | 6 | `CodeplexProveedorFechas`, `CodeplexSelectorFecha`, `CodeplexSelectorHora` |

El resto de exportaciones (por ejemplo `CodeplexSelectorFechaHora`, `CodeplexSelectorRangoFecha`, `CodeplexAutocompletado`, `CodeplexGrupoRadio`) no se usa. Ningún paquete de la librería ofrece un componente de botón ni de diálogo.

## 3. Iconos: procedencia

Hay dos fuentes de iconos. Detalle completo en [iconos.md](iconos.md).

1. **Librería oficial `@codeplex-sac/iconos` 0.0.11** (glifos de *Material Symbols Rounded*, cargados en ejecución desde Google Fonts). **No es Lucide.**
2. **SVG propios** en `redsocial/recursos/iconos/` (107 archivos; solo 20 se usan hoy). Proceden de la carpeta del prototipo HTML nativo `CodePlex_RedSocial_HTML_nativo/iconos/`, donde **66 de ellos llevan la cabecera `<!-- @license lucide-static v1.34.0 - ISC -->`**. Es decir, el origen de esos 66 es el paquete **`lucide-static` v1.34.0** (licencia ISC), no `lucide-react`.

**[PENDIENTE]** No hay registro en el repositorio de la URL ni de la fecha exacta en la que se descargó `lucide-static`. Lo único verificable es la cabecera de licencia de los archivos y el commit que los añadió (`9ea8704`, 2026-09-11, «Remplazo proyecto nueva version»).

## 4. Otras carpetas de recursos

| Ruta | Contenido | Evidencia de origen |
|---|---|---|
| `CodePlex_RedSocial_HTML_nativo/` | Prototipo HTML nativo (páginas `.html`, `estilos/sistema.css`, `iconos/`, `imagenes/`) y una app Vite+React de arranque en `app/` (`app/package.json` solo tiene `react`, `react-dom`, Tailwind y Vite) | Commit `9ea8704`. No contiene `lucide-react`. |
| `redsocial/recursos/iconos/` | Copias minificadas (sin cabecera de licencia) de los SVG del prototipo + 6 SVG que solo existen aquí | Commit `7abf47b` |
| `redsocial/recursos/imagenes/` | `carrusel1-3.jpg`, `concierto.jpg`, `logo-empresa.jpg`, `usuario.jpg` | Sin documentación de origen **[PENDIENTE]** |
| `redsocial/recursos/guia/identidad_visual.txt` | Una línea: «Aqui viven iconos, imagenes y recursos propios de la capacidad.» | — |
| Fuente tipográfica | Declarada `Inter` en `montaje_local/index.css` (`--fuente-base`); **no se entrega** ningún archivo de fuente ni `@font-face` | Decisión pendiente, ver [tokens_y_diseno_global.md](tokens_y_diseno_global.md) |
| Fuente de iconos | Material Symbols Rounded desde `fonts.googleapis.com` (`icono_libreria.url_fuente` en `compartido.json`) | Requiere red en tiempo de ejecución |

## 5. Documentación previa que complementa esta colección

- [`AUDITORIA_ICONOS_LIBRERIA_2026.md`](../../../../AUDITORIA_ICONOS_LIBRERIA_2026.md) (documento maestro de iconografía) y el libro [`AUDITORIA_ICONOS_LIBRERIA_2026_revision_visual_CON_CUMPLIMIENTO.xlsx`](../../../../AUDITORIA_ICONOS_LIBRERIA_2026_revision_visual_CON_CUMPLIMIENTO.xlsx) (iconos por módulo y decisiones).
- `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md` (sistema tipográfico, de color y componentes; su tabla 6.1 usa otra rotulación: allí «A propio · B wrapper · C librería», aquí «A librería directa · B envoltorio · C propio»).
- `redsocial/frontend/guia/contexto_tabla_compartida.md` (la tabla compartida).
- `redsocial/frontend/guia/decisiones_arquitectura_spa.md`.
