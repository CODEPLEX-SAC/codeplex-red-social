import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { CampoBuscadorMarketplace } from './campo_buscador_marketplace'
import { CarruselMarketplace } from './carrusel_marketplace'

export function SeccionTituloPre2({ busqueda, alBuscar, imagenes }: { busqueda: string; alBuscar: (texto: string) => void; imagenes: readonly string[] }) {
  return (
    <>
      <div className={catalogoMarketplace.carrusel.clases.buscador}>
        <CampoBuscadorMarketplace busqueda={busqueda} alBuscar={alBuscar} />
      </div>
      <CarruselMarketplace imagenes={imagenes} />
    </>
  )
}
