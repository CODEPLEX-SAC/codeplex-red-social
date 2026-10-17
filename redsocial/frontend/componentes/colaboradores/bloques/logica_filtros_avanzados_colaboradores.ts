import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { cumpleAcceso, periodoDeVigencia } from './reglas_acceso_colaboradores'
import { cumpleAplicacion, cumpleCuenta, cumpleUltimoAcceso, fechaDeInvitacion } from './reglas_cuenta_colaboradores'

const textos = catalogoColaboradores.panel_filtros_avanzados

export function crearFiltrosAvanzadosColaboradores(): FiltrosAvanzadosColaboradores {
  return {
    fechaInicio: null,
    fechaFin: null,
    invitacionDesde: null,
    invitacionHasta: null,
    ultimoAcceso: textos.ultimo_acceso.opciones[0],
    accesoVigente: false,
    accesoVencido: false,
    aplicaciones: textos.aplicaciones_asignadas.opciones[0],
    cuentaCreada: false,
    cuentaInvitada: false,
    metodoInvitacion: textos.metodo_invitacion.opciones[0],
  }
}

export function contarFiltrosAvanzadosColaboradores(filtros: FiltrosAvanzadosColaboradores): number {
  const vacios = crearFiltrosAvanzadosColaboradores()
  return Object.keys(vacios).filter((campo) => {
    const clave = campo as keyof FiltrosAvanzadosColaboradores
    return filtros[clave] !== vacios[clave]
  }).length
}

function cumpleVigencia(colaborador: Colaborador, filtros: FiltrosAvanzadosColaboradores): boolean {
  const desde = filtros.fechaInicio ? filtros.fechaInicio.startOf('day').valueOf() : -Infinity
  const hasta = filtros.fechaFin ? filtros.fechaFin.endOf('day').valueOf() : Infinity
  const periodo = periodoDeVigencia(colaborador)
  return periodo.desde <= hasta && periodo.hasta >= desde
}

function cumpleInvitacion(colaborador: Colaborador, filtros: FiltrosAvanzadosColaboradores): boolean {
  if (!filtros.invitacionDesde && !filtros.invitacionHasta) return true
  const fecha = fechaDeInvitacion(colaborador)
  if (fecha === null) return false
  const minimo = filtros.invitacionDesde ? filtros.invitacionDesde.startOf('day').valueOf() : -Infinity
  const maximo = filtros.invitacionHasta ? filtros.invitacionHasta.endOf('day').valueOf() : Infinity
  return fecha <= maximo && fecha >= minimo
}

export function aplicarFiltrosAvanzadosColaboradores(colaboradores: Colaborador[], filtros: FiltrosAvanzadosColaboradores, hoy: number = Date.now()): Colaborador[] {
  return colaboradores.filter(
    (colaborador) =>
      cumpleVigencia(colaborador, filtros) &&
      cumpleInvitacion(colaborador, filtros) &&
      cumpleUltimoAcceso(colaborador, filtros.ultimoAcceso) &&
      cumpleAcceso(colaborador, filtros, hoy) &&
      cumpleAplicacion(colaborador, filtros.aplicaciones) &&
      cumpleCuenta(colaborador, filtros),
  )
}
