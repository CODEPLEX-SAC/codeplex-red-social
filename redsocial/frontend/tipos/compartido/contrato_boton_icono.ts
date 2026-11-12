import type { ButtonHTMLAttributes } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export type BotonIconoVariant = 'default' | 'primario' | 'suave' | 'discreto' | 'sobre_oscuro' | 'contorno' | 'sutil' | 'flotante' | 'asistente' | 'llamada' | 'llamada_alerta' | 'llamada_fin'
export type BotonIconoSize = 'default' | 'sm' | 'md' | 'tactil' | 'control' | 'asistente' | 'llamada'

export interface BotonIconoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icono: IconName
  'aria-label': string
  variant?: BotonIconoVariant
  size?: BotonIconoSize
}
