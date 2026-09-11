import type { IconName } from '@/tipos/compartido/icono'

export interface Destacado {
  nombre: string
  icono: IconName
  color: 'verde' | 'azul' | 'morado' | 'naranja'
  popular?: boolean
  puntaje: string
  conteo: string
  descripcion: string
  precio: string
}
