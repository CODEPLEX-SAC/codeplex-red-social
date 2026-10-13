# Línea base visual del Quality Gate

Ubicación permanente de la línea base que usa `scripts/quality_gate.mjs` para la comprobación «Regresión Empresas».

## Archivos

| Archivo | Contenido | SHA-256 |
|---|---|---|
| `roles.json` | Línea base **vigente y aprobada** (288 claves = 48 rutas × 6 anchos). Es la que usa el gate por defecto. | `1aed587f8401debf62b3e0fde96e1a78776e2cfbd5f21ef7601c5d4e49615e7f` |
| `roles_anterior_2026-10-09.json` | Versión inmediatamente anterior, conservada como evidencia. | `2d013b933cc0bb18aba39e5a1085f860fc8f43fb5ae4ec6f94f1f4b141cb170b` |
| `evidencia_diferencias_empresas_2026-10-10.json` | Diferencias aceptadas entre ambas versiones. | — |

## Origen

`roles.json` es una copia byte a byte (comparada con `cmp` y SHA-256, hashes idénticos antes y después) de `i_final/roles.json` de la carpeta temporal de la sesión anterior de Claude Code (`26ddb8b9-…/scratchpad/h/i_final/roles.json`), que era la «línea base oficial» citada en `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md`.

## Diferencia aceptada (2026-10-10)

Entre `roles_anterior_2026-10-09.json` y `roles.json` cambian solo cuatro claves, todas de `/empresas` (1280, 1024, 768 y 600 px), y solo el campo `iconBtn`: los 10 botones «Editar» de 32×32 px pasan de un SVG propio de 18 px a un glifo oficial `edit` de 20 px (decisión IC-273). `agg`, `campos` y `botones` son idénticos y no hay desbordes. Las otras 26 claves que difieren de la medición actual (decisiones posteriores y rediseño de Marketplace) **no** se aceptaron.

## Uso

```
npm run calidad -- --visual=<ruta/a/roles.json de la medición nueva>
```

Sin `--base`, el gate usa `herramientas/validacion/linea_base_visual/roles.json`. Se puede indicar otra con `--base=<ruta>`.

## Reglas

- No regenerar ni reemplazar `roles.json` para hacer desaparecer diferencias. Una diferencia visual se acepta solo tras revisar que corresponde a un cambio aprobado, y se registra aquí con su evidencia y los hashes anterior y posterior.
- `.gitignore` excluye `herramientas/validacion/*` salvo esta carpeta (`!herramientas/validacion/linea_base_visual/`).
