import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import { finDelDia, inicioDelDia } from '../../compartido/limites_fecha'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { CriteriosHistorialEmpresa, FiltrosBusquedaHistorialEmpresa } from '@/tipos/empresas/contrato_historial_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { RegistroHistorialBase } from '@/tipos/empresas/modelo_historial_empresa'

const textos = catalogoEmpresas.historial_empresa
const ETIQUETAS_TIPO: Record<string, string> = textos.tipos
export const TODOS_LOS_TIPOS = textos.filtros_tipo[0]

export function armarHistorial(empresa: Empresa, base: RegistroHistorialBase[]) {
  return base.slice(0, empresa.usuarios * textos.registros_por_usuario)
}

function fechaDelRegistro(registro: RegistroHistorialBase) {
  const [dia, mes, anio] = registro.fecha.split('/')
  return new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime()
}

export function coincideRegistro(registro: RegistroHistorialBase, consulta: string) {
  return contieneTexto(registro.usuario, consulta)
}

export function admiteRegistro(registro: RegistroHistorialBase, criterios: FiltrosBusquedaHistorialEmpresa) {
  const desde = inicioDelDia(criterios.desde, null)
  const hasta = finDelDia(criterios.hasta, null)
  const coincideTipo = criterios.tipo === TODOS_LOS_TIPOS || ETIQUETAS_TIPO[registro.tipo] === criterios.tipo
  const despuesDeDesde = desde === null || fechaDelRegistro(registro) >= desde
  const antesDeHasta = hasta === null || fechaDelRegistro(registro) <= hasta
  return coincideTipo && despuesDeDesde && antesDeHasta
}

export function filtrarHistorial(registros: RegistroHistorialBase[], criterios: CriteriosHistorialEmpresa) {
  return registros.filter((registro) => coincideRegistro(registro, criterios.busqueda) && admiteRegistro(registro, criterios))
}
