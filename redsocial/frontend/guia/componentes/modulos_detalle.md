# Registro por módulo: rutas, pestañas, controles compartidos y cambios (Fases 2 a 6)

Complementa a [modulos_y_patrones.md](modulos_y_patrones.md) (inventario y patrones repetidos) y a [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md). Describe, módulo por módulo, qué rutas y pestañas existen, qué controles compartidos usan y qué se cambió en cada fase, para saber qué respetar antes de modificar una pantalla.

## Cómo se obtuvo y qué garantiza

- **Rutas y pestañas:** de `catalogos/capacidades/redsocial/<modulo>.json › rutas` y `pestanas`, y de `rutas/compartido/rutas.tsx` (49 rutas registradas, más `/no-encontrada`).
- **Controles compartidos:** de la lectura del código de `componentes/<modulo>/`, `paginas/<modulo>/` y `formularios/eventos/` el 2026-10-19 (variantes de `Boton` y `Selector` extraídas con un analizador de etiquetas JSX). Es un inventario del código, no una medición.
- **Cambios por fase:** de los informes de las Fases 4, 5 y 6 (`AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md`) y del código actual. Cuando un informe antiguo contradice al código, aquí manda el código.
- **Verificación en navegador:** la hicieron las Fases 4 a 6 (49 rutas en 1280, 820, 400 y 320 px; estados tras clic a 1280 y 400 px) y las tareas del 2026-10-19 que se citan. **Esta documentación no repitió ese recorrido**: lo que se afirma como «medido» procede de esas fases. Ningún módulo se declara «completamente auditado»; los estados no recorridos están en [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md) §4.
- Los datos que se muestran (nombres, cifras, eventos) son de demostración.

## Cronología de fases

| Fase | Fecha | Qué cambió en el sistema compartido |
|---|---|---|
| 2 | 2026-10-15/16 | `--control-height` de 44 a 48 px; `Boton md` de 38 a 48 px; campos y selectores estándar a 48 px; catálogo `boton_base`/`boton_icono_base`; tipografía heredada en el tema MUI |
| 2.2 | 2026-10-16 | Variante `Boton cta` (40 px) para «Elegir plan», «Ver planes» y «Activar período de prueba» |
| 2.5 | 2026-10-16 | Ayudante `clasesBoton`, tamaños de icono por variante, unificación de «Aceptar», «Rechazar», «Eliminar» y «Ver evento» en `default`; seis enlaces migrados a `clasesBoton` |
| 2.6 | 2026-10-17 | `hover` en `secundario`; iconos de 16 × 16 px; acciones de cabecera en `md`; chips de filtro (`chip_filtro`) |
| 4 | 2026-10-17 | Auditoría de solo lectura: 607 controles únicos en 49 rutas; incidencias INC-01 a INC-29. No modificó código |
| 5 | 2026-10-17 | Correcciones: selectores de cabecera, panel de Ubicación, solape del menú, foco unificado, `FiltroDesplegable`, `BannerInformativo`, primario MUI, barra de 64 px, página Sistema |
| 6 | 2026-10-17 | Cierre: `size="pildora"`, `BotonPieLista` en Amigos y Grupos, enlaces de Grupos como `Boton`, accesibilidad (controles anidados), categoría en «Para ti», excepciones documentadas |
| Posterior | 2026-10-19 | Línea base de Empresas aprobada; transferencia bancaria eliminada; selector de empresa con RUC y tooltip; formulario «Invitar colaborador» (teléfono, documento, cargo) |

## Convenciones que comparten todas las páginas

- Cada página (salvo Acceso) usa `EstructuraApp` (barra superior, barra lateral). La mayoría usa además `EstructuraTresColumnas` (columna principal, publicidad y panel lateral; ver [estructura_tres_columnas.md](estructura_tres_columnas.md)); no la usan Acceso, Empresas, Dashboard, Reportes, Indicadores, el listado de Colaboradores, Estadísticas > Todos los módulos y las tres pantallas de videollamada de Mensajes (comprobado en el código el 2026-10-19).
- Cabecera: `h1` con `text-titulo-pagina`, subtítulo `text-subtitulo` y, cuando aplica, acciones a la derecha. Navegación entre vistas con `Pestanas` ([pestanas.md](pestanas.md)).
- Jerarquía de acciones (resuelta en la Fase 6, INC-13): acciones de cabecera en 40 o 48 px (`Boton cta` o `md`, `Selector mini` de 40 px); acciones de fila en 30 px (`Boton mini`) o 34 px (`default`).

---

## 1. Inicio — `/inicio`

- **Contenido:** feed de publicaciones (`TarjetaPublicacion`, comentarios, interacciones), contactos en línea y el modal «Crear publicación» (`ModalCrearPublicacion`, editor con `CampoTexto`, vista previa de medios, opciones de encuesta). Los diálogos de compartir y eliminar usan `Modal`; la cabecera de cada publicación usa `Menu`.
- **Controles compartidos:** `Boton` (`fantasma default` en las acciones de pie y de foto/vídeo; `primario md` en publicar y comentar; `peligro md` en eliminar), `BotonIcono`, `CampoTexto`, `Modal`, `Menu`, `MensajeVacio`.
- **Cambios por fase:**
  - Fase 6 (INC-16, **verificado en navegador**): las píldoras de selección del modal de publicación (tipo: Publicación, Encuesta, Pregunta; prioridad: Urgente, Normal; 5 botones) usan `Boton variant="filtro" size="pildora"` (30 px, radio completo, `aria-pressed`) en lugar de `filtro` + `mini` + `rounded-full`.
- **Excepciones:** el disparador con forma de campo de la publicación y 1 `<button>` nativo están registrados ([excepciones_y_limitaciones.md](excepciones_y_limitaciones.md)).
- **No verificado:** estados de error del editor; el recorrido posterior a publicar.

## 2. Actividad — `/actividad`, `/actividad/publicaciones`, `/actividad/menciones`, `/actividad/colaboradores`, `/actividad/grupos`, `/actividad/modulos`, `/actividad/sistema`

- **Pestañas:** Todas, Publicaciones, Menciones, Colaboradores, Grupos, Módulos y Sistema (`PestanasActividad`).
- **Controles compartidos:** `Pestanas`, `Selector mini` (Módulos y Sistema), `Boton` (`contorno cta` «Crear grupo»; `contorno mini` «Ver perfil/Ver grupo»), `BotonIcono discreto md` (más opciones), `BotonPieLista` («Cargar más» en 4 pestañas), `Insignia`.
- **Cambios por fase:**
  - Fase 5/6 (INC-01, **verificado**): «Todos los módulos» (Módulos) y «Todos los eventos» (Sistema) eran botones secundarios con chevron que no abrían nada; ahora son `Selector variant="mini"` (40 px) con valor controlado que filtra la lista. El valor de la opción «todos» no es cadena vacía.
  - Fase 6 (INC-13, **verificado**): jerarquía de tamaños. Acciones de cabecera: «Crear grupo» (`cta`, 40 px) y los selectores `mini` (40 px). Acciones de fila: «Ver perfil/Ver grupo» (`mini`, 30 px). Las cabeceras de Módulos y Sistema pasaron de 34 a 40 px.
  - Fase 6 (INC-12): pies de lista con `BotonPieLista` (49 px).
- **Excepciones:** ninguna propia.
- **No verificado:** estados tras clic a 820 y 320 px.

## 3. Notificaciones — `/notificaciones`, `/notificaciones/no-leidas`, `/notificaciones/menciones`, `/notificaciones/solicitudes`, `/notificaciones/eventos`, `/notificaciones/sistema`

(Carpeta `avisos`.)

- **Pestañas:** Todas, No leídas, Menciones, Solicitudes, Eventos y Sistema (`PestanasAvisos`, con contadores). El panel de notificaciones de la barra superior tiene sus propias pestañas Todas y No leídas.
- **Cabecera de cada pestaña:** «Marcar todas como leídas» (`Boton secundario default`) y menú de más opciones (`BotonIcono contorno`).
- **Controles compartidos:** `BannerInformativo` (3), `Selector mini` (No leídas), `Casilla`, `Menu`, `Boton primario/secundario default` en las filas, `MensajeVacio`, `Pestanas`.
- **Cambios por fase:**
  - Fase 5 (INC-07, **verificado**): `BannerInformativo` sustituye cuatro copias; aparece en **Solicitudes, Menciones y Eventos** (iconos campana, comentario, calendario), no en Todas, No leídas ni Sistema. Padding 14 px, radio 12 px, icono de 36 px, cierre `BotonIcono discreto sm`.
  - Fase 5 (INC-28, **verificado**): la pestaña Sistema tiene página (`PaginaAvisosSistema`) en `/notificaciones/sistema`; antes la URL mostraba la página 404.
  - Fase 5/6 (INC-01): No leídas tiene `Selector mini` «Más recientes / Más antiguas» con orden real.
  - Fase 6 (INC-29): corregidos los textos sin tilde («No leídas», «Más recientes», «Ver más», «Ver conversación completa»).
  - Fase 6 (INC-26): «Ver más» del panel de notificaciones de la barra superior se conserva como enlace con ruta real.
- **Limitación funcional (INC-28b):** Sistema muestra el estado vacío; no hay notificaciones de sistema en la capa de dominio.
- **Excepciones:** «Cargar más notificaciones» de Menciones es un `Boton secundario md` fuera de la tarjeta (INC-12).

## 4. Mensajes — `/mensajes`, `/mensajes/no-leidos`, `/mensajes/favoritos`, `/mensajes/videollamadas`, `/mensajes/videollamadas/iniciar`, `/mensajes/videollamadas/en-curso`

- **Pestañas:** Todos, No leídos, Favoritos, Videollamadas (`PestanasMensajes`).
- **Contenido:** lista de conversaciones con chips (`clasesChip`), panel de conversación con `CampoTexto`, secciones de videollamada (participantes, dispositivos, reuniones programadas, contactos frecuentes).
- **Controles compartidos:** `BotonIcono` (22), `Boton` (`filtro filtro` como chips de selección en llamada y participantes; `secundario mini/default`), `CampoBusqueda` (4), `Pestanas`, `Interruptor`.
- **Cambios por fase:**
  - Fase 2.6: texto de los chips con peso 400 (`chip_filtro`); hover de «Nueva reunión» (`secundario`) y «Videollamar» (`contorno`) según sus variantes.
  - Fase 6 (ACC-01, **verificado**): la estrella de Mensajes > No leídas era un `span role="button"` dentro de un botón; ahora es un `BotonIcono sutil sm` hermano.
  - Fase 6: registro de excepciones nativas (videollamada, filas de opción).
- **Excepciones justificadas:** relleno de 8 px de los chips (INC-08); controles de videollamada (clase G) y filas de conversación como `<button>` nativos registrados (9 `<button>` nativos en Mensajería).
- **No verificado:** 9 controles de Mensajes quedaron «no determinados» en la Fase 4.

## 5. Amigos — `/amigos`, `/amigos/solicitudes`, `/amigos/sugerencias`, `/amigos/listas`

- **Pestañas:** Todos, Solicitudes, Sugerencias y Listas; en Solicitudes, sub-secciones Recibidas, Enviadas e Ignoradas.
- **Controles compartidos:** `Selector mini` («Todos los amigos»), `BotonPieLista` (4: Todos, Sugerencias, Solicitudes recibidas y enviadas), `CampoBusqueda`, `Boton` (`secundario mini/default`, `primario md` en el encabezado), `MensajeVacio`.
- **Cambios por fase:** Fase 5/6 (INC-01) el filtro «Todos los amigos» es un `Selector mini` real; Fase 6 (INC-12) los pies de lista pasan de enlaces `<a href="#">` (43, 46 y 47 px) a `BotonPieLista` (49 px).
- **Excepciones:** ninguna propia. **No verificado:** estados de «sin resultados» de la búsqueda (PEN-06).

## 6. Grupos — `/grupos`, `/grupos/descubrir`, `/grupos/invitaciones`

- **Pestañas:** Mis grupos, Descubrir, Invitaciones.
- **Controles compartidos:** `BannerInformativo` (Mis grupos y Descubrir), `Selector mini` («Más recientes / Más antiguas» en Invitaciones), `BotonPieLista` (aceptadas), `CampoBusqueda`, `Boton` (`primario md`, `secundario default/md`, `contorno mini`, `peligro_contorno default`), `MensajeVacio`.
- **Cambios por fase:** Fase 5 (INC-07) banner con padding 14 px, radio 12 px, icono 36 px (antes 20/10/44) y cierre funcional; Fase 5/6 (INC-01) selector real en Invitaciones; Fase 6 (INC-12) `BotonPieLista`; Fase 6 (INC-26) «Ver todas las invitaciones» e «Ir a configuración» pasan de enlaces de 38/39 px a `Boton secundario default` (34 px; 30 px por debajo de 600 px).
- **Excepciones:** ninguna propia.

## 7. Marketplace — `/marketplace`

- **Contenido:** catálogo con filtros (chips `Boton filtro`), destacados en carrusel, planes por aplicación (modal), carrito (modal), compra y pago (modal con acordeón de método), mis compras (`Pestanas`) y asistente de planes. El acceso al carrito vive en la barra superior ([boton_carrito_topbar.md](boton_carrito_topbar.md)).
- **Controles compartidos:** `Boton` (`primario md/cta`, `secundario md`, `enlace enlace_accion` en los formularios de pago, `peligro md`), `CampoTexto` y `CampoEtiquetado` (pasarela), `Acordeon` (método de pago), `Modal` (9), `Selector colaboradores` (país), `Casilla`, `Insignia`, `MensajeVacio`.
- **Cambios por fase:**
  - Fase 2.2: variante `cta` (40 px) en «Elegir plan», «Ver planes» y «Activar período de prueba».
  - 2026-10-16: acordeón de método de pago y `CampoEtiquetado` en la pasarela; el carrito pasa a la barra superior.
  - 2026-10-19: se elimina la opción «Transferencia bancaria» (ver [pasarela_pagos.md](pasarela_pagos.md)): quedan Tarjeta y Billeteras digitales.
- **Excepciones:** `TabsTipoPlanes` con `Boton md` de dos líneas (INC-27); `h-auto py-2.5` en las opciones del modal de selección de pago.
- **Limitaciones:** QR y logos de billeteras sin contenido real; `activar()` no distingue método; sin validaciones. El test `proveedor_carrito_marketplace.test.tsx` sigue con su causa de intermitencia **no determinada** (CAR-01); no se afirma que los problemas históricos del carrito estén resueltos.

## 8. Eventos — `/eventos`, `/eventos/proximos`, `/eventos/populares`, `/eventos/mis-eventos`, `/eventos/invitaciones` (+ `/pendientes`, `/aceptadas`, `/rechazadas`), `/eventos/calendario`

- **Pestañas:** Para ti, Próximos, Populares, Mis eventos, Invitaciones (con filtro Todas/Pendientes/Aceptadas/Rechazadas) y Calendario.
- **Controles compartidos:** `FiltroDesplegable` (Fecha, Categoría, Ubicación, Estado) y `MarcoPanelFiltro` (4), `CampoBusqueda`, `Boton` (mayoría `md/default`), formularios de evento (`CampoTexto`, `CampoNumero`, `SelectorFecha`, `SelectorHora`, `Selector colaboradores`, `Radio`, `Interruptor`), `Modal` («Crear evento»).
- **Cambios por fase:**
  - Fase 5 (INC-05, **verificado**): los cuatro filtros desplegables (antes cuatro implementaciones) usan `FiltroDesplegable` + `MarcoPanelFiltro`; `aria-expanded`/`aria-controls`, Escape y retorno de foco verificados.
  - Fase 5 (INC-02, **verificado**): el panel de Ubicación se apila por debajo de 900 px y se desplaza al viewport (borde derecho 1248 / 984 / 884 / 718 / 400 / 320 px a 1280 / 1000 / 900 / 820 / 400 / 320 px; antes 1007,9 a 820 px).
  - Fase 5/6 (INC-06, **verificado**): Categoría devuelve su selección; el disparador muestra «Categoría: n»; filtra Próximos, Populares y los destacados de «Para ti»; sin coincidencias muestra «No hay eventos para mostrar.».
  - Fase 6 (ACC-01): el botón «quitar ubicación» es un `BotonIcono` hermano (antes un `span role="button"` anidado).
- **Excepciones:** INC-09 (enlaces con `p-0 border-0`), INC-14 (`TarjetaInvitacion`), control segmentado Mes/Semana/Día y 13 `<button>` nativos del calendario registrados.
- **Pendiente de decisión:** sustituir el calendario propio por `CodeplexSelectorRangoFecha` (MUI X Pro, licencia comercial).
- **No verificado:** 19 controles de Eventos «no determinados» en la Fase 4; estados de error de los formularios.

## 9. Guardados — `/guardados`

- **Pestañas:** Todo, Publicaciones, Eventos, Grupos y Recursos; solo «Grupos» tiene ruta (`/guardados`), las otras cuatro usan `#`.
- **Controles compartidos:** `CampoBusqueda`, `Boton filtro` (chips de colección: Todos, Mis grupos, Tecnología…), `BotonIcono` (vista cuadrícula/lista), `Selector mini` («Más recientes / Más antiguas»).
- **Comportamiento según el código:** el selector de orden invierte la lista y el interruptor de vista cambia la cuadrícula; los chips solo cambian el estado activo y el buscador no filtra (ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md) §2).
- **Cambios por fase:** Fase 5/6 (INC-01, INC-29): selector de orden con segunda opción real y texto «Más recientes» con tilde.

## 10. Colaboradores — `/colaboradores`, `/colaboradores/perfil`

- **Contenido:** listado con pestañas de estado (Todos, Activos, Invitados, Inactivos, Baja), buscador, filtros avanzados (panel flotante), «Exportar» (menú Excel/PDF; [exportacion_colaboradores.md](exportacion_colaboradores.md)), tabla ([tabla_colaboradores.md](tabla_colaboradores.md)) con paginación, «Invitar colaborador» (modal de 4 pasos: Información, Rol y permisos, Vigencia, Resumen), panel «Editar colaborador», detalle y baja.
- **Controles compartidos:** `CampoTexto`, `CampoEtiquetado variante="compacta"`, `Selector colaboradores` (14), `Selector integrado` (2) y `compacto` (1), `SelectorFecha`, `Casilla`, `Radio`, `Modal`, `Menu`, `BannerInformativo variante="nota"`, `Paginacion`, `Pestanas`.
- **Cambios (2026-10-19), formulario «Invitar colaborador» paso 1 (verificado en navegador a 1280, 820 y 400 px):**
  - **Teléfono / WhatsApp:** dos controles. Una caja de 48 px con la bandera de Perú (franjas verticales) y el código de país (`Selector integrado`, unos 72 px) y, al lado, un `CampoTexto` para el número, que ocupa el resto del ancho.
  - **Documento de identidad:** el selector de tipo («DNI», «RUC», «C.E.») usa la variante `compacto` en un contenedor de 96 px, con 8 px de separación hasta el campo del número; el selector ya no se estira.
  - **Cargo / Puesto:** se eliminó el texto de ayuda «Opcional. Ej: Contador, Analista, Asistente, etc.».
  - `Selector integrado` perdió su ancho mínimo de 120 px, lo que también compacta el prefijo del panel «Editar colaborador».
- **Excepciones:** ninguna propia. **No verificado:** estados de error del formulario.

## 11. Empresas — `/empresas`

- **Contenido:** listado con buscador («Buscar por RUC, nombre o email…»), selector de estado, «Filtros avanzados» (`Boton contorno md`), tabla con acciones por fila, pie con «por página» (`Selector mini`) y paginación; modales de alta, detalle (con pestañas), edición (con pestañas) y desactivación.
- **Controles compartidos:** `CampoTexto` (22), `CampoEtiquetado` (28), `Selector colaboradores` (19), `SelectorFecha`, `Paginacion` (3), `Modal` (4), `Pestanas` (modales), `Boton md`.
- **Cambios por fase:** Fase 2 (botones y campos de 48 px; el prefijo «+51» de «Nueva empresa» pasa a `Selector default`); Fase 5/6 (barra de 64 px, tipografía MUI heredada, primario `#5a43f4`, foco unificado).
- **Rediseño del listado (2026-10-19, según el ejemplo entregado):** cabecera con icono; cinco tarjetas de resumen calculadas desde los datos (total, «+N este mes» y empresas con Contabilidad, Facturación, Planillas e Inventario, con barra `<progress>`); filtros en una tarjeta (buscador, Estado, Plan, Módulo, «Limpiar» y «Filtros avanzados» con rubro y fechas); tabla con Empresa (logo, nombre y código, orden ascendente/descendente), RUC, Rubro (etiqueta), una columna por módulo (Activo con «Plan X» o No asignado) y Acciones con ver, editar y desactivar (se quitó el menú ⋮ el 2026-10-19; columna fija a la derecha). Se quitaron las columnas Logo, Plan, Usuarios, Estado y Fecha de registro y el selector «por página» (10 por página). Datos: 10 empresas del ejemplo con `modulos`; las empresas ya no llevan un plan propio (ver «Coherencia Marketplace → Empresas»). Por debajo de ~1400 px la tabla se desplaza horizontalmente. **Pendiente de aprobación:** la línea base (`Regresión Empresas ❌` en las seis resoluciones).
- **Coherencia Marketplace → Empresas (2026-10-19):** el plan y la capacidad de cada aplicativo salen de lo contratado en Marketplace, no de un campo por empresa. Flujo: semillas `servicios/marketplace/suscripciones_demostracion.json` (ContaPlex plan Estándar, Facturación Electrónica plan Básico) → `usarCarritoMarketplace` crea las compras → `suscripcionesDeCompras` → `ContextoSuscripciones` (compartido) → Empresas. Un módulo figura «Activo» solo si la empresa lo tiene asignado **y** el producto está contratado; el plan mostrado es el contratado. Las diez empresas tienen Contabilidad y Facturación; Planillas e Inventario figuran «No asignado» (no hay compra). Tarjetas de resumen y filtros Plan/Módulo se calculan desde estos datos. La pestaña «Planes asignados» del detalle es de solo lectura; la de «Editar empresa» es una tabla con asignación y mejora de plan contextual (ver la sección «Planes asignados y mejora de plan contextual (2026-10-20)» al final de este archivo). En ninguna hay selector de plan. «Nueva empresa» consulta el límite de empresas del plan contratado (`capacidad.empresas`, tomado de las etiquetas del plan, p. ej. «15 empresas» en ContaPlex Estándar): al alcanzarlo muestra `ModalLimiteEmpresas` y remite a Marketplace sin abrir el registro. Una compra nueva en Marketplace actualiza el listado en la misma sesión. Reglas no confirmadas: ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md).
- **Línea base visual:** `/empresas` es la única pantalla cuya firma compara el gate (seis anchos). Aprobada el 2026-10-19 (`roles.json` `efef3a23…` y, tras el selector con RUC, `b1cce667…` solo en `1280|/empresas`); ver [diferencias_aceptadas_linea_base.md](diferencias_aceptadas_linea_base.md).
- **Selector de empresa de la barra superior:** nombre y RUC en dos líneas, búsqueda por nombre o RUC, tooltip del nombre truncado ([selector_empresa_topbar.md](selector_empresa_topbar.md)).
- **Excepciones:** INC-10 (`BotonIcono` con colores propios) e INC-11 (pestañas de modal con `px-6`).
- **No verificado:** búsqueda sin resultados más allá del mensaje existente; estados de error.

## 12. Dashboard — `/dashboard`

- **Contenido:** indicadores, evolución de ventas (`CodeplexGraficoLineas`), top de productos, ratios financieros; selector de periodo (`Selector default`) y `Boton primario md`.
- **Estado según el código:** presentación con datos estáticos; el selector «Mensual/Semanal» (`Selector mini`), el periodo y el botón no tienen manejadores; los enlaces «Ver detalle» van a `#`.
- **Cambios por fase:** sin cambios propios en las fases 5 y 6; hereda tema, foco y tipografía.

## 13. Estadísticas — `/estadisticas`, `/estadisticas/ventas`, `/estadisticas/contabilidad`, `/estadisticas/planillas`

- **Contenido:** vista de todos los módulos (periodo, «Comparar con», «Filtros avanzados», chips de módulo con el primero activo) y vistas por módulo (`PaginaEstadisticasModulo`) con `Boton primario md` «Crear», `Selector mini` de año y «Exportar».
- **Estado según el código:** datos estáticos y controles sin manejadores (ver [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md) §2). Gráficos con `@codeplex-sac/graficos` ([graficos_y_visualizacion.md](graficos_y_visualizacion.md)).
- **Cambios por fase:** sin cambios propios.

## 14. Reportes — `/reportes`

- **Contenido:** periodo y «Comparar con» (`Selector default`), «Filtros avanzados», chips de módulo, plantillas de reportes (con `BotonIcono sutil md`: favorito y más) y reportes recientes (ver, descargar, compartir, más), con `DonaProgreso` y `Sparkline` propios.
- **Estado según el código:** datos estáticos y controles sin manejadores.
- **Cambios por fase:** sin cambios propios.

## 15. Indicadores — `/indicadores`

- **Contenido:** indicadores clave, estructura de costos, evolución de la utilidad neta; periodo y «Comparar con» (`Selector default`), «Filtros avanzados» y chips de módulo.
- **Estado según el código:** datos estáticos y controles sin manejadores; enlaces «Ver detalle/Ver todos» a `#`.
- **Cambios por fase:** sin cambios propios.

## Acceso (módulo adicional) — `/acceso`

- **Contenido:** inicio de sesión y «Crear cuenta» (`SelectorModoAcceso`), confirmación de correo, acceso alternativo (botones deshabilitados «próximamente»), `CampoContrasena`.
- **Controles compartidos:** `CampoTexto` + `CampoEtiquetado`, `Boton md` (envío) y `Boton secundario/contorno md` en el acceso alternativo.
- **No verificado (PEN-04):** el recorrido posterior al inicio de sesión y el modo «Crear cuenta» con interacción completa.

---

## Estructura compartida de la aplicación

- **Barra superior:** 64 px; buscador, selector de empresa, accesos, carrito, campana y menú de usuario ([barra_superior.md](barra_superior.md)). Cambios: 72 → 64 px (Fase 5), solape del botón de menú a ≤900 px corregido (INC-03), selector de empresa y carrito añadidos y actualizados el 2026-10-19.
- **Barra lateral:** [barra_lateral.md](barra_lateral.md); hereda el primario `#5a43f4`.

## Planes asignados y mejora de plan contextual (2026-10-20)

**Estructura actual.** La pestaña «Planes asignados» de **Editar empresa** es una tabla con las clases compartidas de `clases_tabla.ts` (las mismas del historial y de Colaboradores). Columnas: **Aplicativo** (ícono de módulo, nombre y descripción), **Capacidad y uso**, **Asignación** (interruptor Activo/Inactivo, `Interruptor` de `@codeplex-sac/formularios`) y **Acciones** («Mejorar plan», solo si existe un plan superior contratable). **Se eliminó la columna «Plan vigente»**: el nombre del plan sigue en `SuscripcionContratada.planNombre` y se muestra dentro del modal de mejora. No hay selector de plan ni acciones de ver, editar o eliminar por aplicativo. El modal de detalle (solo lectura) conserva su pestaña anterior (`pestana_planes_empresa.tsx`, `tarjeta_plan_asignado.tsx`).

**Recurso limitante por aplicativo.** `capacidadDeFila` (`logica_mejora_plan.ts`) decide el recurso a partir de la capacidad que el plan declara en sus etiquetas: si limita empresas (ContaPlex) muestra «10 de 15», barra y porcentaje; si limita sucursales (Facturación Electrónica) muestra la capacidad («1») y «Uso no determinado» porque no existe un conteo de sucursales; si no hay dato, «Capacidad no determinada». «Sin límite» no se muestra nunca porque ningún catálogo lo confirma.

**Aviso contextual.** `AvisosLimitePlan` (`BannerInformativo`, sin botón propio) aparece cuando el aplicativo está activo, el uso de empresas alcanza el límite del plan **y** hay una mejora disponible: «¿Necesitas más capacidad? Has utilizado {n} de las {límite} empresas incluidas en tu plan de {aplicativo}…». Un aviso por aplicativo; la acción es el botón «Mejorar plan» de su fila. No existe una regla definida de «cerca del límite», por eso no se avisa antes de alcanzarlo.

**Flujo.** (A) aviso o botón → (B) `ModalMejoraPlan` con el contexto del aplicativo: plan actual marcado «Plan actual», capacidad y precio actuales, planes superiores del mismo tipo (precio mayor en el período contratado) con capacidad, precio y diferencias; los que no aumentan la capacidad o no la declaran aparecen «No disponible» con su motivo y sin botón → (C) resumen Actual/Nuevo de plan, capacidad y precio, diferencia de precio, renovación, y «Importe a cobrar ahora: se calcula en el paso de pago» (impuestos y prorrateo: no determinados) con Volver o Cancelar → (D) «Continuar al pago» abre el pago de Marketplace (`ModalPagoPlanes`) mediante `contratarMejora` → (E) al activar, `usarCarritoMarketplace` reemplaza la compra, `ContextoSuscripciones` se actualiza y la tabla refleja la nueva capacidad sin salir de Empresas. Hasta el pago confirmado la suscripción no cambia.

**Componentes y archivos.** Reutilizados: `Modal`, `Boton`, `Insignia`, `BannerInformativo`, `MensajeVacio`, `Interruptor`, `Icono`, `CLASES_TABLA`, barra `<progress>` del resumen de Empresas, `ModalPagoPlanes`. Nuevos (necesarios porque no existía un flujo contextual): `ModalMejoraPlan`, `PasoPlanesMejora`, `PasoResumenMejora`, `TarjetaPlanMejora`, `TablaPlanesAsignados`, `FilaPlanAsignado`, `AvisosLimitePlan`, `CabeceraPlanesAsignados`, `usarMejoraPlanEmpresa`, `logica_mejora_plan.ts`, el contexto compartido `ContextoMejoraPlan` (`compartido/carrito`) y `contratarMejora` en el hook del carrito. Ícono de la pestaña y del panel: `pila` (glifo `layers` de la librería). Tokens: los existentes; textos y clases en `empresas.json › planes_asignados.edicion|mejora`.

**Cambio transversal.** `usarModal` ahora cierra con Escape solo el diálogo superior (`compartido.json › modal.selector_dialogo`): antes, con dos modales apilados, Escape cerraba ambos.

**Confirmado / pendiente.** Confirmado: planes, precios y capacidades salen de `planes_aplicaciones.json` y de las suscripciones de demostración. **Pendiente (limitación funcional documentada):** el pago es demostrativo (no hay pasarela ni cobro real); no hay cálculo de prorrateo, impuestos ni fecha de renovación; el período no se puede cambiar durante la mejora; el carrito compartido puede traer otros ítems al pago; la capacidad por sucursales no tiene conteo de uso; el backend sigue siendo la autoridad final de precios y límites.
