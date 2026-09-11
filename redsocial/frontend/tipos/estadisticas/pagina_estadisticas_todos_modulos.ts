import type { IconName } from '@/tipos/compartido/icono'

export interface Kpi {
  icono: IconName
  color: 'azul' | 'rojo' | 'verde' | 'morado' | 'cian'
  etiqueta: string
  valor: string
  variacion: { direccion: 'positiva' | 'negativa'; texto: string }
  sparklinePuntos: string
  sparklineColor: string
}

export type EstadoRatio = 'optimo' | 'aceptable' | 'bajo' | 'riesgo'
