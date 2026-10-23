# Iconos (`Icono`)

## 1. Identificación

- **Componente:** `Icono` (props `name`, `className`).
- **Propósito:** punto único para pintar iconos: glifos de la librería y SVG locales, resueltos por nombre.
- **Ubicación:** `redsocial/frontend/componentes/compartido/icono.tsx`. Auxiliares: `fuente_iconos.ts` (tamaño y fuente), `iconos_svg.ts` (lectura de SVG). Registro: `catalogos/capacidades/redsocial/compartido.json` (`iconos`, `iconos_libreria`, `nombres_iconos`, `icono_libreria`). Tipos: `tipos/compartido/contrato_icono.ts` y `contrato_icono_props.ts`.
- **Estado:** existente. Nombres añadidos el 2026-10-16 para la pasarela de pagos (`banco`, `celular`, `copiar`, `codigo-qr`) y un SVG nuevo `regalo.svg`. Desde el 2026-10-19 (eliminación de la transferencia bancaria) `banco` y `copiar` siguen registrados en `compartido.json › nombres_iconos` pero ningún componente los usa (comprobado por búsqueda en `componentes/`).
- **Consumidores:** todos los módulos (175 archivos importan `icono.tsx`).

## 2. Origen e implementación

- **Origen:** envoltorio propio de CodePlex sobre `CodeplexIcono` de `@codeplex-sac/iconos` 0.0.11 (única importación de esa librería en el proyecto, `icono.tsx:1`), más SVG locales de `redsocial/recursos/iconos/` (107 archivos).
- **Glifos:** Material Symbols Rounded (ligaduras). La fuente se inyecta en tiempo de ejecución con un `<link>` a Google Fonts (`icono_libreria.url_fuente`) mediante `asegurarFuenteLibreria()`; requiere red.
- **No hay** `lucide-react`, `react-icons`, `@mui/icons-material` como dependencia del proyecto ni importaciones de ellos en `componentes/`, `paginas/` o `formularios/` (comprobado por búsqueda el 2026-10-17). `@mui/icons-material` está instalado solo como dependencia transitiva de las librerías `@codeplex-sac/*`; el proyecto no lo importa.
- **Exportación:** barrel `componentes/compartido/index.ts` (`Icono` y las imágenes predeterminadas).
- **Elemento HTML:** `<span>` de la librería (glifo) o `<svg viewBox="0 0 24 24">` (SVG local, solo etiquetas `path`, `circle`, `rect`, `line`, `polyline`, `polygon`, `ellipse`, `g`).

## 3. Contrato y características

**Resolución de `<Icono name="x" className="h-5 w-5" />`:**

1. `compartido.json › iconos` (alias): `name → clave`, o `svg:clave` para forzar un SVG propio (hoy `contabilidad-propio` y `cohete-propio`).
2. Si la clave está en `iconos_libreria` (102 entradas) se pinta `CodeplexIcono` con el símbolo de Material.
3. Si no, se usa `ICONOS_SVG[clave]`, leído de `recursos/iconos/<clave>.svg` con `import.meta.glob(..., { query: '?raw' })`.
4. `nombres_iconos` define el tipo `NombreIcono`. Recuento del 2026-10-17: 134 nombres (unión de los 115 alias de `iconos` y los 112 de `nombres_iconos`); 112 se resuelven a glifos de la librería y 22 a SVG locales (20 archivos distintos).

- **Tamaño:** se deduce de la clase `h-N` del `className` (N × 0,25 rem; respaldo `1rem`); `w-*` se descarta; `max-N:h-M` genera reglas `@media`.
- **Escala permitida por prueba** (`pruebas/compartido/escala_iconos.test.tsx`): 12, 14, 16, 18, 20 y 24 px, e ilustraciones de 28, 32, 40 y 56 px.
- **Accesibilidad:** el icono es decorativo (SVG con `aria-hidden`); el nombre accesible lo aporta el botón o el texto que lo rodea.
- **Restricción de arquitectura:** `prevencion_arquitectura.test.tsx` impide que dos nombres apunten al mismo símbolo salvo grupos registrados; por eso el check de las filas de pago reutiliza `marca-pequena` (símbolo `check`).

## 4. Diseño visual

- Estilo común del glifo (`icono_libreria.estilos`): `display: inline-flex`, `width` y `height` de `1em`, `fontVariationSettings: 'FILL' 0, 'wght' 500` y `transform: scale(1.1)` (corrección óptica global).
- **Dentro de `Boton`:** la caja efectiva es de 16 × 16 px (14 × 14 px en `mini` y `filtro`); el glifo pierde el `scale(1.1)` para medir exactamente la caja. Fuera de `Boton`/`clasesBoton` el glifo se ve un 10 % más grande que su `h-N` (medido: `h-4` da 17,6 px).
- **Tamaño óptico:** con la caja de 16 × 16 px la tinta mide 13,9 × 13,9 px en los SVG propios (por ejemplo «Crear evento»), y entre 8 y 13 px en los glifos según su forma («+» ≈ 8,4 px; persona con «+» ≈ 13 × 10 px; chevron ≈ 5 × 8 px). Es propio de cada forma; no se compensa con escala global (medido el 2026-10-17).
- Color: hereda `currentColor` (clases `text-*` del llamador).

## 5. Integración con el sistema compartido

- **Fuente de verdad:** `compartido.json` (registro y estilo del glifo) y `fuente_iconos.ts`.
- **Quién se actualiza:** un cambio en `icono_libreria.estilos` afecta a todos los glifos de la aplicación; `boton_icono_clases` solo a los de `Boton`; `boton_icono_tamanos` a los de `BotonIcono`.
- **Fuera del sistema:** iconos de MUI y de librerías (chevron del acordeón, flechas de selectores, calendario y reloj de los selectores de fecha, controles de paginación).

## 6. Dependencias y procedencia de iconos

**Procedencia de los 107 SVG de `redsocial/recursos/iconos/`** (comparación del 2026-10-16 con `CodePlex_RedSocial_HTML_nativo/iconos/`, 103 archivos):

| Resultado | Cantidad | Detalle |
|---|---|---|
| Idénticos y el original lleva `@license lucide-static v1.34.0 - ISC` | 66 | Origen confirmado: paquete `lucide-static` 1.34.0 (ISC) |
| Idénticos, original sin cabecera de licencia | 35 | **Origen no determinado**; no se asume Lucide. Evidencia necesaria: la fuente original de cada archivo |
| Distintos | 0 | — |
| Solo en el repositorio React | 6 | `aviso-critico`, `aviso`, `icono_base`, `marca-pequena`, `regalo`, `usuario` |
| Solo en el prototipo HTML | 2 | `alerta`, `alerta-roja` |

Lucide aparece **solo** como SVG estáticos copiados desde el prototipo HTML (ignorado por Git); no es dependencia de `package.json`. Los archivos locales están minificados y sin la cabecera de licencia; el contenido interno es idéntico a los originales en los 101 coincidentes. De los SVG en uso, 10 tienen origen Lucide confirmado (`amigos`, `amigos-todos`, `caja`, `cuadricula`, `editar`, `encuesta`, `estadisticas`, `grupos`, `listas`, `solicitudes`) y 9 no (`archivo-pdf`, `categoria-evento`, `cohete`, `contabilidad`, `crear-evento`, `intercambio`, `inventario`, `reportes-barra`, `respetado`); `regalo` no existe en el prototipo. Imágenes (no iconos): `redsocial/recursos/imagenes/` (`usuario.jpg`, `concierto.jpg`, `logo-empresa.jpg`, `carrusel1-3.jpg`).

Las 566 exportaciones semánticas de `@codeplex-sac/iconos` (`CodeplexIconoInicio`, `CodeplexIconoVerificado`, …) no se usan; todo se resuelve por nombre.

## 7. Historial de modificaciones

- **Librería:** `@codeplex-sac/iconos@0.0.11` coincide byte a byte con el paquete publicado (comprobado el 2026-10-17); sin modificaciones.
- **Adaptaciones del proyecto:** resolución por catálogo, tamaño por clase, estilo común y SVG propios; nombres de pago añadidos el 2026-10-16; `regalo.svg` nuevo (sin confirmar en Git hasta el commit de cierre); desde 2026-10-17 `boton_icono_clases` fija la caja de 16/14 px dentro de botones.
- **Impacto de cambiarlo:** 175 archivos; la prueba `escala_iconos` y `iconos_marketplace` protegen el tamaño y los iconos de Marketplace.


Verificado el 2026-10-17 contra el código del repositorio (rama `codeplexMaster`, cambios sin confirmar). Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
