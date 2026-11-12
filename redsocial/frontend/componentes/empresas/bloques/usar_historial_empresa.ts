import { useMemo, useState } from 'react'
import type { Dayjs } from 'dayjs'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { crearFuenteLocal } from '../../compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '../../compartido/interfaz/usar_busqueda'
import { admiteRegistro, coincideRegistro, TODOS_LOS_TIPOS } from './logica_historial_empresa'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { FiltrosBusquedaHistorialEmpresa, ListadoHistorialEmpresa } from '@/tipos/empresas/contrato_historial_empresa'
import type { RegistroHistorialBase } from '@/tipos/empresas/modelo_historial_empresa'

const POR_PAGINA = catalogoEmpresas.historial_empresa.por_pagina

export function usarHistorialEmpresa(registros: RegistroHistorialBase[], fuente?: FuenteBusqueda<RegistroHistorialBase, FiltrosBusquedaHistorialEmpresa>): ListadoHistorialEmpresa {
  const [desde, setDesde] = useState<Dayjs | null>(null)
  const [hasta, setHasta] = useState<Dayjs | null>(null)
  const [tipo, setTipo] = useState(TODOS_LOS_TIPOS)
  const [pagina, setPagina] = useState(1)

  const filtrosBusqueda = useMemo<FiltrosBusquedaHistorialEmpresa>(() => ({ desde, hasta, tipo }), [desde, hasta, tipo])
  const fuenteLocal = useMemo(() => {
    return crearFuenteLocal<RegistroHistorialBase, FiltrosBusquedaHistorialEmpresa>(registros, coincideRegistro, admiteRegistro)
  }, [registros])
  const busquedaEnCurso = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros: filtrosBusqueda })
  const busqueda = busquedaEnCurso.texto
  const filtrados = busquedaEnCurso.resultado.elementos
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const paginaActual = Math.min(pagina, totalPaginas)
  const filas = useMemo(() => filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA), [filtrados, paginaActual])

  function cambiarTexto(asignar: (valor: string) => void) {
    return (evento: { target: { value: unknown } }) => {
      asignar(String(evento.target.value))
      setPagina(1)
    }
  }

  function cambiarFecha(asignar: (valor: Dayjs | null) => void) {
    return (valor: Dayjs | null) => {
      asignar(valor)
      setPagina(1)
    }
  }

  return {
    busqueda,
    desde,
    hasta,
    tipo,
    pagina: paginaActual,
    totalPaginas,
    filas,
    total: filtrados.length,
    hayRegistros: registros.length > 0,
    estadoBusqueda: busquedaEnCurso.estado,
    errorBusqueda: busquedaEnCurso.error,
    cambiarBusqueda: (evento) => {
      busquedaEnCurso.cambiarTexto(String(evento.target.value))
      setPagina(1)
    },
    cambiarDesde: cambiarFecha(setDesde),
    cambiarHasta: cambiarFecha(setHasta),
    cambiarTipo: cambiarTexto(setTipo),
    irAPagina: setPagina,
  }
}
