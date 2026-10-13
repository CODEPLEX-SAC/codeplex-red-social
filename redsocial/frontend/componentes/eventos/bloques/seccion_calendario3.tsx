import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { PanelCalendarioMini } from './panel_calendario_mini'
import type { EventoLateral } from '@/tipos/eventos/modelo_eventos_invitaciones'

export function SeccionCalendario3({
  MES_CALENDARIO_INVITACIONES,
  SEMANAS_CALENDARIO_INVITACIONES,
  PROXIMOS_LATERAL,
  RESUMEN_INVITACIONES,
}: {
  MES_CALENDARIO_INVITACIONES: string
  SEMANAS_CALENDARIO_INVITACIONES: { numero: string; otroMes?: boolean | undefined; hoy?: boolean | undefined; conPunto?: boolean | undefined; }[][]
  PROXIMOS_LATERAL: EventoLateral[]
  RESUMEN_INVITACIONES: { valor: string; etiqueta: string; }[]
}) {
  return (
    <aside className="flex flex-col gap-4">
      <PanelCalendarioMini mes={MES_CALENDARIO_INVITACIONES} semanas={SEMANAS_CALENDARIO_INVITACIONES} />

      <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h2 className="m-0 text-titulo-banner">{catalogoEventos.secciones.proximos_de_tus_eventos}</h2>
          <a href={catalogoEventos.rutas.proximos} className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        <div className="px-3 pb-2">
          {PROXIMOS_LATERAL.map((ev, i) => (
            <article key={ev.nombre} className={'grid grid-cols-64-1fr gap-2.5 py-2 ' + (i < PROXIMOS_LATERAL.length - 1 ? 'border-b border-borde-suave' : '')}>
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
                <AvatarImagen src={imagenEvento} className="h-full w-full" />
                <div className="absolute left-1 top-1 rounded-sm bg-white px-1 py-0.5 text-center leading-none shadow-t2">
                  <span className="block text-dia-evento text-texto">{ev.dia}</span>
                  <span className="block text-mes-evento uppercase text-texto-suave">{ev.mes}</span>
                </div>
              </div>
              <div className="flex min-w-0 flex-col justify-center gap-0.75">
                <span className="text-nombre-entidad leading-compacto text-texto">{ev.nombre}</span>
                <span className="flex items-center gap-1 text-auxiliar leading-texto text-texto-suave">
                  <Icono name="calendario" className="w-3 h-3" /> {ev.fechaHora}
                </span>
                <span className="flex items-center gap-1 text-auxiliar text-texto-suave">
                  <Icono name="grupo" className="w-3 h-3" /> {ev.asistentes}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h2 className="m-0 text-titulo-banner">{catalogoEventos.secciones.resumen_de_tus_eventos}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{catalogoEventos.leyendas.este_anio}</a>
        </div>
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-2 py-2 text-center">
            {RESUMEN_INVITACIONES.map((s) => (
              <div key={s.etiqueta} className="flex flex-col items-center gap-0.5">
                <span className="text-valor-destacado text-texto">{s.valor}</span>
                <span className="text-auxiliar leading-compacto text-texto-suave">{s.etiqueta}</span>
              </div>
            ))}
          </div>
          <Boton type="button" variant="secundario" size="md" className="mt-3 w-full">
            <Icono name="analiticas" className="w-4 h-4" /> {catalogoEventos.botones.ver_reportes}
          </Boton>
        </div>
      </section>
    </aside>
  )
}
