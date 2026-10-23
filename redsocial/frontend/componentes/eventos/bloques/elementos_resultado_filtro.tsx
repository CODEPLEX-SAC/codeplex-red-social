import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { EventoResultadoFiltro, EventoSugeridoFiltro } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import { formatearFechaEvento } from '../formato_fecha_filtro'

const textos = catalogoEventos.panel_filtro_fecha
const MESES = catalogoEventos.meses

export function AvataresEvento({ cantidad, asistentes }: { cantidad: number; asistentes: string }) {
  return (
    <GrupoAvatares avatares={cantidad} tamano="sm" resto={asistentes} />
  )
}

export function InsigniaFechaEvento({ dia, mes }: { dia: string; mes: string }) {
  return (
    <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
      <span className="block text-dia-evento leading-none text-texto">{dia}</span>
      <span className="mt-px block text-mes-evento uppercase text-texto-suave">{mes}</span>
    </div>
  )
}

export function DatosEventoFiltro({ evento, fecha }: { evento: EventoResultadoFiltro; fecha: Date | null }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-auxiliar text-texto-suave">
      {fecha && <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {formatearFechaEvento(fecha)}</span>}
      <span className="flex items-center gap-1"><Icono name="reloj" className="h-3.5 w-3.5 text-primario" /> {evento.horario}</span>
      <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {evento.lugar}</span>
    </div>
  )
}

export function TarjetaEventoSugerido({ evento }: { evento: EventoSugeridoFiltro }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-borde-suave bg-white">
      <div className="relative h-25 overflow-hidden">
        <AvatarImagen src={imagenEvento} className="h-full w-full" />
        <InsigniaFechaEvento dia={evento.dia} mes={evento.mes} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <TextoColor variante={evento.categoriaColor} className="inline-block text-badge uppercase tracking-wide">{evento.categoria}</TextoColor>
        <h4 className="m-0 text-nombre-entidad text-texto">{evento.nombre}</h4>
        <div className="flex flex-col gap-1 text-auxiliar text-texto-suave">
          <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {evento.fecha}</span>
          <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {evento.lugar}</span>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <AvataresEvento cantidad={evento.avatares} asistentes={evento.asistentes} />
          <Boton type="button" variant="contorno" size="mini">{catalogoEventos.botones.ver_detalles}</Boton>
        </div>
      </div>
    </article>
  )
}

export function SinEventosFiltro({ onExplorar }: { onExplorar: () => void }) {
  return (
    <div className="mb-7 flex flex-col items-center rounded-xl border border-borde-suave bg-white px-6 py-10 text-center">
      <span className="grid h-28 w-28 place-items-center rounded-full bg-primario-suave text-primario">
        <Icono name="calendario" className="h-14 w-14" />
      </span>
      <MensajeVacio titulo={textos.sin_eventos_titulo} texto={textos.sin_eventos_texto} className="mt-5 max-w-90" />
      <Boton type="button" onClick={onExplorar} variant="contorno" size="md" className="mt-5">
        <Icono name="calendario" className="h-4 w-4" /> {textos.explorar_otros}
      </Boton>
    </div>
  )
}

export function TarjetaOtroEvento({ evento, fecha }: { evento: EventoResultadoFiltro; fecha: Date }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-borde-suave bg-white">
          <div className="relative h-25 overflow-hidden">
            <AvatarImagen src={imagenEvento} className="h-full w-full" />
            <InsigniaFechaEvento dia={String(fecha.getDate())} mes={MESES[fecha.getMonth()].slice(0, 3)} />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <TextoColor variante={evento.categoriaColor} className="inline-block text-badge uppercase tracking-wide">{evento.categoria}</TextoColor>
            <h4 className="m-0 text-nombre-entidad text-texto">{evento.nombre}</h4>
            <DatosEventoFiltro evento={evento} fecha={null} />
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
              <AvataresEvento cantidad={evento.avatares} asistentes={evento.asistentes} />
              <Boton type="button" variant="contorno" size="mini">{catalogoEventos.botones.ver_detalles}</Boton>
            </div>
          </div>
        </article>
  )
}
