import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { Icono } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const consejos = catalogoAvisos.consejos_solicitudes.items as { icono: IconName; titulo: string; descripcion: string }[]

export function PanelLateralSolicitudesAviso() {
  return (
    <div className="grid gap-4">
      <section className="degradado-violeta-suave rounded-xl p-5 text-center text-white">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white">
          <Icono name="nuevo-usuario" className="h-5 w-5" />
        </div>
        <h2 className="m-0 mb-1 text-titulo-banner">{catalogoAvisos.panel_lateral_solicitudes.titulo}</h2>
        <p className="m-0 text-cuerpo leading-texto text-white/85">{catalogoAvisos.panel_lateral_solicitudes.descripcion}</p>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoAvisos.consejos_solicitudes.titulo}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{catalogoAvisos.botones.ver_mas}</a>
        </div>
        <ul className="m-0 grid list-none gap-3 p-0">
          {consejos.map((c) => (
            <li key={c.titulo} className="flex items-start gap-2.5">
              <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-fondo-activo-filtro text-primario">
                <Icono name={c.icono} className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-titulo-subseccion text-texto">{c.titulo}</span>
                <span className="block text-cuerpo leading-texto text-texto-suave">{c.descripcion}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="degradado-lavanda-media rounded-xl p-5 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white text-primario">
          <Icono name="nuevo-usuario" className="h-5 w-5" />
        </div>
        <h2 className="m-0 mb-1 text-titulo-banner text-texto">{catalogoAvisos.cta_lateral_solicitudes.titulo}</h2>
        <p className="m-0 mb-3.5 text-cuerpo leading-texto text-texto-suave">{catalogoAvisos.cta_lateral_solicitudes.descripcion}</p>
        <a
          href={catalogoAmigos.rutas.sugerencias}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primario px-4 py-2 text-boton text-white no-underline hover:bg-primario-oscuro"
        >
          {catalogoAvisos.botones.buscar_personas}
        </a>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <p className="m-0 mb-2 text-cuerpo italic leading-texto text-texto">"{catalogoAvisos.cita_lateral_solicitudes.texto}"</p>
        <span className="text-auxiliar font-control text-texto-suave">— {catalogoAvisos.cita_lateral_solicitudes.autor}</span>
      </section>
    </div>
  )
}
