import type { ConfiguracionFlujoPago, PedidoPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

export interface ParametrosPedido {
  items: ItemCarrito[]
  configuracion: ConfiguracionPago
  clasesModulo: Record<string, string>
  aplicacionesConVip: string[]
  vip: boolean
  mejora: boolean
}

export interface DatosPedido {
  pedido: PedidoPago
  calendario: ConfiguracionFlujoPago['calendario']
  avisoRenovacion: string | null
  elegiblesVip: number
  fechaCobro: string
  totalNumerico: number
}
