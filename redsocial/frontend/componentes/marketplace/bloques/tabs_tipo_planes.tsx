import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import type { TipoPlanes } from '@/tipos/marketplace/modelo_planes'

export function TabsTipoPlanes({ tipos, activo, alCambiar }: { tipos: TipoPlanes[]; activo: string; alCambiar: (id: string) => void }) {
  return (
    <div role="group" aria-label={catalogoMarketplace.planes.modalidad} className="flex w-full gap-1 rounded-xl bg-fondo-hover-neutro p-1 max-w-125">
      {tipos.map((t) => (
        <Boton key={t.id} type="button" variant={t.id === activo ? 'oscuro' : 'fantasma'} size="md" aria-pressed={t.id === activo} onClick={() => alCambiar(t.id)} className="min-w-0 flex-1 flex-col gap-0.5 py-1.5">
          <span>{t.nombre}</span>
          <span className={`whitespace-normal text-center text-auxiliar font-etiqueta ${t.id === activo ? 'text-texto-sobre-oscuro-claro' : 'text-texto-suave'}`}>{t.detalle}</span>
        </Boton>
      ))}
    </div>
  )
}
