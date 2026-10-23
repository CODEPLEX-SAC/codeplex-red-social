# Diferencias visuales aceptadas y línea base visual

Registro de las decisiones de diseño aprobadas y del estado de la línea base que usa el gate (`npm run calidad`, comprobación «Regresión Empresas»).

## 1. Estado vigente (2026-10-19)

| Dato | Valor |
|---|---|
| Archivo | `herramientas/validacion/linea_base_visual/roles.json` (carpeta local, ver §6) |
| SHA-256 vigente | `b1cce667dcce29b609574e92a6aad3c303ba5337ec80eee161b7b6fa5a24bf3c` |
| Hash anterior | `efef3a237034f993358c0979ff05f0bd5a22e30b4a6182ef390f8e5ad90346dc` (copia `roles_anterior_2026-10-19.json`) |
| Hash de la Fase 6 y anterior | `1aed587f8401debf62b3e0fde96e1a78776e2cfbd5f21ef7601c5d4e49615e7f` (copia `roles_anterior_2026-10-10.json`) |
| Medición aprobada más reciente | `f22604341edd22d78f195c84abcdf11ed4cb156952e60271c339dcb43859a03f` |
| Resultado del gate | Regresión Empresas ✅: 6 páginas, 0 distintas; el resto de comprobaciones ✅ |

**Qué compara el gate.** No compara capturas: compara la **firma medida** en el navegador (`agg`, `campos`, `iconBtn`, `botones`) de las seis claves `*|/empresas` (anchos 1280, 1024, 768, 600, 390 y 320 px) con `roles.json`. Las otras 282 claves de `roles.json` (rutas distintas de `/empresas`) no se comparan. Para tener evidencia visual se generan capturas de página completa (`AUDITORIA_FASE4_2026_evidencias/empresas/`).

**Regla:** no regenerar `roles.json` para hacer desaparecer diferencias. Una diferencia se acepta solo tras revisar que corresponde a un cambio aprobado y se registra aquí con los hashes anterior y posterior.

## 2. Diferencias aprobadas

| Diferencia | Pantallas | Origen | Aprobada |
|---|---|---|---|
| Campos y selectores estándar de 48 px (antes 40 px) | Empresas y todas las pantallas con `CampoTexto`, `CampoBusqueda`, `CampoNumero`, `Selector` por defecto o `colaboradores` | Fase 2 (`--control-height`) | 2026-10-17; incorporada a la línea base el 2026-10-19 |
| `Boton md` de 48 px, también en móvil (antes 38 px en escritorio y 34 px en móvil) | Empresas («Nueva empresa», «Filtros avanzados») y las cabeceras con `md` | Fase 2 | 2026-10-17; línea base 2026-10-19 |
| Selector de empresa de 48 px (antes 52 px) | Todas las pantallas (barra superior) | Trabajo del selector de empresa y Fase 2 | 2026-10-17 |
| Botón de carrito en la barra superior (7 botones de icono en lugar de 6) | Todas las pantallas | Trabajo de Marketplace | 2026-10-17 |
| Texto de los chips de Mensajes con peso 400 (antes 500) | Mensajes | Patrón compartido `chip_filtro` (Fase 2.6) | 2026-10-17 |
| Hover de «Nueva reunión» (`secundario`) y «Videollamar» (`contorno`) según sus variantes | Mensajes > Videollamadas | Fase 2.5 | 2026-10-17 |
| Barra superior de 64 px (la de 72 px de la Fase 2 no estaba aprobada y se revirtió) | Todas | `--height-barra-superior` (Fase 5) | Línea base 2026-10-19 |
| Primario del tema MUI `#5a43f4` (antes `#7c3aed`): foco, pestañas, paginación, casillas y barra lateral | Pantallas con componentes MUI | `tema_mui.primario` (Fase 5) | Línea base 2026-10-19 |
| Tipografía MUI heredada (`fontFamily: inherit`; el encabezado «Módulos disponibles» cabe en una línea) | Todas | `proveedor_tema_graficos.tsx` | Línea base 2026-10-19 |
| **Selector de empresa con nombre y RUC en dos líneas** (RUC `RUC 20501234567` visible) | Barra superior a 1280 px (oculto por debajo de 1100 px) | Pendiente 5, 2026-10-19 | Línea base 2026-10-19, solo `1280|/empresas` |

Las filas con «Línea base 2026-10-19» se aprobaron tras la revisión visual de las seis resoluciones de `/empresas` (Fase 6); la última se aprobó aparte tras la comparación de capturas del 2026-10-19 (ver §7).

## 3. Decisiones sustituidas (no volver a aplicarlas)

| Decisión anterior | Sustituida por | Fecha |
|---|---|---|
| Selector de empresa con el RUC oculto cuando está cerrado (52 → 48 px «sin RUC») | Nombre y RUC en dos líneas | 2026-10-19 |
| `title` nativo «nombre · RUC» como tooltip del selector (primera versión del pendiente 5) | `Tooltip` de MUI con solo el nombre, y solo si está truncado | 2026-10-19 |
| «Regresión Empresas ❌ pendiente de aprobación» (informes y guías anteriores) | Línea base aprobada; gate en verde | 2026-10-19 |
| Barra superior de 72 px (Fase 2) | 64 px (Fase 5) | 2026-10-17 |

## 4. Correcciones de la fase posterior (2026-10-17)

| Corrección | Archivo | Resultado medido |
|---|---|---|
| Prefijo telefónico «+51» de «Nueva empresa»: `Selector default` en lugar de `mini` | `componentes/empresas/bloques/seccion_informacion_empresa.tsx` | 48 px, misma posición vertical que el campo; sin desborde a 1280, 820, 400 y 320 px |
| Selectores `integrado` de Colaboradores (invitar y editar) | — | Medidos: 48 px dentro de campos de 48 px, centrado 0; sin cambio necesario (el 2026-10-19 perdieron el ancho mínimo, ver [selector.md](selector.md)) |
| Botón «Eliminar borrador» de Eventos: `peligro_contorno` con `border-peligro-texto!` | `componentes/eventos/bloques/editar_evento.tsx` | Texto y borde `#ca2323`, hover `#fef2f2`, 48 px |

## 5. Diferencias de otras pantallas: pendientes de aprobación (VIS-02)

La línea base solo cubre `/empresas`. Las siguientes diferencias intencionales de las Fases 5 y 6 afectan a otras pantallas, cuyas 282 claves de `roles.json` **conservan su línea base anterior** y no se han revisado visualmente. **Estado: pendiente de aprobación de la usuaria**, solo si se desea ampliar la línea base.

| Cambio | Pantallas | Origen |
|---|---|---|
| Selectores de cabecera en lugar de botones con chevron | Actividad > Módulos/Sistema, Amigos, Grupos > Invitaciones | `Selector variant="mini"` (40 px) |
| Banners de Grupos con padding 14 px, radio 12 px e icono 36 px (antes 20/10/44) | Grupos | `BannerInformativo` |
| Pestaña «Sistema» de Notificaciones con página propia | Notificaciones | `PaginaAvisosSistema` |
| Panel de Ubicación apilado por debajo de 900 px y ajustado al viewport | Eventos | `FiltroDesplegable` / `MarcoPanelFiltro` |
| Disparador de Categoría con «: n» al haber selección y «quitar» como botón hermano | Eventos | `FiltroDesplegable` |
| Píldoras de Inicio (30 px, radio completo) | Inicio (modal de publicación) | `Boton size="pildora"` (Fase 6) |
| Pies de lista de 49 px y enlaces de Grupos como `Boton` | Amigos, Grupos | `BotonPieLista` (Fase 6) |
| Foco unificado: borde de 2 px y halo de 4 px, incluida fecha/hora | Formularios | `foco_campo` |
| Formulario «Invitar colaborador»: teléfono en dos controles, documento con selector compacto, sin texto de ayuda en «Cargo / Puesto», bandera de Perú con franjas verticales | Colaboradores | 2026-10-19 |
| Método «Transferencia bancaria» eliminado | Marketplace > pago | 2026-10-19 |

## 6. Dónde está cada archivo y qué se comparte con el equipo

- `herramientas/validacion/linea_base_visual/` (`roles.json`, `roles_anterior_*.json`, `LEEME.md`, evidencias JSON) es una carpeta **local**: la regla `herramientas/` de `.gitignore` la excluye. Su `LEEME.md` describe una excepción (`!herramientas/validacion/linea_base_visual/`) que **no existe** actualmente en `.gitignore`. Si el equipo necesita compartir la línea base, hay que decidir esa excepción; no se modificó.
- La evidencia visual de las revisiones está en `AUDITORIA_FASE4_2026_evidencias/empresas/` (`cmp`, `cmp6`, `cmp7`).
- Informe de cierre: `AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md` (§«Cierre» y «Cierre final de la línea base»).

## 7. Historial de aprobaciones de la línea base

| Fecha | Qué se actualizó | Hash anterior → nuevo |
|---|---|---|
| 2026-10-10 | Solo `iconBtn` de cuatro claves `/empresas` (glifo oficial de editar, IC-273) | `2d013b93…` → `1aed587f…` |
| 2026-10-19 (Fase 6) | Las seis claves `/empresas` (48 px, selector sin RUC, carrito, barra de 64 px, tipografía heredada, primario `#5a43f4`). Revisión visual de seis anchos; 45 px de diferencia por la fecha del tooltip «Última actualización» | `1aed587f…` → `efef3a23…` |
| 2026-10-19 (pendiente 5) | Solo `1280|/empresas`, campos `agg` y `probados`: aparece el texto `RUC 20501234567`. A 1280 px las capturas difieren en 3085 píxeles (tolerancia 0), todos en el botón de empresa; a 1024, 768, 600, 390 y 320 px, 0 píxeles. Las otras 5 claves de Empresas y las 282 restantes, idénticas | `efef3a23…` → `b1cce667…` |

Documentos de detalle: `herramientas/validacion/linea_base_visual/LEEME.md` y `evidencia_diferencias_empresas_*.json` (local), y [selector_empresa_topbar.md](selector_empresa_topbar.md).
