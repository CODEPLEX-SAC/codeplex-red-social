import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../compartido/icono'
import type { EventoOrganizas } from '@/tipos/eventos/modelo_eventos_mis_eventos'

export function InformacionEventoOrganizado({
  ev,
  ESTADO_ESTILO,
  ESTADO_ETIQUETA,
}: {
  ev: EventoOrganizas
  ESTADO_ESTILO: Record<EventoOrganizas['estado'], string>
  ESTADO_ETIQUETA: Record<EventoOrganizas['estado'], string>
}) {
  return (
    <div className="flex flex-col justify-center gap-1 px-5 py-4">
      <span className={'mb-0.5 inline-block w-fit rounded text-etiqueta-estado font-bold uppercase tracking-wide px-2 py-0.75 ' + ESTADO_ESTILO[ev.estado]}>{ESTADO_ETIQUETA[ev.estado]}</span>
      <h3 className="m-0 text-nombre-entidad font-bold text-gris-oscuro-texto">{ev.nombre}</h3>
      <div className="mt-0.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-auxiliar text-gris-texto-secundario">
        <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.fecha}</span>
        <span className="flex items-center gap-1"><Icono name="reloj" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.hora}</span>
        <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.ubicacion}</span>
      </div>
      {ev.pieDerecho.tipo === 'stats' && (
        <div className="mt-1 flex items-center gap-1 text-auxiliar text-gris-texto-secundario">
          <Icono name="usuarios" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.pieDerecho.asistentesTexto}
        </div>
      )}
      {ev.pieDerecho.tipo === 'borrador' && (
        <div className="mt-1 text-auxiliar text-gris-texto-terciario">{catalogoEventos.leyendas.sin_publicar_aun}</div>
      )}
    </div>
  )
}
