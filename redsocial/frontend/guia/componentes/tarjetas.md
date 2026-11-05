# Tarjetas (`CLASES_TARJETA`)

- **Fuente de verdad:** `compartido.json › tarjetas`, exportado como `CLASES_TARJETA` (`componentes/compartido/clases_tarjeta.ts`, también por el barrel). No hay componente de tarjeta propio; la librería ofrece `CodeplexTarjeta` (variantes `estandar`/`contorno`/`suave`, `relleno` `ninguno`/`p`/`m`/`g`), pero ningún módulo la usa y no cubre las superficies de gráficos y tablas de Red Social, así que la regla vive en el catálogo.
- **Regla:** radio `rounded-xl` (12 px; `rounded-control` de 10 px queda para controles), borde `border-borde` (`#e9e7f1`), fondo blanco, sin sombra, `min-w-0`.
- **Variantes:** `panel` (relleno 18 × 20 px: gráficos, listas, tablas en tarjeta), `mosaico` (relleno 16 px: tarjetas de indicador y de módulo) y `superficie` (sin relleno: contenedores con secciones internas, p. ej. el detalle de un módulo de Estadísticas). Las clases de maquetación propias (`col-span`, `relative`, `flex`) se añaden con `[CLASES_TARJETA.x, '…'].join(' ')`.
- **Consumidores migrados (29 tarjetas en 17 archivos):** Dashboard, Estadísticas (incluida `pagina_estadisticas_modulo`) e Indicadores. Dashboard pasó de radio 10 px, borde `gris-borde` (`#e5e7eb`) y sombra a esta regla.
- **Excepciones:** el contenedor de `tabla_datos` (borde `gris-borde`, ver `tabla_compartida.md`), «Reportes recientes» (`p-5`), Marketplace (`borde/60` con sombra), Colaboradores y Empresas (`gris-borde`), Inicio y Eventos. No se tocaron: es otra familia de superficies y falta decidir el borde global (`borde` frente a `gris-borde`).
- **Prueba:** `pruebas/compartido/tarjetas_compartidas.test.ts` impide definir a mano tarjetas equivalentes en los tres módulos.

## Bordes de otras superficies (2026-10-29)
Las tarjetas generales usan `borde`; las tablas de datos conservan `gris-borde` y las superficies de Perfil e Inicio `borde/60`. Significado y consumidores de cada token en `tokens_y_diseno_global.md › Tokens de borde`. No se fuerza un solo color de borde.

