import type { ContactoInvitable } from './contrato_integracion_llamada'

export interface ParametrosBusquedaInvitados {
  disponibles: readonly ContactoInvitable[]
  onAgregar: (nombre: string) => void
}

export interface BusquedaInvitados {
  texto: string
  consulta: string
  opciones: readonly ContactoInvitable[]
  agregar: (nombre: string) => void
  limpiar: () => void
  cambiarConsulta: (evento: { target: { value: string } }) => void
  invitarTexto: () => void
}
