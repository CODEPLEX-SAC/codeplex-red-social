import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import type { ParticipanteSala } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { GruposParticipantes } from '@/tipos/mensajeria/contrato_sala_llamada'

const SEGUNDOS_POR_HORA = 3600
const SEGUNDOS_POR_MINUTO = 60
const UN_PARTICIPANTE = 1
const HASTA_CUATRO = 4

function dosDigitos(valor: number): string {
  return String(valor).padStart(2, '0')
}

export function formatearDuracion(segundos: number): string {
  const horas = Math.floor(segundos / SEGUNDOS_POR_HORA)
  const minutos = Math.floor((segundos % SEGUNDOS_POR_HORA) / SEGUNDOS_POR_MINUTO)
  return `${dosDigitos(horas)}:${dosDigitos(minutos)}:${dosDigitos(segundos % SEGUNDOS_POR_MINUTO)}`
}

export function segundosDe(duracion: string): number {
  const [horas = 0, minutos = 0, segundos = 0] = duracion.split(':').map(Number)
  return horas * SEGUNDOS_POR_HORA + minutos * SEGUNDOS_POR_MINUTO + segundos
}

export function columnasPara(cantidad: number): '1' | '2' | '3' {
  if (cantidad <= UN_PARTICIPANTE) return '1'
  if (cantidad <= HASTA_CUATRO) return '2'
  return '3'
}

export function sinParticipante(participantes: readonly ParticipanteSala[], id: string): ParticipanteSala[] {
  return participantes.filter((participante) => participante.id !== id)
}

export function totalPaginasDe(cantidad: number, tamano: number): number {
  return Math.max(1, Math.ceil(cantidad / tamano))
}

export function paginaDe(participantes: readonly ParticipanteSala[], pagina: number, tamano: number): ParticipanteSala[] {
  return participantes.slice(pagina * tamano, (pagina + 1) * tamano)
}

export function buscarParticipantes(participantes: readonly ParticipanteSala[], consulta: string): ParticipanteSala[] {
  return participantes.filter((participante) => contieneTexto(participante.nombre, consulta))
}

export function agruparParticipantes(participantes: readonly ParticipanteSala[]): GruposParticipantes {
  return {
    manos: participantes.filter((participante) => participante.manoLevantada),
    colaboradores: participantes.filter((participante) => !participante.manoLevantada && !participante.invitado),
    invitados: participantes.filter((participante) => !participante.manoLevantada && participante.invitado),
  }
}
