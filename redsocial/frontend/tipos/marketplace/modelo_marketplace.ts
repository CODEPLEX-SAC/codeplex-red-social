import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface Destacado {
  nombre: string
  icono: IconName
  color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rojo'
  planes?: string
  descripcion: string
  precio: string
  gratis: boolean
  categoria: string
  publicador: string
  caracteristicas: string[]
}
