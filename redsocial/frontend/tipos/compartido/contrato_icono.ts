import type catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

export type NombreIcono = (typeof catalogoCompartido.nombres_iconos)[number]
export type IconName = keyof typeof catalogoCompartido.iconos | NombreIcono
