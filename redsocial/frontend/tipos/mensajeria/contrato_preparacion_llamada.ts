import type { IconName } from '../compartido/contrato_icono'
import type { ContactoInvitable, DispositivoMultimedia, InvitacionesLlamada, ParticipanteSala, TipoDispositivo } from './contrato_integracion_llamada'
import type { usarPreparacionLlamada } from '../../componentes/mensajeria/bloques/usar_preparacion_llamada'

export interface SelectorDispositivoProps {
  tipo: TipoDispositivo
  icono: IconName
  dispositivos: DispositivoMultimedia[]
  valor: string
  onElegir: (tipo: TipoDispositivo, id: string) => void
}

export interface SeccionParticipantesPreparacionProps {
  participantes: ParticipanteSala[]
  contactos: readonly ContactoInvitable[]
  invitaciones: InvitacionesLlamada
  enlaceReunion: string
}

export interface SeccionVideollamadaIniciarProps {
  usuario: string
  contacto: string | null
  esReunion: boolean
  preparacion: ReturnType<typeof usarPreparacionLlamada>
  enlaceInicio: string
}
