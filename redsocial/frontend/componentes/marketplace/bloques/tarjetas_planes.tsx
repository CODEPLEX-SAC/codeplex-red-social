import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { TarjetaPlan } from './tarjeta_plan'
import type { PropiedadesListaPlanes as PropiedadesLista } from '@/tipos/marketplace/modelo_planes'

const clasesTarjeta = catalogoMarketplace.planes.clases.tarjeta_fila

export function TarjetasPlanes({ planes, periodo, planId, estilo, estiloDestacado, detalles, paquetes, alVerPaquetes, alSeleccionar, alAbrirDetalle }: Omit<PropiedadesLista, 'etiqueta'>) {
  const comunes = { periodo, estilo, estiloDestacado, detalles, paquetes, alVerPaquetes, className: clasesTarjeta, alAbrirDetalle }
  return planes.map((p) => <TarjetaPlan key={p.id} plan={p} seleccionado={planId === p.id} alSeleccionar={() => alSeleccionar(p.id)} {...comunes} />)
}
