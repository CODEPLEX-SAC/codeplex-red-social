import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'

export const rutasGrupos = catalogoGrupos.rutas

export * from '../../servicios/grupos/descubrir'
export * from '../../servicios/grupos/estilos_descubrir'
export * from '../../servicios/grupos/estilos_invitaciones'
export * from '../../servicios/grupos/estilos_mis_grupos'
export * from '../../servicios/grupos/invitaciones'
export * from '../../servicios/grupos/mis_grupos'
export * from '../../servicios/grupos/detalle_grupos'
export * from '../../servicios/grupos/tus_grupos'
export * from '../../servicios/grupos/imagenes_grupos'
export { PUERTO_GRUPOS } from '../../servicios/grupos/almacen_grupos'
export { destinosDeGrupos } from '../../servicios/grupos/almacen_grupos'
