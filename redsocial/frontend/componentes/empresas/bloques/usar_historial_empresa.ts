import { useMemo, useState } from 'react'
import type { Dayjs } from 'dayjs'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { filtrarHistorial, TODOS_LOS_TIPOS } from './logica_historial_empresa'
import type { ListadoHistorialEmpresa } from '@/tipos/empresas/contrato_historial_empresa'
import type { RegistroHistorialBase } from '@/tipos/empresas/modelo_historial_empresa'

const POR_PAGINA = catalogoEmpresas.historial_empresa.por_pagina

export function usarHistorialEmpresa(registros: RegistroHistorialBase[]): ListadoHistorialEmpresa {
  const [busqueda, setBusqueda] = useState('')
  const [desde, setDesde] = useState<Dayjs | null>(null)
  const [hasta, setHasta] = useState<Dayjs | null>(null)
  const [tipo, setTipo] = useState(TODOS_LOS_TIPOS)
  const [pagina, setPagina] = useState(1)

  const filtrados = useMemo(() => filtrarHistorial(registros, { busqueda, desde, hasta, tipo }), [registros, busqueda, desde, hasta, tipo])
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
    cambiarBusqueda: cambiarTexto(setBusqueda),
    cambiarDesde: cambiarFecha(setDesde),
    cambiarHasta: cambiarFecha(setHasta),
    cambiarTipo: cambiarTexto(setTipo),
    irAPagina: setPagina,
  }
}
