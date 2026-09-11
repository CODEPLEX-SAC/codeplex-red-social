import type { IconName } from '@/tipos/compartido/icono'

export type TarjetaIndicadorColor = 'azul' | 'rojo' | 'verde' | 'morado' | 'cian' | 'naranja'

export interface TarjetaIndicadorVariacion {
  direccion: 'positiva' | 'negativa'
  texto: string
}

export interface TarjetaIndicadorProps {
  icono: IconName
  color: TarjetaIndicadorColor
  etiqueta: string
  valor: string
  variacion?: TarjetaIndicadorVariacion
}
