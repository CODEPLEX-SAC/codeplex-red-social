import type { Dayjs } from 'dayjs'
import type { ContactoInvitable, EstadoCopiaEnlace } from './contrato_integracion_llamada'
import type { ReunionProgramada } from './contrato_reunion'
import type { PromesaOperacion } from './modelo_promesas_llamada'

export interface DatosReunionProgramada {
  nombre: string
  descripcion: string
  fecha: string
  zona: string
  inicio: string
  fin: string
  invitados: string[]
  permitirCompartir: boolean
  solicitarAdmision: boolean
}

export interface ReunionCreada extends ReunionProgramada {
  descripcion: string
  fecha: string
  zona: string
  invitados: string[]
  permitirCompartir: boolean
  solicitarAdmision: boolean
  enlace: string
}

export type ErroresProgramacion = Partial<Record<'nombre' | 'fecha' | 'inicio' | 'fin', string>>

export interface BorradorReunion {
  nombre: string
  descripcion: string
  fecha: Dayjs | null
  zona: string
  inicio: Dayjs | null
  fin: Dayjs | null
  invitados: string[]
  permitirCompartir: boolean
  solicitarAdmision: boolean
}

export interface ParametrosProgramarReunion {
  candidatos: readonly ContactoInvitable[]
  programar: (datos: DatosReunionProgramada) => ReunionCreada
  copiarEnlace: (enlace: string) => PromesaOperacion
}

export interface FormularioProgramarReunionProps extends ParametrosProgramarReunion {
  fotografiaDe: (nombre: string) => string
  rutaSala: (reunion: ReunionCreada) => string
  onCerrar: () => void
}

export interface ModalProgramarReunionProps extends FormularioProgramarReunionProps {
  titulo: string
}

export interface BotonProgramarReunionProps extends ParametrosProgramarReunion {
  fotografiaDe: (nombre: string) => string
  rutaSala: (reunion: ReunionCreada) => string
}

export interface SeccionBorradorProps {
  borrador: BorradorReunion
  errores: ErroresProgramacion
  onCambiar: <K extends keyof BorradorReunion>(campo: K, valor: BorradorReunion[K]) => void
}

export interface SeccionFechaHorarioProps extends SeccionBorradorProps {
  duracion: number
  onCambiarInicio: (inicio: Dayjs | null) => void
}

export interface SeccionInvitarParticipantesProps {
  candidatos: readonly ContactoInvitable[]
  invitados: readonly string[]
  disponibles: readonly ContactoInvitable[]
  fotografiaDe: (nombre: string) => string
  onAgregar: (nombre: string) => void
  onQuitar: (nombre: string) => void
}

export interface SeccionAccesoReunionProps {
  borrador: BorradorReunion
  onCambiar: SeccionBorradorProps['onCambiar']
}

export interface ConfirmacionReunionProgramadaProps {
  reunion: ReunionCreada
  copia: EstadoCopiaEnlace
  onCopiar: () => void
  rutaSala: string
  onCerrar: () => void
}

export interface OrigenVersionReuniones {
  suscribir: (oyente: () => void) => () => void
  leer: () => number
}

export interface CamposAccesoReunion {
  compartir: 'permitirCompartir'
  admision: 'solicitarAdmision'
}
