import type { FiltroFecha } from './contrato_filtro_fecha'
import type { CiudadFiltroEvento, MarcadorMapaEvento } from './contrato_filtro_ubicacion'
import type { ConjuntoResultadosFiltro } from './contrato_resultados_filtro_fecha'
import type { EventoExplorar } from './modelo_eventos_explorar'

export interface DatosExplorarEventos {
  setFiltroFechaAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
  filtroFechaAbierto: boolean
  filtroFecha: FiltroFecha | null
  setFiltroFecha: (valor: FiltroFecha | null | ((actual: FiltroFecha | null) => FiltroFecha | null)) => void
  setFiltroCategoriaAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
  filtroCategoriaAbierto: boolean
  CATEGORIAS_FILTRO_PARA_TI: { icono: string; color: string; nombre: string; conteo: string }[]
  setFiltroUbicacionAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
  filtroUbicacionAbierto: boolean
  filtroUbicacion: string | null
  setFiltroUbicacion: (valor: string | null | ((actual: string | null) => string | null)) => void
  CIUDADES_FILTRO_PARA_TI: CiudadFiltroEvento[]
  MARCADORES_MAPA_PARA_TI: MarcadorMapaEvento[]
  CIUDADES_CON_EVENTOS: string[]
  RESULTADOS_FILTRO_FECHA: Record<string, ConjuntoResultadosFiltro>
  EVENTOS: EventoExplorar[]
}
