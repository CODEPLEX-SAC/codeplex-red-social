import type { ReactNode } from 'react'
import type { IconName } from '@/tipos/compartido/icono'

export interface TarjetaActividadProps {
  iconoSistema?: IconName
  nombreUsuario: string
  accion?: string
  nombreGrupo?: string
  nombreModulo?: string
  tiempo: string
  visibilidad?: boolean
  children: ReactNode
  interacciones?: { reacciones: number; comentarios: number }
}
