import type { ReactNode } from 'react'
import type { IconName } from './contrato_icono'

export interface ElementoPestana {
  clave: string
  etiqueta: ReactNode
  ruta?: string
  icono?: IconName
  insignia?: number | string
}

export interface PestanasProps {
  elementos: readonly ElementoPestana[]
  activa: string
  alCambiar?: (clave: string) => void
  className?: string
}
