import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
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

  function alternarFiltroEstado(evento: { stopPropagation: () => void }) {
    evento.stopPropagation()
    setFiltroEstadoAbierto((abierto) => !abierto)
  }

  function alternarFiltroFecha(evento: { stopPropagation: () => void }) {
    evento.stopPropagation()
    setFiltroFechaAbierto((abierto) => !abierto)
  }

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
      <div className="relative flex-none">
        <Boton type="button" onClick={alternarFiltroEstado} variant="filtro" size="filtro" activo={filtroEstadoAbierto}>
          <Icono name="calendario" className="h-3.75 w-3.75" /> {catalogoEventos.botones.estado}
          <Icono name={filtroEstadoAbierto ? 'flecha-arriba' : 'flecha-abajo'} className="ml-1 h-3.5 w-3.5 text-gris-texto-terciario" />
        </Boton>
        {filtroEstadoAbierto && (
          <>
            <div className="fixed inset-0 z-19 max-600:bg-black/45" onClick={cerrarFiltroEstado} />
            <PanelFiltroEstado onCerrar={cerrarFiltroEstado} />
          </>
        )}
      </div>
      <div className="relative flex-none">
        <Boton type="button" onClick={alternarFiltroFecha} variant="filtro" size="filtro" activo={filtroFechaAbierto || filtroFecha !== null}>
          <Icono name="calendario" className="h-3.75 w-3.75" /> {filtroFecha === null ? catalogoEventos.filtros.fecha : etiquetaFiltroFecha(filtroFecha)}
          <Icono name={filtroFechaAbierto ? 'flecha-arriba' : 'flecha-abajo'} className="ml-1 h-3.5 w-3.5 text-gris-texto-terciario" />
        </Boton>
        {filtroFechaAbierto && (
          <>
            <div className="fixed inset-0 z-19 max-600:bg-black/45" onClick={cerrarFiltroFecha} />
            <PanelFiltroFecha onCerrar={cerrarFiltroFecha} onAplicar={setFiltroFecha} />
          </>
        )}
      </div>
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
