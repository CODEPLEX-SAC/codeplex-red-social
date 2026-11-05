import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { formatearHora, proximaMedianoche } from './logica_fecha_mensajeria'
import type { Conversacion, EstadoMensajeria, Mensaje, ParteMensaje, RespuestaMensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textos = catalogoMensajeria.conversacion
const LIMITE_EDICION_MS = textos.edicion.limite_minutos * 60000

export function puedeEditarMensaje(mensaje: Mensaje, usuarioId: string, ahora: Date): boolean {
  if (mensaje.autorId !== usuarioId || !mensaje.contenido) return false
  const transcurrido = ahora.getTime() - new Date(mensaje.creadoEn).getTime()
  return transcurrido >= 0 && LIMITE_EDICION_MS > transcurrido
}

export function proximoVencimientoEdicion(mensajes: readonly Mensaje[], usuarioId: string, ahora: Date): number | null {
  const vencimientos = mensajes.filter((mensaje) => puedeEditarMensaje(mensaje, usuarioId, ahora)).map((mensaje) => new Date(mensaje.creadoEn).getTime() + LIMITE_EDICION_MS)
  return vencimientos.length === 0 ? null : Math.min(...vencimientos)
}

export function proximoCambioReloj(mensajes: readonly Mensaje[], usuarioId: string, ahora: Date): number {
  const vencimiento = proximoVencimientoEdicion(mensajes, usuarioId, ahora)
  const medianoche = proximaMedianoche(ahora)
  return vencimiento === null ? medianoche : Math.min(vencimiento, medianoche)
}

function nombreDe(estado: EstadoMensajeria, autorId: string): string {
  return estado.participantes.find((participante) => participante.id === autorId)?.nombre ?? ''
}

export function extractoDe(estado: EstadoMensajeria, conversacion: Conversacion, mensaje: Mensaje, usuarioId: string): string {
  const contenido = mensaje.contenido ?? mensaje.adjunto?.nombre ?? ''
  if (mensaje.autorId === usuarioId) return `${textos.prefijo_propio}${contenido}`
  return conversacion.esGrupo ? `${nombreDe(estado, mensaje.autorId).split(' ')[0]}: ${contenido}` : contenido
}

export function conCambioEn(estado: EstadoMensajeria, id: string, cambio: (conversacion: Conversacion) => Conversacion): EstadoMensajeria {
  return { ...estado, conversaciones: estado.conversaciones.map((conversacion) => (conversacion.id === id ? cambio(conversacion) : conversacion)) }
}

function siguienteNumeroMensaje(hilo: readonly Mensaje[]): number {
  return hilo.reduce((mayor, mensaje) => Math.max(mayor, Number(mensaje.id.split('-').pop())), 0) + 1
}

export function agregarMensajePropio(estado: EstadoMensajeria, conversacionId: string, parte: ParteMensaje, usuarioId: string, ahora: Date): EstadoMensajeria {
  const conversacion = estado.conversaciones.find((candidata) => candidata.id === conversacionId)
  if (!conversacion) return estado
  const hilo = estado.hilos[conversacionId] ?? []
  const numero = conversacionId.split('-').pop()
  const mensaje: Mensaje = {
    id: `mensaje-${numero}-${siguienteNumeroMensaje(hilo)}`,
    autorId: usuarioId,
    creadoEn: ahora.toISOString(),
    ...parte,
    hora: formatearHora(ahora),
  }
  const siguiente = { ...estado, hilos: { ...estado.hilos, [conversacionId]: [...hilo, mensaje] } }
  return conCambioEn(siguiente, conversacionId, (actual) => ({ ...actual, extracto: extractoDe(estado, actual, mensaje, usuarioId) }))
}

export function enviarMensajePropio(estado: EstadoMensajeria, conversacionId: string, texto: string, usuarioId: string, ahora: Date, respuestaA?: RespuestaMensaje): EstadoMensajeria {
  const contenido = texto.trim()
  if (contenido === '') return estado
  return agregarMensajePropio(estado, conversacionId, { contenido, respuestaA }, usuarioId, ahora)
}

export function editarMensajePropio(estado: EstadoMensajeria, conversacionId: string, mensajeId: string, texto: string, usuarioId: string, ahora: Date): EstadoMensajeria {
  const contenido = texto.trim()
  const hilo = estado.hilos[conversacionId] ?? []
  const original = hilo.find((mensaje) => mensaje.id === mensajeId)
  const conversacion = estado.conversaciones.find((candidata) => candidata.id === conversacionId)
  if (contenido === '' || !original || !conversacion || !puedeEditarMensaje(original, usuarioId, ahora)) return estado
  const editado: Mensaje = { ...original, contenido }
  const siguiente = { ...estado, hilos: { ...estado.hilos, [conversacionId]: hilo.map((mensaje) => (mensaje.id === mensajeId ? editado : mensaje)) } }
  const esUltimo = hilo[hilo.length - 1]?.id === mensajeId
  return esUltimo ? conCambioEn(siguiente, conversacionId, (actual) => ({ ...actual, extracto: extractoDe(estado, actual, editado, usuarioId) })) : siguiente
}
