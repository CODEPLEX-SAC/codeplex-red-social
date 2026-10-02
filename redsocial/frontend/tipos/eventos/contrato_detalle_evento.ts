import type { EventoDestacado } from './modelo_eventos_para_ti'

export interface DetalleEventoProps {
  evento: EventoDestacado
  onVolver: () => void
}
