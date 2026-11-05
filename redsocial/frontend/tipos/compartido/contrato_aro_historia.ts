import type { ReactNode } from 'react'

export type EstadoAroHistoria = 'ninguna' | 'nueva' | 'vista'

export interface AroHistoriaProps {
  estado: EstadoAroHistoria
  etiqueta: string
  onAbrir: () => void
  className?: string
  children: ReactNode
}
