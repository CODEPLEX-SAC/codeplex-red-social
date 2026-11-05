import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { AvisoEmergente } from '../interfaz/aviso_emergente'
import { usarVistaMovil } from '../interfaz/usar_vista_movil'
import { BarraAccionPago } from './barra_accion_pago'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { ModalPerfilesPago } from './modal_perfiles_pago'
import { ModalTarjetasPago } from './modal_tarjetas_pago'
import { ResumenPedidoPago } from './resumen_pedido_pago'
import { SeccionAutorizacionPago } from './seccion_autorizacion_pago'
import { SeccionCalendarioPago } from './seccion_calendario_pago'
import { SeccionFacturacionPago } from './seccion_facturacion_pago'
import { SeccionMetodoPago } from './seccion_metodo_pago'
import { usarFlujoPago } from './usar_flujo_pago'
import type { CodeplexNotificacionPosicion } from '@codeplex-sac/feedback'
import type { FlujoPagoProps } from '@/tipos/compartido/contrato_flujo_pago'

const reglasAutorizacion = catalogoCompartido.flujo_pago.reglas.autorizacion

export function ContenidoFlujoPago({ configuracion, pedido, tarjetas, perfiles, adicional, alActivar }: FlujoPagoProps) {
  const estado = usarFlujoPago(configuracion, tarjetas, perfiles, alActivar)
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
      {estado.aviso && <AvisoEmergente abierto {...(movil ? { posicion: reglasAutorizacion.posicion_aviso_movil as CodeplexNotificacionPosicion } : {})} variante={estado.aviso.variante} mensaje={estado.aviso.mensaje} alCerrar={estado.cerrarAviso} {...(estado.aviso.variante === 'error' ? { duracion: reglasAutorizacion.duracion_aviso_error_ms } : {})} />}
      {estado.ventana === 'tarjetas' && <ModalTarjetasPago control={tarjetas} alNotificar={estado.notificar} seleccionadaId={estado.tarjetaGuardada?.id ?? null} aviso={configuracion.demostracion?.tarjetas} alUsar={estado.usarTarjeta} alCerrar={estado.cerrarVentana} />}
      {estado.ventana === 'perfiles' && (
        <ModalPerfilesPago
          perfiles={perfiles.perfiles}
          seleccionadoId={estado.facturacion.perfil?.id ?? null}
          aviso={configuracion.demostracion?.perfiles}
          alSeleccionar={(id) => {
            estado.facturacion.elegir(id)
            estado.cerrarVentana()
          }}
          alAgregar={() => {
            estado.facturacion.agregar()
            estado.cerrarVentana()
          }}
          alCerrar={estado.cerrarVentana}
        />
      )}
    </>
  )
}
