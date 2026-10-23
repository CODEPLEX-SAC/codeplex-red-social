# Botón (`Boton` y `clasesBoton`)

## 1. Identificación

- **Componente:** `Boton` y el ayudante `clasesBoton`.
- **Propósito:** única fuente de las variantes y tamaños de los botones de acción. `clasesBoton` entrega las mismas clases para enlaces `<a>` que deben verse como botón.
- **Ubicación:** `redsocial/frontend/componentes/compartido/interfaz/boton.tsx`. Tipos: `tipos/compartido/contrato_boton.ts`. Configuración: `catalogos/capacidades/redsocial/compartido.json`.
- **Estado:** existente y adaptado (variantes y tamaños reescritos entre 2026-10-15 y 2026-10-17; variante `pildora` añadida en la Fase 6).
- **Consumidores:** todos los módulos. 214 usos JSX de `<Boton>` en 133 archivos de `componentes/`, `paginas/` y `formularios/` (conteo del 2026-10-19; el 2026-10-17 eran 219 en 134). `clasesBoton` lo usan 9 archivos además de `boton.tsx`: `panel_lateral_solicitudes_aviso`, `columna_publicidad`, `seccion_actividad_reciente_grupos`, `panel_lateral_guardados`, `bloque_en_llamada`, `seccion_contactos_frecuentes2`, `seccion_reuniones_programadas`, `seccion_videollamada_iniciar` y `pagina_mensajes_videollamadas`.

## 2. Origen e implementación

- **Origen:** propio de CodePlex. No importa `@codeplex-sac/*` ni MUI. Las librerías `@codeplex-sac/*` instaladas no exportan ningún componente de botón.
- **Implementación:** `boton.tsx` (renderiza un `<button>` HTML nativo).
- **Exportación e importación:** exportado por el barrel `componentes/compartido/index.ts` (`export * from './interfaz/boton'`). Importación habitual: `import { Boton, clasesBoton } from '../../componentes/compartido'` o la ruta directa `.../compartido/interfaz/boton`.
- **Dependencias:** `tipos/compartido/contrato_boton.ts` y `compartido.json` (claves `boton_base`, `boton_medio`, `boton_tamanos_medios`, `boton_tamanos`, `boton_variantes`, `boton_activo`, `boton_icono_por_tamano`, `boton_icono_clases`).
- **Elemento HTML nativo:** `<button>`. Los enlaces con aspecto de botón siguen siendo `<a>` y solo reutilizan `clasesBoton`.

## 3. Contrato y características

**Props de `Boton`** (`BotonProps` extiende `ButtonHTMLAttributes<HTMLButtonElement>`):

| Prop | Valores | Predeterminado |
|---|---|---|
| `variant` | `primario`, `secundario`, `oscuro`, `peligro`, `exito`, `contorno`, `peligro_contorno`, `filtro`, `enlace`, `fantasma` | sin variante: solo `border-transparent` |
| `size` | `mini`, `default`, `md`, `cta`, `filtro`, `pildora`, `enlace`, `enlace_accion`, `pie_lista` | `default` |
| `activo` | `boolean`; solo cambia `filtro` y `fantasma` (`boton_activo`) | — |
| `className` | clases locales que se añaden al final | — |

`clasesBoton({ variant, size, activo, className })` devuelve el mismo `className` que aplica `Boton`.

**Estados:** normal; `hover` por variante (todas las variantes con fondo o borde lo definen: `primario`, `secundario`, `contorno`, `peligro_contorno`, `filtro` inactivo, `fantasma` y `enlace` con subrayado; `oscuro`, `peligro` y `exito` no tienen `hover`); `focus` visible global; `disabled` (`disabled:opacity-40`, `cursor-not-allowed`); `activo` para `filtro` y `fantasma`.

**Accesibilidad:** al ser `<button>` conserva teclado y semántica nativos. No añade `aria-*`; los consumidores los pasan por `...rest` (por ejemplo `aria-pressed`, `aria-expanded`). Un enlace creado con `clasesBoton` no admite `disabled` (no verificado que algún consumidor lo necesite).

**Restricciones:** `md` y `cta` comparten `boton_medio`; el alto de ambas variantes lo da `min-height`, no `height`; `filtro` usa `h-8` fijo.

## 4. Diseño visual

| Variante de tamaño | Alto | Relleno horizontal | Texto | Radio |
|---|---|---|---|---|
| `md` | 48 px (`min-h-control`, token `--control-height`) | 18 px (13 px por debajo de 600 px) | 14 px / 600 (`text-boton`) | 8 px (7 px por debajo de 600 px) |
| `cta` | 40 px (`min-h-10`) | 18 px (13 px) | 14 px / 600 | 8 px (7 px) |
| `default` | 34 px (30 px por debajo de 600 px) | 13 px (10 px) | 14 px / 600 | 7 px |
| `mini` | 30 px | 10 px | 12 px / 600 (`text-boton-mini`) | 7 px |
| `filtro` | 32 px | 12 px | 14 px / 500 (`text-chip`) | 8 px |
| `pildora` | 30 px (`min-h-7.5`) | 10 px | 12 px / 600 (`text-boton-mini`) | completo (`rounded-full`) |
| `enlace` | línea de texto (≈ 23 px medidos) | 0 | 14 px / 600 | — |
| `enlace_accion` | línea de texto | 0 | 12 px / 600 (`text-enlace-accion`) | — |
| `pie_lista` | ≈ 49 px (`p-3.5`) | 14 px | 14 px / 600 | 0 |

Medido en el navegador el 2026-10-16/17 a 1280, 820, 400 y 320 px; el alto de `md`, `cta`, `mini` y `filtro` no cambia por ancho.

- **Hueco entre icono y texto:** 8 px (`gap-sm`). El icono ocupa una caja de 16 × 16 px en `md`, `cta` y `default`, y de 14 × 14 px en `mini`, `pildora` y `filtro`; el glifo de la librería pierde su `transform: scale(1.1)` global dentro de botones.
- **Colores por variante** (tokens de `montaje_local/index.css`):
  - `primario`: fondo `--color-primario` `#5a43f4`, texto blanco, `hover` `--color-primario-oscuro` `#4630d7`.
  - `secundario`: fondo blanco, borde `--color-gris-borde` `#e5e7eb`, texto `--color-texto-boton-secundario` `#5d5a70`, `hover` fondo `--color-fondo-hover-suave` `#f5f3ff`.
  - `contorno`: borde y texto `--color-primario`, `hover` relleno primario y texto blanco.
  - `peligro_contorno`: borde `--color-borde-peligro-suave` `#fca5a5`, texto `--color-negativo-kpi` (alias de `--color-peligro-texto` `#ca2323`), `hover` fondo `--color-fondo-peligro-suave` `#fef2f2`.
  - `oscuro`, `peligro` y `exito`: fondo `--color-fondo-boton-oscuro`, `--color-peligro-texto` y `--color-exito-texto` con texto blanco.
  - `filtro`: borde `--color-borde`, texto `--color-texto-suave`, `hover` borde y texto primarios; activo: fondo `--color-fondo-activo-filtro` `#f3f0ff` y borde y texto primarios.
  - `enlace`: texto primario, subrayado en `hover`; `fantasma`: texto `--color-texto-suave`, `hover` fondo `--color-fondo` y texto primario.
- **Foco:** regla global `:focus-visible` (contorno de 2 px `--color-foco` con desplazamiento de 2 px).
- **Responsive:** `md`/`cta` reducen relleno y radio por debajo de 600 px; `default` reduce alto y relleno.

## 5. Integración con el sistema compartido

- **Fuente de verdad:** `compartido.json`. Si se cambia alto, relleno, radio, texto, tamaño de icono o colores de una variante en ese archivo, se actualizan todos los `Boton` y los enlaces creados con `clasesBoton`. No se actualizan `BotonIcono`, los chips (`chip_filtro`) ni los controles nativos propios.
- **Regla de uso acordada (2026-10-17):** `md` para la acción principal de una página o cabecera; `cta` para llamadas a la acción dentro de tarjetas, paneles y secciones; `default` para acciones compactas de listas, tablas y áreas secundarias; `mini` en densidad alta.
- **Overrides locales conservados:**
  - `max-900:w-full`, `w-full` y `flex-none` en muchas pantallas (anchos).
  - `border-transparent! text-primario!` en «Explorar grupos» de Guardados y `border-borde-exito-suave! text-positivo-kpi! hover:bg-fondo-categoria-verde!` en el consejo de Grupos (tono propio sobre un panel de color).
  - `text-texto-suave!` en el cuarto anuncio de `columna_publicidad.tsx`.
  - `border-peligro-texto!` sobre `peligro_contorno` en «Eliminar borrador» de `editar_evento.tsx`.
  - `h-auto py-2.5` en las opciones de `modal_seleccion_pago.tsx` y `py-1.5` en `tabs_tipo_planes.tsx` (botones de dos líneas).
- **Fuera del sistema compartido:** `<button>` nativos registrados como excepción en `pruebas/compartido/registro_componentes_permitidos.ts` (calendario, segmentos Mes/Semana/Día, controles de llamada, filas de conversación, «Crear nueva lista», puntos del carrusel) y los chips (`chip_filtro.md`).

## 6. Dependencias y procedencia de iconos

No usa iconos propios: renderiza el contenido que recibe. Los iconos que acompañan al texto son `Icono` (ver `iconos.md`) y su tamaño dentro del botón lo fija `boton_icono_por_tamano`/`boton_icono_clases`. No se comprobó ningún uso de Lucide ni de iconos de React en los botones.

## 7. Historial de modificaciones

Cambios hechos en este proyecto (no hay librería que modificar):

- **2026-10-15/16 (Fase 2):** `md` pasa de 38 px (34 px en móvil) a 48 px; token `--control-height` de 44 a 48 px; `boton_base` y `boton_icono_base` salen del código al catálogo; se elimina `clases_boton_mini`.
- **2026-10-16 (Fase 2.2):** nueva variante `cta` (40 px) usada en «Elegir plan», «Ver planes» y «Activar período de prueba»; `boton_medio` y `boton_tamanos_medios` evitan duplicar clases entre `md` y `cta`.
- **2026-10-16 (Fase 2.5):** helper `clasesBoton`; tamaños de icono por variante; unificación de «Aceptar», «Rechazar», «Eliminar» y «Ver evento» en `default`; seis enlaces migrados de clases propias a `clasesBoton`.
- **2026-10-17 (Fase 2.6):** `hover` en `secundario`; iconos con caja de 16 × 16 px; acciones de cabecera en `md`; «Eliminar borrador» pasa a `peligro_contorno`.
- **2026-10-17 (Fase 5):** el primario del tema MUI pasa a `#5a43f4`; `FiltroDesplegable` usa `Boton filtro` como disparador.
- **2026-10-17 (Fase 6):** nuevo tamaño `pildora` (ver abajo); los pies de lista escritos a mano se reemplazan por `BotonPieLista`; «Ir a configuración» y «Ver todas las invitaciones» (Grupos > Invitaciones) pasan a `Boton secundario default` (34 px; 30 px por debajo de 600 px).
- **Impacto de modificar el componente:** afecta a 214 usos JSX y a los enlaces con `clasesBoton`. Cualquier cambio de alto obliga a revisar las filas flex que estiran al botón (por ejemplo `tarjeta_invitacion.tsx`, `seccion_tus_amigos.tsx`) y la línea base visual de Empresas.


## Tamaño `pildora` (Fase 6)
`size="pildora"` (30 px, `px-2.5`, `text-boton-mini`, radio completo, icono de 14 px) sustituye la combinación `size="mini"` + `className="rounded-full"` de las píldoras de selección de Inicio (tipo y prioridad de publicación; `BloqueUsuarioTipoPublicacion` y `BloquePrioridadPublicacion`, con `variant="filtro"` y `aria-pressed`). Medido en el modal de publicación: 30 px de alto y radio completo, igual que antes. No se usa para chips de navegación (`clasesChip`, 32 px) ni para `Boton filtro` (32 px, radio 8 px), que cumplen otra función.

## Excepciones locales que se conservan
- **INC-09, `Boton variant="enlace"` con `gap-1 border-0 p-0`** (o `gap-1.5`) en Eventos («Más ciudades», «Cambiar ubicación», «Volver a mis eventos»): la variante `enlace` conserva el borde y el relleno del botón base. Una prueba fija `size="enlace_accion"` en `seccion_titulo_buscar.tsx` y los overrides no alteran la medida contractual. Excepción justificada; en una función nueva usar `variant="enlace"` con `size="enlace"` o `enlace_accion` y evitar nuevos `className` de relleno.
- **INC-14, `TarjetaInvitacion` (Eventos):** el botón secundario cambia a estilo suave por CSS responsive (`max-900:`). Decisión visual local documentada; no replicar en otros sitios.
- **INC-15, «Cerrar sesión»** (`panel_usuario_topbar.tsx`): `Boton peligro_contorno` con tamaño y radio propios (fila de menú de 58 px). No existe un ítem de menú compartido equivalente.
- **INC-27, `TabsTipoPlanes` (Marketplace):** usa `Boton md` con contenido de dos líneas (61 px) como selector de plan, no como navegación por pestañas.
- **Botones de dos líneas en la pasarela:** `h-auto py-2.5` en `modal_seleccion_pago.tsx`.

Detalle y estado de cada una en [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md).

---
Verificado el 2026-10-19 contra el contrato (`contrato_boton.ts`), el catálogo (`compartido.json`), el componente (`boton.tsx`) y los consumidores citados. Medidas de alto y variantes medidas en el navegador el 2026-10-16/17 y durante las Fases 5 y 6; no se volvieron a medir todas el 2026-10-19. Lo marcado como **no verificado** o **no determinado** no pudo comprobarse con los archivos ni con el navegador.
