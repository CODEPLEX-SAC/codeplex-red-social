import type { ButtonHTMLAttributes } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export type BotonIconoVariant = 'default' | 'primario' | 'suave' | 'discreto' | 'contorno' | 'sutil' | 'flotante'
export type BotonIconoSize = 'default' | 'sm' | 'md'

export interface BotonIconoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icono: IconName
  'aria-label': string
  variant?: BotonIconoVariant
  size?: BotonIconoSize
}
