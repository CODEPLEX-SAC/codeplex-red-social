import { useMemo, useState } from 'react'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { contarFiltrosAvanzados, contarSeleccionadas, crearFiltrosAvanzados, filtrarEmpresas, marcarCodigos, TODOS } from './logica_listado_empresas'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { CambioSelectorEmpresas, FiltrosAvanzadosEmpresas, ListadoEmpresas } from '@/tipos/empresas/contrato_listado_empresas'

const OPCIONES_PAGINADO = catalogoEmpresas.tamanos_pagina
const PLANTILLA_RESUMEN = catalogoEmpresas.paginacion.resumen

export function usarListadoEmpresas(empresas: Empresa[]): ListadoEmpresas {
  const [busqueda, setBusqueda] = useState('')
  const [estado, setEstado] = useState(TODOS)
  const [avanzados, setAvanzados] = useState(crearFiltrosAvanzados)
  const [tamanoPagina, setTamanoPagina] = useState(OPCIONES_PAGINADO[0].valor)
  const [pagina, setPagina] = useState(1)
  const [seleccionadas, setSeleccionadas] = useState<string[]>([])

  const filtradas = useMemo(() => filtrarEmpresas(empresas, { busqueda, estado, ...avanzados }), [empresas, busqueda, estado, avanzados])

  const tamano = Number(tamanoPagina)
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / tamano))
  const paginaActual = Math.min(pagina, totalPaginas)
  const inicio = (paginaActual - 1) * tamano
  const filas = useMemo(() => filtradas.slice(inicio, inicio + tamano), [filtradas, inicio, tamano])
  const seleccionEnPagina = contarSeleccionadas(filas, seleccionadas)
  const valoresResumen: Record<string, number> = { desde: filas.length === 0 ? 0 : inicio + 1, hasta: inicio + filas.length, total: filtradas.length }
  const resumen = PLANTILLA_RESUMEN.replace(/\{(\w+)\}/g, (_, clave: string) => String(valoresResumen[clave]))

  function cambiarFiltro(asignar: (valor: string) => void) {
    return (evento: CambioSelectorEmpresas) => {
      asignar(String(evento.target.value))
      setPagina(1)
    }
  }

  function aplicarAvanzados(filtros: FiltrosAvanzadosEmpresas) {
    setAvanzados(filtros)
    setPagina(1)
  }

  function limpiarAvanzados() {
    aplicarAvanzados(crearFiltrosAvanzados())
  }

  function alternarFila(codigo: string, marcado: boolean) {
    setSeleccionadas((actuales) => marcarCodigos(actuales, [codigo], marcado))
  }

  function alternarTodas(marcado: boolean) {
    setSeleccionadas((actuales) => marcarCodigos(actuales, filas.map((fila) => fila.codigo), marcado))
  }

  return {
    busqueda,
    estado,
    rubro: avanzados.rubro,
    plan: avanzados.plan,
    desde: avanzados.desde,
    hasta: avanzados.hasta,
    filtrosAvanzadosActivos: contarFiltrosAvanzados(avanzados),
    tamanoPagina,
    pagina: paginaActual,
    totalPaginas,
    filas,
    resumen,
    seleccionadas,
    todasSeleccionadas: filas.length > 0 && seleccionEnPagina === filas.length,
    algunasSeleccionadas: seleccionEnPagina !== 0 && seleccionEnPagina !== filas.length,
    cambiarBusqueda: cambiarFiltro(setBusqueda),
    cambiarEstado: cambiarFiltro(setEstado),
    aplicarAvanzados,
    limpiarAvanzados,
    cambiarTamanoPagina: cambiarFiltro(setTamanoPagina),
    irAPagina: setPagina,
    alternarFila,
    alternarTodas,
  }
}
