import dayjs from 'dayjs'
import type { LegacyColumnDef, LegacyRow } from '@tanstack/react-table/legacy'
import type { SortingState } from '@tanstack/table-core'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador, Vigencia } from '@/tipos/colaboradores/modelo_colaboradores'

const FORMATO_FECHA = catalogoColaboradores.panel_filtros_avanzados.formato_fecha

export const TAMANO_PAGINA_COLABORADORES = 3

export const ESTADO_POR_ETIQUETA_PESTANA: Record<string, Colaborador['estado'] | null> = {
  Todos: null,
  Activos: 'activo',
  Invitados: 'invitado',
  Inactivos: 'inactivo',
  Baja: 'baja',
}

function fechaOrdenable(vigencia: Vigencia): number {
  const texto = vigencia.tipo === 'rango' ? vigencia.desde : vigencia.fecha
  return dayjs(texto, FORMATO_FECHA).valueOf()
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

export function interpolarPlantilla(plantilla: string, valores: Record<string, string | number>): string {
  return plantilla.replace(/\{(\w+)\}/g, (coincidencia, clave) => String(valores[clave] ?? coincidencia))
}

export function filtroGlobalColaboradores(fila: LegacyRow<Colaborador>, _columnaId: string, valor: string): boolean {
  const termino = valor.trim().toLowerCase()
  if (!termino) return true
  const c = fila.original
  return [c.nombre, c.correo, c.telefono].some((campo) => campo.toLowerCase().includes(termino))
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
