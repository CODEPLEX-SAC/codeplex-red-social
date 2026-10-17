import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { monto } from './logica_pago_planes'
import { OpcionMetodoPago } from './opcion_metodo_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { BilleteraDigital } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago.metodos.billetera
const clases = catalogoMarketplace.pago.clases

export function PanelPagoBilletera({ estado }: { estado: ReturnType<typeof usarPagoPlanes> }) {
  const elegida = textos.opciones.find((opcion) => opcion.id === estado.billetera) ?? textos.opciones[0]
  const conBilletera = (texto: string) => texto.replace(':billetera', elegida.nombre).replace(':monto', monto(estado.total))

  return (
    <div className={clases.panel}>
      <TituloPanelPago titulo={textos.titulo} />
      <div role="radiogroup" aria-label={textos.titulo} className={clases.metodos_dos}>
        {textos.opciones.map((opcion) => (
          <OpcionMetodoPago key={opcion.id} titulo={opcion.nombre} icono="celular" activa={estado.billetera === opcion.id} alElegir={() => estado.elegirBilletera(opcion.id as BilleteraDigital)} />
        ))}
      </div>
      <TituloPanelPago titulo={conBilletera(textos.pagar)} detalle={conBilletera(textos.escanea)} />
      <div className={clases.billetera_fila}>
        <div role="img" aria-label={conBilletera(textos.qr)} className={clases.qr}>
          <Icono name="codigo-qr" className="h-14 w-14" />
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
        <Icono name="candado" className="mt-0.5 h-4 w-4 flex-none" />
        <span>{textos.nota}</span>
      </div>
    </div>
  )
}
