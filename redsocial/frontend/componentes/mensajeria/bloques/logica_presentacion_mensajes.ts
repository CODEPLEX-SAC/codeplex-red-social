import { esMismoDia } from './logica_fecha_mensajeria'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { CitaMensaje } from '@/tipos/mensajeria/contrato_conversacion'
import type { Conversacion, Mensaje, ParticipanteMensajeria, PosicionEnGrupo, RespuestaMensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textosRespuesta = catalogoMensajeria.conversacion.respuesta

function mismoGrupo(a: Mensaje | undefined, b: Mensaje): boolean {
  return a !== undefined && a.autorId === b.autorId && esMismoDia(new Date(a.creadoEn), new Date(b.creadoEn))
}

export function posicionEnGrupo(mensajes: readonly Mensaje[], indice: number): PosicionEnGrupo {
  const mensaje = mensajes[indice]
  const conAnterior = mismoGrupo(mensajes[indice - 1], mensaje)
  const conSiguiente = mensajes[indice + 1] !== undefined && mismoGrupo(mensaje, mensajes[indice + 1])
  if (conAnterior && conSiguiente) return 'media'
  if (conAnterior) return 'ultima'
  return conSiguiente ? 'primera' : 'sola'
}

export function textoDeMensaje(mensaje: Mensaje): string {
  return mensaje.contenido ?? mensaje.adjunto?.nombre ?? ''
}

export function presenciaDe(conversaciones: readonly Conversacion[], autorId: string): 'conectado' | undefined {
  const individual = conversaciones.find((conversacion) => !conversacion.esGrupo && conversacion.participantes.includes(autorId))
  return individual?.enLinea ? 'conectado' : undefined
}

export function nombreDeAutor(conversacion: Conversacion, participantes: readonly ParticipanteMensajeria[], autorId: string, usuarioId: string): string {
  if (autorId === usuarioId) return textosRespuesta.propio
  return participantes.find((participante) => participante.id === autorId)?.nombre ?? conversacion.nombre
}

export function citaDeRespuesta(respuesta: RespuestaMensaje | undefined, mensajes: readonly Mensaje[], conversacion: Conversacion, participantes: readonly ParticipanteMensajeria[], usuarioId: string): CitaMensaje | undefined {
  if (!respuesta) return undefined
  const original = mensajes.find((mensaje) => mensaje.id === respuesta.mensajeId)
  const autor = nombreDeAutor(conversacion, participantes, respuesta.autorId, usuarioId)
  return { autor, resumen: original ? textoDeMensaje(original) : textosRespuesta.no_disponible }
}

export function tituloDeRespuesta(autor: string, propio: boolean): string {
  return propio ? textosRespuesta.titulo_propio : textosRespuesta.titulo.replace(':nombre', autor)
}

export function sinElemento(lista: readonly string[], id: string): string[] {
  return lista.filter((elemento) => elemento !== id)
}

export function agruparDestinos(destinos: readonly Conversacion[], busqueda: string): { personas: Conversacion[]; grupos: Conversacion[] } {
  const termino = busqueda.trim().toLowerCase()
  const coincidentes = destinos.filter((destino) => destino.nombre.toLowerCase().includes(termino))
  return { personas: coincidentes.filter((destino) => !destino.esGrupo), grupos: coincidentes.filter((destino) => destino.esGrupo) }
}

export function destinosDeReenvio(conversaciones: readonly Conversacion[], origenId: string): Conversacion[] {
  return conversaciones.filter((conversacion) => conversacion.id !== origenId)
}
