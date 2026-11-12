import type { LegacyColumnDef } from '@tanstack/react-table/legacy'
import type { SortingState } from '@tanstack/table-core'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador, Vigencia } from '@/tipos/colaboradores/modelo_colaboradores'
import type { FiltrosBusquedaColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { aplicarFiltrosAvanzadosColaboradores } from './logica_filtros_avanzados_colaboradores'
import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import { fechaDeTexto, inicioDeVigencia } from './logica_colaboradores'

export const TAMANO_PAGINA_COLABORADORES = catalogoColaboradores.paginacion.tamano

export const ESTADO_POR_ETIQUETA_PESTANA: Record<string, Colaborador['estado'] | null> = {
  Todos: null,
  Activos: 'activo',
  Invitados: 'invitado',
  Inactivos: 'inactivo',
  Baja: 'baja',
}

function fechaOrdenable(vigencia: Vigencia): number {
  return fechaDeTexto(inicioDeVigencia(vigencia))
}

export const COLUMNAS_TABLA_COLABORADORES: LegacyColumnDef<Colaborador>[] = [
  { id: 'nombre', accessorFn: (c: Colaborador) => c.nombre },
  { id: 'rol', accessorFn: (c: Colaborador) => c.rol, filterFn: (fila, id, valor) => fila.getValue(id) === valor },
  {
    id: 'aplicaciones',
    accessorFn: (c: Colaborador) => c.aplicaciones.map((app) => app.nombre),
    filterFn: (fila, id, valor) => (fila.getValue(id) as string[]).includes(valor),
  },
  { id: 'vigencia', accessorFn: (c: Colaborador) => fechaOrdenable(c.vigencia) },
]

export function rangoMostrado(total: number, indicePagina: number, tamanoPagina: number, filasEnPagina: number) {
  if (total === 0) return { desde: 0, hasta: 0 }
  const desde = indicePagina * tamanoPagina + 1
  return { desde, hasta: Math.min(desde + filasEnPagina - 1, total) }
}

export function interpolarPlantilla(plantilla: string, valores: Record<string, string | number>): string {
  return plantilla.replace(/\{(\w+)\}/g, (coincidencia, clave) => String(valores[clave] ?? coincidencia))
}

export function coincideColaborador(colaborador: Colaborador, consulta: string): boolean {
  return [colaborador.nombre, colaborador.correo].some((campo) => contieneTexto(campo, consulta))
}

const OPCION_TODOS_ROLES = catalogoColaboradores.selectores.rol_perfil.opciones[0]
const OPCION_TODAS_APLICACIONES = catalogoColaboradores.selectores.aplicaciones.opciones[0]

export function admiteColaborador(colaborador: Colaborador, filtros: FiltrosBusquedaColaboradores): boolean {
  if (filtros.estado !== null && colaborador.estado !== filtros.estado) return false
  if (filtros.rol !== OPCION_TODOS_ROLES && colaborador.rol !== filtros.rol) return false
  if (filtros.aplicacion !== OPCION_TODAS_APLICACIONES && !colaborador.aplicaciones.some((aplicacion) => aplicacion.nombre === filtros.aplicacion)) return false
  return aplicarFiltrosAvanzadosColaboradores([colaborador], filtros.avanzados).length > 0
}

const OPCIONES_ORDENAR_POR = catalogoColaboradores.selectores.ordenar_por.opciones

const ORDEN_POR_POSICION: SortingState[] = [
  [{ id: 'vigencia', desc: true }],
  [{ id: 'vigencia', desc: false }],
  [{ id: 'nombre', desc: false }],
  [{ id: 'nombre', desc: true }],
]

export function ordenPorOpcion(etiqueta: string): SortingState {
  const indice = OPCIONES_ORDENAR_POR.indexOf(etiqueta)
  return ORDEN_POR_POSICION[indice] ?? []
}
