import type { ConfiguracionBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { EventoDestacado, EventoProximo } from './modelo_eventos_para_ti'
export interface FiltrosBusquedaEventos {
  ubicacion: string
}

export interface BloqueBuscarProps {
  evento: string
  ubicacion: string
  alCambiarEvento: (texto: string) => void
  alCambiarUbicacion: (texto: string) => void
}

export interface EntradaEventosParaTi {
  configuracionBusqueda: ConfiguracionBusqueda<EventoDestacado, FiltrosBusquedaEventos>
  proximos: EventoProximo[]
  categoriasSeleccionadas: string[]
}
