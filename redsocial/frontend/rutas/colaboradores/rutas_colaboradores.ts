import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'

export const rutasColaboradores = catalogoColaboradores.rutas

export * from '../../servicios/colaboradores/colaboradores'
export * from '../../servicios/colaboradores/estilos_colaboradores'
export { RESUMEN_COLABORADOR, RESUMEN_ROL, RESUMEN_VIGENCIA, CORREO_PREVIEW } from '../../servicios/colaboradores/invitacion_resumen'
export { PASOS_FUNCIONA_INVITAR_COLABORADOR, FORM_INFORMACION_DEFAULT } from '../../servicios/colaboradores/invitar_colaborador'
export * from '../../servicios/colaboradores/permisos'
export * from '../../servicios/colaboradores/vigencia'
