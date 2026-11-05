import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { agregarMensajePropio, conCambioEn, extractoDe, puedeEditarMensaje } from './logica_mensajeria'
import type { AccionesMensaje, EstadoMensajeria, Mensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textos = catalogoMensajeria.conversacion

export function accionesDeMensaje(mensaje: Mensaje, usuarioId: string, ahora: Date): AccionesMensaje {
  const propio = mensaje.autorId === usuarioId
  return { responder: true, editar: puedeEditarMensaje(mensaje, usuarioId, ahora), reenviar: true, fijar: true, eliminar: propio }
}

export function reenviarMensaje(estado: EstadoMensajeria, origenId: string, mensajeId: string, destinoId: string, usuarioId: string, ahora: Date): EstadoMensajeria {
  const original = (estado.hilos[origenId] ?? []).find((mensaje) => mensaje.id === mensajeId)
  if (!original || origenId === destinoId) return estado
  return agregarMensajePropio(estado, destinoId, { contenido: original.contenido, adjunto: original.adjunto, reenviado: true }, usuarioId, ahora)
}

export function alternarMensajeFijado(estado: EstadoMensajeria, conversacionId: string, mensajeId: string): EstadoMensajeria {
  if (!(estado.hilos[conversacionId] ?? []).some((mensaje) => mensaje.id === mensajeId)) return estado
  return conCambioEn(estado, conversacionId, (actual) => {
    const { mensajeFijadoId: _anterior, ...resto } = actual
    return actual.mensajeFijadoId === mensajeId ? resto : { ...resto, mensajeFijadoId: mensajeId }
  })
}

export function eliminarMensajePropio(estado: EstadoMensajeria, conversacionId: string, mensajeId: string, usuarioId: string): EstadoMensajeria {
  const hilo = estado.hilos[conversacionId] ?? []
  const original = hilo.find((mensaje) => mensaje.id === mensajeId)
  if (!original || original.autorId !== usuarioId) return estado
  const restante = hilo.filter((mensaje) => mensaje.id !== mensajeId)
  const siguiente = { ...estado, hilos: { ...estado.hilos, [conversacionId]: restante } }
  const ultimo = restante[restante.length - 1]
  return conCambioEn(siguiente, conversacionId, (actual) => {
    const { mensajeFijadoId: fijado, ...resto } = actual
    const base = fijado === mensajeId ? resto : actual
    if (hilo[hilo.length - 1]?.id !== mensajeId) return base
    return ultimo ? { ...base, extracto: extractoDe(estado, actual, ultimo, usuarioId) } : { ...base, extracto: textos.sin_mensajes }
  })
}
