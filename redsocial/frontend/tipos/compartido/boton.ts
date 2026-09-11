import type { ButtonHTMLAttributes } from 'react'

export type BotonVariant = 'primario' | 'secundario' | 'oscuro' | 'peligro' | 'exito'
export type BotonSize = 'mini' | 'default' | 'md'

export interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BotonVariant
  size?: BotonSize
}
