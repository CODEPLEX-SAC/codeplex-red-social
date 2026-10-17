import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'

const clases = catalogoMarketplace.pago.clases

export function TituloPanelPago({ titulo, detalle }: { titulo: string; detalle?: string }) {
  return (
    <div>
      <h4 className={clases.panel_titulo}>{titulo}</h4>
      {detalle && <p className={clases.panel_detalle}>{detalle}</p>}
    </div>
  )
}
