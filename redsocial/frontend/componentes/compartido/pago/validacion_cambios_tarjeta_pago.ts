import { tarjetaVencida } from './logica_tarjeta_pago'
import type { CambiosTarjetaPago, ErroresTarjetaPago, TextosFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

export { sinErrores } from './validacion_tarjeta_pago'

const FORMATO_VENCIMIENTO = /^\d{2}\/\d{2}$/

export function validarCambiosTarjeta(cambios: CambiosTarjetaPago, textos: TextosFlujoPago, ahora: Date = new Date()): ErroresTarjetaPago {
  const resultado: ErroresTarjetaPago = {}
  if (!FORMATO_VENCIMIENTO.test(cambios.vencimiento)) resultado.vencimiento = textos.tarjetas.vencimiento_invalido
  else if (tarjetaVencida(cambios.vencimiento, ahora)) resultado.vencimiento = textos.errores.vencida
  if (!cambios.titular.trim()) resultado.propietario = textos.errores.propietario
  return resultado
}
