import { posicionesDe } from '../../compartido/posiciones'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { imagenUsuarioPredeterminada as usuarioImg, imagenEventoPredeterminada as imagenEvento } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { EventoResultadoFiltro, EventoSugeridoFiltro } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import { formatearFechaEvento } from '../formato_fecha_filtro'

const textos = catalogoEventos.panel_filtro_fecha
const MESES = catalogoEventos.meses

export function AvataresEvento({ cantidad, asistentes }: { cantidad: number; asistentes: string }) {
  return (
    <div className="flex items-center">
      {posicionesDe(cantidad).map((posicion) => (
        <img key={posicion.id} src={usuarioImg} alt="" className={'h-7 w-7 rounded-full border-2 border-white object-cover' + (posicion.orden > 0 ? ' -ml-2' : '')} />
      ))}
      <span className="-ml-1 inline-flex h-7 items-center rounded-14 border-2 border-white bg-t-ede9fe px-2 text-contador font-bold text-primario">{asistentes}</span>
    </div>
  )
}

export function InsigniaFechaEvento({ dia, mes }: { dia: string; mes: string }) {
  return (
    <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
      <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{dia}</span>
      <span className="mt-px block text-mes-evento font-bold uppercase text-texto-suave">{mes}</span>
    </div>
  )
}

export function DatosEventoFiltro({ evento, fecha }: { evento: EventoResultadoFiltro; fecha: Date | null }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-auxiliar text-gris-texto-secundario">
      {fecha && <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {formatearFechaEvento(fecha)}</span>}
      <span className="flex items-center gap-1"><Icono name="reloj" className="h-3.5 w-3.5 text-primario" /> {evento.horario}</span>
      <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {evento.lugar}</span>
    </div>
  )
}

export function TarjetaEventoSugerido({ evento }: { evento: EventoSugeridoFiltro }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-t-eeeeee bg-white">
      <div className="relative h-25 overflow-hidden">
        <AvatarImagen src={imagenEvento} className="h-full w-full" />
        <InsigniaFechaEvento dia={evento.dia} mes={evento.mes} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <TextoColor variante={evento.categoriaColor} className="inline-block text-etiqueta-estado font-bold uppercase tracking-wide">{evento.categoria}</TextoColor>
        <h4 className="m-0 text-nombre-entidad font-bold text-gris-oscuro-texto">{evento.nombre}</h4>
        <div className="flex flex-col gap-1 text-auxiliar text-gris-texto-secundario">
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
    <div className="mb-7 flex flex-col items-center rounded-xl border border-t-eeeeee bg-white px-6 py-10 text-center">
      <span className="grid h-28 w-28 place-items-center rounded-full bg-primario-suave text-primario">
        <Icono name="calendario" className="h-14 w-14" />
      </span>
      <h3 className="m-0 mt-5 text-titulo-seccion font-extrabold text-gris-oscuro-texto">{textos.sin_eventos_titulo}</h3>
      <p className="m-0 mt-2 max-w-90 text-cuerpo text-texto-suave">{textos.sin_eventos_texto}</p>
      <Boton type="button" onClick={onExplorar} variant="contorno" size="md" className="mt-5">
        <Icono name="calendario" className="h-4 w-4" /> {textos.explorar_otros}
      </Boton>
    </div>
  )
}

export function TarjetaOtroEvento({ evento, fecha }: { evento: EventoResultadoFiltro; fecha: Date }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-t-eeeeee bg-white">
          <div className="relative h-25 overflow-hidden">
            <AvatarImagen src={imagenEvento} className="h-full w-full" />
            <InsigniaFechaEvento dia={String(fecha.getDate())} mes={MESES[fecha.getMonth()].slice(0, 3)} />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <TextoColor variante={evento.categoriaColor} className="inline-block text-etiqueta-estado font-bold uppercase tracking-wide">{evento.categoria}</TextoColor>
            <h4 className="m-0 text-nombre-entidad font-bold text-gris-oscuro-texto">{evento.nombre}</h4>
            <DatosEventoFiltro evento={evento} fecha={null} />
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
              <AvataresEvento cantidad={evento.avatares} asistentes={evento.asistentes} />
              <Boton type="button" variant="contorno" size="mini">{catalogoEventos.botones.ver_detalles}</Boton>
            </div>
          </div>
        </article>
  )
}
