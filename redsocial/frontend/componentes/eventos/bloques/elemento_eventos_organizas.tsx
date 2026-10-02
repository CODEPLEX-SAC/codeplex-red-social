import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { InformacionEventoOrganizado } from './informacion_evento_organizado'
import { PieEventoBorrador } from './pie_evento_borrador'
import { PieEventoPublicado } from './pie_evento_publicado'
import type { EventoOrganizas } from '@/tipos/eventos/modelo_eventos_mis_eventos'

export function ElementoEventosOrganizas({
  ev,
  ESTADO_ESTILO,
  ESTADO_ETIQUETA,
  alAbrirMenuOrganizas,
  menuOrganizasAbierto,
  anclaMenuOrganizas,
  cerrarMenuOrganizas,
  setEventoEditando,
}: {
  ev: EventoOrganizas
  ESTADO_ESTILO: Record<EventoOrganizas['estado'], string>
  ESTADO_ETIQUETA: Record<EventoOrganizas['estado'], string>
  alAbrirMenuOrganizas: (evento: { stopPropagation: () => void; currentTarget: HTMLElement }, nombre: string) => void
  menuOrganizasAbierto: string | null
  anclaMenuOrganizas: HTMLElement | null
  cerrarMenuOrganizas: () => void
  setEventoEditando: (valor: string | null) => void
}) {
  const acciones = { alAbrirMenuOrganizas, menuOrganizasAbierto, anclaMenuOrganizas, cerrarMenuOrganizas }

  return (
    <article className={catalogoEventos.tarjeta_evento_organizado.contenedor}>
      <div className={catalogoEventos.tarjeta_evento_organizado.miniatura}>
        <AvatarImagen src={imagenEvento} className="h-full w-full" />
        <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
          <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{ev.dia}</span>
          <span className="mt-px block text-mes-evento font-bold uppercase text-texto-suave">{ev.mes}</span>
        </div>
      </div>
      <InformacionEventoOrganizado ev={ev} ESTADO_ESTILO={ESTADO_ESTILO} ESTADO_ETIQUETA={ESTADO_ETIQUETA} />
      {ev.pieDerecho.tipo === 'stats' && <PieEventoPublicado nombre={ev.nombre} pie={ev.pieDerecho} acciones={acciones} />}
      {ev.pieDerecho.tipo === 'borrador' && (
        <PieEventoBorrador nombre={ev.nombre} acciones={acciones} alContinuarEditando={() => setEventoEditando(ev.nombre)} />
      )}
    </article>
  )
}
