import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { EventoSugeridoFiltro } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { EtiquetaFechaEvento } from './insignia_fecha_evento'

export function TarjetaEventoSugerido({ evento }: { evento: EventoSugeridoFiltro }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-borde-suave bg-white">
      <div className="relative h-25 overflow-hidden">
        <AvatarImagen src={imagenEvento} className="h-full w-full" />
        <EtiquetaFechaEvento dia={evento.dia} mes={evento.mes} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <TextoColor variante={evento.categoriaColor} className="inline-block text-badge uppercase tracking-wide">{evento.categoria}</TextoColor>
        <h4 className="m-0 text-nombre-entidad text-texto">{evento.nombre}</h4>
        <div className="flex flex-col gap-1 text-auxiliar text-texto-suave">
          <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {evento.fecha}</span>
          <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {evento.lugar}</span>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <GrupoAvatares avatares={evento.avatares} tamano="sm" resto={evento.asistentes} />
          <Boton type="button" variant="contorno" size="mini">{catalogoEventos.botones.ver_detalles}</Boton>
        </div>
      </div>
    </article>
  )
}
