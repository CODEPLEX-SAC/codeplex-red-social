import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { fechaDeTexto } from './logica_colaboradores'

const textos = catalogoColaboradores.panel_filtros_avanzados
const OPCION_NUNCA = textos.ultimo_acceso.opciones[textos.ultimo_acceso.opciones.length - 1]
const PREFIJO_RECIENTE = catalogoColaboradores.filtros_avanzados_reglas.ultimo_acceso_reciente

export function cumpleUltimoAcceso(colaborador: Colaborador, opcion: string): boolean {
  const reciente = Boolean(colaborador.ultimoAcceso?.startsWith(PREFIJO_RECIENTE))
  if (opcion === OPCION_NUNCA) return !colaborador.ultimoAcceso
  return opcion === textos.ultimo_acceso.opciones[0] || reciente
}

export function cumpleCuenta(colaborador: Colaborador, filtros: FiltrosAvanzadosColaboradores): boolean {
  const invitada = colaborador.estado === 'invitado'
  const sinFiltro = !filtros.cuentaCreada && !filtros.cuentaInvitada
  return sinFiltro || (filtros.cuentaInvitada && invitada) || (filtros.cuentaCreada && !invitada)
}

export function cumpleAplicacion(colaborador: Colaborador, opcion: string): boolean {
  return opcion === textos.aplicaciones_asignadas.opciones[0] || colaborador.aplicaciones.some((app) => app.nombre === opcion)
}

export function fechaDeInvitacion(colaborador: Colaborador): number | null {
  const { vigencia } = colaborador
  const fecha = colaborador.fechaInvitacion ?? (colaborador.estado === 'invitado' && vigencia.tipo === 'simple' ? vigencia.fecha : null)
  return fecha === null ? null : fechaDeTexto(fecha)
}
