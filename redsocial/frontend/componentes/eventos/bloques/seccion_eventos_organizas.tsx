import { Boton } from '../../compartido/interfaz/boton'
import { FiltroDesplegable } from '../../compartido/interfaz/filtro_desplegable'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { PanelFiltroEstado } from './panel_filtro_estado'
import { ResultadosFiltroFecha } from './resultados_filtro_fecha'
import { etiquetaFiltroFecha } from '../formato_fecha_filtro'
import { PanelFiltroFecha } from './panel_filtro_fecha'
import { SeccionEventosOrganizas2 } from './seccion_eventos_organizas2'
import type { FiltroFecha } from '@/tipos/eventos/contrato_filtro_fecha'
import type { ConjuntoResultadosFiltro } from '@/tipos/eventos/contrato_resultados_filtro_fecha'
import type { EventoOrganizas } from '@/tipos/eventos/modelo_eventos_mis_eventos'

export function SeccionEventosOrganizas({ datos }: {
  datos: {
    setFiltroEstadoAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
    filtroEstadoAbierto: boolean
    setFiltroFechaAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
    filtroFechaAbierto: boolean
    filtroFecha: FiltroFecha | null
    setFiltroFecha: (valor: FiltroFecha | null | ((actual: FiltroFecha | null) => FiltroFecha | null)) => void
    RESULTADOS_FILTRO_FECHA: Record<string, ConjuntoResultadosFiltro>
    EVENTOS_ORGANIZAS: EventoOrganizas[]
    ESTADO_ESTILO: Record<'publicado' | 'borrador' | 'colaborador', string>
    ESTADO_ETIQUETA: Record<'publicado' | 'borrador' | 'colaborador', string>
    alAbrirMenuOrganizas: (evento: { stopPropagation: () => void; currentTarget: HTMLElement; }, nombre: string) => void
    menuOrganizasAbierto: string | null
    anclaMenuOrganizas: HTMLElement | null
    cerrarMenuOrganizas: () => void
    setEventoEditando: (valor: string | null | ((actual: string | null) => string | null)) => void
    EVENTO_COLABORAS: EventoOrganizas
  }
}) {
  const {
    setFiltroEstadoAbierto,
    filtroEstadoAbierto,
    setFiltroFechaAbierto,
    filtroFechaAbierto,
    filtroFecha,
    setFiltroFecha,
    RESULTADOS_FILTRO_FECHA,
    EVENTOS_ORGANIZAS,
    ESTADO_ESTILO,
    ESTADO_ETIQUETA,
    alAbrirMenuOrganizas,
    menuOrganizasAbierto,
    anclaMenuOrganizas,
    cerrarMenuOrganizas,
    setEventoEditando,
    EVENTO_COLABORAS,
  } = datos

  function cerrarFiltroEstado() {
    setFiltroEstadoAbierto(false)
  }

  function cerrarFiltroFecha() {
    setFiltroFechaAbierto(false)
  }

  function limpiarFiltroFecha() {
    setFiltroFecha(null)
  }

  return (
    <>

    <div className="mb-6 flex items-center gap-3 border-b border-gris-borde py-3 max-600:flex-nowrap max-600:overflow-x-auto max-600:scrollbar-oculto">
      <FiltroDesplegable id={catalogoEventos.ids_filtros.estado} abierto={filtroEstadoAbierto} alCambiarAbierto={setFiltroEstadoAbierto} icono="calendario" etiqueta={catalogoEventos.botones.estado}>
        <PanelFiltroEstado id={catalogoEventos.ids_filtros.estado} onCerrar={cerrarFiltroEstado} />
      </FiltroDesplegable>
      <FiltroDesplegable
        id={catalogoEventos.ids_filtros.fecha}
        abierto={filtroFechaAbierto}
        alCambiarAbierto={setFiltroFechaAbierto}
        activo={filtroFechaAbierto || filtroFecha !== null}
        icono="calendario"
        etiqueta={filtroFecha === null ? catalogoEventos.filtros.fecha : etiquetaFiltroFecha(filtroFecha)}
      >
        <PanelFiltroFecha id={catalogoEventos.ids_filtros.fecha} onCerrar={cerrarFiltroFecha} onAplicar={setFiltroFecha} />
      </FiltroDesplegable>
      {filtroFecha !== null && (
        <Boton type="button" onClick={limpiarFiltroFecha} variant="secundario" size="mini" className="ml-auto flex-none">
          {catalogoEventos.botones.limpiar_filtros}
        </Boton>
      )}
    </div>

    {filtroFecha !== null ? (
      <ResultadosFiltroFecha filtro={filtroFecha} resultados={RESULTADOS_FILTRO_FECHA} onExplorar={limpiarFiltroFecha} />
    ) : (
      <SeccionEventosOrganizas2
        EVENTOS_ORGANIZAS={EVENTOS_ORGANIZAS}
        ESTADO_ESTILO={ESTADO_ESTILO}
        ESTADO_ETIQUETA={ESTADO_ETIQUETA}
        alAbrirMenuOrganizas={alAbrirMenuOrganizas}
        menuOrganizasAbierto={menuOrganizasAbierto}
        anclaMenuOrganizas={anclaMenuOrganizas}
        cerrarMenuOrganizas={cerrarMenuOrganizas}
        setEventoEditando={setEventoEditando}
        EVENTO_COLABORAS={EVENTO_COLABORAS}
      />
    )}
      </>
  )
}
