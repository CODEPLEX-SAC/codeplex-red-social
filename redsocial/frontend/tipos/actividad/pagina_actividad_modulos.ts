import type { IconName } from '@/tipos/compartido/icono'

export type ColorModulo = 'verde' | 'azul' | 'naranja' | 'rosa'

export interface EventoModulo {
  nombre: string
  icono: IconName
  color: ColorModulo
  descripcion: string
  referencia: string
  colorReferencia: ColorModulo
  detalles: string
  tiempo: string
}
