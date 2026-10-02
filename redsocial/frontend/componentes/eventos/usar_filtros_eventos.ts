import { useState } from 'react'
import type { FiltroFecha } from '@/tipos/eventos/contrato_filtro_fecha'

export function usarFiltrosEventos() {
  const [filtroFechaAbierto, setFiltroFechaAbierto] = useState(false)
  const [filtroFecha, setFiltroFecha] = useState<FiltroFecha | null>(null)
  const [filtroCategoriaAbierto, setFiltroCategoriaAbierto] = useState(false)
  const [filtroUbicacionAbierto, setFiltroUbicacionAbierto] = useState(false)
  const [filtroUbicacion, setFiltroUbicacion] = useState<string | null>(null)

  return {
    filtroFechaAbierto,
    setFiltroFechaAbierto,
    filtroFecha,
    setFiltroFecha,
    filtroCategoriaAbierto,
    setFiltroCategoriaAbierto,
    filtroUbicacionAbierto,
    setFiltroUbicacionAbierto,
    filtroUbicacion,
    setFiltroUbicacion,
  }
}
