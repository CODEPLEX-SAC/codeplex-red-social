import type { IconName } from '@/tipos/compartido/icono'

export interface MiLista {
  icono: IconName
  color: 'morado' | 'naranja' | 'azul' | 'verde' | 'rosa' | 'azul-claro'
  nombre: string
  cantidad: string
  avatares: number
  masAvatares: string
  descripcion: string
}
