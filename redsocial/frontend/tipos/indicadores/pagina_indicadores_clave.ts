import type { IconName } from '@/tipos/compartido/icono'

export interface Kpi {
  icono: IconName
  color: 'verde' | 'morado' | 'naranja'
  etiqueta: string
  valor: string
  variacion: { direccion: 'positiva' | 'negativa'; texto: string }
  sparklinePuntos: string
  sparklineColor: string
}

export type EstadoInd = 'optimo' | 'regular' | 'bajo'

export interface FilaTabla {
  indicador: string
  valor: string
  estado: EstadoInd
  variacion: string
  tipo: 'positiva' | 'negativa'
}

export interface TarjetaModulo {
  icono: IconName
  color: 'verde' | 'morado' | 'naranja' | 'azul' | 'rojo'
  nombre: string
  etiquetaDato: string
  valor: string
  variacion: string
  estado: EstadoInd
  sparklinePuntos: string
  sparklineColor: string
}
