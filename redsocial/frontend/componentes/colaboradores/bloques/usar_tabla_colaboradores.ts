import { useMemo, useState } from 'react'
import { useLegacyTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table/legacy'
import type { SortingState } from '@tanstack/table-core'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { CriteriosExportacion, FiltrosAvanzadosColaboradores, FiltrosBusquedaColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import { crearFuenteLocal } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '../../compartido/interfaz/usar_busqueda'
import { crearFiltrosActivos, quitarFiltroAvanzado } from './logica_filtros_activos_colaboradores'
import { contarFiltrosAvanzadosColaboradores, crearFiltrosAvanzadosColaboradores } from './logica_filtros_avanzados_colaboradores'
import {
  COLUMNAS_TABLA_COLABORADORES,
  ESTADO_POR_ETIQUETA_PESTANA,
  ordenPorOpcion,
  TAMANO_PAGINA_COLABORADORES,
  admiteColaborador,
  coincideColaborador,
  interpolarPlantilla,
  rangoMostrado,
} from './colaboradores_tabla_config'

const textos = catalogoColaboradores.selectores
const ORDENAR_POR_INICIAL = textos.ordenar_por.opciones[0]
const CLAVES_FILTRO = catalogoColaboradores.filtros_activos.claves

export function usarTablaColaboradores(colaboradores: Colaborador[], filtrosEstado: readonly { etiqueta: string; activa?: boolean }[], fuente?: FuenteBusqueda<Colaborador, FiltrosBusquedaColaboradores>) {
  const pestanaInicial = filtrosEstado.find((p) => p.activa)?.etiqueta ?? filtrosEstado[0].etiqueta
  const [pestanaActiva, setPestanaActiva] = useState(pestanaInicial)
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

  const filtrosBusqueda = useMemo<FiltrosBusquedaColaboradores>(() => ({ estado: ESTADO_POR_ETIQUETA_PESTANA[pestanaActiva] ?? null, rol, aplicacion, avanzados: filtrosAvanzados }), [pestanaActiva, rol, aplicacion, filtrosAvanzados])
  const fuenteLocal = useMemo(() => {
    return crearFuenteLocal<Colaborador, FiltrosBusquedaColaboradores>(colaboradores, coincideColaborador, admiteColaborador)
  }, [colaboradores])
  const busquedaEnCurso = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros: filtrosBusqueda })
  const busqueda = busquedaEnCurso.texto
  const elementosBusqueda = busquedaEnCurso.resultado.elementos
  const datosPestana = useMemo(() => [...elementosBusqueda], [elementosBusqueda])

  const tabla = useLegacyTable({
    data: datosPestana,
    columns: COLUMNAS_TABLA_COLABORADORES,
    getRowId: (c) => c.correo,
    state: { sorting, pagination },
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

  function aplicarBasicos(nuevoRol: string, nuevaAplicacion: string) {
    setRol(nuevoRol)
    setAplicacion(nuevaAplicacion)
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function quitarFiltro(clave: string) {
    if (clave === CLAVES_FILTRO.rol) setRol(textos.rol_perfil.opciones[0])
    else if (clave === CLAVES_FILTRO.aplicacion) setAplicacion(textos.aplicaciones.opciones[0])
    else setFiltrosAvanzados((actuales) => quitarFiltroAvanzado(actuales, clave))
    setPagination((actual) => ({ ...actual, pageIndex: 0 }))
  }

  function cambiarBusqueda(evento: { target: { value: unknown } }) {
    busquedaEnCurso.cambiarTexto(String(evento.target.value))
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

  const elementosPestana = filtrosEstado.map((p) => ({ clave: p.etiqueta, etiqueta: p.etiqueta }))

  const filas = tabla.getRowModel().rows
  const hayCriteriosActivos = [
    Boolean(busqueda.trim()),
    rol !== textos.rol_perfil.opciones[0],
    aplicacion !== textos.aplicaciones.opciones[0],
    contarFiltrosAvanzadosColaboradores(filtrosAvanzados) > 0,
  ].some(Boolean)
  const colaboradoresFiltrados = tabla.getSortedRowModel().rows.map((fila) => fila.original)
  const colaboradoresVista = tablaVista.getSortedRowModel().rows.map((fila) => fila.original)
  const criteriosExportacion: CriteriosExportacion = { pestana: pestanaActiva, busqueda, rol, aplicacion, ordenarPor, avanzados: filtrosAvanzados }
  const totalFilas = tabla.getFilteredRowModel().rows.length
  const { desde, hasta } = rangoMostrado(totalFilas, pagination.pageIndex, pagination.pageSize, filas.length)
  const resumen = interpolarPlantilla(catalogoColaboradores.paginacion.resumen, { desde, hasta, total: totalFilas })

  return {
    pestanaActiva,
    cambiarPestana,
    elementosPestana,
    busqueda,
    estadoBusqueda: busquedaEnCurso.estado,
    errorBusqueda: busquedaEnCurso.error,
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
    filtrosActivos: crearFiltrosActivos(rol, aplicacion, filtrosAvanzados),
    aplicarBasicos,
    quitarFiltro,
    resumen,
  }
}
