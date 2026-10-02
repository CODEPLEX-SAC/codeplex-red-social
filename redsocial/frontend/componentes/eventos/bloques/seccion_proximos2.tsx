import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'

export function SeccionProximos2({
  PROXIMOS_LATERAL,
  CATEGORIAS_LATERAL,
}: {
  PROXIMOS_LATERAL: { dia: string; mes: string; nombre: string; linea1: string; linea2: string; asistentes: string; }[]
  CATEGORIAS_LATERAL: { icono: string; color: string; nombre: string; conteo: string; }[]
}) {
  return (
    <aside className="grid gap-4">
      <section className="overflow-hidden rounded-xl border border-t-eeeeee bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.proximos}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoEventos.botones.ver_calendario}</a>
        </div>
        <div className="px-4 pb-1">
          {PROXIMOS_LATERAL.map((ev) => (
            <article key={ev.nombre} className="flex items-start gap-2.5 border-b border-t-f5f5f5 py-2.25 last:border-b-0">
              <div className="w-10 flex-none pt-0.5 text-center">
                <span className="block text-dia-evento font-extrabold leading-none text-texto">{ev.dia}</span>
                <span className="block text-mes-evento font-bold uppercase text-texto-suave">{ev.mes}</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="mb-0.5 block text-nombre-entidad font-bold text-texto">{ev.nombre}</span>
                <span className="block text-auxiliar leading-1.35 text-texto-suave">{ev.linea1}</span>
                <span className="block text-auxiliar leading-1.35 text-texto-suave">{ev.linea2}</span>
                <span className="mt-0.75 flex items-center gap-1 text-auxiliar text-texto-suave">
                  <Icono name="amigos" className="h-3 w-3" /> {ev.asistentes}
                </span>
              </div>
            </article>
          ))}
        </div>
        <a href="#" className="flex items-center justify-center gap-1.5 border-t border-t-f0eef5 px-4 py-3 text-enlace-accion font-semibold text-primario no-underline hover:underline">
          {catalogoEventos.filtros.todos_los_eventos} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
        </a>
      </section>

      <section className="overflow-hidden rounded-xl border border-t-eeeeee bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.categorias}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
        </div>
        <div className="px-4 pb-2">
          {CATEGORIAS_LATERAL.map((c) => (
            <article key={c.nombre} className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2 last:border-b-0">
              <SuperficieColor variante={c.color} className="grid h-7 w-7 flex-none place-items-center rounded-7">
                <Icono name={c.icono} className="h-3.5 w-3.5 text-white" />
              </SuperficieColor>
              <span className="flex-1 text-nombre-entidad font-medium text-texto">{c.nombre}</span>
              <span className="flex-none text-contador font-semibold text-texto-suave">{c.conteo}</span>
            </article>
          ))}
        </div>
      </section>
    </aside>
  )
}
