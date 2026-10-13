import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { CriteriosHistorialEmpresa } from '@/tipos/empresas/contrato_historial_empresa'
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

export function filtrarHistorial(registros: RegistroHistorialBase[], criterios: CriteriosHistorialEmpresa) {
  const termino = criterios.busqueda.trim().toLowerCase()
  const desde = criterios.desde ? criterios.desde.startOf('day').valueOf() : null
  const hasta = criterios.hasta ? criterios.hasta.endOf('day').valueOf() : null
  return registros.filter(
    (registro) =>
      [registro.accion, registro.usuario, registro.detalle].some((campo) => campo.toLowerCase().includes(termino)) &&
      (criterios.tipo === TODOS_LOS_TIPOS || ETIQUETAS_TIPO[registro.tipo] === criterios.tipo) &&
      (desde === null || fechaDelRegistro(registro) >= desde) &&
      (hasta === null || fechaDelRegistro(registro) <= hasta),
  )
}
