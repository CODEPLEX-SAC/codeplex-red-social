import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { Parcial, TextosFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

type Registro = Record<string, unknown>

function esRegistro(valor: unknown): valor is Registro {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor)
}

function fusionar(base: Registro, extra: Registro): Registro {
  const resultado: Registro = { ...base }
  for (const [clave, valor] of Object.entries(extra)) {
    const previo = resultado[clave]
    resultado[clave] = esRegistro(previo) && esRegistro(valor) ? fusionar(previo, valor) : (valor ?? previo)
  }
  return resultado
}

export const TEXTOS_FLUJO_PAGO: TextosFlujoPago = catalogoCompartido.flujo_pago.textos

export function combinarTextos(extra?: Parcial<TextosFlujoPago>): TextosFlujoPago {
  return extra ? (fusionar(TEXTOS_FLUJO_PAGO as unknown as Registro, extra as Registro) as unknown as TextosFlujoPago) : TEXTOS_FLUJO_PAGO
}
