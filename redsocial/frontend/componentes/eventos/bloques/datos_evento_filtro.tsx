import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../compartido/icono'
import type { EventoResultadoFiltro } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import { formatearFechaEvento } from '../formato_fecha_filtro'

const clases = catalogoEventos.clases_resultado_filtro

export function DatosEventoFiltro({ evento, fecha }: { evento: EventoResultadoFiltro; fecha: Date | null }) {
  return (
    <div className={clases.datos}>
      {fecha && <span className={clases.dato}><Icono name="calendario" className={clases.icono_dato} /> {formatearFechaEvento(fecha)}</span>}
      <span className={clases.dato}><Icono name="reloj" className={clases.icono_dato} /> {evento.horario}</span>
      <span className={clases.dato}><Icono name="ubicacion" className={clases.icono_dato} /> {evento.lugar}</span>
    </div>
  )
}
