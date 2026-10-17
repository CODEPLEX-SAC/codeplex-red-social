import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { BotonCopiarPago } from './boton_copiar_pago'
import { monto } from './logica_pago_planes'
import { TituloPanelPago } from './titulo_panel_pago'
import type { DatosTransferencia } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago.metodos.transferencia
const clases = catalogoMarketplace.pago.clases
const filas = Object.entries(textos.filas) as [keyof typeof textos.filas, string][]

export function PanelPagoTransferencia({ datos, total }: { datos: DatosTransferencia; total: number }) {
  return (
    <div className={clases.panel}>
      <TituloPanelPago titulo={textos.titulo} detalle={textos.detalle} />
      <div className={clases.datos}>
        {filas.map(([clave, etiqueta]) => (
          <div key={clave} className={clases.dato}>
            <span className={clases.dato_etiqueta}>{etiqueta}</span>
            <span className={clases.dato_valor}>{datos[clave]}</span>
            <BotonCopiarPago valor={datos[clave]} etiqueta={textos.copiar.replace(':dato', etiqueta)} />
          </div>
        ))}
      </div>
      <div className={clases.destacados}>
        <div className={clases.destacado}>
          <div className="min-w-0">
            <span className="block text-auxiliar text-texto-suave">{textos.monto}</span>
            <strong className="block text-valor-destacado text-texto">{monto(total)}</strong>
          </div>
        </div>
        <div className={clases.destacado}>
          <div className="min-w-0">
            <span className="block text-auxiliar text-texto-suave">{textos.referencia}</span>
            <strong className="block truncate text-nombre-entidad text-texto">{datos.referencia}</strong>
          </div>
          <BotonCopiarPago valor={datos.referencia} etiqueta={textos.copiar.replace(':dato', textos.referencia)} />
        </div>
      </div>
      <div className={clases.aviso}>
        <Icono name="informacion" className="mt-0.5 h-4 w-4 flex-none" />
        <span>{textos.importante}</span>
      </div>
    </div>
  )
}
