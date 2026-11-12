import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { MensajeEmergente } from '../interfaz/aviso_emergente'
import { ModalPerfilesPago } from './modal_perfiles_pago'
import { ModalTarjetasPago } from './modal_tarjetas_pago'
import type { CodeplexNotificacionPosicion } from '@codeplex-sac/feedback'
import type { VentanasFlujoPagoProps } from '@/tipos/compartido/contrato_flujo_pago'

const reglasAutorizacion = catalogoCompartido.flujo_pago.reglas.autorizacion

export function VentanasFlujoPago({ estado, tarjetas, perfiles, configuracion, movil }: VentanasFlujoPagoProps) {
  return (
    <>
      {estado.aviso && <MensajeEmergente abierto {...(movil ? { posicion: reglasAutorizacion.posicion_aviso_movil as CodeplexNotificacionPosicion } : {})} variante={estado.aviso.variante} mensaje={estado.aviso.mensaje} alCerrar={estado.cerrarAviso} {...(estado.aviso.variante === 'error' ? { duracion: reglasAutorizacion.duracion_aviso_error_ms } : {})} />}
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
