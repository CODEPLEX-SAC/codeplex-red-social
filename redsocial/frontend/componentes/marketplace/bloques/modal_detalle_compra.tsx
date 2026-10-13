import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { CodeplexAcordeon } from '@codeplex-sac/diseno'
import { Icono } from '../../compartido/icono'
import { Modal } from '../../compartido/interfaz/modal'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { metasCompra, valoresDetalle } from './logica_carrito_planes'
import type { CompraRealizada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.mis_compras
const clases = textos.clases

export function ModalDetalleCompra({ compra, claseModulo, alCerrar }: { compra: CompraRealizada; claseModulo: string; alCerrar: () => void }) {
  const valores = valoresDetalle(compra)
  const incluye = (
    <ul className={clases.detalle_lista}>
      {compra.incluye.map((texto) => (
        <li key={texto} className={clases.detalle_item}>
          <Icono name="verificado" className="mt-0.5 h-4 w-4 flex-none text-verde-categoria-texto" />
          <span className="min-w-0">{texto}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <Modal titulo={textos.detalle.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} suave className="max-w-120 rounded-2xl max-600:rounded-none">
      <div className={clases.detalle_cuerpo}>
        <div className={clases.identidad}>
          <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl ${claseModulo}`}>
            <Icono name={compra.icono} className="h-5 w-5 text-white" />
          </span>
          <div className={clases.texto_identidad}>
            <h3 className="m-0 text-nombre-entidad text-texto">{compra.nombre}</h3>
            <span className="text-auxiliar text-texto-suave">{compra.lema}</span>
          </div>
        </div>
        <div className={clases.detalle_metas}>
          {metasCompra(compra, textos.detalle.metas).map((m) => (
            <div key={m.id} className={clases.detalle_fila}>
              <span className="text-texto-suave">{m.etiqueta}</span>
              <span className="text-nombre-fila text-texto">{valores[m.id]}</span>
            </div>
          ))}
        </div>
        <ProveedorTemaGraficos>
          <CodeplexAcordeon variante="bordeado" elementos={[{ id: textos.detalle.incluye, titulo: textos.detalle.incluye, contenido: incluye }]} />
        </ProveedorTemaGraficos>
      </div>
    </Modal>
  )
}
