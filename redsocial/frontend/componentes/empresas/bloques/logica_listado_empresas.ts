import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import { estadoModuloEmpresa, modulosActivos } from './logica_suscripciones_empresas'
import { MODULOS_EMPRESA } from './modulos_empresa'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { CriteriosEmpresas, DireccionOrdenEmpresas, FiltrosAvanzadosEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'

export const CLASE_FILA_EMPRESA = CLASES_TABLA.fila
export const TODOS = catalogoEmpresas.selectores.rubro.opciones[0]
export const TODAS = catalogoEmpresas.selectores.estado.opciones[0]
export { MODULOS_EMPRESA }
export const OPCIONES_MODULO = [TODOS, ...MODULOS_EMPRESA.map((modulo) => modulo.etiqueta)]
export const TAMANO_PAGINA = catalogoEmpresas.paginacion.tamano
const ETIQUETAS_ESTADO: Record<string, string> = catalogoEmpresas.estados
const SIN_SUSCRIPCIONES: SuscripcionContratada[] = []

function coincideBusqueda(empresa: Empresa, termino: string) {
  return [empresa.nombre, empresa.ruc, empresa.codigo, empresa.correo].some((campo) => campo.toLowerCase().includes(termino))
}

function fechaDeEmpresa(empresa: Empresa) {
  const [dia, mes, anio] = empresa.fechaRegistro.split('/')
  return new Date(Number(anio), Number(mes) - 1, Number(dia)).getTime()
}

export function crearFiltrosAvanzados(): FiltrosAvanzadosEmpresas {
  return { rubro: TODOS, plan: TODOS, modulo: TODOS, desde: null, hasta: null }
}

export function contarFiltrosAvanzados(filtros: FiltrosAvanzadosEmpresas) {
  return [filtros.rubro !== TODOS, filtros.desde !== null, filtros.hasta !== null].filter(Boolean).length
}

function tieneModulo(empresa: Empresa, etiqueta: string, suscripciones: SuscripcionContratada[]) {
  return MODULOS_EMPRESA.some((modulo) => modulo.etiqueta === etiqueta && estadoModuloEmpresa(empresa, modulo, suscripciones).activo)
}

function tienePlan(empresa: Empresa, plan: string, suscripciones: SuscripcionContratada[]) {
  return modulosActivos(empresa, suscripciones).some((modulo) => estadoModuloEmpresa(empresa, modulo, suscripciones).planNombre === plan)
}

export function hayCriteriosActivos(criterios: CriteriosEmpresas) {
  return criterios.busqueda.trim() !== '' || criterios.estado !== TODAS || criterios.rubro !== TODOS || criterios.plan !== TODOS || criterios.modulo !== TODOS || criterios.desde !== null || criterios.hasta !== null
}

export function ordenarEmpresas(empresas: Empresa[], direccion: DireccionOrdenEmpresas) {
  if (direccion === null) return empresas
  const signo = direccion === catalogoEmpresas.orden.ascendente ? 1 : -1
  return [...empresas].sort((a, b) => signo * a.nombre.localeCompare(b.nombre, catalogoEmpresas.orden.idioma))
}

export function siguienteOrden(direccion: DireccionOrdenEmpresas): DireccionOrdenEmpresas {
  if (direccion === null) return catalogoEmpresas.orden.ascendente as DireccionOrdenEmpresas
  return direccion === catalogoEmpresas.orden.ascendente ? (catalogoEmpresas.orden.descendente as DireccionOrdenEmpresas) : null
}

export function filtrarEmpresas(empresas: Empresa[], criterios: CriteriosEmpresas, suscripciones: SuscripcionContratada[] = SIN_SUSCRIPCIONES) {
  const termino = criterios.busqueda.trim().toLowerCase()
  const desde = criterios.desde ? criterios.desde.startOf('day').valueOf() : null
  const hasta = criterios.hasta ? criterios.hasta.endOf('day').valueOf() : null
  return empresas.filter(
    (empresa) =>
      coincideBusqueda(empresa, termino) &&
      (criterios.estado === TODAS || ETIQUETAS_ESTADO[empresa.estado] === criterios.estado) &&
      (criterios.rubro === TODOS || empresa.rubro === criterios.rubro) &&
      (criterios.plan === TODOS || tienePlan(empresa, criterios.plan, suscripciones)) &&
      (criterios.modulo === TODOS || tieneModulo(empresa, criterios.modulo, suscripciones)) &&
      (desde === null || fechaDeEmpresa(empresa) >= desde) &&
      (hasta === null || fechaDeEmpresa(empresa) <= hasta),
  )
}

export function estaInactiva(empresa: Empresa) {
  return empresa.estado === 'inactiva'
}

export function aplicarEdiciones(empresas: Empresa[], ediciones: Record<string, Empresa>): Empresa[] {
  return empresas.map((empresa) => ediciones[empresa.codigo] ?? empresa)
}
