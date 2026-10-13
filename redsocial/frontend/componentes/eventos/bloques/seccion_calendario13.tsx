import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { Icono } from '../../compartido/icono'
import { PanelCalendarioMini } from './panel_calendario_mini'

export function SeccionCalendario13({
  MES_CALENDARIO_POPULARES,
  SEMANAS_CALENDARIO_POPULARES,
  PROXIMAS_FECHAS,
  CATEGORIAS_LATERAL,
  conEnlaceVerTodas = true,
}: {
  MES_CALENDARIO_POPULARES: string
  SEMANAS_CALENDARIO_POPULARES: { numero: string; otroMes?: boolean | undefined; hoy?: boolean | undefined; }[][]
  PROXIMAS_FECHAS: { dia: string; mes: string; nombre: string; punto: 'tecnologia' | 'negocios' | 'educacion'; detalle: string; }[]
  CATEGORIAS_LATERAL: { icono: string; color: string; nombre: string; conteo: string; }[]
  conEnlaceVerTodas?: boolean
}) {
  return (
    <aside className="grid gap-4">
      <PanelCalendarioMini mes={MES_CALENDARIO_POPULARES} semanas={SEMANAS_CALENDARIO_POPULARES} />

      <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEventos.secciones.mis_proximas_fechas}</h2>
          {conEnlaceVerTodas && <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>}
        </div>
        <div className="px-4 pb-1">
          {PROXIMAS_FECHAS.map((f) => (
            <article key={f.nombre} className="flex items-start gap-2.5 border-b border-borde-suave py-2 last:border-b-0">
              <div className="w-9 flex-none text-center">
                <span className="block text-dia-evento leading-none text-texto">{f.dia}</span>
                <span className="block text-mes-evento uppercase text-texto-suave">{f.mes}</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="mb-0.5 block text-nombre-entidad text-texto">{f.nombre}</span>
                <span className="flex items-center gap-1 text-auxiliar leading-compacto text-texto-suave">
                  <SuperficieColor as="span" variante={f.punto} className="h-1.5 w-1.5 flex-none rounded-full" /> {f.detalle}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEventos.secciones.categorias}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
        </div>
        <div className="px-4 pb-2">
          {CATEGORIAS_LATERAL.map((c) => (
            <article key={c.nombre} className="flex items-center gap-2.5 border-b border-borde-suave py-2 last:border-b-0">
              <SuperficieColor variante={c.color} className="grid h-7 w-7 flex-none place-items-center rounded-7">
                <Icono name={c.icono} className="h-3.5 w-3.5 text-white" />
              </SuperficieColor>
              <span className="flex-1 text-nombre-entidad text-texto">{c.nombre}</span>
              <span className="flex-none text-conteo text-texto-suave">{c.conteo}</span>
            </article>
          ))}
        </div>
        <a href="#" className="flex items-center justify-center gap-1.5 border-t border-borde-suave px-4 py-3 text-enlace-accion text-primario no-underline hover:underline">
          {catalogoEventos.botones.ver_mas_categorias} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
        </a>
      </section>
    </aside>
  )
}
