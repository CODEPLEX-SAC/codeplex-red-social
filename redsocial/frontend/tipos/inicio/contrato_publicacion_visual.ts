import type { ReactNode } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { PublicacionCompartidaInicio } from './modelo_inicio'

export interface MarcoPublicacionProps {
  children: ReactNode
}

export interface CabeceraPublicacionProps {
  autorId: string
  nombre: string
  tiempo: string
  leyenda?: string
  opciones?: ElementoMenu[]
}

export interface PiePublicacionProps {
  reacciones: string
  comentarios: string
  compartidos?: string
  meGusta: boolean
  comentariosAbiertos: boolean
  idComentarios: string
  onMeGusta: () => void
  onComentar: () => void
  onCompartir: () => void
}

export interface AccionPublicacion {
  clave: 'me_gusta' | 'comentar' | 'compartir'
  icono: IconName
}

export type DialogoPublicacion = 'editar' | 'eliminar'

export interface OpcionMenuPublicacion {
  clave: DialogoPublicacion
  etiqueta: string
  icono: IconName
  peligro?: boolean
}

export interface TarjetaCompartidaProps {
  publicacion: PublicacionCompartidaInicio
}
