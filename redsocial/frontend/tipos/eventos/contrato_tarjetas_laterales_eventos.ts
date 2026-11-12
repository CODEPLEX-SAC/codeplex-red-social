import type { ItemEventoLateralProps } from './contrato_item_evento_lateral'

export interface TarjetaProximosEventosProps {
  proximos: readonly ItemEventoLateralProps['evento'][]
}

export interface TarjetaResumenEventosProps {
  resumen: readonly { valor: string; etiqueta: string }[]
}
