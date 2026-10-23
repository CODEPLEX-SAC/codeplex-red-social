# Evidencias de la auditoría Fase 4

Generado por la auditoría de solo lectura del 2026-10-17. No contiene código de la aplicación.

- `empresas/ref|act|cmp/`: capturas de página completa de `/empresas` (referencia = commit `a2b857e` renderizado aparte; actual = árbol de trabajo) a 1280, 1024, 768, 600, 390 y 320 px, imágenes lado a lado y de diferencias (rojo = píxel distinto con umbral 30/765 por canal).
- `eventos/`: capturas de los paneles de filtro de Eventos (Fecha, Categoría, Ubicación) abiertos y tras seleccionar, a 1280, 820, 400 y 320 px.
- `foco/`: capturas de los formularios usados en la sonda de foco.
- `datos/`: resultados de las sondas (`evt.json`, `foco_all.json`, `imgdiff.json`, `emp_estilos.json`, `emp_head.json`, `banner.json`), el inventario procesado (`datos.json`), el recuento estático de usos en el código (`estatico.json`) y `mediciones_crudas.zip` (JSONL de cada pasada).
- `datos/sondas_scripts.zip`: scripts de las sondas (Chrome headless por CDP contra `http://localhost:5173`) y del análisis. Contienen rutas absolutas de la sesión de trabajo; sirven como evidencia del método, no como herramienta instalable.

Las mediciones son del navegador (getBoundingClientRect / getComputedStyle); los contratos proceden del código (compartido.json, index.css).

## Estructura y convención (consolidada el 2026-10-20)

Esta es la carpeta de evidencias de la **auditoría de diseño compartido** (informe maestro: `AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md`, libro `AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.xlsx`). El nombre conserva «FASE4» porque varios documentos, JSON de evidencia y el `LEEME.md` de la línea base citan estas rutas; **no se movió ni renombró ningún archivo**. Las evidencias de iconografía están en `AUDITORIA_ICONOS_LIBRERIA_2026_capturas/`.

| Subcarpeta | Contenido | Archivos |
|---|---|---|
| `empresas/ref` · `empresas/act` | Capturas de `/empresas` en la referencia (commit `a2b857e`) y en el árbol de trabajo de la Fase 4 | 6 + 6 |
| `empresas/cmp` | Lado a lado y diferencias de la Fase 4 | 12 |
| `empresas/act6` · `empresas/cmp6` | Estado y comparación de la línea base aprobada el 2026-10-19 | 6 + 12 |
| `empresas/cmp7` | Comparación de la actualización del selector de empresa con RUC (12 imágenes y 2 JSON de diferencias) | 14 |
| `eventos` | Paneles de filtro de Eventos | 24 |
| `foco` | Formularios de la sonda de foco | 6 |
| `fase6` | Mediciones de las Fases 5 y 6 (`cierre.json`, `f5.json`, `f6.json`, `f6b.json`) y `numero_habilitado.png` | 5 |
| `datos` | Resultados de las sondas, inventario procesado, mediciones crudas y scripts (zip) | 10 |

**Regla para nuevas auditorías de diseño:** guardar las capturas y mediciones dentro de esta carpeta, en una subcarpeta por tema o módulo (por ejemplo `empresas/`, `eventos/`, `perfil/`), con nombres que incluyan el ancho en píxeles y el estado; no crear carpetas raíz nuevas por fase o revisión. Una captura que sustituya a otra se guarda al lado, sin borrar la anterior, y se cita en el informe maestro.

**Qué no se verificó en la consolidación:** no se abrió cada imagen; la descripción de cada subcarpeta procede de este archivo, de los nombres de los archivos y de los informes que las citan.
