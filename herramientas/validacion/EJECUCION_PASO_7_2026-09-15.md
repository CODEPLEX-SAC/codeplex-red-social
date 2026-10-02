# Ejecución del Paso 7 — Tailwind arbitrario → tokens exactos — 15-09-2026

Este documento registra qué se hizo para el Paso 7 de `ACTUALIZACION_VALIDADOR_2026-09-15.md` (motivo `Tailwind arbitrario, hexadecimales o gradientes quemados no permitidos`). Los pasos 1-6 están en `EJECUCION_PASOS_1_6_2026-09-15.md`, el Paso 8 en `EJECUCION_PASO_8_2026-09-15.md`, el Paso 9 en `EJECUCION_PASO_9_2026-09-15.md`.

Línea base antes de empezar: **120 errores**, de los cuales **53** eran del motivo Tailwind arbitrario.
Estado al cerrar el Paso 7: **78 errores**, motivo Tailwind arbitrario en **0**.

## Decisiones de alcance (acordadas antes de tocar código)

El inventario inicial encontró **579 valores arbitrarios únicos** solo en `.tsx`, de naturaleza muy distinta entre sí. Se preguntó y acordó:
- Las ~50 disposiciones de grid y ~20 breakpoints arbitrarios (layouts de una sola pantalla, no reutilizables) → una clase/token por cada uno, no forzarlos a "diseño reutilizable".
- Los ~40 tamaños de fuente/line-height/tracking no estándar → un token `@theme` exacto por cada valor encontrado (escala grande, cero cambio visual), no fusionar valores parecidos.
- Ejecución por fases, validando después de cada una — igual que los pasos anteriores.

## Qué se cambió

Todo el trabajo fue **mecánico y verificado por fases** (`npx tsc -b`, `npx vitest run`, `npx vite build`, y una corrida del validador después de cada fase):

**Fase 1 — Colores.** 145 valores hex + 14 rgba de fondo + 13 expresiones `box-shadow` completas, todos usados como clases arbitrarias (`bg-[#f0eef5]`, `shadow-[0_2px_8px_rgba(0,0,0,.06)]`, etc.). 17 hex ya coincidían con un token existente (`bg-[#3b82f6]` → `bg-azul-categoria`); los 128 restantes se agregaron a `@theme` en `montaje_local/index.css` con nombres determinísticos `--color-t-<hex>` (ej. `--color-t-f0eef5`), los overlays como `--color-overlay-N`, y las sombras como `--shadow-tN`. **Se optó por nombres mecánicos en vez de semánticos** dado el volumen (128 tokens) — es una concesión documentada: prioriza corrección y trazabilidad exacta sobre estética del nombre.

**Fase 2 — Tamaños y espaciado.** ~600 usos de `h-[Npx]`, `w-[Npx]`, `p-[Npx]`, `gap-[Npx]`, etc. Tailwind v4 tiene una escala de espaciado **continua** (`--spacing: 0.25rem`, cualquier múltiplo decimal es una clase válida), así que `h-[34px]` se convirtió mecánicamente en `h-8.5` (34 ÷ 4) **sin necesitar ningún token nuevo**.

**Fase 3 — Tipografía.** 28 tamaños de fuente (`text-[0.82rem]`, `text-[13px]`, etc.), 8 line-heights y 6 letter-spacings no estándar. Se agregaron como tokens `@theme` (`--text-r82: 0.82rem`, `--leading-1.45: 1.45`, `--tracking-n02: -0.02em`), reutilizando `leading-tight`/`leading-normal`/`tracking-widest` donde el valor coincidía exacto con la escala por defecto de Tailwind.

**Fase 4 — Gradientes.** 12 `bg-[linear-gradient(...)]` únicos se sumaron como clases `.degradado-*` nuevas en `@layer components`, junto a las que ya existían de antes.

**Fase 5 — Breakpoints y grids.** 556 usos de `max-[Npx]:`/`min-[Npx]:` (18 valores únicos) se convirtieron en tokens `--breakpoint-*`, que en Tailwind v4 generan automáticamente tanto la variante `<n>:` como `max-<n>:` — confirmado comparando el `@media` generado antes y después (idéntico). Los ~28 `grid-cols-[...]`/`grid-rows-[...]`/`flex-[...]` se volvieron tokens `--grid-template-columns-*` con nombres derivados del valor (ej. `grid-cols-110-1fr-40-66`). Los 2 layouts más complejos (`pagina_actividad_grupos.tsx` y `pagina_colaboradores.tsx`, con `grid-template-areas` condicionadas por breakpoint y por estado de React) se resolvieron con clases CSS propias en `@layer components` (`.grid-fila-grupo`, `.panel-colaboradores-abierto/cerrado`, `.area-*`) en vez de tokens, porque `grid-template-areas` no tiene namespace de tema en Tailwind.

**Resto (bordes, rotación, z-index, opacidad, porcentajes, `calc()`/`var()`, contenido de pseudo-elementos, `border-radius`, scrollbar oculto):** se resolvieron caso por caso — algunos ya tenían equivalente nativo sin corchetes (`rotate-135`, `z-19`, `opacity-88` son válidos directo en Tailwind v4 igual que el espaciado), otros necesitaron tokens nuevos (`--radius-*`, `--width-p*` para porcentajes, `--content-*` para pseudo-elementos). El truco de "ocultar scrollbar" (`-ms-overflow-style` + `scrollbar-width` + `::-webkit-scrollbar`) se definió como una utilidad real de Tailwind v4 vía `@utility scrollbar-oculto { ... }` en vez de una clase CSS suelta, para que siga aceptando prefijos de variante (`max-900:scrollbar-oculto`) — el utility nativo `scrollbar-none` de Tailwind **no sirve solo**, porque solo pone `scrollbar-width` y no incluye el fallback de `-ms-overflow-style` ni el pseudo-elemento webkit (se comprobó inspeccionando el CSS compilado).

## Dos problemas reales que se encontraron y corrigieron en el camino

1. **Los `.json` de `datos/` (creados en el Paso 9) no son escaneados por Tailwind.** Varias páginas leen clases Tailwind desde archivos de datos (mapas `CLASES_*` convertidos a JSON en el Paso 9). Al compilar, se comprobó que esas clases **no generaban CSS** — la directiva `@source` de Tailwind no cubre `.json`. Esto ya era una regresión silenciosa desde el Paso 9 (nadie lo notó porque las pruebas solo comprueban que la página renderiza, no que se vea bien). Se aplicó la misma sustitución de tokens también a esos `.json`, lo que de paso corrige el problema — las clases ahora son nombres reales (`bg-t-f0eef5`) que si aparecen en cualquier archivo del proyecto (aunque sea uno que Tailwind no escanea) igual generan CSS, porque el nombre también aparece escrito en algún `.tsx`/`.ts` en otro lado. **Nota para el futuro:** si se agrega una clase Tailwind que solo existe dentro de un `.json` y en ningún `.tsx`, no se generará su CSS — hay que evitar ese patrón o ampliar el `@source`.
2. **La sustitución automática de colores rompió una lectura de datos en `pagina_reportes.tsx`.** Dos campos de `datos/reportes/reportes.json` (`"v": "h-[35%]"`, `"c": "bg-[#c4b5fd]"`) no eran clases CSS reales — eran un formato de datos casero que el código parseaba en tiempo de ejecución con `.replace('h-[','').replace('%]','')` para sacar un número, y `.replace('bg-[','').replace(']','')` para sacar un hex y buscarlo en `COLOR_GRAFICO`. La sustitución mecánica de Fase 1 los convirtió en nombres de clase reales, lo que rompió ese parseo. Se corrigió de raíz: esos campos ahora guardan directamente un `number` y un `string` hex plano (`"v": 35`, `"c": "#c4b5fd"`), y se borraron los `.replace(...)` — el mismo patrón (`claseAlto: "h-[NN%]"`) se encontró y corrigió también en `datos/dashboard/dashboard.json` y `datos/estadisticas/todos_modulos.json`.

## Capas nuevas reveladas (no es parte del Paso 7, quedan documentadas para después)

Al bajar de 120 a 78 errores aparecieron capas de otros pasos que antes no eran visibles:
- **15 imports** `import type {...} from '@/tipos/x/pagina_x'` en archivos de **páginas** (no solo `datos/`, que ya se había cubierto en el Paso 5) — se corrigieron los 15 de una vez, apuntándolos a `modelo_x` en vez de `pagina_x`.
- **11 literales de texto quemados** (motivo del Paso 1) en props sueltas (`titulo="Grupos recientes"`, `modulo="Ventas"`, números de días de calendario, un `stroke="#fff"` de SVG) — **no se tocaron**, quedan pendientes como la continuación natural del Paso 1.

## Verificación

`npx tsc -b` limpio, `npx vitest run` 40/40, `npx vite build` compila, en cada una de las 5 fases. El motivo `Tailwind arbitrario, hexadecimales o gradientes quemados` pasó de **53 a 0**.

## Lo que queda

| Motivo | Errores al cerrar el Paso 7 |
|---|---|
| `frontend/datos no debe declarar datos de prueba en TypeScript` (arquitectura ya corregida en el Paso 9; limitación de la herramienta) | 55 |
| `literal visible quemado en frontend` (capa nueva revelada, continuación del Paso 1) | 11 |
| `constantes de presentacion no deben vivir en TSX` (capa nueva del Paso 6, ver Paso 8) | 11 |
| `no importe recursos crudos` (límite conocido de la herramienta, ver Paso 2) | 1 |
