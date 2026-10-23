import type { ReactNode } from 'react'
import type { IconName } from './contrato_icono'

export interface FiltroDesplegableProps {
  id: string
  abierto: boolean
  alCambiarAbierto: (abierto: boolean) => void
  icono: IconName
  etiqueta: string
  activo?: boolean
  quitar?: { etiqueta: string; alQuitar: () => void }
  children: ReactNode
}

export interface MarcoPanelFiltroProps {
  id?: string
  className?: string
  children: ReactNode
}
