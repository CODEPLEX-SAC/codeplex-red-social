import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
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
    <div className="relative flex-none">
      <Boton type="button" onClick={(evento) => {
          evento.stopPropagation()
          setFiltroUbicacionAbierto((abierto) => !abierto)
        }} variant="filtro" size="filtro" activo={filtroUbicacionAbierto || filtroUbicacion !== null}>
        <Icono name="ubicacion" className="h-3.5 w-3.5" /> {filtroUbicacion === null ? catalogoEventos.filtros.ubicacion : [catalogoEventos.filtros.ubicacion_prefijo, filtroUbicacion].join('')}
        {filtroUbicacion === null ? (
          <Icono name={filtroUbicacionAbierto ? 'flecha-arriba' : 'flecha-abajo'} className="h-3.5 w-3.5" />
        ) : (
          <span
            role="button"
            tabIndex={0}
            aria-label={catalogoEventos.botones.quitar_filtro}
            onClick={(evento) => {
              evento.stopPropagation()
              setFiltroUbicacion(null)
            }}
            className="grid place-items-center"
          >
            <Icono name="cerrar" className="h-3.5 w-3.5" />
          </span>
        )}
      </Boton>
      {filtroUbicacionAbierto && (
        <>
          <div className="fixed inset-0 z-19 max-600:bg-black/45" onClick={() => setFiltroUbicacionAbierto(false)} />
          <PanelFiltroUbicacion ciudades={CIUDADES_FILTRO_PARA_TI} marcadores={MARCADORES_MAPA_PARA_TI} ciudadActual={filtroUbicacion} onAplicar={setFiltroUbicacion} onCerrar={() => setFiltroUbicacionAbierto(false)} />
        </>
      )}
    </div>
  )
}
