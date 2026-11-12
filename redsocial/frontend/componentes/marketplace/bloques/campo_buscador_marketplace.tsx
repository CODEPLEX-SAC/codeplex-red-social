import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'

const etiqueta = catalogoMarketplace.placeholders.buscar

export function CampoBuscadorMarketplace({ busqueda, alBuscar }: { busqueda: string; alBuscar: (texto: string) => void }) {
  return <CampoBusqueda className={catalogoMarketplace.carrusel.clases.campo} placeholder={etiqueta} aria-label={etiqueta} value={busqueda} onChange={(evento) => alBuscar(evento.target.value)} />
}
