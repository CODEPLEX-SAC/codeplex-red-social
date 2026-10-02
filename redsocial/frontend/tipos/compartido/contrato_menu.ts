import type { IconName } from './contrato_icono'

export interface ElementoMenu {
  etiqueta: string
  icono?: IconName
  ruta?: string
  peligro?: boolean
  divisor?: boolean
  alHacerClick?: () => void
}

export interface MenuProps {
  elementos: readonly ElementoMenu[]
  ancla: HTMLElement | null
  alCerrar: () => void
}
