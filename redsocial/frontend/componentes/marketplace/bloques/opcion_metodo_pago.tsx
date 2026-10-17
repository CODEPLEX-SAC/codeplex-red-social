import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import type { OpcionMetodoPagoProps } from '@/tipos/marketplace/modelo_pago'

const clases = catalogoMarketplace.pago.clases

export function OpcionMetodoPago({ titulo, detalle, icono, activa, alElegir }: OpcionMetodoPagoProps) {
  return (
    <button type="button" role="radio" aria-checked={activa} onClick={alElegir} className={`${clases.metodo} ${activa ? clases.metodo_activo : clases.metodo_inactivo}`}>
      <span className={clases.metodo_icono}>
        <Icono name={icono} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-nombre-fila text-texto">{titulo}</strong>
        {detalle && <span className="block text-auxiliar text-texto-suave">{detalle}</span>}
      </span>
      <span className={`${clases.indicador} ${activa ? clases.indicador_activo : clases.indicador_inactivo}`}>
        {activa && <Icono name="marca-pequena" className="h-3 w-3" />}
      </span>
    </button>
  )
}
