import type { Dispatch, SetStateAction } from 'react'
import type { MotivoCaptura, ParticipanteSala, PresentacionSala, PuertoSala } from './contrato_integracion_llamada'
import type { PanelSala } from './contrato_sala_llamada'
import type { PromesaVacia } from './modelo_promesas_llamada'

export interface ParametrosPresentacionSala {
  puerto: PuertoSala
  simulable: boolean
  local: ParticipanteSala | undefined
  setPanel: Dispatch<SetStateAction<PanelSala | null>>
}

export interface PresentacionEnSala {
  presentacion: PresentacionSala | null
  errorPresentacion: MotivoCaptura | null
  iniciarPresentacion: () => PromesaVacia
  detenerPresentacion: () => void
  descartarError: () => void
}
