import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { DetalleTarjetaGuardada } from './detalle_tarjeta_guardada'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago.metodo_guardado

export function InformacionPago({ tarjeta, alEditar, deshabilitado }: { tarjeta: TarjetaGuardada; alEditar: () => void; deshabilitado: boolean }) {
  return (
    <div className={textos.clases.tarjeta}>
      <DetalleTarjetaGuardada tarjeta={tarjeta} />
      <BotonIcono icono="editar" type="button" variant="sutil" aria-label={textos.editar_etiqueta} disabled={deshabilitado} onClick={alEditar} />
    </div>
  )
}
