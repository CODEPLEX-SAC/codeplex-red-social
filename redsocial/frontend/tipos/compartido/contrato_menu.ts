import type { CodeplexMenuProps } from '@codeplex-sac/navegacion'
import type { IconName } from './contrato_icono'

export type RanurasMenu = CodeplexMenuProps extends { slotProps?: infer R } ? R : never

export interface ElementoMenu {
  etiqueta: string
  icono?: IconName
  ruta?: string
  peligro?: boolean
  deshabilitado?: boolean
  divisor?: boolean
  alHacerClick?: () => void
}

export interface MenuProps {
  elementos: readonly ElementoMenu[]
  ancla: HTMLElement | null
  alCerrar: () => void
  arriba?: boolean
}
