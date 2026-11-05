import { useSyncExternalStore } from 'react'
import { alternarMensajeFijado, eliminarMensajePropio, reenviarMensaje } from './logica_acciones_mensaje'
import { abandonarGrupoConversacion, alternarSilencioConversacion, marcarConversacionNoLeida, quitarConversacion } from './logica_acciones_conversacion'
import { alternarConversacionFavorita, conversacionesFavoritas, conversacionesNoLeidas, marcarConversacionLeida } from './logica_bandejas_mensajeria'
import { crearGrupoConversacion, idDeGrupoNuevo } from './logica_grupos_mensajeria'
import { agregarMensajePropio, editarMensajePropio, enviarMensajePropio, puedeEditarMensaje } from './logica_mensajeria'
import type { AdjuntoMensaje, AlmacenMensajeria, RelojMensajeria, RespuestaMensaje } from '@/tipos/mensajeria/contrato_mensajes'
import type { DatosNuevoGrupo } from '@/tipos/mensajeria/contrato_lista_conversaciones'

export function usarMensajeria(almacen: AlmacenMensajeria, reloj: RelojMensajeria, usuarioId: string) {
  const estado = useSyncExternalStore(almacen.suscribir, almacen.leer)

  function enviar(conversacionId: string, texto: string, respuestaA?: RespuestaMensaje) {
    almacen.modificar((actual) => enviarMensajePropio(actual, conversacionId, texto, usuarioId, reloj.ahora(), respuestaA))
  }

  function adjuntar(conversacionId: string, adjuntos: readonly AdjuntoMensaje[], respuestaA?: RespuestaMensaje) {
    adjuntos.forEach((adjunto, indice) => almacen.modificar((actual) => agregarMensajePropio(actual, conversacionId, { adjunto, respuestaA: indice === 0 ? respuestaA : undefined }, usuarioId, reloj.ahora())))
  }

  function eliminar(conversacionId: string, mensajeId: string) {
    almacen.modificar((actual) => eliminarMensajePropio(actual, conversacionId, mensajeId, usuarioId))
  }

  function reenviar(origenId: string, mensajeId: string, destinoId: string): boolean {
    const antes = almacen.leer()
    almacen.modificar((actual) => reenviarMensaje(actual, origenId, mensajeId, destinoId, usuarioId, reloj.ahora()))
    return almacen.leer() !== antes
  }

  function fijar(conversacionId: string, mensajeId: string) {
    almacen.modificar((actual) => alternarMensajeFijado(actual, conversacionId, mensajeId))
  }

  function editar(conversacionId: string, mensajeId: string, texto: string): boolean {
    const original = (almacen.leer().hilos[conversacionId] ?? []).find((mensaje) => mensaje.id === mensajeId)
    if (!original || !puedeEditarMensaje(original, usuarioId, reloj.ahora())) return false
    almacen.modificar((actual) => editarMensajePropio(actual, conversacionId, mensajeId, texto, usuarioId, reloj.ahora()))
    return true
  }

  function accionesDe(conversacionId: string) {
    return {
      onEnviar: (texto: string, respuestaA?: RespuestaMensaje) => enviar(conversacionId, texto, respuestaA),
      onAdjuntar: (adjuntos: readonly AdjuntoMensaje[], respuestaA?: RespuestaMensaje) => adjuntar(conversacionId, adjuntos, respuestaA),
      onEditar: (mensajeId: string, texto: string) => editar(conversacionId, mensajeId, texto),
      onEliminar: (mensajeId: string) => eliminar(conversacionId, mensajeId),
      onReenviar: (mensajeId: string, destinoId: string) => reenviar(conversacionId, mensajeId, destinoId),
      onFijar: (mensajeId: string) => fijar(conversacionId, mensajeId),
    }
  }

  return {
    estado,
    accionesDe,
    noLeidas: conversacionesNoLeidas(estado),
    favoritas: conversacionesFavoritas(estado),
    enviar,
    adjuntar,
    editar,
    eliminar,
    reenviar,
    fijar,
    marcarLeida: (conversacionId: string) => almacen.modificar((actual) => marcarConversacionLeida(actual, conversacionId)),
    marcarNoLeida: (conversacionId: string) => almacen.modificar((actual) => marcarConversacionNoLeida(actual, conversacionId)),
    alternarSilencio: (conversacionId: string) => almacen.modificar((actual) => alternarSilencioConversacion(actual, conversacionId)),
    eliminarConversacion: (conversacionId: string) => almacen.modificar((actual) => quitarConversacion(actual, conversacionId)),
    abandonarGrupo: (conversacionId: string) => almacen.modificar((actual) => abandonarGrupoConversacion(actual, conversacionId)),
    crearGrupo: (datos: DatosNuevoGrupo): string => {
      const id = idDeGrupoNuevo(almacen.leer().conversaciones)
      almacen.modificar((actual) => crearGrupoConversacion(actual, id, datos))
      return id
    },
    alternarFavorita: (conversacionId: string) => almacen.modificar((actual) => alternarConversacionFavorita(actual, conversacionId)),
  }
}
