import { usarVistaMovil } from '../interfaz/usar_vista_movil'
import { BarraAccionPago } from './barra_accion_pago'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { ResumenPedidoPago } from './resumen_pedido_pago'
import { SeccionAutorizacionPago } from './seccion_autorizacion_pago'
import { SeccionCalendarioPago } from './seccion_calendario_pago'
import { SeccionFacturacionPago } from './seccion_facturacion_pago'
import { SeccionMetodoPago } from './seccion_metodo_pago'
import { usarFlujoPago } from './usar_flujo_pago'
import { VentanasFlujoPago } from './ventanas_flujo_pago'
import type { FlujoPagoProps } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function ContenidoFlujoPago({ configuracion, pedido, tarjetas, perfiles, adicional, alActivar }: FlujoPagoProps) {
  const estado = usarFlujoPago({ configuracion, tarjetas, perfiles, alActivar })
  const movil = usarVistaMovil()
  const calendario = configuracion.calendario
  const numeroAutorizacion = calendario ? 4 : 3

  return (
    <>
      <div className={clases.cuerpo}>
        <div className={clases.columnas}>
          <div className={clases.columna_pasos}>
            <SeccionMetodoPago estado={estado} tarjetas={tarjetas} configuracion={configuracion} total={pedido.total} numero={1} />
            <SeccionFacturacionPago estado={estado} perfiles={perfiles} configuracion={configuracion} numero={2} />
            {adicional}
            {calendario && <SeccionCalendarioPago numero={3} titulo={calendario.titulo} detalle={calendario.detalle} filas={calendario.filas} />}
            <SeccionAutorizacionPago numero={numeroAutorizacion} autorizaciones={configuracion.autorizaciones} aceptaciones={estado.aceptaciones} errores={estado.erroresAutorizacion} alCambiar={estado.alternarAceptacion} />
          </div>
          <ResumenPedidoPago pedido={pedido} estado={estado} conAccion={!movil} />
        </div>
        {movil && <BarraAccionPago pedido={pedido} estado={estado} />}
      </div>
      <VentanasFlujoPago estado={estado} tarjetas={tarjetas} perfiles={perfiles} configuracion={configuracion} movil={movil} />
    </>
  )
}
