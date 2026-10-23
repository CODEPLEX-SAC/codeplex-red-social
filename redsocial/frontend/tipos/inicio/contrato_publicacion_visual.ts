import type { ReactNode } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { PublicacionCompartidaInicio } from './modelo_inicio'
import type { InteraccionPublicacion } from './contrato_interacciones_publicacion'
import type { ClaveReaccion, OpcionReaccion } from './contrato_reacciones'

export interface MarcoPublicacionProps {
  children: ReactNode
}

export interface CabeceraPublicacionProps {
  autorId: string
  nombre: string
  tiempo: string
  leyenda?: string
  publica?: boolean
  opciones?: ElementoMenu[]
}

export interface PiePublicacionProps {
  reacciones: string
  iconosResumen: OpcionReaccion[]
  comentarios: string
  compartidos?: string
  reaccion: ClaveReaccion | null
  puedeCompartir: boolean
  comentariosAbiertos: boolean
  idComentarios: string
  onReaccionar: (clave: ClaveReaccion) => void
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
  compartidos: number
  interaccion: InteraccionPublicacion
  puedeCompartir: boolean
  onCompartir: (comentario: string) => void
}
