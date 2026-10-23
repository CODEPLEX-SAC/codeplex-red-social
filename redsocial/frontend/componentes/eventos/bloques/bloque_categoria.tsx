import { Boton } from '../../compartido/interfaz/boton'
import { FiltroDesplegable } from '../../compartido/interfaz/filtro_desplegable'
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
    categoriasSeleccionadas: string[]
    setCategoriasSeleccionadas: (valor: string[]) => void
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
    categoriasSeleccionadas,
    setCategoriasSeleccionadas,
    CATEGORIAS_FILTRO_PARA_TI,
    setFiltroUbicacionAbierto,
    filtroUbicacionAbierto,
    filtroUbicacion,
    setFiltroUbicacion,
    CIUDADES_FILTRO_PARA_TI,
    MARCADORES_MAPA_PARA_TI,
  } = datos

  function limpiarFiltros() {
    setFiltroFecha(null)
    setFiltroUbicacion(null)
    setCategoriasSeleccionadas([])
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 max-600:flex-nowrap max-600:overflow-x-auto max-600:scrollbar-oculto">
      <FiltroDesplegable
        id={catalogoEventos.ids_filtros.fecha}
        abierto={filtroFechaAbierto}
        alCambiarAbierto={setFiltroFechaAbierto}
        activo={filtroFechaAbierto || filtroFecha !== null}
        icono="calendario"
        etiqueta={filtroFecha === null ? catalogoEventos.filtros.fecha : etiquetaFiltroFecha(filtroFecha)}
      >
        <PanelFiltroFecha id={catalogoEventos.ids_filtros.fecha} onCerrar={() => setFiltroFechaAbierto(false)} onAplicar={setFiltroFecha} />
      </FiltroDesplegable>
      <FiltroDesplegable
        id={catalogoEventos.ids_filtros.categoria}
        abierto={filtroCategoriaAbierto}
        alCambiarAbierto={setFiltroCategoriaAbierto}
        activo={filtroCategoriaAbierto || categoriasSeleccionadas.length > 0}
        icono="precio"
        etiqueta={categoriasSeleccionadas.length === 0 ? catalogoEventos.filtros.categoria : [catalogoEventos.filtros.categoria, categoriasSeleccionadas.length].join(catalogoEventos.filtros.separador_conteo)}
      >
        <PanelFiltroCategoria id={catalogoEventos.ids_filtros.categoria} categorias={CATEGORIAS_FILTRO_PARA_TI} seleccionadas={categoriasSeleccionadas} alCambiarSeleccion={setCategoriasSeleccionadas} onCerrar={() => setFiltroCategoriaAbierto(false)} />
      </FiltroDesplegable>
      <BloqueEventosParaTi1
        setFiltroUbicacionAbierto={setFiltroUbicacionAbierto}
        filtroUbicacionAbierto={filtroUbicacionAbierto}
        filtroUbicacion={filtroUbicacion}
        setFiltroUbicacion={setFiltroUbicacion}
        CIUDADES_FILTRO_PARA_TI={CIUDADES_FILTRO_PARA_TI}
        MARCADORES_MAPA_PARA_TI={MARCADORES_MAPA_PARA_TI}
      />
      {(filtroFecha !== null || filtroUbicacion !== null || categoriasSeleccionadas.length > 0) && (
        <Boton type="button" onClick={limpiarFiltros} variant="secundario" size="mini" className="ml-auto flex-none">
          {catalogoEventos.botones.limpiar_filtros}
        </Boton>
      )}
    </div>
  )
}
