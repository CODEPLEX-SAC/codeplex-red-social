import { FiltroDesplegable } from '../../compartido/interfaz/filtro_desplegable'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { PanelFiltroUbicacion } from './panel_filtro_ubicacion'
import type { CiudadFiltroEvento, MarcadorMapaEvento } from '@/tipos/eventos/contrato_filtro_ubicacion'

export function BloqueEventosParaTi1({
  setFiltroUbicacionAbierto,
  filtroUbicacionAbierto,
  filtroUbicacion,
  setFiltroUbicacion,
  CIUDADES_FILTRO_PARA_TI,
  MARCADORES_MAPA_PARA_TI,
}: {
  setFiltroUbicacionAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
  filtroUbicacionAbierto: boolean
  filtroUbicacion: string | null
  setFiltroUbicacion: (valor: string | null | ((actual: string | null) => string | null)) => void
  CIUDADES_FILTRO_PARA_TI: CiudadFiltroEvento[]
  MARCADORES_MAPA_PARA_TI: MarcadorMapaEvento[]
}) {
  return (
    <FiltroDesplegable
      id={catalogoEventos.ids_filtros.ubicacion}
      abierto={filtroUbicacionAbierto}
      alCambiarAbierto={setFiltroUbicacionAbierto}
      activo={filtroUbicacionAbierto || filtroUbicacion !== null}
      icono="ubicacion"
      etiqueta={filtroUbicacion === null ? catalogoEventos.filtros.ubicacion : [catalogoEventos.filtros.ubicacion_prefijo, filtroUbicacion].join('')}
      quitar={filtroUbicacion === null ? undefined : { etiqueta: catalogoEventos.botones.quitar_filtro, alQuitar: () => setFiltroUbicacion(null) }}
    >
      <PanelFiltroUbicacion id={catalogoEventos.ids_filtros.ubicacion} ciudades={CIUDADES_FILTRO_PARA_TI} marcadores={MARCADORES_MAPA_PARA_TI} ciudadActual={filtroUbicacion} onAplicar={setFiltroUbicacion} onCerrar={() => setFiltroUbicacionAbierto(false)} />
    </FiltroDesplegable>
  )
}
