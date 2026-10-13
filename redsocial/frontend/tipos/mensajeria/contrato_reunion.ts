import type { ParticipanteVL } from './modelo_mensajes_videollamada_en_curso'

export interface ReunionProgramada {
  id: string
  dia: string
  mes: string
  titulo: string
  hora: string
  participantes: string
  totalParticipantes: number
  avatares: number
  extra: string
}

export interface ConteoParticipantes {
  total: number
  todos: number
  enLinea: number
  invitados: number
}

export interface ReunionEnSala {
  titulo: string
  horario: string
  duracion: string
  participantes: ParticipanteVL[]
  conteo: ConteoParticipantes
}
