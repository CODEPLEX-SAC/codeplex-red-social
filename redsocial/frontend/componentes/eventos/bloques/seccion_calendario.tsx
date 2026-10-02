import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { PanelCalendarioMini } from './panel_calendario_mini'
import type { EventoLateral } from '@/tipos/eventos/modelo_eventos_calendario'

export function SeccionCalendario({
  MES_CALENDARIO_ACTUAL,
  SEMANAS_MINI,
  PROXIMOS_LATERAL,
  LEYENDA_CALENDARIO,
}: {
  MES_CALENDARIO_ACTUAL: string
  SEMANAS_MINI: { numero: string; otroMes?: boolean | undefined; hoy?: boolean | undefined; conPunto?: boolean | undefined; }[][]
  PROXIMOS_LATERAL: EventoLateral[]
  LEYENDA_CALENDARIO: { color: string; nombre: string; }[]
}) {
  return (
    <aside className="grid gap-4">
      <PanelCalendarioMini mes={MES_CALENDARIO_ACTUAL} semanas={SEMANAS_MINI} textoEnlace={catalogoEventos.botones.hoy} />

      <section className="overflow-hidden rounded-xl border border-t-eeeeee bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.proximos}</h3>
          <a href={catalogoEventos.rutas.proximos} className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        <div className="px-3 pb-2">
          {PROXIMOS_LATERAL.map((ev, i) => (
            <article key={ev.nombre} className={'grid grid-cols-64-1fr gap-2.5 py-2 ' + (i < PROXIMOS_LATERAL.length - 1 ? 'border-b border-t-f5f5f5' : '')}>
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
                <AvatarImagen src={imagenEvento} className="h-full w-full" />
                <div className="absolute left-1 top-1 rounded-sm bg-white px-1 py-0.5 text-center leading-none shadow-t2">
                  <span className="block text-dia-evento font-extrabold text-gris-oscuro-texto">{ev.dia}</span>
                  <span className="block text-mes-evento font-bold uppercase text-gris-texto-terciario">{ev.mes}</span>
                </div>
              </div>
              <div className="flex min-w-0 flex-col justify-center gap-0.75">
                <span className="text-nombre-entidad font-bold leading-tight text-gris-oscuro-texto">{ev.nombre}</span>
                <span className="flex items-center gap-1 text-auxiliar leading-snug text-gris-texto-terciario">
                  <Icono name="calendario" className="h-3 w-3" /> {ev.fechaHora}
                </span>
                <span className="flex items-center gap-1 text-auxiliar leading-snug text-gris-texto-terciario">
                  <Icono name="ubicacion" className="h-3 w-3" /> {ev.ubicacion}
                </span>
                <span className="flex items-center gap-1 text-auxiliar text-gris-texto-terciario">
                  <Icono name="usuarios" className="h-3 w-3" /> {ev.asistentes}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-t-eeeeee bg-white">
        <div className="px-4 pb-2.5 pt-3.5">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.leyenda}</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 pb-3.5 pt-1">
          {LEYENDA_CALENDARIO.map((l) => (
            <span key={l.nombre} className="flex items-center gap-1.5 text-auxiliar text-gris-texto">
              <SuperficieColor as="span" variante={l.color} className="h-2 w-2 flex-none rounded-full" /> {l.nombre}
            </span>
          ))}
        </div>
      </section>
    </aside>
  )
}
