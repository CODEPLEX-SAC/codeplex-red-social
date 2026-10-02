import { Icono } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const consejos = catalogoAvisos.consejos_solicitudes.items as { icono: IconName; titulo: string; descripcion: string }[]

export function PanelLateralSolicitudesAviso() {
  return (
    <div className="grid gap-4">
      <section className="degradado-violeta-suave rounded-xl p-5 text-center text-white">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white">
          <Icono name="nuevo-usuario" className="h-5.5 w-5.5" />
        </div>
        <h3 className="m-0 mb-1 text-titulo-banner font-bold">{catalogoAvisos.panel_lateral_solicitudes.titulo}</h3>
        <p className="m-0 text-cuerpo leading-1.45 text-white/85">{catalogoAvisos.panel_lateral_solicitudes.descripcion}</p>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoAvisos.consejos_solicitudes.titulo}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoAvisos.botones.ver_mas}</a>
        </div>
        <ul className="m-0 grid list-none gap-3 p-0">
          {consejos.map((c) => (
            <li key={c.titulo} className="flex items-start gap-2.5">
              <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-t-f3f0ff text-primario">
                <Icono name={c.icono} className="h-3.75 w-3.75" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-subtitulo font-semibold text-texto">{c.titulo}</span>
                <span className="block text-cuerpo leading-1.4 text-texto-suave">{c.descripcion}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="degradado-lavanda-media rounded-xl p-5 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white text-primario">
          <Icono name="nuevo-usuario" className="h-5.5 w-5.5" />
        </div>
        <h3 className="m-0 mb-1 text-titulo-banner font-bold text-texto">{catalogoAvisos.cta_lateral_solicitudes.titulo}</h3>
        <p className="m-0 mb-3.5 text-cuerpo leading-1.45 text-texto-suave">{catalogoAvisos.cta_lateral_solicitudes.descripcion}</p>
        <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-lg bg-primario px-4 py-2 text-boton font-bold text-white no-underline hover:bg-primario-oscuro"
        >
          {catalogoAvisos.botones.buscar_personas}
        </a>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <p className="m-0 mb-2 text-cuerpo italic leading-1.55 text-texto">"{catalogoAvisos.cita_lateral_solicitudes.texto}"</p>
        <span className="text-auxiliar font-semibold text-texto-suave">— {catalogoAvisos.cita_lateral_solicitudes.autor}</span>
      </section>
    </div>
  )
}
