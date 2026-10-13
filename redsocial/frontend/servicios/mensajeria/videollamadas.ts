import type { ParticipanteVL } from '@/tipos/mensajeria/modelo_mensajes_videollamada_en_curso'
import type { ConteoParticipantes, ReunionEnSala, ReunionProgramada } from '@/tipos/mensajeria/contrato_reunion'
import datos from './videollamadas.json'

export const PARTICIPANTES = datos.participantes as ParticipanteVL[]
export const LLAMADAS_RECIENTES = datos.llamadasRecientes as {
  nombre: string
  direccion?: 'entrante' | 'saliente'
  esGrupo?: boolean
  miembros?: string
  hora: string
}[]
export const CONTACTOS_FRECUENTES = datos.contactosFrecuentes as { nombre: string; esGrupo?: boolean; miembros?: string }[]
export const REUNIONES_PROGRAMADAS = datos.reunionesProgramadas as ReunionProgramada[]
export const REUNION_EN_CURSO = datos.reunionEnCurso
export const CONTEO_PARTICIPANTES_EN_CURSO = datos.conteoParticipantesEnCurso
export const HISTORIAL = datos.historial as { nombre: string; esGrupo?: boolean; fecha: string; duracion: string }[]

const ROL_INVITADO = datos.rolInvitado

function conteoDe(participantes: ParticipanteVL[]): ConteoParticipantes {
  const invitados = participantes.filter((participante) => participante.rol === ROL_INVITADO).length
  return { total: participantes.length, todos: participantes.length, enLinea: participantes.length - invitados, invitados }
}

export function resolverReunionEnSala(id: string | null): ReunionEnSala | undefined {
  if (id === null) return { ...datos.reunionEnCurso, participantes: PARTICIPANTES, conteo: CONTEO_PARTICIPANTES_EN_CURSO }
  const reunion = REUNIONES_PROGRAMADAS.find((candidata) => candidata.id === id)
  if (!reunion) return undefined
  const participantes = PARTICIPANTES.slice(0, reunion.totalParticipantes)
  return { titulo: reunion.titulo, horario: reunion.hora, duracion: datos.reunionEnCurso.duracion, participantes, conteo: conteoDe(participantes) }
}
