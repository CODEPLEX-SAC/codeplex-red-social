import type { ReactNode } from 'react'
import type catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from './contrato_icono'

export type TamanoAvatar = keyof typeof catalogoCompartido.avatar.tamanos
export type EstadoPresencia = keyof typeof catalogoCompartido.avatar.estados
export type TonoAvatar = keyof typeof catalogoCompartido.avatar.tonos
export type ColorInsigniaAvatar = keyof typeof catalogoCompartido.avatar.colores_insignia

export interface AvatarUsuarioProps {
  tamano?: TamanoAvatar
  imagen?: string
  iniciales?: string
  nombre?: string
  icono?: IconName
  tono?: TonoAvatar
  etiqueta?: string
  estado?: EstadoPresencia
  etiquetaEstado?: string
  insignia?: ReactNode
  colorInsignia?: ColorInsigniaAvatar
  claseInsignia?: string
  className?: string
}

export interface GrupoAvataresProps {
  avatares: number
  imagen?: string
  tamano?: TamanoAvatar
  resto?: string
  tono?: TonoAvatar
  className?: string
}
