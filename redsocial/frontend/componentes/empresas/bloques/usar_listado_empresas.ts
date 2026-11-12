import { useMemo, useState } from 'react'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { crearFuenteLocal } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '../../compartido/interfaz/usar_busqueda'
import { admiteEmpresa, coincideEmpresa, contarFiltrosAvanzados, crearFiltrosAvanzados, hayCriteriosActivos, ordenarEmpresas, siguienteOrden, TAMANO_PAGINA, TODAS } from './logica_listado_empresas'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { CambioSelectorEmpresas, DireccionOrdenEmpresas, FiltrosAvanzadosEmpresas, FiltrosBusquedaEmpresas, ListadoEmpresas } from '@/tipos/empresas/contrato_listado_empresas'

const PLANTILLA_RESUMEN = catalogoEmpresas.paginacion.resumen
const SIN_SUSCRIPCIONES: SuscripcionContratada[] = []

export function usarListadoEmpresas(empresas: Empresa[], suscripciones: SuscripcionContratada[] = SIN_SUSCRIPCIONES, fuente?: FuenteBusqueda<Empresa, FiltrosBusquedaEmpresas>): ListadoEmpresas {
  const [estado, setEstado] = useState(TODAS)
  const [avanzados, setAvanzados] = useState(crearFiltrosAvanzados)
  const [orden, setOrden] = useState<DireccionOrdenEmpresas>(null)
  const [pagina, setPagina] = useState(1)

  const filtrosBusqueda = useMemo<FiltrosBusquedaEmpresas>(() => ({ estado, ...avanzados }), [estado, avanzados])
  const fuenteLocal = useMemo(() => {
    return crearFuenteLocal<Empresa, FiltrosBusquedaEmpresas>(empresas, coincideEmpresa, (empresa, filtros) => admiteEmpresa(empresa, filtros, suscripciones))
  }, [empresas, suscripciones])
  const busquedaEnCurso = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros: filtrosBusqueda })
  const busqueda = busquedaEnCurso.texto
  const elementosBusqueda = busquedaEnCurso.resultado.elementos
  const criterios = { busqueda, estado, ...avanzados }
  const filtradas = useMemo(() => ordenarEmpresas([...elementosBusqueda], orden), [elementosBusqueda, orden])

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / TAMANO_PAGINA))
  const paginaActual = Math.min(pagina, totalPaginas)
  const inicio = (paginaActual - 1) * TAMANO_PAGINA
  const filas = useMemo(() => filtradas.slice(inicio, inicio + TAMANO_PAGINA), [filtradas, inicio])
  const valoresResumen: Record<string, number> = { desde: filas.length === 0 ? 0 : inicio + 1, hasta: inicio + filas.length, total: filtradas.length }
  const resumen = PLANTILLA_RESUMEN.replace(/\{(\w+)\}/g, (_, clave: string) => String(valoresResumen[clave]))

  function cambiarFiltro(asignar: (valor: string) => void) {
    return (evento: CambioSelectorEmpresas) => {
      asignar(String(evento.target.value))
      setPagina(1)
    }
  }

  function cambiarBusqueda(evento: CambioSelectorEmpresas) {
    busquedaEnCurso.cambiarTexto(String(evento.target.value))
    setPagina(1)
  }

  function cambiarAvanzado(campo: 'plan' | 'modulo') {
    return (evento: CambioSelectorEmpresas) => {
      setAvanzados((actuales) => ({ ...actuales, [campo]: String(evento.target.value) }))
      setPagina(1)
    }
  }

  function aplicarAvanzados(filtros: FiltrosAvanzadosEmpresas) {
    setAvanzados(filtros)
    setPagina(1)
  }

  function limpiarAvanzados() {
    aplicarAvanzados({ ...crearFiltrosAvanzados(), plan: avanzados.plan, modulo: avanzados.modulo })
  }

  function limpiarTodo() {
    busquedaEnCurso.limpiar()
    setEstado(TODAS)
    aplicarAvanzados(crearFiltrosAvanzados())
  }

  function alternarOrden() {
    setOrden(siguienteOrden)
    setPagina(1)
  }

  return {
    busqueda,
    estado,
    rubro: avanzados.rubro,
    plan: avanzados.plan,
    modulo: avanzados.modulo,
    desde: avanzados.desde,
    hasta: avanzados.hasta,
    filtrosAvanzadosActivos: contarFiltrosAvanzados(avanzados),
    hayFiltros: hayCriteriosActivos(criterios),
    orden,
    pagina: paginaActual,
    totalPaginas,
    filas,
    resumen,
    estadoBusqueda: busquedaEnCurso.estado,
    errorBusqueda: busquedaEnCurso.error,
    cambiarBusqueda,
    cambiarEstado: cambiarFiltro(setEstado),
    cambiarPlan: cambiarAvanzado('plan'),
    cambiarModulo: cambiarAvanzado('modulo'),
    alternarOrden,
    limpiarTodo,
    aplicarAvanzados,
    limpiarAvanzados,
    irAPagina: setPagina,
  }
}
