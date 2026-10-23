# Documentación de componentes de CodePlex Red Social

Colección de archivos `.md`, uno por componente (o por variantes que comparten contrato e implementación), que describe **lo que existe hoy** en el código: origen, implementación, contrato, diseño medido, integración con el sistema compartido, iconos e historial de cambios. Es documentación **interna y local**: la carpeta está ignorada por Git (`.gitignore`) y no se publica.

**Ubicación:** `redsocial/frontend/guia/componentes/`. Esta carpeta es documental; los componentes React viven en `redsocial/frontend/componentes/`.

**Última actualización:** 2026-10-19, contrastada con el código del repositorio (rama `codeplexMaster`, con cambios sin confirmar en Git). Cada archivo indica en su pie la fecha y el alcance de su verificación; los que conservan «2026-10-17» no han cambiado desde entonces en lo que describen.

## Por dónde empezar

| Si vas a… | Lee primero |
|---|---|
| Modificar una pantalla de un módulo | [modulos_detalle.md](modulos_detalle.md) (rutas, pestañas, controles y cambios por fase), después el documento de cada componente que uses |
| Crear una pantalla o un control nuevo | El componente compartido equivalente (botones, campos, selectores, filtros…) y [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md) para no copiar una excepción |
| Tocar colores, tipografía, alturas o foco | [tokens_y_diseno_global.md](tokens_y_diseno_global.md) y [proveedor_tema_graficos.md](proveedor_tema_graficos.md) |
| Cambiar un componente de librería | [procedencia_librerias_y_recursos.md](procedencia_librerias_y_recursos.md): no se modifica código de `@codeplex-sac/*` ni de MUI; se envuelve o se configura |
| Entender qué se aprobó visualmente | [diferencias_aceptadas_linea_base.md](diferencias_aceptadas_linea_base.md) |

## Cómo leerla

### Origen (campo «Origen e implementación»)
- **Librería con envoltorio:** usa un componente de `@codeplex-sac/*` a través de un envoltorio de CodePlex que le añade tema, configuración (`compartido.json`) o clases.
- **Librería directa:** usa el componente oficial sin envoltorio.
- **Propio:** desarrollo de CodePlex que no depende de la librería (puede apoyarse en MUI o HTML nativo).

### Etiquetas de evidencia y de estado
Cada afirmación relevante está en uno de estos estados (definidos en [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md)):

- **Verificado:** comprobado en archivos, pruebas o navegador (se indica cómo).
- **Excepción justificada:** difiere del patrón compartido por una razón funcional; se conserva.
- **Limitación funcional:** el comportamiento no existe (datos o reglas de negocio fuera del alcance técnico).
- **No verificado** / **no determinado:** no se pudo comprobar; se indica qué falta.
- **Pendiente de decisión:** requiere una decisión de diseño o de producto.

### Estados
**Existente**, **adaptado** (modificado en este proyecto), **nuevo** (creado entre 2026-10-15 y 2026-10-17, sin confirmar en Git hasta el commit de cierre) o **pendiente de verificar**.

## Índice

### Base: procedencia, diseño e iconos
| Archivo | Contenido |
|---|---|
| [procedencia_librerias_y_recursos.md](procedencia_librerias_y_recursos.md) | Versiones y orígenes de React, `@codeplex-sac/*`, MUI, Tailwind y demás; comparación de las siete librerías con sus paquetes publicados (**sin modificaciones**); uso de sus exportaciones |
| [tokens_y_diseno_global.md](tokens_y_diseno_global.md) | `index.css`, `compartido.json`, tema MUI; tipografía, colores, alturas de control, foco |
| [iconos.md](iconos.md) | `Icono`, `@codeplex-sac/iconos` (Material Symbols Rounded), SVG propios y su origen, tamaños |
| [proveedor_tema_graficos.md](proveedor_tema_graficos.md) | Tema MUI único del proyecto (incluye el estilo de `Tooltip`) |
| [diferencias_aceptadas_linea_base.md](diferencias_aceptadas_linea_base.md) | Línea base visual vigente (hashes), diferencias aprobadas, decisiones sustituidas y diferencias pendientes de aprobación |
| [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md) | **Nuevo.** Excepciones justificadas, limitaciones funcionales, decisiones pendientes y lo no verificado (incluye CAR-01) |

### Botones y chips
| Archivo | Componentes |
|---|---|
| [boton.md](boton.md) | `Boton` y `clasesBoton` (tamaños `md`, `cta`, `default`, `mini`, `filtro`, `pildora`, `enlace`, `enlace_accion`, `pie_lista`) |
| [boton_icono.md](boton_icono.md) | `BotonIcono` |
| [boton_pie_lista.md](boton_pie_lista.md) | `BotonPieLista` |
| [chip_filtro.md](chip_filtro.md) | `clasesChip` y `clasesConteoChip` (**nuevo**) |
| [filtro_desplegable.md](filtro_desplegable.md) | `FiltroDesplegable` y `MarcoPanelFiltro` (**nuevo**, Fase 5) |
| [banner_informativo.md](banner_informativo.md) | `BannerInformativo` (**nuevo**, Fase 5) |

### Campos, selectores y controles
| Archivo | Componentes |
|---|---|
| [campo_texto.md](campo_texto.md) | `CampoTexto` |
| [campo_numero.md](campo_numero.md) | `CampoNumero` |
| [campo_busqueda.md](campo_busqueda.md) | `CampoBusqueda` |
| [campo_etiquetado.md](campo_etiquetado.md) | `CampoEtiquetado` (**nuevo**) |
| [selector.md](selector.md) | `Selector` (variantes `default`, `colaboradores`, `mini`, `integrado`, `compacto`) |
| [selector_buscable.md](selector_buscable.md), [panel_selector_buscable.md](panel_selector_buscable.md), [lista_opciones_buscables.md](lista_opciones_buscables.md) | Familia `SelectorBuscable` (**nueva**) |
| [selector_fecha.md](selector_fecha.md), [selector_hora.md](selector_hora.md) | `SelectorFecha`, `SelectorHora` |
| [casilla.md](casilla.md), [radio.md](radio.md), [interruptor.md](interruptor.md) | `Casilla`, `Radio`, `Interruptor` |
| [acordeon.md](acordeon.md) | `Acordeon` (**nuevo**) |

### Navegación, estructura y superficies
| Archivo | Componentes |
|---|---|
| [barra_superior.md](barra_superior.md) | `BarraSuperior`, `MenuUsuarioTopbar`, `PanelUsuarioTopbar` |
| [selector_empresa_topbar.md](selector_empresa_topbar.md) | `SelectorEmpresaTopbar` (nombre y RUC en dos líneas, tooltip del nombre truncado) y contexto de empresa activa |
| [boton_carrito_topbar.md](boton_carrito_topbar.md) | `BotonCarritoTopbar` (**nuevo**) |
| [barra_lateral.md](barra_lateral.md) | `BarraLateral` |
| [estructura_app.md](estructura_app.md), [estructura_tres_columnas.md](estructura_tres_columnas.md) | Estructuras de página |
| [menu.md](menu.md), [pestanas.md](pestanas.md), [paginacion.md](paginacion.md), [stepper.md](stepper.md) | Menú, pestañas, paginación y pasos |
| [modal.md](modal.md), [fondo_panel_flotante.md](fondo_panel_flotante.md) | `Modal`, `usarModal`, `FondoPanelFlotante` |
| [panel_lateral.md](panel_lateral.md), [columna_publicidad.md](columna_publicidad.md) | Paneles de la columna lateral |
| [tabla_compartida.md](tabla_compartida.md), [tabla_colaboradores.md](tabla_colaboradores.md) | Clases de tabla y tabla de Colaboradores |

### Presentación y utilidades
[insignia.md](insignia.md), [avatar_imagen.md](avatar_imagen.md), [mensaje_vacio.md](mensaje_vacio.md), [dona_progreso.md](dona_progreso.md), [sparkline.md](sparkline.md), [superficie_color.md](superficie_color.md), [texto_color.md](texto_color.md), [medida_dinamica.md](medida_dinamica.md), [graficos_y_visualizacion.md](graficos_y_visualizacion.md) (gráficos de `@codeplex-sac/graficos`).

### Marketplace, pagos y módulos
| Archivo | Alcance |
|---|---|
| [planes_marketplace.md](planes_marketplace.md) | Destacados, modal de planes, carrito y compras |
| [pasarela_pagos.md](pasarela_pagos.md) | Información de pago y resumen del pedido |
| [seccion_pago_metodo.md](seccion_pago_metodo.md), [opcion_metodo_pago.md](opcion_metodo_pago.md), [panel_pago_billetera.md](panel_pago_billetera.md), [titulo_panel_pago.md](titulo_panel_pago.md) | Componentes **nuevos** de la pasarela |
| [proveedor_carrito_marketplace.md](proveedor_carrito_marketplace.md) | Proveedor del carrito (**nuevo**) |
| [asistente_contaplex.md](asistente_contaplex.md) | Asistente de planes por producto |
| [calendario_eventos.md](calendario_eventos.md) | Calendario, formulario de eventos, mapa y filtros |
| [exportacion_colaboradores.md](exportacion_colaboradores.md) | Exportación a Excel y PDF (**nuevo**) |
| [modulos_y_patrones.md](modulos_y_patrones.md) | Inventario de los módulos y patrones repetidos |
| [modulos_detalle.md](modulos_detalle.md) | **Nuevo.** Registro por módulo: rutas, pestañas, controles compartidos y cambios de las Fases 2 a 6 |

## Resumen para quien trabaja con la librería

**Procedencia confirmada.** Las siete librerías `@codeplex-sac/*` (versiones en `procedencia_librerias_y_recursos.md`) coincidían archivo a archivo con sus paquetes publicados en la comprobación del 2026-10-17: **no hay modificaciones locales de librería** y no deben hacerse. Las diferencias de aspecto son adaptaciones del proyecto (envoltorios, tema MUI, `compartido.json`, clases Tailwind y tokens). La librería no ofrece botón, diálogo ni tooltip; `Boton`, `BotonIcono`, `Modal` y los chips son desarrollo propio y el tooltip es el `Tooltip` de `@mui/material` dentro del tema compartido.

**Iconos.** Material Symbols Rounded mediante `@codeplex-sac/iconos` (cargado desde Google Fonts en tiempo de ejecución) y 107 SVG propios, de los que 66 llevan cabecera `lucide-static v1.34.0 (ISC)` en el prototipo HTML (no hay `lucide-react`). Origen de 35 SVG: no determinado.

**Sistema de diseño.** Tokens en `montaje_local/index.css`; configuración de componentes en `catalogos/capacidades/redsocial/compartido.json`; tema MUI en `proveedor_tema_graficos.tsx` (tipografía heredada, primario `#5a43f4`, foco de 2 px con halo de 4 px, estilo de tooltip). Alturas: barra superior 64 px; `--control-height` 48 px (campos, selectores estándar, `Boton md`, selector de empresa); `cta` 40 px; `Boton default` 34/30 px; `mini` y `pildora` 30 px; `Selector mini` 40 px; `BotonPieLista` ≈ 49 px; chips y `Boton filtro` 32 px.

**Componentes introducidos en las Fases 5 y 6 y lo que sustituyen:** `FiltroDesplegable`/`MarcoPanelFiltro` (cuatro implementaciones de filtro de Eventos), `BannerInformativo` (cuatro copias de banner), `Boton size="pildora"` (combinación `filtro` + `mini` + `rounded-full`), `BotonPieLista` en Amigos y Grupos (enlaces escritos a mano), `Selector variant="mini"` en las cabeceras (botones secundarios con chevron que no abrían nada). La variante `compacto` de `Selector` (2026-10-19) sirve al selector de tipo de documento.

**Diferencias heredadas.** `Inter` declarada pero no entregada (decisión pendiente). Chips (32 px, radio 20) y `Boton filtro` (32 px, radio 8) tienen medidas distintas a propósito: función distinta.

## Alcance real y pendientes

- **Componentes compartidos documentados con detalle:** botones, campos, selectores (incluido el selector de empresa y su tooltip), fecha y hora, acordeón, filtros, banners, pies de lista, pestañas, paginación, menú, modal, tema MUI, tokens, iconos, barra superior y lateral, tablas, gráficos, exportación, procedencia y la pasarela de pagos.
- **Módulos:** los 15 módulos y Acceso tienen su registro en [modulos_detalle.md](modulos_detalle.md) (rutas y pestañas comprobadas contra los catálogos, controles compartidos extraídos del código y cambios de las Fases 2 a 6). **No se repitió el recorrido en navegador** para esta documentación: las medidas citadas proceden de las Fases 4 a 6 (49 rutas en 1280, 820, 400 y 320 px, estados tras clic a 1280 y 400 px) y de las tareas del 2026-10-19. Los estados no recorridos están en [excepciones_y_limitaciones.md](excepciones_y_limitaciones.md) §4.
- **No determinado:** origen de 35 SVG sin cabecera de licencia; origen de las imágenes de `redsocial/recursos/imagenes/`; causa raíz de la intermitencia de `proveedor_carrito_marketplace.test.tsx` (síntoma mitigado, causa no demostrada); contenido de `@mui/*` frente a sus tarballs.
- **Pruebas y gate:** última ejecución del 2026-10-19: 99 archivos y 746 pruebas de Vitest en verde (`npx vitest run`) y `npm run calidad` con todas las comprobaciones en verde, incluida **Regresión Empresas ✅** en las seis resoluciones (línea base `roles.json` `b1cce667…`, aprobada; ver [diferencias_aceptadas_linea_base.md](diferencias_aceptadas_linea_base.md)).
- **Archivos citados que no están en Git:** esta guía menciona informes y herramientas locales que `.gitignore` excluye: `INFORME_SISTEMA_VISUAL_GLOBAL_2026.md`, `INFORME_EMPRESAS_2026-10-05.md`, `AUDITORIA_ICONOS_LIBRERIA_2026*`, la carpeta `herramientas/` (incluida `herramientas/validacion/linea_base_visual/`, con `roles.json`) y el prototipo `CodePlex_RedSocial_HTML_nativo/`. Quien no los tenga localmente no podrá abrir esos enlaces; el contenido relevante para trabajar está resumido en esta carpeta. `AUDITORIA_DISENO_COMPARTIDO_2026_FASE4.md`, su Excel y `AUDITORIA_FASE4_2026_evidencias/` no están excluidos por `.gitignore`, pero el 2026-10-19 aún no estaban añadidos a Git (archivos sin seguimiento), igual que esta carpeta `guia/componentes/`.
