import type { IconName } from '@/tipos/compartido/icono'

export type EstadoIndicador = 'exito' | 'info' | 'pendiente' | 'advertencia' | 'error'
export type ColorEvento = 'verde' | 'azul' | 'morado' | 'naranja' | 'rojo'

export interface EventoSistema {
  titulo: string
  icono: IconName
  color: ColorEvento
  descripcion: string
  detalles: string[]
  tiempo: string
  estado: EstadoIndicador
}
