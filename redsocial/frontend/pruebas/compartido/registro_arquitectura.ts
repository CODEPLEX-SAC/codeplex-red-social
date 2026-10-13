export const GRUPOS_DE_GLIFO_DUPLICADO: string[] = ['ajustes-sistema|configuracion', 'archivo-hoja|documento|reporte', 'bloqueado|sin-acceso']

export const MODALES_PROPIOS_PERMITIDOS: Record<string, { clasificacion: string; motivo: string }> = {
  '/componentes/colaboradores/bloques/panel_filtros_avanzados.tsx': { clasificacion: 'C', motivo: 'panel flotante no modal; su foco y Escape los gestiona FondoPanelFlotante' },
  '/componentes/empresas/bloques/panel_filtros_avanzados_empresas.tsx': { clasificacion: 'C', motivo: 'panel flotante no modal; su foco y Escape los gestiona FondoPanelFlotante' },
  '/componentes/compartido/navegacion/panel_usuario_topbar.tsx': { clasificacion: 'C', motivo: 'panel del menu de usuario; su foco y Escape los gestiona FondoPanelFlotante' },
}

export const SECCIONES_DE_CONTRATO_DE_CAPACIDAD: string[] = ['permisos', 'alertas', 'errores', 'toast', 'titulo_menu', 'contexto_requerido', 'acciones', 'mensajes']

const CAMPOS_DEL_CONTRATO = 'seccion campos exigida por el validador: etiquetas de los campos de busqueda, filtros y formularios de la pantalla (PLAN_VALIDADOR_REDSOCIAL.md)'
const ENCABEZADOS_DINAMICOS = 'encabezado de tabla consumido con Object.values sobre la seccion tabla'

export const CLAVES_SIN_CONSUMO_ESTATICO: Record<string, { clasificacion: string; motivo: string }> = {
  'actividad.json:campos.buscar_actividad': { clasificacion: 'CONTRATO_PLATAFORMA', motivo: CAMPOS_DEL_CONTRATO },
  'actividad.json:campos.tipo_actividad': { clasificacion: 'CONTRATO_PLATAFORMA', motivo: CAMPOS_DEL_CONTRATO },
  'amigos.json:campos.nombre_lista': { clasificacion: 'CONTRATO_PLATAFORMA', motivo: CAMPOS_DEL_CONTRATO },
  'avisos.json:campos.buscar_notificacion': { clasificacion: 'CONTRATO_PLATAFORMA', motivo: CAMPOS_DEL_CONTRATO },
  'grupos.json:campos.nombre_grupo': { clasificacion: 'CONTRATO_PLATAFORMA', motivo: CAMPOS_DEL_CONTRATO },
  'colaboradores.json:botones.desactivar_acceso': { clasificacion: 'CONSUMIDA_POR_PRUEBA', motivo: 'la prueba seccion_detalle_colaborador la usa como texto de referencia para comprobar que la accion ya no se muestra' },
  'empresas.json:usuarios_empresa.tabla.fecha_acceso': { clasificacion: 'CONSUMIDA_DINAMICAMENTE', motivo: ENCABEZADOS_DINAMICOS },
  'empresas.json:historial_empresa.tabla.fecha_hora': { clasificacion: 'CONSUMIDA_DINAMICAMENTE', motivo: ENCABEZADOS_DINAMICOS },
}

export const TEXTO_TRANSLUCIDO_NO_DETERMINADO: Record<string, string> = {
  '/componentes/acceso/bloques/panel_visual_acceso.tsx': 'contador blanco al 80 % sobre imagen del carrusel',
  '/componentes/avisos/bloques/panel_lateral_solicitudes_aviso.tsx': 'texto blanco al 85 % sobre degradado violeta',
  '/componentes/guardados/bloques/panel_lateral_guardados.tsx': 'texto blanco al 80 % sobre degradado',
}
