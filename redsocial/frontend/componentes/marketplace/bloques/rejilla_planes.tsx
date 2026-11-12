import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { PropiedadesListaPlanes as PropiedadesLista } from '@/tipos/marketplace/modelo_planes'
import { TarjetasPlanes } from './tarjetas_planes'

const clases = catalogoMarketplace.planes.clases

export function RejillaPlanes({ etiqueta, ...resto }: PropiedadesLista) {
  return (
    <div role="group" aria-label={etiqueta} className={clases.rejilla}>
      <TarjetasPlanes {...resto} />
    </div>
  )
}
