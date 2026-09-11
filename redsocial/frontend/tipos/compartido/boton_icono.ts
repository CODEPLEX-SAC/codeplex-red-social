import type { ButtonHTMLAttributes } from 'react'
import type { IconName } from '@/tipos/compartido/icono'

export type BotonIconoVariant = 'default' | 'primario'
export type BotonIconoSize = 'default' | 'sm'

export interface BotonIconoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icono: IconName
  'aria-label': string
  variant?: BotonIconoVariant
  size?: BotonIconoSize
}
