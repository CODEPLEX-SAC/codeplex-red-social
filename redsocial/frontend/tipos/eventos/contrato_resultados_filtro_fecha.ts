import type { FiltroFecha } from './contrato_filtro_fecha'

export interface EventoResultadoFiltro {
  categoria: string
  categoriaColor: string
  nombre: string
  descripcion: string
  horario: string
  lugar: string
  asistentes: string
  avatares: number
}

export interface EventoSugeridoFiltro {
  dia: string
  mes: string
  categoria: string
  categoriaColor: string
  nombre: string
  fecha: string
  lugar: string
  asistentes: string
  avatares: number
}

export interface ConjuntoResultadosFiltro {
  destacado: EventoResultadoFiltro | null
  otros: EventoResultadoFiltro[]
  sugeridos: EventoSugeridoFiltro[]
}

export interface ResultadosFiltroFechaProps {
  filtro: FiltroFecha
  resultados: Record<string, ConjuntoResultadosFiltro>
  onExplorar: () => void
}
