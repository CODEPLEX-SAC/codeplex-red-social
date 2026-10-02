import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface GrupoDestacado {
  nombre: string
  icono: IconName
  fondo: 'azul-oscuro' | 'naranja' | 'violeta' | 'rosa-oscuro'
  overlay: 'morado' | 'naranja' | 'violeta' | 'rosa'
  tipo: string
  descripcion: string
}

export type ColorCategoria = 'morado' | 'azul' | 'verde' | 'rosa' | 'naranja' | 'rojo' | 'cyan'
