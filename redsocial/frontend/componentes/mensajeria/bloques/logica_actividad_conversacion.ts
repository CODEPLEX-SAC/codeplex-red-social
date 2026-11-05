import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { etiquetaCompletaDeConversacion, etiquetaDeConversacion } from './logica_fecha_mensajeria'
import type { Conversacion, ConversacionConEtiqueta, EstadoMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import type { IdentificadoresConversacion, OrigenActividad, TipoConversacion } from '@/tipos/mensajeria/contrato_acciones_conversacion'

const textos = catalogoMensajeria.conversacion.historias_vista_previa

export function tipoDeConversacion(conversacion: Conversacion): TipoConversacion {
  return conversacion.esGrupo ? 'grupal' : 'individual'
}

export function identificadoresDe(conversacion: Conversacion): IdentificadoresConversacion {
  const grupal = tipoDeConversacion(conversacion) === 'grupal'
  return {
    conversationId: conversacion.id,
    participantId: grupal ? null : (conversacion.participantes[0] ?? null),
    groupId: grupal ? (conversacion.grupoId ?? null) : null,
  }
}

function vistaPreviaDeHistorias(nombre: string, cantidad: number | undefined): string {
  if (cantidad === undefined || cantidad < 1) return textos.generico.replace(':nombre', nombre)
  return cantidad === 1 ? textos.singular.replace(':nombre', nombre) : textos.plural.replace(':nombre', nombre).replace(':n', String(cantidad))
}

function instante(valor: string | null | undefined): number {
  const tiempo = new Date(valor ?? Number.NaN).getTime()
  return Number.isNaN(tiempo) ? Number.NEGATIVE_INFINITY : tiempo
}

export function actividadDe(conversacion: Conversacion, estado: EstadoMensajeria, historiasPorParticipante: Readonly<Record<string, number>>): { origen: OrigenActividad; fecha: string | null; vistaPrevia: string } {
  const hilo = estado.hilos[conversacion.id] ?? []
  const ultimo = hilo[hilo.length - 1]
  const identificadores = identificadoresDe(conversacion)
  const historia = conversacion.actividadHistoria
  const historiaMasReciente = identificadores.participantId !== null && historia !== undefined && instante(historia.publicadaEn) > instante(ultimo?.creadoEn)
  if (historiaMasReciente && historia) {
    return { origen: 'historia', fecha: historia.publicadaEn, vistaPrevia: vistaPreviaDeHistorias(conversacion.nombre, historiasPorParticipante[identificadores.participantId ?? '']) }
  }
  return { origen: 'mensaje', fecha: ultimo?.creadoEn ?? null, vistaPrevia: conversacion.extracto }
}

export function conversacionesConActividad(conversaciones: readonly Conversacion[], estado: EstadoMensajeria, ahora: Date, historiasPorParticipante: Readonly<Record<string, number>> = {}): ConversacionConEtiqueta[] {
  return conversaciones.map((conversacion) => {
    const actividad = actividadDe(conversacion, estado, historiasPorParticipante)
    return {
      ...conversacion,
      etiquetaTiempo: etiquetaDeConversacion(actividad.fecha, ahora),
      etiquetaCompleta: etiquetaCompletaDeConversacion(actividad.fecha, ahora),
      fechaActividad: actividad.fecha,
      vistaPrevia: actividad.vistaPrevia,
      origenActividad: actividad.origen,
      tipo: tipoDeConversacion(conversacion),
      identificadores: identificadoresDe(conversacion),
      estadoNotificaciones: conversacion.silenciado ? 'silenciadas' : 'activas',
    }
  })
}
