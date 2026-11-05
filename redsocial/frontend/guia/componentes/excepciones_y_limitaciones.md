# Excepciones de diseño, limitaciones y verificaciones pendientes

Registro único de lo que **no debe normalizarse automáticamente** y de lo que **no está resuelto o verificado**. Léalo antes de «corregir» algo que parezca una inconsistencia: puede ser una decisión justificada. Las referencias INC/ACC/PEN/VIS/CAR son los identificadores de la auditoría de la Fase 4 y su cierre (`AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md` y su Excel).

## Cómo se clasifica cada elemento

| Estado | Significado |
|---|---|
| **Verificado** | Comprobado en el código, en pruebas automatizadas o en el navegador; se indica cómo |
| **Excepción justificada** | Difiere del patrón compartido por una razón funcional; se conserva y está documentada |
| **Limitación funcional** | El comportamiento no existe (datos o reglas de negocio fuera del alcance técnico); no es un defecto visual |
| **No verificado** | No se comprobó; se indica qué falta |
| **Pendiente de decisión** | Requiere una decisión de diseño o de producto antes de actuar |

## 1. Excepciones de diseño justificadas

| Id | Dónde | Cómo se comporta | Por qué se conserva | Qué usar en una función nueva |
|---|---|---|---|---|
| INC-08 | Chips de Mensajes (`ListaConversaciones`, `clasesChip` con `px-2!`) | Relleno horizontal de 8 px en lugar de 14 px | Con 14 px la fila mediría 286, 764, 383 y 304 px frente a contenedores de 278, 757, 376 y 296 px (1280, 820, 400, 320 px) y desbordaría (medido en navegador) | `clasesChip` por defecto (14 px) salvo que la fila no quepa |
| INC-09 | Eventos («Más ciudades», «Cambiar ubicación», «Volver a mis eventos») | `Boton variant="enlace"` con `gap-1 border-0 p-0` | Los overrides no alteran la medida contractual; una prueba fija `size="enlace_accion"` | `Boton variant="enlace"` con `size="enlace"` o `enlace_accion`; ver [boton.md](boton.md) |
| INC-10 | `CabeceraModalEmpresa`, «Quitar imagen actual» (Eventos), «Quitar logo» (Empresas), `FilaEmpresa` | `BotonIcono` con colores propios (sobre fondo oscuro o sobre imagen, y tono destructivo) | `sobre_oscuro` tiene otros colores y no existe variante destructiva ni sobre imagen; añadirlas es una decisión de diseño nueva | Variantes existentes de `BotonIcono` ([boton_icono.md](boton_icono.md)) |
| INC-11 | Pestañas de los modales de Empresas (`modal_detalle_empresa`, `cuerpo_editar_empresa`) | `Pestanas` con `px-6 max-480:px-4` | No hay variante de pestañas para modal | `Pestanas` sin override fuera de esos modales |
| INC-14 | `TarjetaInvitacion` (Eventos) | El botón secundario pasa a estilo suave a ≤900 px con clases `max-900:` | Decisión visual local | No replicar; usar una variante |
| INC-15 | «Cerrar sesión» en `PanelUsuarioTopbar` | `Boton peligro_contorno size="enlace"` con tamaño y radio propios (fila de menú de 58 px) | No existe un ítem de menú compartido equivalente | `Menu` para menús contextuales |
| INC-18 | Barra superior | Campana de 36 px y botón de usuario de 40 px (botones nativos) junto a `BotonIcono` de 32 px y campos de 48 px | Excepciones nativas registradas (clase B) en `pruebas/compartido/registro_componentes_permitidos.ts`; la altura de la barra (64 px) sí se centralizó | Seguir el patrón existente de la barra |
| INC-19 | Selectores de cabecera (`Selector variant="mini"`) | Altura de 40 px, no 48 px | MUI `size="small"`; es el contrato de facto de los 6 selectores de cabecera y está documentado en [selector.md](selector.md) | `Selector variant="mini"` para filtros/orden de cabecera |
| INC-20 | Paneles desplegables | Radios distintos: `Select` 12 px, `Menu` 4 px, selector de fecha 4 px | Cada familia hereda el estilo de su componente MUI; sin defecto visible | No unificar sin una decisión de diseño |
| INC-27 | `TabsTipoPlanes` (Marketplace) | `Boton md` con contenido de dos líneas (61 px) como selector de plan | No es una navegación por pestañas | `Pestanas` para navegación entre vistas |
| — | Controles nativos registrados | 37 `<button>` nativos (conteo del 2026-10-19: Eventos 13, Compartido 9, Mensajería 9, Acceso 2, Marketplace 2, Inicio 1, Amigos 1) y patrones especiales: controles de videollamada (clase G), tarjeta punteada de alta de lista (F), filas de opción (C), control segmentado Mes/Semana/Día, disparador con forma de campo de la publicación, indicadores de carrusel | Cada uno figura en `registro_componentes_permitidos.ts` con clasificación y motivo; las filas de Mensajes son idénticas en markup pero con contenido distinto | Antes de añadir un `<button>` nativo, comprobar `Boton`/`BotonIcono` y registrar la excepción si procede |
| INC-12 | Pies de lista que no son `BotonPieLista` | Pies con flecha a la derecha de Eventos (navegación), «Cargar más notificaciones» de Menciones (`Boton secundario md` fuera de la tarjeta) y «Ver más» de la barra superior (enlace con ruta real) | Función distinta de «expandir lista» | `BotonPieLista` para expandir una lista |
| INC-26 | «Ver más» del panel de notificaciones de la barra superior | Enlace de 36 px con ruta real | Es navegación, no una acción | Los enlaces de Grupos > Invitaciones sí son `Boton secundario default` |

**Verificado:** cada fila procede del cierre de las Fases 5 y 6 (medición en navegador y pruebas) y se contrastó con el código el 2026-10-19 para los archivos citados.

## 2. Limitaciones funcionales documentadas

| Qué | Detalle | Evidencia |
|---|---|---|
| Notificaciones > Sistema (INC-28b) | La ruta `/notificaciones/sistema` existe y su pestaña está activa, pero muestra el estado vacío (`mensajes.sin_notificaciones`): no hay notificaciones de sistema en la capa de dominio | `pagina_avisos_sistema.tsx` (código); navegación y estado verificados a 1280, 820, 400 y 320 px (Fase 6) |
| Dashboard, Estadísticas, Reportes e Indicadores | Son pantallas de presentación con datos estáticos: los selectores («Mensual/Semanal», periodo, «Comparar con», frecuencia, año), los chips de módulo de Estadísticas, Reportes e Indicadores (siempre activo el primero), el botón «Filtros avanzados» y el botón primario del Dashboard, y los enlaces «Ver todos/Ver detalle» no tienen `onChange`, `onClick` ni ruta (`href="#"`) | Lectura del código de `componentes/{dashboard,estadisticas,reportes,indicadores}` y `paginas/...` (2026-10-19); no se probó en navegador una acción concreta |
| Guardados | Solo la pestaña «Grupos» tiene ruta (`/guardados`); las otras cuatro usan `#`. Los chips de colección cambian el estado activo, pero la lista no se filtra, el buscador no filtra y solo el selector de orden y el interruptor de vista actúan | `pagina_guardados.tsx` y `guardados.json` (código) |
| Marketplace > pago | El código QR de «Billeteras digitales» es un marcador y no hay logos de Yape ni Plin; `activar()` no distingue el método de pago; no hay validaciones de formato ni errores | [pasarela_pagos.md](pasarela_pagos.md) |
| Selector de empresa | Solo es visible a partir de 1100 px; no hay alternativa móvil | [selector_empresa_topbar.md](selector_empresa_topbar.md) |
| Categoría de Eventos | Filtra los eventos que declaran categoría (los destacados de «Para ti» sí la declaran); un evento sin categoría no aparece al filtrar | [filtro_desplegable.md](filtro_desplegable.md) |
| Empresas ↔ Marketplace (2026-10-19) | Las compras iniciales (ContaPlex Estándar mensual y Facturación Electrónica Básico mensual) son semillas de demostración, no una compra real; son modelo de demostración sin cobro. La capacidad se lee de las etiquetas del plan («N empresas»; «N sucursales o almacenes»): Facturación Electrónica limita sucursales/almacenes, no empresas, así que solo ContaPlex impone límite de empresas. No se modelan paquetes de volumen ni vencimiento/renovación de suscripciones; las empresas nuevas se registran sin módulos asignados (la asignación de aplicativos por empresa no tiene pantalla); el nombre «FacturaPlex» del requerimiento se tomó como «Facturación Electrónica» | `servicios/marketplace/suscripciones_demostracion.json`, `logica_suscripciones.ts`, `logica_suscripciones_empresas.ts` |
| Botones sin manejador (2026-10-26) | Recuento estático: 170 de 452 `Boton`/`BotonIcono` y 10 de 37 `<button>` no tienen `onClick`, `type="submit"` ni `href`: Mensajería 30, Eventos 28 (incluye Aceptar / Tal vez / Rechazar de `tarjeta_invitacion.tsx`), Avisos 26, Amigos 21, Grupos 17, Actividad 10, Compartido 8, Reportes 8, Marketplace 5, Guardados 5, Colaboradores 4, Estadísticas 4, Dashboard 2, Indicadores 2; Acceso, Empresas, Inicio y Perfil: 0. No existe un registro ni una prueba que los clasifique (los enlaces `href="#"` sí lo tienen en `pruebas/compartido/registro_enlaces.ts`). La intención (prototipo o pendiente) es INFERIDA. **Validación individual (2026-10-26):** 2 falsos positivos (`BotonCarritoTopbar`, lupa del buscador de Marketplace), 1 intencional (botón dentro de la maqueta del correo), 16 prototipo documentado (Dashboard, Estadísticas, Indicadores, Reportes), **2 defectos confirmados** («Amigos» y «Mensajes» de la barra superior, con destino existente) y 159 pendientes de decisión; ninguno tiene prueba de clic | Análisis de `Boton`/`BotonIcono`/`button` en `componentes/` y `paginas/`; detalle en `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md › Auditoría final de la interfaz` |
| Persistencia (2026-10-26) | No hay `localStorage`, `fetch` ni otro acceso a red o almacenamiento en el código de producción: publicaciones, comentarios, reacciones, historias, respuestas y edición de perfil viven en variables de módulo y se pierden al recargar; la solicitud de amistad del perfil vive en `useState` y se pierde al salir de la pantalla | Búsqueda en `componentes/`, `paginas/`, `rutas/`, `servicios/`, `formularios/`; `servicios/inicio/almacen_*.ts` |
| Respuestas y reacciones a historias (2026-10-26) | Se guardan en `almacen_historias` y se asocian a la historia y su autor, pero no generan mensajes en Mensajería: decisión de producto pendiente | `logica_historias_inicio.ts:7-8`; `historias_interaccion.test.tsx` |
| Clases inexistentes (2026-10-26) | `bg-fondo-tarjeta` en `inicio.json:211` (caja de comentario) y `max-600:area-nombre/badge/meta` en `pagina_actividad_grupos.tsx:49,50,55` no generan CSS; efecto visual no verificado | Build temporal e `index.css`; ver `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md › Fase 2` |
| Datos de demostración | Empresas, colaboradores, eventos y la sesión («Constructora del Norte SAC», `sesion_actual`) son datos de demostración, no una fuente real | `servicios/` y `compartido.json › sesion_actual` |

## 3. Pendiente de decisión

- **Fuente `Inter`:** se declara en `--fuente-base` pero no se entrega; el navegador usa la fuente del sistema. Se cambia solo en `index.css` y su regla de carga cuando se aporte.
- **Calendario de Eventos y licencia:** `CodeplexSelectorRangoFecha` depende de MUI X Pro (licencia comercial); no se sustituye el calendario propio sin autorización.
- **Variantes compartidas sin crear (INC-10, INC-11):** `BotonIcono` destructivo y sobre imagen, y pestañas de modal.
- **Duplicación de tarjetas tipo radio:** `OpcionMetodoPago`, `OpcionModalidadEvento` y `OpcionCostoEvento`; evaluar un único componente.
- **Línea base visual de las demás pantallas:** solo las seis claves `/empresas` de `roles.json` se revisaron y aprobaron (la clave `1280|/empresas` se actualizó de nuevo el 2026-10-19 por el selector con RUC). Las otras 282 claves conservan su línea base anterior; las diferencias de las Fases 5 y 6 en otras pantallas (VIS-02) siguen sin aprobar ([diferencias_aceptadas_linea_base.md](diferencias_aceptadas_linea_base.md)).
- **Fase de producto sin definir:** el contenido real de Notificaciones > Sistema.

## 4. No verificado

| Id | Qué falta |
|---|---|
| PEN-01 | Estados de error de validación de formularios: al enviar vacío ningún formulario sondeado muestra errores (0 elementos con `aria-invalid`); falta reproducirlos con datos inválidos |
| PEN-02 | Estilos `hover`, `active`, `disabled` y lector de pantalla; falta una prueba dedicada |
| PEN-03 | Estados tras clic a 820 y 320 px y terceros niveles de interacción (solo se recorrió a 1280 y 400 px) |
| PEN-04 | Acceso tras iniciar sesión y modo «Crear cuenta» con interacción completa |
| PEN-06 | Búsqueda sin resultados: solo Colaboradores y Empresas muestran mensaje de vacío; en 12 buscadores no se determinó si filtran la lista (datos de demostración) |
| — | Foco y error de `Casilla`, `Radio`, `Interruptor`; estados «sin resultados» y foco con teclado dentro del panel del selector buscable; rama móvil del panel del selector de empresa |
| — | Que la causa de la intermitencia del test del carrito esté resuelta (ver abajo) |

### CAR-01: intermitencia de `proveedor_carrito_marketplace.test.tsx` (limitación abierta)
- **Síntoma histórico:** la prueba fallaba al ejecutar toda la suite con el reporter JSON del gate (errores «failed to find the current suite» y «reading config»), 5 de 5 veces.
- **Qué se cambió:** las llamadas a la API de Vitest que estaban a nivel de módulo (`afterEach` y `vi.setConfig`) se movieron dentro del `describe`. Después hubo 0 fallos en las ejecuciones del gate de la Fase 6.
- **Qué NO está demostrado:** por qué esas llamadas fallaban solo en ese modo de ejecución. En el trabajo del 2026-10-19 (pendientes 4 y 5) el test volvió a fallar 3 de 3 dentro de un gate aunque pasaba solo y en la suite completa; en los gates siguientes pasó. Haber pasado las últimas ejecuciones no equivale a haber resuelto la causa raíz. **Estado: síntoma mitigado, causa no determinada.**
- **Qué hacer si reaparece:** ejecutar el archivo solo y la suite con `--reporter=json`; no editar la prueba para forzar el verde sin investigar la causa.

## 5. Verificaciones completadas relevantes

- `npm run calidad` del 2026-10-19: todas las comprobaciones en verde, incluida Regresión Empresas en las seis resoluciones (detalle en [tokens_y_diseno_global.md](tokens_y_diseno_global.md)).
- 49 rutas recorridas en 4 anchos (Fase 4); recorrido de 49 rutas sin controles interactivos anidados (Fase 6).
- Teclado de disparadores de filtro y de selectores de cabecera (Tab, Enter, Escape, ArrowDown); tooltip del selector de empresa con ratón y teclado.

## Mejora de plan y Planes asignados (2026-10-20)

| Clasificación | Punto |
|---|---|
| LIMITACIÓN FUNCIONAL DOCUMENTADA | El pago de la mejora es demostrativo: sin pasarela, sin cobro real; la suscripción cambia solo tras completar el flujo de pago de demostración. |
| LIMITACIÓN FUNCIONAL DOCUMENTADA | Prorrateo, impuestos, fecha de renovación e importe inmediato no se calculan (no hay reglas confirmadas); se muestran como «no determinados». |
| LIMITACIÓN FUNCIONAL DOCUMENTADA | No hay regla de «cerca del límite»: el aviso solo aparece al alcanzar el límite de empresas. |
| LIMITACIÓN FUNCIONAL DOCUMENTADA | Facturación Electrónica limita sucursales/almacenes y no hay conteo de uso: se muestra la capacidad y «Uso no determinado». |
| LIMITACIÓN FUNCIONAL DOCUMENTADA | La mejora mantiene el período contratado (mensual/anual) y reutiliza el carrito compartido (puede incluir otros ítems pendientes). |
| LIMITACIÓN FUNCIONAL DOCUMENTADA | El interruptor de Asignación solo cambia la lista de módulos de la empresa en memoria; no hay persistencia ni backend. |
| NO VERIFICADO | Medición en navegador del gate (Responsive de 288 páginas y Regresión Empresas): no se ejecutó la sonda; solo se revisaron a mano las pantallas nuevas a 1280, 768 y 390/320 px. |

## Excepción de oxlint para `react/rules-of-hooks` (2026-10-27)

La regla `react/rules-of-hooks` de oxlint 1.81.0 no admite opciones y solo reconoce nombres `use[A-Z]`. Los ganchos de CodePlex se llaman `usar*`, así que sus `useState`, `useRef`, `useEffect`… se señalaban como errores (204 en 56 archivos). Se mantienen los nombres en español y se aplicó un único `overrides` en `.oxlintrc.json` con la lista explícita de esos 56 archivos (`pruebas/compartido/excepciones_hooks_aprobadas.ts`), sin comodines.

- **Qué evita:** los falsos positivos por la convención de nombres.
- **Qué deja de validar:** dentro de esos 56 archivos la regla está desactivada, por lo que oxlint **ya no comprueba el uso de Hooks** (orden, condicionales, bucles) en ellos; tampoco comprueba las llamadas a `usar*` desde otros archivos. **No es una comprobación integral de las reglas de Hooks.**
- **Qué vigila `pruebas/compartido/excepciones_hooks_oxlint.test.ts`:** que la excepción sea una sola, solo para esta regla, sin comodines y exactamente igual a la lista aprobada; que cada archivo aprobado exista y defina un gancho `usar*`; que ningún archivo ajeno defina un `usar*` que llame a Hooks de React; y que oxlint no reporte `rules-of-hooks` en ningún otro archivo. Un archivo nuevo de ganchos exige ampliar la lista aprobada de forma deliberada.
- **Alternativa evaluada:** `eslint-plugin-react-hooks` como plugin de oxlint reconoce la misma convención `use*`, no está instalado y no detectaría infracciones en `usar*`; no se adoptó.

## Valores arbitrarios con unidad (2026-10-28)

17 usos en `componentes/` y catálogos. Sustituido por token: `rounded-[18px]` de la caja de comentario → `rounded-18` (`--radius-18`, de la escala numérica `--radius-9/14/20`). Se conservan como excepciones de maquetación, sin token equivalente exacto: rejillas del calendario de Eventos (`grid-cols-[80px_…]`, `grid-rows-[repeat(14,60px)]`: 14 horas de 60 px), columnas laterales de 20 y 22 rem (`seccion_descripcion`, `modal_crear_evento`, `editar_evento`), anchos de ventanas de Marketplace (`min(100%,712px)` y `min(100%,1164px)`), alturas y anchos relativos al viewport de la ventana flotante de Inicio y de Perfil (`calc(100vh-7rem)`, `calc(100vw-1.5rem)`, `max-h-[70vh]`), la rejilla `2rem_1fr_2rem` de la cabecera de `Modal`, `minmax(0,18rem)_minmax(0,1fr)` del editor de Historias y los tamaños de glifo `[font-size:1rem|0.875rem]` de los iconos de botón (fuente de iconos, no tipografía de texto).

## Botones nativos: recuento (2026-10-28)
El inventario del 2026-10-26 daba 37 y el escaneo del 2026-10-28, 39. Ambos son correctos para su fecha: el último commit tiene 37 `<button>` (Acceso 2, Amigos 1, Compartido 9, Eventos 13, Inicio 1, Marketplace 2, Mensajería 9) y el árbol de trabajo 39, por −1 en `boton_avisos_topbar.tsx` (la campana pasó a `BotonIcono`) y +1 en `seccion_solicitudes.tsx`, `mensajes_flotantes_inicio.tsx` y `modal_reenviar_mensaje.tsx`. Los 39 coinciden archivo por archivo con `registro_componentes_permitidos.ts` (39 en 29 archivos).

