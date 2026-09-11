import type { ElementoNavegacion as NavItemData } from '@/tipos/compartido/navegacion'

export interface ElementoNavegacionProps {
  item: NavItemData
  activo?: boolean
  colapsado?: boolean
}
