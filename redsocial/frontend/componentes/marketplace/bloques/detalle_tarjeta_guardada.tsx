import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { detalleTarjeta, tarjetaVencida, tituloTarjeta } from './logica_metodos_pago'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago.metodo_guardado
const clases = textos.clases

export function EtiquetasTarjeta({ tarjeta }: { tarjeta: TarjetaGuardada }) {
  return (
    <>
      {tarjeta.predeterminada && <Insignia variant="status" className={clases.etiqueta_predeterminada}>{textos.predeterminada}</Insignia>}
      {tarjetaVencida(tarjeta.vencimiento) && <Insignia variant="status" className={clases.etiqueta_vencida}>{textos.vencida}</Insignia>}
    </>
  )
}

export function DetalleTarjetaGuardada({ tarjeta }: { tarjeta: TarjetaGuardada }) {
  return (
    <>
      <Icono name="tarjeta-pago" className={clases.icono} />
      <div className={clases.texto}>
        <div className={clases.linea_principal}>
          <span>{tituloTarjeta(tarjeta)}</span>
          <EtiquetasTarjeta tarjeta={tarjeta} />
        </div>
        <div className={clases.linea_secundaria}>{detalleTarjeta(tarjeta)}</div>
      </div>
    </>
  )
}
