import type { EventoOrganizas } from './modelo_eventos_mis_eventos'

export interface EditarEventoProps {
  evento: EventoOrganizas
  estiloInsignia: string
  etiquetaInsignia: string
  onVolver: () => void
}
