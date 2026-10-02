import { useMemo, useState } from 'react'
import { useLegacyTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table/legacy'
import type { ColumnFiltersState, SortingState } from '@tanstack/table-core'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import {
  COLUMNAS_TABLA_COLABORADORES,
  ESTADO_POR_ETIQUETA_PESTANA,
  ordenPorOpcion,
  TAMANO_PAGINA_COLABORADORES,
  filtroGlobalColaboradores,
  interpolarPlantilla,
} from './colaboradores_tabla_config'

const textos = catalogoColaboradores.selectores
const ORDENAR_POR_INICIAL = textos.ordenar_por.opciones[0]

export function usarTablaColaboradores(colaboradores: Colaborador[], filtrosEstado: readonly { etiqueta: string; activa?: boolean }[]) {
  const pestanaInicial = filtrosEstado.find((p) => p.activa)?.etiqueta ?? filtrosEstado[0].etiqueta
  const [pestanaActiva, setPestanaActiva] = useState(pestanaInicial)
  const [busqueda, setBusqueda] = useState('')
  const [rol, setRol] = useState(textos.rol_perfil.opciones[0])
  const [aplicacion, setAplicacion] = useState(textos.aplicaciones.opciones[0])
  const [ordenarPor, setOrdenarPor] = useState(ORDENAR_POR_INICIAL)
  const [sorting, setSorting] = useState<SortingState>(ordenPorOpcion(ORDENAR_POR_INICIAL))
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: TAMANO_PAGINA_COLABORADORES })
  const [rowSelection, setRowSelection] = useState({})

  const datosPestana = useMemo(() => {
    const valorEstado = ESTADO_POR_ETIQUETA_PESTANA[pestanaActiva]
    return valorEstado ? colaboradores.filter((c) => c.estado === valorEstado) : colaboradores
  }, [colaboradores, pestanaActiva])

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const filtros: ColumnFiltersState = []
    if (rol !== textos.rol_perfil.opciones[0]) filtros.push({ id: 'rol', value: rol })
    if (aplicacion !== textos.aplicaciones.opciones[0]) filtros.push({ id: 'aplicaciones', value: aplicacion })
    return filtros
  }, [rol, aplicacion])

  const tabla = useLegacyTable({
    data: datosPestana,
    columns: COLUMNAS_TABLA_COLABORADORES,
    getRowId: (c) => c.nombre,
    state: { globalFilter: busqueda, columnFilters, sorting, pagination, rowSelection },
    globalFilterFn: filtroGlobalColaboradores,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  function cambiarPestana(clave: string) {
    setPestanaActiva(clave)
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function cambiarBusqueda(evento: { target: { value: unknown } }) {
    setBusqueda(String(evento.target.value))
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function cambiarRol(evento: { target: { value: unknown } }) {
    setRol(String(evento.target.value))
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function cambiarAplicacion(evento: { target: { value: unknown } }) {
    setAplicacion(String(evento.target.value))
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function cambiarOrdenarPor(evento: { target: { value: unknown } }) {
    const valor = String(evento.target.value)
    setOrdenarPor(valor)
    setSorting(ordenPorOpcion(valor))
  }

  const elementosPestana = filtrosEstado.map((p) => {
    const valorEstado = ESTADO_POR_ETIQUETA_PESTANA[p.etiqueta]
    const cantidad = valorEstado ? colaboradores.filter((c) => c.estado === valorEstado).length : colaboradores.length
    return { clave: p.etiqueta, etiqueta: p.etiqueta, insignia: cantidad }
  })

  const filas = tabla.getRowModel().rows
  const totalFilas = tabla.getFilteredRowModel().rows.length
  const desde = totalFilas === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const hasta = Math.min(desde + filas.length - 1, totalFilas)
  const resumen = interpolarPlantilla(catalogoColaboradores.paginacion.resumen, { desde, hasta, total: totalFilas })

  return {
    pestanaActiva,
    cambiarPestana,
    elementosPestana,
    busqueda,
    cambiarBusqueda,
    rol,
    cambiarRol,
    aplicacion,
    cambiarAplicacion,
    ordenarPor,
    cambiarOrdenarPor,
    tabla,
    filas,
    resumen,
  }
}
