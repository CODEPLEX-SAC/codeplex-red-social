import { useMemo, useState } from 'react'
import { useLegacyTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table/legacy'
import type { ColumnFiltersState, SortingState } from '@tanstack/table-core'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { crearCriteriosExportacion } from './criterios_exportacion_colaboradores'
import { aplicarFiltrosAvanzadosColaboradores, contarFiltrosAvanzadosColaboradores, crearFiltrosAvanzadosColaboradores } from './logica_filtros_avanzados_colaboradores'
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
  const [filtrosAvanzados, setFiltrosAvanzados] = useState(crearFiltrosAvanzadosColaboradores)

  const datosVista = useMemo(() => {
    const valorEstado = ESTADO_POR_ETIQUETA_PESTANA[pestanaActiva]
    return valorEstado ? colaboradores.filter((c) => c.estado === valorEstado) : colaboradores
  }, [colaboradores, pestanaActiva])

  const datosPestana = useMemo(() => aplicarFiltrosAvanzadosColaboradores(datosVista, filtrosAvanzados), [datosVista, filtrosAvanzados])

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const filtros: ColumnFiltersState = []
    if (rol !== textos.rol_perfil.opciones[0]) filtros.push({ id: 'rol', value: rol })
    if (aplicacion !== textos.aplicaciones.opciones[0]) filtros.push({ id: 'aplicaciones', value: aplicacion })
    return filtros
  }, [rol, aplicacion])

  const tabla = useLegacyTable({
    data: datosPestana,
    columns: COLUMNAS_TABLA_COLABORADORES,
    getRowId: (c) => c.correo,
    state: { globalFilter: busqueda, columnFilters, sorting, pagination },
    globalFilterFn: filtroGlobalColaboradores,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const tablaVista = useLegacyTable({
    data: datosVista,
    columns: COLUMNAS_TABLA_COLABORADORES,
    getRowId: (c) => c.correo,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  function cambiarPestana(clave: string) {
    setPestanaActiva(clave)
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function aplicarFiltrosAvanzados(valores: FiltrosAvanzadosColaboradores) {
    setFiltrosAvanzados(valores)
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
  const hayCriteriosActivos = [
    Boolean(busqueda.trim()),
    rol !== textos.rol_perfil.opciones[0],
    aplicacion !== textos.aplicaciones.opciones[0],
    contarFiltrosAvanzadosColaboradores(filtrosAvanzados) > 0,
  ].some(Boolean)
  const colaboradoresFiltrados = tabla.getSortedRowModel().rows.map((fila) => fila.original)
  const colaboradoresVista = tablaVista.getSortedRowModel().rows.map((fila) => fila.original)
  const criteriosExportacion = crearCriteriosExportacion(pestanaActiva, busqueda, rol, aplicacion, ordenarPor, filtrosAvanzados)
  const totalFilas = tabla.getFilteredRowModel().rows.length
  const desde = totalFilas === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
  const hasta = totalFilas === 0 ? 0 : Math.min(desde + filas.length - 1, totalFilas)
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
    colaboradoresFiltrados,
    colaboradoresVista,
    criteriosExportacion,
    hayCriteriosActivos,
    filtrosAvanzados,
    aplicarFiltrosAvanzados,
    resumen,
  }
}
