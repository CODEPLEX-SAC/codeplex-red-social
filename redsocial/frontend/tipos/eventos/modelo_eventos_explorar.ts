import type { EventoLista } from './modelo_eventos_proximos'

export interface EventoExplorar extends EventoLista {
  ranking?: number
}
