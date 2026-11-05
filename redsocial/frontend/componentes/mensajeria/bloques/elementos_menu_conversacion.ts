import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { AccionConversacion, AccionConversacionId, AccionesConversacion } from '@/tipos/mensajeria/contrato_acciones_conversacion'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'

const textos = catalogoMensajeria.acciones_conversacion.elementos

export function ejecutarAccionConversacion(accion: AccionConversacion, acciones: AccionesConversacion) {
  const id = accion.conversationId
  const ejecuciones: Record<AccionConversacionId, () => void> = {
    marcar_leido: () => acciones.onMarcarLeido(id),
    marcar_no_leido: () => acciones.onMarcarNoLeido(id),
    marcar_favorito: () => acciones.onAlternarFavorita(id),
    quitar_favorito: () => acciones.onAlternarFavorita(id),
    silenciar: () => acciones.onAlternarSilencio(id),
    activar_notificaciones: () => acciones.onAlternarSilencio(id),
    ver_perfil: () => undefined,
    eliminar_chat: () => acciones.onEliminar(id),
    abandonar_grupo: () => acciones.onAbandonar(id),
  }
  ejecuciones[accion.actionId]()
}

export function elementosMenuConversacion(disponibles: readonly AccionConversacion[], alEjecutar: (accion: AccionConversacion) => void, alConfirmar: (accion: AccionConversacion) => void): ElementoMenu[] {
  return disponibles.map((accion, indice) => ({
    etiqueta: textos[accion.actionId].etiqueta,
    icono: textos[accion.actionId].icono as ElementoMenu['icono'],
    peligro: accion.peligro,
    ruta: accion.ruta,
    divisor: !accion.peligro && Boolean(disponibles[indice + 1]?.peligro),
    alHacerClick: () => (accion.confirmacion ? alConfirmar(accion) : alEjecutar(accion)),
  }))
}
