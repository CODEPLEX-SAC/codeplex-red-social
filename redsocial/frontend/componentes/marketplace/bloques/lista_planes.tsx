import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { usarCarrusel } from '../../compartido/usar_carrusel'
import type { PropiedadesListaPlanes as PropiedadesLista } from '@/tipos/marketplace/modelo_planes'
import { TarjetasPlanes } from './tarjetas_planes'

const clases = catalogoMarketplace.planes.clases

export function FilaPlanes({ etiqueta, ...resto }: PropiedadesLista) {
  const { pistaRef } = usarCarrusel()
  return (
    <div ref={pistaRef} role="group" aria-label={etiqueta} className={clases.fila}>
      <div className={clases.fila_interior}>
        <TarjetasPlanes {...resto} />
      </div>
    </div>
  )
}
