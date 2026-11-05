import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'

export function TituloPanelPago({ titulo, detalle }: { titulo: string; detalle?: string }) {
  return (
    <div>
      <h4 className={clases.panel_titulo}>{titulo}</h4>
      {detalle && <p className={clases.panel_detalle}>{detalle}</p>}
    </div>
  )
}
