import { BotonIcono } from '../interfaz/boton_icono'
import { EtiquetasTarjetaPago } from './etiquetas_tarjeta_pago'
import { detalleTarjeta, tarjetaVencida, tituloTarjeta } from './logica_tarjeta_pago'
import { OpcionMetodoPago } from './opcion_metodo_pago'
import { usarTextosPago } from './usar_textos_pago'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { FilaTarjetaPagoProps } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function FilaTarjetaPago({ tarjeta, activa, alElegir, alEditar }: FilaTarjetaPagoProps) {
  const textos = usarTextosPago()

  return (
    <div className={clases.fila_tarjeta}>
      <div className={clases.fila_tarjeta_opcion}>
        <OpcionMetodoPago titulo={tituloTarjeta(tarjeta, textos)} detalle={detalleTarjeta(tarjeta, textos)} icono="tarjeta-pago" activa={activa} deshabilitada={tarjetaVencida(tarjeta.vencimiento)} adicional={<EtiquetasTarjetaPago tarjeta={tarjeta} />} alElegir={alElegir} />
      </div>
      <BotonIcono icono="editar-oficial" type="button" variant="sutil" aria-label={textos.tarjetas.editar_tarjeta.replace(':tarjeta', tituloTarjeta(tarjeta, textos))} onClick={alEditar} />
    </div>
  )
}
