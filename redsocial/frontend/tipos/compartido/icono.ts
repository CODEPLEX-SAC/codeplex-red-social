import type { NOMBRES_ICONOS } from '../../datos/compartido/iconos'
import type catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

export type NombreIcono = (typeof NOMBRES_ICONOS)[number]
export type IconName = keyof typeof catalogoCompartido.iconos | NombreIcono
