import type { EstadoCopiaEnlace } from './contrato_integracion_llamada'
import type { PromesaOperacion } from './modelo_promesas_llamada'

export interface ParametrosReunionMasTarde {
  crearEnlace: () => string
  copiarEnlace: (enlace: string) => PromesaOperacion
}

export interface ModalEnlaceReunionProps {
  enlace: string
  copia: EstadoCopiaEnlace
  onCopiar: () => void
  onCerrar: () => void
}

export type BotonReunionMasTardeProps = ParametrosReunionMasTarde
