import type { ReactNode } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export type MiniaturaSolicitud =
  | { tipo: 'avatar' }
  | { tipo: 'icono'; icono: IconName; color: string }
  | { tipo: 'calendario'; dia: string; mes: string; color: string }

export interface FilaSolicitudAvisoProps {
  miniatura: MiniaturaSolicitud
  titulo: string
  lineaSecundaria: ReactNode
  lineaTerciaria?: ReactNode
  tiempo: string
  accionPrimaria: string
  accionSecundaria: string
}
