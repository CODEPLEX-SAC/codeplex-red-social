# Selector con búsqueda (`SelectorBuscable`)

## 1. Identificación

- **Componente:** `SelectorBuscable`, con su lógica `usarSelectorBuscable` y la fuente local `buscarOpcionesLocales`.
- **Propósito:** desplegable con buscador para elegir una opción entre muchas (hoy, la empresa activa de la barra superior). Es el único selector de este tipo del proyecto.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/selector_buscable.tsx`, `usar_selector_buscable.ts`, `buscar_opciones_locales.ts`; tipos en `tipos/compartido/contrato_selector_buscable.ts`; configuración en `catalogos/capacidades/redsocial/compartido.json › selector_buscable` y `tooltip_tema`.
- **Estado:** nuevo (2026-10-15/16). Tooltip del título añadido el 2026-10-19.
- **Consumidores:** `SelectorEmpresaTopbar` (único; ver [selector_empresa_topbar.md](selector_empresa_topbar.md)).

## 2. Origen e implementación

- **Origen:** propio de CodePlex, con un componente de MUI para el tooltip. El selector, su panel y su lógica no usan `@codeplex-sac/*` (la librería de formularios tiene `CodeplexSelector` con modo buscable, pero el proyecto no lo usa para este caso; no se evaluó si es equivalente). Lo único que viene de una biblioteca es el `Tooltip` de `@mui/material` 7.3.11, que ya era dependencia directa del proyecto.
- **Implementación:**
  - `selector_buscable.tsx`: disparador, `Tooltip` y panel.
  - `usar_selector_buscable.ts`: estado abierto, texto y resultados (síncronos o con promesa).
  - `buscar_opciones_locales.ts`: búsqueda local sin acentos, sin distinguir mayúsculas y por varias palabras (todas deben coincidir con los `terminos` de la opción). Exporta también `normalizarTexto` (quita tildes y pasa a minúsculas), que reutiliza el filtro de categoría de Eventos (`filtrar_eventos_por_categoria.ts`).
- **Dependencias:** `FondoPanelFlotante`, `PanelSelectorBuscable`, `Icono`, `ProveedorTemaGraficos` (tema MUI para el tooltip), `Tooltip` de `@mui/material/Tooltip`.
- **Elemento HTML nativo:** `<button>` (disparador).
- **Exportación:** barrel `componentes/compartido/index.ts` y ruta directa desde `selector_empresa_topbar.tsx`.

## 3. Contrato y comportamiento

**Props** (`SelectorBuscableProps`): `seleccionada` (`OpcionBuscable`: `id`, `titulo`, `subtitulo`, `terminos`), `fuente(texto, limite)` (devuelve `{ opciones, total }` o una promesa), `limite`, `textos`, `icono`, `alSeleccionar(id)`, `className`. Los datos los aporta el consumidor; el componente no contiene nombres, RUC ni empresas.

**Disparador:** dos líneas dentro del botón: `titulo` (truncable) y, si existe, `subtitulo` (truncable). Atributos: `aria-haspopup="dialog"`, `aria-expanded` y `aria-controls` (solo con el panel abierto). Su nombre accesible es su contenido (título y subtítulo); el componente no añade `aria-label`.

**Tooltip del título (2026-10-19):**
- Muestra únicamente `seleccionada.titulo`, nunca el subtítulo (en la barra superior, el RUC no se repite).
- Solo aparece si el título visible está realmente truncado. El componente guarda un `ref` al `<strong>` del título y, en `onMouseEnter` y `onFocus` del botón, compara `scrollWidth > clientWidth`. No usa un número fijo de caracteres ni un observador de tamaño.
- Si el título cabe, o si el panel está abierto, el `title` del `Tooltip` es `false`: MUI no muestra nada.
- `describeChild`: el `Tooltip` describe al botón con `aria-describedby` mientras está abierto y no sustituye su nombre accesible. Sin `describeChild`, MUI pondría `aria-label` con el título y se perdería el RUC en el nombre accesible.
- Ratón: aparece al pasar el cursor. Teclado: aparece con el foco visible (por ejemplo, con Tab) y se cierra con Escape.
- Al abrir el panel, el tooltip se oculta y no reaparece mientras el panel siga abierto.
- Estilo: el tema MUI compartido (`proveedor_tema_graficos.tsx`, `MuiTooltip.styleOverrides.tooltip`) aplica `compartido.json › tooltip_tema` (tamaño `--text-auxiliar`, fondo `--color-texto`, radio `--radius-control`). La posición es la predeterminada de MUI (debajo y centrada).
- **Limitación de MUI (verificada en el navegador):** con `describeChild`, MUI deja un atributo `title` nativo igual al texto mientras el tooltip está cerrado y el título está truncado. El navegador solo lo mostraría si MUI no abre antes su tooltip (por ejemplo, tras Escape con el cursor encima).

**Panel y lista:** `role="dialog"` con etiqueta; Escape y clic fuera cierran (`FondoPanelFlotante`); las flechas arriba y abajo mueven el foco entre buscador, botón de limpiar y opciones. Al cerrar se limpia el texto. Ver [panel_selector_buscable.md](panel_selector_buscable.md) y [lista_opciones_buscables.md](lista_opciones_buscables.md).

## 4. Diseño visual

- **Disparador:** 48 px de alto (`h-control`), ancho completo del contenedor, borde `--color-borde`, radio `--radius-control` (10 px), relleno horizontal 12 px, caja de icono de 28 × 28 px (`--color-primario-suave`), título `text-nombre-entidad`, subtítulo `text-auxiliar` en `--color-texto-suave` y flecha de 14 px. Medido el 2026-10-19: 48 × 296 px a 1280 px y 48 × 205 px a 1100 px.
- **Panel:** 360 px de ancho, 20 px por debajo del disparador, radio 12 px, sombra `shadow-t13`, lista con `max-h-80` (320 px) y scroll interno. En pantallas de hasta 600 px el panel pasaría a posición fija (`max-600:fixed`), pero el selector de empresa está oculto por debajo de 1100 px, así que esa rama no está en uso (no verificada).

## 5. Reutilización

- Usarlo para elegir entre muchas opciones con búsqueda (empresa, por ejemplo). Para listas cortas, usar `Selector`.
- No volver a poner `title` nativo en el disparador ni recrear un tooltip propio: la solución compartida es el `Tooltip` de MUI ya integrado.
- `ListaOpcionesBuscables` tiene fijo el icono `empresa` en cada opción; reutilizarlo con otro tipo de dato exigiría parametrizarlo.
- Si se añade otro consumidor, el tooltip del título se aplicará también a él (el cambio está dentro de `SelectorBuscable`).

## 6. Iconos

Iconos con `Icono`: el recibido por `icono` (`empresa`), `flecha-abajo` y, en la opción activa, `verificado`. Ver [iconos.md](iconos.md).

## 7. Historial

- 2026-10-15/16: creado con el selector de empresa.
- 2026-10-16/17: disparador de 40 a 48 px con el token compartido.
- 2026-10-19 (pendiente 5): el disparador vuelve a mostrar el subtítulo (RUC) bajo el nombre, con `title` nativo «nombre · RUC». Sustituye la decisión anterior de ocultar el RUC del disparador cerrado.
- 2026-10-19 (mejora del tooltip): el `title` nativo se sustituye por el `Tooltip` de MUI descrito arriba; solo muestra el nombre y solo si está truncado. La versión con `title` «nombre · RUC» queda **sustituida**; no volver a usarla.

## 8. Verificación

- **Verificado (pruebas automatizadas):** `pruebas/compartido/selector_empresa_topbar.test.tsx` (13 pruebas): el nombre accesible contiene nombre y RUC, el tooltip no aparece si el nombre cabe, aparece con el nombre truncado (solo el nombre, sin RUC), con foco de teclado y Escape, y se oculta al abrir el panel. El truncamiento se simula con `scrollWidth` y `clientWidth` porque jsdom no mide.
- **Verificado (navegador real, 2026-10-19):** nombre largo («Agroexportadora Valle Verde SAC») a 1280 px y nombre truncado a 1100 px muestran el tooltip con ratón y con teclado; no hay tooltip con nombre que cabe ni con el panel abierto; Enter abre el panel.
- **No verificado:** estado «sin resultados» y foco por teclado dentro del panel con búsqueda activa; la rama móvil del panel (el selector no se muestra por debajo de 1100 px).
