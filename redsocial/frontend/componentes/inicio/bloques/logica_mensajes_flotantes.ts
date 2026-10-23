import type { MensajeFlotanteInicio } from '@/tipos/inicio/contrato_feed_inicio'

export function sumarNoLeidos(mensajes: readonly MensajeFlotanteInicio[]) {
  return mensajes.reduce((suma, mensaje) => suma + mensaje.badge, 0)
}
