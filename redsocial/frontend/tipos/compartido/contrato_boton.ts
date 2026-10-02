import type { ButtonHTMLAttributes } from 'react'

export type BotonVariant = 'primario' | 'secundario' | 'oscuro' | 'peligro' | 'exito' | 'contorno' | 'peligro_contorno' | 'filtro' | 'enlace' | 'fantasma'
export type BotonSize = 'mini' | 'default' | 'md' | 'filtro' | 'enlace'

export interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BotonVariant
  size?: BotonSize
  activo?: boolean
}
