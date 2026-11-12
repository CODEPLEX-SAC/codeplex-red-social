import { Icono } from '../icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { OpcionMetodoPago } from './opcion_metodo_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { BilleteraPago } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function PanelBilleteraPago({ billeteras, elegida, total, alElegir }: { billeteras: BilleteraPago[]; elegida: BilleteraPago | null; total: string; alElegir: (id: string) => void }) {
  const textos = usarTextosPago().metodos.billetera
  const conBilletera = (texto: string) => texto.replace(':billetera', elegida?.nombre ?? String()).replace(':monto', total)

  return (
    <div className={clases.panel}>
      <TituloPanelPago titulo={textos.titulo} />
      <div role="radiogroup" aria-label={textos.titulo} className={clases.metodos_dos}>
        {billeteras.map((opcion) => (
          <OpcionMetodoPago key={opcion.id} titulo={opcion.nombre} icono="celular" activa={elegida?.id === opcion.id} alElegir={() => alElegir(opcion.id)} />
        ))}
      </div>
      <TituloPanelPago titulo={conBilletera(textos.pagar)} detalle={conBilletera(textos.escanea)} />
      <div className={clases.billetera_fila}>
        <div role="img" aria-label={conBilletera(textos.qr)} className={clases.qr}>
          <Icono name="codigo-qr" className={clases.qr_glifo} />
        </div>
        <ol className={clases.pasos}>
          {textos.pasos.map((paso, indice) => (
            <li key={paso} className={clases.paso}>
              <span className={clases.paso_numero}>{indice + 1}</span>
              <span>{conBilletera(paso)}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className={clases.aviso_neutro}>
        <Icono name="candado" className={clases.aviso_icono} />
        <span>{textos.nota}</span>
      </div>
    </div>
  )
}
