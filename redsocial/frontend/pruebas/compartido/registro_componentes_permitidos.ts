export interface ExcepcionDeColor {
  clasificacion: string
  motivo: string
}

export interface ExcepcionDeBoton {
  cantidad: number
  clasificacion: string
  motivo: string
}

const PALETA_MARKETPLACE = 'paleta de identidad de los iconos de modulo del Marketplace'
const SERIES_REPORTES = 'paleta de series de los graficos de Reportes'

export const COLORES_NOMBRADOS_PERMITIDOS: Record<string, ExcepcionDeColor> = {
  '007aff': { clasificacion: 'identidad', motivo: PALETA_MARKETPLACE },
  '34c759': { clasificacion: 'identidad', motivo: PALETA_MARKETPLACE },
  '5856d6': { clasificacion: 'identidad', motivo: PALETA_MARKETPLACE },
  ff9500: { clasificacion: 'identidad', motivo: PALETA_MARKETPLACE },
  ff2d55: { clasificacion: 'identidad', motivo: PALETA_MARKETPLACE },
  ea580c: { clasificacion: 'identidad', motivo: 'fondo de icono de lista: el blanco alcanza 3,56:1 y naranja-categoria solo 2,8:1' },
  c4b5fd: { clasificacion: 'grafico', motivo: SERIES_REPORTES },
  ddd6fe: { clasificacion: 'grafico', motivo: SERIES_REPORTES },
  fed7aa: { clasificacion: 'grafico', motivo: SERIES_REPORTES },
  e4defb: { clasificacion: 'grafico', motivo: 'leyenda de la serie de proyeccion en Dashboard y Estadisticas' },
}

export const ICONOS_DECORATIVOS_PERMITIDOS: string[] = [
  '/componentes/actividad/bloques/tarjeta_actividad.tsx',
  '/componentes/amigos/bloques/bloque_mensaje.tsx',
  '/componentes/compartido/bloques/columna_publicidad.tsx',
  '/paginas/actividad/pagina_actividad_grupos.tsx',
  '/paginas/actividad/pagina_actividad_todas.tsx',
  '/paginas/amigos/pagina_amigos_todos.tsx',
  '/paginas/avisos/pagina_avisos_solicitudes.tsx',
]

const SUPERFICIE_SOBRE_VIDEO = 'control sobre el video con paleta de superposicion propia'
const FILA_DE_OPCION = 'fila de opcion o de seleccion con estado propio, no es una accion estandar'

export const BOTONES_NATIVOS_PERMITIDOS: Record<string, ExcepcionDeBoton> = {
  '/componentes/acceso/bloques/panel_visual_acceso.tsx': { cantidad: 1, clasificacion: 'C', motivo: 'indicador de carrusel con aria-label por imagen' },
  '/componentes/acceso/bloques/selector_modo_acceso.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'pestana del modo de acceso con ids y roles propios' },
  '/componentes/compartido/bloques/columna_publicidad.tsx': { cantidad: 2, clasificacion: 'C', motivo: 'flechas del carrusel de anuncios sobre fondo oscuro' },
  '/componentes/compartido/interfaz/boton.tsx': { cantidad: 1, clasificacion: 'A', motivo: 'es el componente Boton' },
  '/componentes/compartido/interfaz/boton_icono.tsx': { cantidad: 1, clasificacion: 'A', motivo: 'es el componente BotonIcono' },
  '/componentes/compartido/navegacion/barra_superior.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'disparador de avisos de la barra superior con aria-haspopup' },
  '/componentes/compartido/interfaz/selector_buscable.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'disparador del selector buscable: muestra icono, titulo, subtitulo y flecha, con aria-haspopup' },
  '/componentes/compartido/interfaz/lista_opciones_buscables.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'fila de opcion del selector buscable con icono, titulo y subtitulo' },
  '/componentes/compartido/navegacion/menu_usuario_topbar.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'disparador del menu de usuario con avatar' },
  '/componentes/compartido/navegacion/panel_usuario_topbar.tsx': { cantidad: 1, clasificacion: 'C', motivo: 'fila de menu deshabilitada con aria-disabled' },
  '/componentes/eventos/bloques/bloque_eventos_calendario1.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'dia del calendario, control especial con estado deshabilitado' },
  '/componentes/eventos/bloques/bloque_hoy.tsx': { cantidad: 3, clasificacion: 'C', motivo: 'control segmentado Mes/Semana/Dia con aria-pressed' },
  '/componentes/eventos/bloques/bloque_panel_filtro_fecha2.tsx': { cantidad: 2, clasificacion: 'B', motivo: 'dias del calendario de rango y de dia unico' },
  '/componentes/eventos/bloques/bloque_titulo2.tsx': { cantidad: 3, clasificacion: 'C', motivo: FILA_DE_OPCION },
  '/componentes/eventos/bloques/seccion_destacados2.tsx': { cantidad: 1, clasificacion: 'C', motivo: 'punto de paginacion del carrusel con aria-label' },
  '/componentes/eventos/bloques/seccion_titulo_buscar2.tsx': { cantidad: 2, clasificacion: 'C', motivo: FILA_DE_OPCION },
  '/componentes/inicio/bloques/bloque_foto_video.tsx': { cantidad: 1, clasificacion: 'C', motivo: 'disparador con forma de campo que abre el dialogo de publicacion' },
  '/componentes/marketplace/bloques/item_caracteristica.tsx': { cantidad: 1, clasificacion: 'C', motivo: 'texto de caracteristica que abre su detalle y hereda el color de la tarjeta clara u oscura; Boton no tiene variante heredada' },
  '/componentes/mensajeria/bloques/control_llamada.tsx': { cantidad: 1, clasificacion: 'G', motivo: SUPERFICIE_SOBRE_VIDEO },
  '/componentes/mensajeria/bloques/lista_conversaciones.tsx': { cantidad: 1, clasificacion: 'C', motivo: FILA_DE_OPCION },
  '/componentes/mensajeria/bloques/seccion_videollamada_iniciar.tsx': { cantidad: 4, clasificacion: 'G', motivo: SUPERFICIE_SOBRE_VIDEO },
  '/formularios/eventos/formulario_evento.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'tarjeta con role radio y aria-checked' },
  '/componentes/marketplace/bloques/opcion_metodo_pago.tsx': { cantidad: 1, clasificacion: 'B', motivo: 'tarjeta de metodo de pago con role radio y aria-checked' },
  '/paginas/amigos/pagina_amigos_listas.tsx': { cantidad: 1, clasificacion: 'F', motivo: 'tarjeta punteada de alta de lista, patron unico' },
  '/paginas/mensajeria/pagina_mensajes_favoritos.tsx': { cantidad: 1, clasificacion: 'C', motivo: FILA_DE_OPCION },
  '/paginas/mensajeria/pagina_mensajes_no_leidos.tsx': { cantidad: 1, clasificacion: 'C', motivo: FILA_DE_OPCION },
  '/paginas/mensajeria/pagina_mensajes_videollamada_iniciar.tsx': { cantidad: 1, clasificacion: 'C', motivo: FILA_DE_OPCION },
}
