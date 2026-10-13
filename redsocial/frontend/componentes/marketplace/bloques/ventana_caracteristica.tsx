import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Modal } from '../../compartido/interfaz/modal'
import type { DetalleCaracteristica } from '@/tipos/marketplace/modelo_planes'

export function VentanaCaracteristica({ detalle, alCerrar }: { detalle: DetalleCaracteristica; alCerrar: () => void }) {
  const cierre = <BotonIcono icono="cerrar" type="button" aria-label={catalogoMarketplace.planes.detalle.cerrar} variant="discreto" size="sm" className="absolute right-2 top-2 z-10" onClick={alCerrar} data-foco-inicial />

  return (
    <Modal titulo={detalle.titulo} etiquetaCerrar={catalogoMarketplace.planes.detalle.cerrar} onCerrar={alCerrar} cabecera={cierre} className="relative max-w-75 rounded-xl">
      <div className="p-5">
        <h4 className="m-0 mb-2.5 pr-6 text-nombre-entidad text-texto">{detalle.titulo}</h4>
        <p className="m-0 text-cuerpo leading-texto text-texto-suave">{detalle.descripcion}</p>
      </div>
    </Modal>
  )
}
