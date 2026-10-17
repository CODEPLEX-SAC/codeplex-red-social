import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { fechaDeTexto } from './logica_colaboradores'

const MS_POR_DIA = 86_400_000

export function periodoDeVigencia(colaborador: Colaborador) {
  const { vigencia } = colaborador
  if (vigencia.tipo === 'rango') return { desde: fechaDeTexto(vigencia.desde), hasta: fechaDeTexto(vigencia.hasta) }
  return { desde: fechaDeTexto(vigencia.fecha), hasta: fechaDeTexto(vigencia.fecha) }
}

function dentroDelPeriodo(colaborador: Colaborador, hoy: number): boolean {
  const periodo = periodoDeVigencia(colaborador)
  return periodo.desde <= hoy && hoy < periodo.hasta + MS_POR_DIA
}

function accesoVigente(colaborador: Colaborador, hoy: number): boolean {
  const sinFin = colaborador.vigencia.tipo !== 'rango'
  return colaborador.estado === 'activo' && (sinFin || dentroDelPeriodo(colaborador, hoy))
}

function accesoVencido(colaborador: Colaborador, hoy: number): boolean {
  return colaborador.estado !== 'invitado' && !accesoVigente(colaborador, hoy)
}

export function cumpleAcceso(colaborador: Colaborador, filtros: FiltrosAvanzadosColaboradores, hoy: number): boolean {
  const sinFiltro = !filtros.accesoVigente && !filtros.accesoVencido
  return sinFiltro || (filtros.accesoVigente && accesoVigente(colaborador, hoy)) || (filtros.accesoVencido && accesoVencido(colaborador, hoy))
}
