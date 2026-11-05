import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AceptacionAutorizacionPago, AutorizacionPago } from '@/tipos/compartido/contrato_flujo_pago'

const reglas = catalogoCompartido.flujo_pago.reglas.autorizacion

export type AceptacionesPago = Record<string, boolean>

export function idControlAutorizacion(id: string) {
  return [reglas.prefijo_id, id].join('')
}

export function idErrorAutorizacion(id: string) {
  return [idControlAutorizacion(id), reglas.sufijo_error].join('')
}

export function pendientesObligatorias(elementos: AutorizacionPago[], aceptaciones: AceptacionesPago) {
  return elementos.filter((elemento) => elemento.obligatoria && !aceptaciones[elemento.id])
}

export function aceptacionesDe(elementos: AutorizacionPago[], aceptaciones: AceptacionesPago): AceptacionAutorizacionPago[] {
  return elementos.map((elemento) => ({ id: elemento.id, aceptada: aceptaciones[elemento.id] === true, version: elemento.version }))
}

export function enfocarControl(idControl: string) {
  const control = document.getElementById(idControl)
  control?.scrollIntoView?.({ block: 'center' })
  control?.focus()
}

export function partirEtiqueta(texto: string) {
  const corte = texto.lastIndexOf(reglas.separador_palabras)
  return corte < 0 ? { inicio: '', final: texto } : { inicio: texto.slice(0, corte), final: texto.slice(corte + 1) }
}
