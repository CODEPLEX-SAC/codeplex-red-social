import { useMemo, useState } from 'react'
import { usarBusqueda } from '../../compartido'
import { filtrarEventosPorCategoria } from '../filtrar_eventos_por_categoria'
import type { EstadoBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { EntradaEventosParaTi, FiltrosBusquedaEventos } from '@/tipos/eventos/contrato_buscar_eventos'

export function usarEventosParaTi({ configuracionBusqueda, proximos, categoriasSeleccionadas }: EntradaEventosParaTi) {
  const [indiceDestacado, setIndiceDestacado] = useState(0)
  const [ubicacion, setUbicacion] = useState(String())
  const filtrosBusqueda = useMemo<FiltrosBusquedaEventos>(() => ({ ubicacion }), [ubicacion])
  const busquedaEvento = usarBusqueda(configuracionBusqueda.fuente, { modo: configuracionBusqueda.modo, filtros: filtrosBusqueda })
  const hayUbicacion = ubicacion.trim() !== String()
  const estadoParaTi: EstadoBusqueda = hayUbicacion && busquedaEvento.estado === 'inicial' ? (busquedaEvento.resultado.elementos.length > 0 ? 'con_resultados' : 'sin_coincidencias') : busquedaEvento.estado
  const destacadosVisibles = filtrarEventosPorCategoria([...busquedaEvento.resultado.elementos], categoriasSeleccionadas)
  const proximosVisibles = filtrarEventosPorCategoria(proximos, categoriasSeleccionadas)
  const indiceVisible = Math.min(indiceDestacado, destacadosVisibles.length - 1)
  const destacado = destacadosVisibles[indiceVisible]

  function alCambiarDestacado(direccion: -1 | 1) {
    setIndiceDestacado((actual) => (Math.min(actual, destacadosVisibles.length - 1) + direccion + destacadosVisibles.length) % destacadosVisibles.length)
  }

  return { ubicacion, setUbicacion, busquedaEvento, estadoParaTi, destacadosVisibles, proximosVisibles, indiceVisible, destacado, setIndiceDestacado, alCambiarDestacado }
}
