import { enfocarControl, idControlAutorizacion } from './logica_autorizaciones_pago'
import type { ParametrosRechazoPago, RechazoIntentoPago, VarianteAvisoPago } from '@/tipos/compartido/contrato_flujo_pago'

export function rechazoDeIntento({ pendientes, edicion, tarjetaValida, mensajes }: ParametrosRechazoPago): RechazoIntentoPago | null {
  if (pendientes.length > 0) return { idControl: idControlAutorizacion(pendientes[0].id) }
  if (edicion) return { mensaje: mensajes.edicion }
  if (!tarjetaValida) return { mensaje: mensajes.incompleto }
  return null
}

export function avisarRechazo({ mensaje, idControl }: RechazoIntentoPago, notificar: (variante: VarianteAvisoPago, mensaje: string) => void) {
  if (mensaje) notificar('advertencia', mensaje)
  if (idControl) enfocarControl(idControl)
}

export function erroresSinAutorizacion(previos: Record<string, string>, id: string, marcado: boolean) {
  return marcado ? Object.fromEntries(Object.entries(previos).filter(([clave]) => clave !== id)) : previos
}
