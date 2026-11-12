import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BorradorReunion, ErroresProgramacion } from '@/tipos/mensajeria/contrato_programar_reunion'

const errores = catalogoMensajeria.videollamada.programar.textos.errores

export function erroresObligatorios(borrador: BorradorReunion): ErroresProgramacion {
  const resultado: ErroresProgramacion = {}
  if (borrador.nombre.trim() === String()) resultado.nombre = errores.nombre
  if (borrador.fecha === null) resultado.fecha = errores.fecha
  if (borrador.inicio === null) resultado.inicio = errores.inicio
  if (borrador.fin === null) resultado.fin = errores.fin
  return resultado
}
