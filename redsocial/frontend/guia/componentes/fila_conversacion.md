# Fila de conversación (`FilaConversacion`) y lista de conversaciones

## 1. Identificación

- **Componente:** `FilaConversacion` (patrón único de fila) dentro de `ListaConversaciones`.
- **Propósito:** una fila reutilizable para conversaciones individuales y grupales de Mensajería: avatar con presencia, anillo de historias, nombre, vista previa de la última actividad, fecha compacta, contador de no leídos y menú contextual de tres puntos horizontales.
- **Ubicación:** `componentes/mensajeria/bloques/fila_conversacion.tsx`, `lista_conversaciones.tsx`, `modal_confirmar_conversacion.tsx`, `usar_historias_conversacion.ts`; lógica en `logica_fecha_mensajeria.ts`, `logica_actividad_conversacion.ts`, `logica_acciones_conversacion.ts`.
- **Contratos:** `tipos/mensajeria/contrato_mensajes.ts` (`ConversacionConEtiqueta`), `contrato_acciones_conversacion.ts`, `contrato_lista_conversaciones.ts`.
- **Catálogo (única fuente de clases y textos):** `mensajeria.json › clases.lista`, `conversacion.etiqueta_tiempo`, `conversacion.historias_vista_previa`, `acciones_conversacion`; aros en `compartido.json › aro_historia`.
- **Origen:** propio, compuesto con componentes compartidos (`AvatarUsuario`, `Insignia`, `BotonIcono`, `Menu`, `Modal`, `AroHistoria`, `EnlacePerfilUsuario`).

## 2. Estructura y accesos (chat, perfil, historia son distintos)

> Actualización 2026-10-29 (revisión visual): la fila se compone de **dos líneas** (nombre + fecha; vista previa + contador), la caja del avatar es de 48 px para todos, los tres puntos solo aparecen con hover y toman el sitio del contador (que se desplaza a la izquierda), el chip «No leídos» es un número simple con la suma de mensajes sin leer y los chips filtran la lista. Detalle en la sección «Ajustes tras la revisión visual» del informe maestro.

La fila es un `div.group.relative` (no un botón) para no anidar controles interactivos. Dentro:

| Zona | Elemento | Qué abre |
|---|---|---|
| Avatar con historias | `AroHistoria` (botón, `data-estado-historia`) | el **visor de historias** (reutiliza `VisorHistoria` de Inicio); no abre el chat |
| Avatar sin historias (individual) | `EnlacePerfilUsuario` | el **perfil** de la persona |
| Avatar de grupo | solo avatar | nada |
| Texto, fecha y contador | `button` principal estirado (`after:absolute after:inset-0`) | el **chat** |
| Tres puntos | `BotonIcono` (`data-boton-menu`) | el menú; nunca abre el chat |

Abrir el chat no marca las historias como vistas; ver una historia no cambia el estado de lectura de los mensajes (almacenes separados: `ALMACEN_MENSAJERIA` y `ALMACEN_HISTORIAS_VISTAS`).

## 3. Avatar, presencia y anillo de historias

| Historias de la persona | Anillo (`compartido.json › aro_historia.estados`) | Nombre accesible |
|---|---|---|
| `nueva` (alguna sin ver) | `ring-primario` (color primario) | «Ver historias nuevas de :nombre» |
| `vista` (todas vistas) | anillo neutro | «Ver historias de :nombre» |
| `ninguna` | sin anillo | — |

La presencia (punto verde) la dibuja el avatar oficial; el anillo la rodea sin tapar el contador, que está fuera del avatar.

## 4. Vista previa y fecha

- **Vista previa:** prevalece la actividad más reciente. Si `actividadHistoria.publicadaEn` es posterior al último mensaje, se muestra «:nombre subió :n historias» (singular «subió 1 historia») **solo si el conteo existe en los datos** (`HISTORIAS_CONTACTOS`); sin conteo se usa el texto genérico, sin cifra. Un mensaje más reciente que la historia prevalece. Los grupos nunca muestran actividad de historias de una persona.
- **Fecha compacta (un solo formateador, `etiquetaDeConversacion`):**

| Antigüedad (días de calendario locales) | Visible | Ejemplo |
|---|---|---|
| hoy | hora en el formato existente de CodePlex | `10:05 AM` |
| ayer | «Ayer» | `Ayer` |
| 2 a 6 días | nombre del día | `Martes` |
| 7 días o más | `DD/MM/AAAA` | `19/10/2026` |
| futura | `DD/MM/AAAA` (representación segura) | `27/10/2026` |
| inválida o ausente | vacío | |

Exactamente 7 días atrás ya es fecha numérica (decisión documentada: la semana visible va de «Ayer» a seis días). La comparación usa año/mes/día **locales**, no horas transcurridas, por lo que el cambio de mes, de año y de horario de verano no desplazan la categoría. La fecha y hora completas viajan en los datos (`fechaActividad`, ISO) y se exponen en `<time dateTime>` y `aria-label` («Martes, 12 de agosto de 2025 10:05 AM»).

## 5. Contador

Variante `counter` de `Insignia` (insignia oficial) en la zona derecha, bajo la fecha. Se oculta con 0. Desde 100 muestra «99+» y el valor real queda en `role="img"` + texto solo para lectores («128 mensajes sin leer»). «Marcada como no leída» (sin contador real) se señala con el punto sobre la hora y un texto solo para lectores.

## 6. Menú de tres puntos horizontales

- Glifo oficial `more_horiz` (alias `puntos`) por el contenedor `Icono`; ver [iconos.md](iconos.md).
- **Oculto en reposo** (`opacity-0`); visible con `group-hover`, `group-focus-within`, `focus-visible` y `data-[abierto=true]` (permanece mientras el menú está abierto). Ocupa siempre su ranura de 24 × 24 px (`ranura_menu`, posición absoluta en la esquina inferior derecha de la fila): aparecer o desaparecer **no mueve** avatar, nombre, vista previa, fecha ni contador.
- **Táctil** (`pointer-coarse`): no se muestra en todas las filas; solo en la fila `data-tactil=true` (última tocada) o `data-activa=true` (abierta). Pulsar el botón abre el menú y no abre el chat. Pulsación larga o clic derecho (`contextmenu`) en la fila abre el mismo menú.
- Accesibilidad: nombre «Más acciones de :nombre», `aria-haspopup="menu"`, `aria-expanded`, foco visible, Escape cierra y devuelve el foco.

### Acciones (`accionesDeConversacion`)

| `actionId` | Individual | Grupal | Confirmación | Efecto en el frontend |
|---|---|---|---|---|
| `marcar_leido` / `marcar_no_leido` | sí (alterna según estado) | sí | no | `marcarConversacionLeida` / `marcarConversacionNoLeida` |
| `silenciar` / `activar_notificaciones` | sí | sí | no | `alternarSilencioConversacion` |
| `ver_perfil` | sí (si hay `participantId`) | no | no | navega a `rutaPerfilUsuario(participantId)` |
| `abandonar_grupo` | no | sí | **sí** (peligro) | `abandonarGrupoConversacion` (solo grupos) |
| `eliminar_chat` | sí | sí | **sí** (peligro) | `quitarConversacion` |

No existen «Archivar» ni «Fijar». Todos los efectos son **estado local de demostración** (ver informe maestro, Ronda 13): se pierden al recargar y no hay llamada a servidor.

## 7. Medidas (1280 px, antes → después)

| Medida | Antes | Después |
|---|---|---|
| Columna de la lista | 300 px | 330 px (290 px con `max-1100`) |
| Chat | 337 px | 307 px |
| Fila | 259 px | 289 px |
| Texto (nombre y vista previa) | 101,4 px, **nombre truncado** (ancho natural 131 px) | 139,8 px, nombre completo |
| Fecha | 69,6 px («12 ago 2025») | 65,2 px («12/08/2025») |
| Menú | no existía | 24 × 24 px, absoluto en la esquina inferior derecha de la fila (sin ancho propio) |
| Chips «Todos / No leídos / Favoritos» | 73,5 / 101,9 / 78,6 px | 91 / 102 / 91 px (sin desborde) |

La zona estrecha era el **texto** de la fila. Primero se colocó el menú dentro de la columna derecha (bajo la fecha) para que no consuma ancho propio (el nombre pasó a 119,8 px) y después se probaron 320 px (nombre 129,8 px: falta 1 px) y 330 px (139,8 px, nombre completo). No se tocó el panel completo ni se usaron medidas arbitrarias. A 390 px la fila mide 342 px y el nombre 198,3 px (antes 190,2 px).

## 8. Pruebas

`pruebas/mensajeria/logica_mensajeria.test.ts` (fechas: hoy, ayer, cada día de la semana, siete días, más de siete, cambio de mes y de año, futuras, inválidas), `logica_acciones_conversacion.test.ts` (identificadores, acciones por tipo, transiciones, actividad y vista previa), `mensajeria_fila_menu.test.tsx`, `mensajeria_fila_acciones.test.tsx` y `mensajeria_fila_accesos.test.tsx` (menú, confirmaciones, táctil, accesos distintos), `pruebas/compartido/insignias_notificacion_tres_puntos.test.tsx` (contadores).

Verificado el 2026-10-29 contra el código (rama `codeplexMaster`, cambios sin confirmar) y en navegador a 1280 y 390 px.
