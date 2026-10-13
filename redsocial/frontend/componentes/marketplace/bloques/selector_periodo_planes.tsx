import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Interruptor } from '../../compartido/interfaz/interruptor'
import type { SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes.periodo

export function SelectorPeriodoPlanes({ periodo, alCambiar }: { periodo: SeleccionPlan['periodo']; alCambiar: (anual: boolean) => void }) {
  const anual = periodo === 'anual'
  return (
    <div className="flex items-center gap-2.5">
      <span className={`text-subtitulo ${anual ? 'font-etiqueta text-texto-suave' : 'font-control text-texto'}`}>{textos.mensual}</span>
      <Interruptor etiqueta={textos.anual} posicionEtiqueta="fin" seleccionado={anual} alCambiar={(_, valor) => alCambiar(valor)} />
    </div>
  )
}
