import { Icono } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

export function BloqueCalendario() {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-center gap-2.5">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-primario-suave text-primario">
          <Icono name="calendario" className="h-5.5 w-5.5" />
        </div>
        <div>
          <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">
            {catalogoEventos.titulos.seccion} <span className="text-primario">/ {catalogoEventos.titulos.calendario}</span>
          </h1>
          <p className="m-0 mt-0.5 text-subtitulo text-texto-suave">{catalogoEventos.subtitulos.calendario}</p>
        </div>
      </div>
    </div>
  )
}
