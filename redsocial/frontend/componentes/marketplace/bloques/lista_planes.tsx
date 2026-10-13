import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { usarCarrusel } from '../../compartido/usar_carrusel'
import { TarjetaPlan } from './tarjeta_plan'
import type { PropiedadesListaPlanes as PropiedadesLista } from '@/tipos/marketplace/modelo_planes'

const clases = catalogoMarketplace.planes.clases

function Tarjetas({ planes, periodo, planId, estilo, estiloDestacado, detalles, paquetes, alVerPaquetes, className, alSeleccionar, alAbrirDetalle }: Omit<PropiedadesLista, 'etiqueta' | 'ancho'> & { className: string }) {
  const comunes = { periodo, estilo, estiloDestacado, detalles, paquetes, alVerPaquetes, className, alAbrirDetalle }
  return planes.map((p) => <TarjetaPlan key={p.id} plan={p} seleccionado={planId === p.id} alSeleccionar={() => alSeleccionar(p.id)} {...comunes} />)
}

export function FilaPlanes({ etiqueta, ancho, ...resto }: PropiedadesLista) {
  const { pistaRef } = usarCarrusel()
  return (
    <div ref={pistaRef} role="group" aria-label={etiqueta} className={clases.fila}>
      <div className={clases.fila_interior}>
        <Tarjetas {...resto} className={ancho === 'amplia' ? clases.tarjeta_fila_amplia : clases.tarjeta_fila} />
      </div>
    </div>
  )
}

export function RejillaPlanes({ etiqueta, ...resto }: PropiedadesLista) {
  return (
    <div role="group" aria-label={etiqueta} className={clases.rejilla}>
      <Tarjetas {...resto} className="" />
    </div>
  )
}
