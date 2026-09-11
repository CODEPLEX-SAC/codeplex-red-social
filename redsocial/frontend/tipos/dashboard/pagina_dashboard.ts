import type { IconName } from '@/tipos/compartido/icono'

export interface Kpi {
  icono: IconName
  color: 'azul' | 'rojo' | 'morado' | 'cian'
  etiqueta: string
  valor: string
  variacion: { direccion: 'positiva' | 'negativa'; texto: string }
  sparklinePuntos: string
  sparklineColor: string
}

export interface Modulo {
  icono: IconName
  color: 'verde' | 'azul' | 'naranja' | 'morado' | 'cian'
  nombre: string
  filas: { etiqueta: string; valor: string; badge?: { estado: 'optimo' | 'aceptable' | 'bajo' | 'riesgo'; texto: string } }[]
}
