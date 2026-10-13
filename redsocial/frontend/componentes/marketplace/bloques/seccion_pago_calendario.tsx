import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { monto } from './logica_pago_planes'

const textos = catalogoMarketplace.pago.paso3

function Fila({ titulo, detalle, valor }: { titulo: string; detalle: string; valor: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-t border-borde-suave py-2.5 first:border-t-0">
      <div className="min-w-0">
        <div className="text-nombre-fila text-texto">{titulo}</div>
        <div className="text-auxiliar text-texto-suave">{detalle}</div>
      </div>
      <span className="flex-none text-nombre-fila text-texto">{valor}</span>
    </div>
  )
}

export function SeccionPagoCalendario({ fechaCobro, total, hoy }: { fechaCobro: string; total: number; hoy: number }) {
  return (
    <section className={catalogoMarketplace.pago.clases.tarjeta}>
      <EncabezadoPasoPago numero={3} titulo={textos.titulo} detalle={textos.detalle} />
      <Fila titulo={textos.hoy.titulo} detalle={hoy > 0 ? textos.hoy_vip.detalle : textos.hoy.detalle} valor={hoy > 0 ? monto(hoy) : textos.hoy.valor} />
      <Fila titulo={textos.primer.titulo.replace(':fecha', fechaCobro)} detalle={textos.primer.detalle} valor={monto(total)} />
      <Fila titulo={textos.siguientes.titulo} detalle={textos.siguientes.detalle} valor={textos.siguientes.valor} />
    </section>
  )
}
