import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import type { CriteriosEmpresas, FiltrosAvanzadosEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { OpcionMenuEmpresa } from '@/tipos/empresas/contrato_listado_empresas'

export const CLASE_FILA_EMPRESA = CLASES_TABLA.fila
export const TODOS = catalogoEmpresas.selectores.estado.opciones[0]
const ETIQUETAS_ESTADO: Record<string, string> = catalogoEmpresas.estados
const ETIQUETAS_PLAN: Record<string, string> = catalogoEmpresas.planes

function coincideBusqueda(empresa: Empresa, termino: string) {
  return [empresa.nombre, empresa.ruc, empresa.codigo, empresa.correo].some((campo) => campo.toLowerCase().includes(termino))
}

function fechaDeEmpresa(empresa: Empresa) {
  const [dia, mes, anio] = empresa.fechaRegistro.split('/')
  return new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime()
}

export function crearFiltrosAvanzados(): FiltrosAvanzadosEmpresas {
  return { rubro: TODOS, plan: TODOS, desde: null, hasta: null }
}

export function contarFiltrosAvanzados(filtros: FiltrosAvanzadosEmpresas) {
  return [filtros.rubro !== TODOS, filtros.plan !== TODOS, filtros.desde !== null, filtros.hasta !== null].filter(Boolean).length
}

export function filtrarEmpresas(empresas: Empresa[], criterios: CriteriosEmpresas) {
  const termino = criterios.busqueda.trim().toLowerCase()
  const desde = criterios.desde ? criterios.desde.startOf('day').valueOf() : null
  const hasta = criterios.hasta ? criterios.hasta.endOf('day').valueOf() : null
  return empresas.filter(
    (empresa) =>
      coincideBusqueda(empresa, termino) &&
      (criterios.estado === TODOS || ETIQUETAS_ESTADO[empresa.estado] === criterios.estado) &&
      (criterios.rubro === TODOS || empresa.rubro === criterios.rubro) &&
      (criterios.plan === TODOS || ETIQUETAS_PLAN[empresa.plan] === criterios.plan) &&
      (desde === null || fechaDeEmpresa(empresa) >= desde) &&
      (hasta === null || fechaDeEmpresa(empresa) <= hasta),
  )
}

export function marcarCodigos(actuales: string[], codigos: string[], marcado: boolean) {
  const restantes = actuales.filter((codigo) => !codigos.includes(codigo))
  return marcado ? [...restantes, ...codigos] : restantes
}

export function contarSeleccionadas(filas: Empresa[], seleccionadas: string[]) {
  return filas.filter((fila) => seleccionadas.includes(fila.codigo)).length
}

export function opcionesDeFila(empresa: Empresa) {
  const opciones = catalogoEmpresas.menu_fila as OpcionMenuEmpresa[]
  const accionDesactivar = catalogoEmpresas.modal_desactivar.accion_menu
  return empresa.estado === 'inactiva' ? opciones.filter((opcion) => opcion.clave !== accionDesactivar) : opciones
}

export function aplicarEdiciones(empresas: Empresa[], ediciones: Record<string, Empresa>): Empresa[] {
  return empresas.map((empresa) => ediciones[empresa.codigo] ?? empresa)
}
