import { rutaPerfilUsuario } from '../../compartido/interfaz/ruta_perfil_usuario'
import { conCambioEn } from './logica_mensajeria'
import type { Conversacion, ConversacionConEtiqueta, EstadoMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import type { AccionConversacion, AccionConversacionId } from '@/tipos/mensajeria/contrato_acciones_conversacion'

export function estaSinLeer(conversacion: Conversacion): boolean {
  return conversacion.noLeidos > 0 || conversacion.marcadaNoLeida === true
}

export function accionesDeConversacion(conversacion: ConversacionConEtiqueta): AccionConversacion[] {
  const conversationId = conversacion.id
  const individual = conversacion.tipo === 'individual'
  const participantId = conversacion.identificadores.participantId
  const accion = (actionId: AccionConversacionId, extra: Partial<AccionConversacion> = {}): AccionConversacion => ({ actionId, conversationId, peligro: false, confirmacion: false, ...extra })
  const acciones: (AccionConversacion | null)[] = [
    estaSinLeer(conversacion) ? accion('marcar_leido') : accion('marcar_no_leido'),
    conversacion.favorita ? accion('quitar_favorito') : accion('marcar_favorito'),
    conversacion.estadoNotificaciones === 'silenciadas' ? accion('activar_notificaciones') : accion('silenciar'),
    individual && participantId !== null ? accion('ver_perfil', { ruta: rutaPerfilUsuario(participantId) }) : null,
    individual ? null : accion('abandonar_grupo', { peligro: true, confirmacion: true }),
    accion('eliminar_chat', { peligro: true, confirmacion: true }),
  ]
  return acciones.filter((elemento): elemento is AccionConversacion => elemento !== null)
}

export function totalMensajesSinLeer(conversaciones: readonly Conversacion[]): number {
  return conversaciones.reduce((total, conversacion) => total + conversacion.noLeidos + Number(conversacion.noLeidos === 0 && conversacion.marcadaNoLeida === true), 0)
}

export function marcarConversacionNoLeida(estado: EstadoMensajeria, conversacionId: string): EstadoMensajeria {
  const conversacion = estado.conversaciones.find((candidata) => candidata.id === conversacionId)
  if (!conversacion || estaSinLeer(conversacion)) return estado
  return conCambioEn(estado, conversacionId, (actual) => ({ ...actual, marcadaNoLeida: true }))
}

export function alternarSilencioConversacion(estado: EstadoMensajeria, conversacionId: string): EstadoMensajeria {
  return conCambioEn(estado, conversacionId, (actual) => ({ ...actual, silenciado: !actual.silenciado }))
}

export function quitarConversacion(estado: EstadoMensajeria, conversacionId: string): EstadoMensajeria {
  if (!estado.conversaciones.some((conversacion) => conversacion.id === conversacionId)) return estado
  const { [conversacionId]: _quitado, ...hilos } = estado.hilos
  void _quitado
  return { ...estado, conversaciones: estado.conversaciones.filter((conversacion) => conversacion.id !== conversacionId), hilos }
}

export function abandonarGrupoConversacion(estado: EstadoMensajeria, conversacionId: string): EstadoMensajeria {
  const conversacion = estado.conversaciones.find((candidata) => candidata.id === conversacionId)
  return conversacion?.esGrupo ? quitarConversacion(estado, conversacionId) : estado
}
