import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'

const clases = catalogoMarketplace.pago.clases

export function EncabezadoPasoPago({ numero, titulo, detalle }: { numero: number; titulo: string; detalle: string }) {
  return (
    <div className={clases.encabezado}>
      <span className={clases.numero}>{numero}</span>
      <div className="min-w-0">
        <h3 className="m-0 text-nombre-entidad text-texto">{titulo}</h3>
        <p className="m-0 text-auxiliar text-texto-suave">{detalle}</p>
      </div>
    </div>
  )
}
