import type { NOMBRES_ICONOS, MAPA_ICONOS } from '../../datos/compartido/iconos'

export type NombreIcono = (typeof NOMBRES_ICONOS)[number]
export type IconName = keyof typeof MAPA_ICONOS | NombreIcono
