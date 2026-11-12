import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.flujo_pago.clases

export function EncabezadoPasoPago({ numero, titulo, detalle }: { numero: number; titulo: string; detalle: string }) {
  return (
    <div className={clases.encabezado}>
      <span className={clases.numero}>{numero}</span>
      <div className={clases.encabezado_texto}>
        <h3 className={clases.encabezado_titulo}>{titulo}</h3>
        <p className={clases.encabezado_detalle}>{detalle}</p>
      </div>
    </div>
  )
}
