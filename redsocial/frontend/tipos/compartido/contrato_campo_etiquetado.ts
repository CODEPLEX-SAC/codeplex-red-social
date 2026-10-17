import type { ReactNode } from 'react'

export interface CampoEtiquetadoProps {
  etiqueta: string
  requerido?: boolean
  className?: string
  children: ReactNode
}
