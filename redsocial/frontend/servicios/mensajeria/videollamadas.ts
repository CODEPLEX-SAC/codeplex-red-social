import type { ParticipanteVL } from '@/tipos/mensajeria/modelo_mensajes_videollamada_en_curso'
import type { ConteoParticipantes, ReunionEnSala, ReunionProgramada } from '@/tipos/mensajeria/contrato_reunion'
import { buscarReunionCreada, reunionesCreadas } from './almacen_reuniones'
import datos from './videollamadas.json'

export const PARTICIPANTES = datos.participantes as ParticipanteVL[]
export const LLAMADAS_RECIENTES = datos.llamadasRecientes as {
  id: string
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
export const HISTORIAL = datos.historial as { id: string; nombre: string; esGrupo?: boolean; fecha: string; duracion: string }[]

const ROL_INVITADO = datos.rolInvitado

function conteoDe(participantes: ParticipanteVL[]): ConteoParticipantes {
  const invitados = participantes.filter((participante) => participante.rol === ROL_INVITADO).length
  return { total: participantes.length, todos: participantes.length, enLinea: participantes.length - invitados, invitados }
}

export function resolverReunionNueva(): ReunionEnSala {
  const organizador = PARTICIPANTES.filter((participante) => participante.organizador === true)
  return { ...datos.reunionNueva, participantes: organizador, conteo: conteoDe(organizador) }
}

export function resolverLlamadaDirecta(nombre: string): ReunionEnSala {
  const { titulo, horario, rol } = datos.llamadaDirecta
  const organizador = PARTICIPANTES.filter((participante) => participante.organizador === true)
  const contacto = PARTICIPANTES.find((participante) => participante.nombre === nombre) ?? { nombre, rol, micActivo: true, videoActivo: true }
  const participantes = [...organizador, contacto]
  return { titulo: titulo.replace(':nombre', nombre), horario, duracion: datos.reunionEnCurso.duracion, participantes, conteo: conteoDe(participantes) }
}

export function reunionesProgramadasActuales(): ReunionProgramada[] {
  return [...reunionesCreadas(), ...REUNIONES_PROGRAMADAS]
}

function participantesDeReunionCreada(invitados: readonly string[]): ParticipanteVL[] {
  const organizador = PARTICIPANTES.filter((participante) => participante.organizador === true)
  return [...organizador, ...invitados.map((nombre) => ({ nombre, rol: datos.rolInvitado, micActivo: true, videoActivo: true }))]
}

export function resolverReunionEnSala(id: string | null): ReunionEnSala | undefined {
  if (id === null) return { ...datos.reunionEnCurso, participantes: PARTICIPANTES, conteo: CONTEO_PARTICIPANTES_EN_CURSO }
  const creada = buscarReunionCreada(id)
  if (creada) {
    const participantes = participantesDeReunionCreada(creada.invitados)
    return { titulo: creada.titulo, horario: creada.hora, duracion: datos.reunionNueva.duracion, participantes, conteo: conteoDe(participantes) }
  }
  const reunion = REUNIONES_PROGRAMADAS.find((candidata) => candidata.id === id)
  if (!reunion) return undefined
  const participantes = PARTICIPANTES.slice(0, reunion.totalParticipantes)
  return { titulo: reunion.titulo, horario: reunion.hora, duracion: datos.reunionEnCurso.duracion, participantes, conteo: conteoDe(participantes) }
}
