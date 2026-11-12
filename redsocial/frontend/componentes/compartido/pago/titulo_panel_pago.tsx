import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.flujo_pago.clases

export function TituloPanelPago({ titulo, detalle }: { titulo: string; detalle?: string }) {
  return (
    <div>
      <h4 className={clases.panel_titulo}>{titulo}</h4>
      {detalle && <p className={clases.panel_detalle}>{detalle}</p>}
    </div>
  )
}
