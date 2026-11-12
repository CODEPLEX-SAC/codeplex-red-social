import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Boton } from '../../compartido/interfaz/boton'
import type { BloqueBuscarProps } from '@/tipos/eventos/contrato_buscar_eventos'

export function BloqueBuscar({ evento, ubicacion, alCambiarEvento, alCambiarUbicacion }: BloqueBuscarProps) {
  return (
    <div className="mb-5 flex items-center gap-3 max-900:flex-col max-900:items-stretch">
      <CampoBusqueda
        placeholder={catalogoEventos.placeholders.buscar_eventos}
        aria-label={catalogoEventos.placeholders.buscar_eventos}
        value={evento}
        onChange={(cambio) => alCambiarEvento(cambio.target.value)}
        className="min-w-0 flex-1 max-900:w-full max-900:flex-none"
      />
      <CampoBusqueda
        icono="ubicacion"
        placeholder={catalogoEventos.placeholders.ubicacion}
        aria-label={catalogoEventos.placeholders.ubicacion}
        value={ubicacion}
        onChange={(cambio) => alCambiarUbicacion(cambio.target.value)}
        className="min-w-0 flex-1 max-900:w-full max-900:flex-none"
      />
      <Boton type="button" variant="primario" size="md" className="flex-none max-900:w-full">{catalogoEventos.botones.buscar}</Boton>
    </div>
  )
}
