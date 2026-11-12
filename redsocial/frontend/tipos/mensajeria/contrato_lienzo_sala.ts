import type { ParticipanteSala, PuertoSala } from './contrato_integracion_llamada'

export interface ApoyoLienzoSala {
  puerto: PuertoSala
  imagenPresentacion: string | undefined
  presentador: ParticipanteSala | undefined
  fijado: ParticipanteSala | null
}
