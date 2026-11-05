import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Modal } from '../../compartido/interfaz/modal'
import { FlujoPago } from '../../compartido/pago/flujo_pago'
import { ExitoPagoPlanes } from './exito_pago_planes'
import { configurarFlujo, construirPedido } from './logica_pedido_pago'
import { SeccionPagoVip } from './seccion_pago_vip'
import type { ControlPerfilesPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { ItemCarrito, ServicioAdicional } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago, MetodosPago, ResumenActivacion } from '@/tipos/marketplace/modelo_pago'

export function ModalPagoPlanes({
  items,
  mejora = false,
  pago,
  metodosPago,
  perfilesPago,
  perfilInicialId,
  servicios,
  clasesModulo,
  alCerrar,
  alFinalizar,
}: {
  items: ItemCarrito[]
  mejora?: boolean
  pago: ConfiguracionPago
  metodosPago: MetodosPago
  perfilesPago: ControlPerfilesPago
  perfilInicialId: string | null
  servicios: ServicioAdicional[]
  clasesModulo: Record<string, string>
  alCerrar: () => void
  alFinalizar: (resumen: ResumenActivacion) => void
}) {
  const [vip, setVip] = useState(false)
  const [resumen, setResumen] = useState<ResumenActivacion | null>(null)
  const datos = construirPedido({ items, configuracion: pago, clasesModulo, aplicacionesConVip: servicios.map((servicio) => servicio.aplicacion), vip, mejora })
  const configuracion = configurarFlujo(datos, pago, mejora, perfilInicialId)

  function cerrar() {
    if (resumen) alFinalizar(resumen)
    else alCerrar()
  }

  return (
    <Modal titulo={catalogoMarketplace.pago.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={cerrar} suave className="max-w-240 rounded-2xl max-600:rounded-none">
      {resumen ? (
        <ExitoPagoPlanes items={items} resumen={resumen} alVolver={() => alFinalizar(resumen)} />
      ) : (
        <FlujoPago
          configuracion={configuracion}
          pedido={datos.pedido}
          tarjetas={metodosPago}
          perfiles={perfilesPago}
          adicional={datos.elegiblesVip > 0 && <SeccionPagoVip vip={pago.vip} seleccionado={vip} alCambiar={setVip} />}
          alActivar={(resultado) => setResumen({ fechaCobro: datos.fechaCobro, total: datos.totalNumerico, marca: resultado.marca, ultimos4: resultado.ultimos4, vip: vip && datos.elegiblesVip > 0, mejora })}
        />
      )}
    </Modal>
  )
}
