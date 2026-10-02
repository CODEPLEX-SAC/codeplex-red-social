import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { etiquetaFiltroFecha } from '../formato_fecha_filtro'
import { PanelFiltroFecha } from './panel_filtro_fecha'
import { PanelFiltroCategoria } from './panel_filtro_categoria'
import { BloqueEventosParaTi1 } from './bloque_eventos_para_ti1'
import type { FiltroFecha } from '@/tipos/eventos/contrato_filtro_fecha'
import type { CiudadFiltroEvento, MarcadorMapaEvento } from '@/tipos/eventos/contrato_filtro_ubicacion'

export function BloqueCategoria({ datos }: {
  datos: {
    setFiltroFechaAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
    filtroFechaAbierto: boolean
    filtroFecha: FiltroFecha | null
    setFiltroFecha: (valor: FiltroFecha | ((actual: FiltroFecha | null) => FiltroFecha | null) | null) => void
    setFiltroCategoriaAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
    filtroCategoriaAbierto: boolean
    CATEGORIAS_FILTRO_PARA_TI: { icono: string; color: string; nombre: string; conteo: string; }[]
    setFiltroUbicacionAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
    filtroUbicacionAbierto: boolean
    filtroUbicacion: string | null
    setFiltroUbicacion: (valor: string | ((actual: string | null) => string | null) | null) => void
    CIUDADES_FILTRO_PARA_TI: CiudadFiltroEvento[]
    MARCADORES_MAPA_PARA_TI: MarcadorMapaEvento[]
  }
}) {
  const {
    setFiltroFechaAbierto,
    filtroFechaAbierto,
    filtroFecha,
    setFiltroFecha,
    setFiltroCategoriaAbierto,
    filtroCategoriaAbierto,
    CATEGORIAS_FILTRO_PARA_TI,
    setFiltroUbicacionAbierto,
    filtroUbicacionAbierto,
    filtroUbicacion,
    setFiltroUbicacion,
    CIUDADES_FILTRO_PARA_TI,
    MARCADORES_MAPA_PARA_TI,
  } = datos

  function alternarFiltroFecha(evento: { stopPropagation: () => void }) {
    evento.stopPropagation()
    setFiltroFechaAbierto((abierto) => !abierto)
  }

  function alternarFiltroCategoria(evento: { stopPropagation: () => void }) {
    evento.stopPropagation()
    setFiltroCategoriaAbierto((abierto) => !abierto)
  }

  function cerrarFiltroFecha() {
    setFiltroFechaAbierto(false)
  }

  function cerrarFiltroCategoria() {
    setFiltroCategoriaAbierto(false)
  }

  function limpiarFiltros() {
    setFiltroFecha(null)
    setFiltroUbicacion(null)
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 max-600:flex-nowrap max-600:overflow-x-auto max-600:scrollbar-oculto">
      <div className="relative flex-none">
        <Boton type="button" onClick={alternarFiltroFecha} variant="filtro" size="filtro" activo={filtroFechaAbierto || filtroFecha !== null}>
          <Icono name="calendario" className="h-3.5 w-3.5" /> {filtroFecha === null ? catalogoEventos.filtros.fecha : etiquetaFiltroFecha(filtroFecha)}
          <Icono name={filtroFechaAbierto ? 'flecha-arriba' : 'flecha-abajo'} className="h-3.5 w-3.5" />
        </Boton>
        {filtroFechaAbierto && (
          <>
            <div className="fixed inset-0 z-19 max-600:bg-black/45" onClick={cerrarFiltroFecha} />
            <PanelFiltroFecha onCerrar={cerrarFiltroFecha} onAplicar={setFiltroFecha} />
          </>
        )}
      </div>
      <div className="relative flex-none">
        <Boton type="button" onClick={alternarFiltroCategoria} variant="filtro" size="filtro" activo={filtroCategoriaAbierto}>
          <Icono name="categoria-evento" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.categoria}
          <Icono name={filtroCategoriaAbierto ? 'flecha-arriba' : 'flecha-abajo'} className="h-3.5 w-3.5" />
        </Boton>
        {filtroCategoriaAbierto && (
          <>
            <div className="fixed inset-0 z-19 max-600:bg-black/45" onClick={cerrarFiltroCategoria} />
            <PanelFiltroCategoria categorias={CATEGORIAS_FILTRO_PARA_TI} onCerrar={cerrarFiltroCategoria} />
          </>
        )}
      </div>
      <BloqueEventosParaTi1
        setFiltroUbicacionAbierto={setFiltroUbicacionAbierto}
        filtroUbicacionAbierto={filtroUbicacionAbierto}
        filtroUbicacion={filtroUbicacion}
        setFiltroUbicacion={setFiltroUbicacion}
        CIUDADES_FILTRO_PARA_TI={CIUDADES_FILTRO_PARA_TI}
        MARCADORES_MAPA_PARA_TI={MARCADORES_MAPA_PARA_TI}
      />
      {(filtroFecha !== null || filtroUbicacion !== null) && (
        <Boton type="button" onClick={limpiarFiltros} variant="secundario" size="mini" className="ml-auto flex-none">
          {catalogoEventos.botones.limpiar_filtros}
        </Boton>
      )}
    </div>
  )
}
