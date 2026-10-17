import { Pestanas } from '../../compartido/interfaz/pestanas'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Paginacion } from '../../compartido/interfaz/paginacion'
import { SeccionListado2 } from './seccion_listado2'
import { BloqueColaboradores1 } from './bloque_colaboradores1'
import { TablaColaboradores } from './tabla_colaboradores'
import { BloqueFiltrosAvanzados } from './bloque_filtros_avanzados'
import { BloqueExportarColaboradores } from './bloque_exportar_colaboradores'
import { usarTablaColaboradores } from './usar_tabla_colaboradores'
import { crearAccionesExportar } from './exportar_colaboradores'
import type { DatosListadoColaboradores } from '@/tipos/colaboradores/contrato_listado_colaboradores'

export function SeccionListado({ datos }: { datos: DatosListadoColaboradores }) {
  const { COLABORADORES, FILTROS_ESTADO_COLABORADORES, alInvitarColaborador, alFalloExportar } = datos

  const {
    pestanaActiva, cambiarPestana, elementosPestana,
    busqueda, cambiarBusqueda,
    rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor,
    tabla, filas, resumen, colaboradoresFiltrados, colaboradoresVista, criteriosExportacion, hayCriteriosActivos, filtrosAvanzados, aplicarFiltrosAvanzados,
  } = usarTablaColaboradores(COLABORADORES, FILTROS_ESTADO_COLABORADORES)

  const { pageIndex } = tabla.getState().pagination

  return (
    <section className="flex flex-col area-colaboradores">
      <SeccionListado2 alInvitar={alInvitarColaborador} />

      <Pestanas elementos={elementosPestana} activa={pestanaActiva} alCambiar={cambiarPestana} className="mb-5" />

      <div className="mb-4 flex flex-wrap items-center gap-3 max-900:flex-col max-900:items-stretch max-900:gap-2">
        <CampoBusqueda placeholder={catalogoColaboradores.placeholders.buscar_colaborador} className="min-w-60 flex-1 max-900:min-w-full" value={busqueda} onChange={cambiarBusqueda} />
        <div className="flex flex-none gap-2 max-900:grid max-900:w-full max-900:grid-cols-2">
          <BloqueFiltrosAvanzados aplicados={filtrosAvanzados} alAplicar={aplicarFiltrosAvanzados} />
          <BloqueExportarColaboradores acciones={crearAccionesExportar(colaboradoresVista, colaboradoresFiltrados, criteriosExportacion, hayCriteriosActivos, alFalloExportar)} />
        </div>
      </div>

      <BloqueColaboradores1 datos={{ rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor }} />

      <TablaColaboradores datos={datos} tabla={tabla} filas={filas} />

      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
        <span className="text-auxiliar text-texto-suave">{resumen}</span>
        <Paginacion total={tabla.getPageCount()} pagina={pageIndex + 1} alCambiar={(nuevaPagina) => tabla.setPageIndex(nuevaPagina - 1)} />
      </div>
    </section>
  )
}
