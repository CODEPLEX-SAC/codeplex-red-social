import type { ParticipanteVL } from '@/tipos/mensajeria/modelo_mensajes_videollamada_en_curso'
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
export const REUNIONES_PROGRAMADAS = datos.reunionesProgramadas as { dia: string; mes: string; titulo: string; hora: string; participantes: string; avatares: number; extra: string }[]
export const REUNION_EN_CURSO = datos.reunionEnCurso
export const CONTEO_PARTICIPANTES_EN_CURSO = datos.conteoParticipantesEnCurso
export const HISTORIAL = datos.historial as { nombre: string; esGrupo?: boolean; fecha: string; duracion: string }[]
