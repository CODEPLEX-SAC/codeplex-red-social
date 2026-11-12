import { Boton } from '../../compartido/interfaz/boton'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { EventoResultadoFiltro } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { EtiquetaFechaEvento } from './insignia_fecha_evento'
import { DatosEventoFiltro } from './datos_evento_filtro'

const MESES = catalogoEventos.meses

export function TarjetaOtroEvento({ evento, fecha }: { evento: EventoResultadoFiltro; fecha: Date }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-borde-suave bg-white">
          <div className="relative h-25 overflow-hidden">
            <AvatarImagen src={imagenEvento} className="h-full w-full" />
            <EtiquetaFechaEvento dia={String(fecha.getDate())} mes={MESES[fecha.getMonth()].slice(0, 3)} />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <TextoColor variante={evento.categoriaColor} className="inline-block text-badge uppercase tracking-wide">{evento.categoria}</TextoColor>
            <h4 className="m-0 text-nombre-entidad text-texto">{evento.nombre}</h4>
            <DatosEventoFiltro evento={evento} fecha={null} />
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
              <GrupoAvatares avatares={evento.avatares} tamano="sm" resto={evento.asistentes} />
              <Boton type="button" variant="contorno" size="mini">{catalogoEventos.botones.ver_detalles}</Boton>
            </div>
          </div>
        </article>
  )
}
