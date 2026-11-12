import { Insignia } from '../interfaz/insignia'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { tarjetaVencida } from './logica_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { TarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function EtiquetasTarjetaPago({ tarjeta }: { tarjeta: TarjetaPago }) {
  const textos = usarTextosPago().metodo_guardado
  return (
    <>
      {tarjeta.predeterminada && <Insignia variant="status" className={clases.etiqueta_predeterminada}>{textos.predeterminada}</Insignia>}
      {tarjetaVencida(tarjeta.vencimiento) && <Insignia variant="status" className={clases.etiqueta_vencida}>{textos.vencida}</Insignia>}
    </>
  )
}
