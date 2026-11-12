import { BotonActivarPago } from './boton_activar_pago'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { usarFlujoPago } from './usar_flujo_pago'
import type { PedidoPago } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function BarraAccionPago({ pedido, estado }: { pedido: PedidoPago; estado: ReturnType<typeof usarFlujoPago> }) {
  return (
    <div className={clases.barra_accion}>
      <div className={clases.barra_accion_total}>
        <span>{pedido.totalEtiqueta}</span>
        <span>{pedido.total}</span>
      </div>
      <BotonActivarPago estado={estado} accion={pedido.accion} />
    </div>
  )
}
