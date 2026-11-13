import type { IconName } from '../compartido/contrato_icono'
import type { ParticipanteSala } from './contrato_integracion_llamada'

export interface TarjetaMasParticipantesProps {
  muestra: readonly ParticipanteSala[]
  restantes: number
  alAbrir: () => void
}

export interface FranjaParticipantesMovilProps {
  muestra: readonly ParticipanteSala[]
  total: number
  local: ParticipanteSala | undefined
  flujoLocal: MediaStream | null
  reaccion: IconName | null
  alAbrirParticipantes: () => void
}
