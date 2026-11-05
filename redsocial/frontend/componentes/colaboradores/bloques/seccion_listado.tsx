import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Paginacion } from '../../compartido/interfaz/paginacion'
import { SeccionListado2 } from './seccion_listado2'
import { BloqueColaboradores1 } from './bloque_colaboradores1'
import { BarraHerramientasColaboradores } from './barra_herramientas_colaboradores'
import { VistaColaboradores } from './vista_colaboradores'
import { usarTablaColaboradores } from './usar_tabla_colaboradores'
import { crearAccionesExportar } from './exportar_colaboradores'
import type { DatosListadoColaboradores } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const clases = catalogoColaboradores.clases.listado

export function SeccionListado({ datos }: { datos: DatosListadoColaboradores }) {
  const { COLABORADORES, FILTROS_ESTADO_COLABORADORES, alInvitarColaborador, alFalloExportar } = datos

  const {
    pestanaActiva, cambiarPestana, elementosPestana,
    busqueda, cambiarBusqueda,
    rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor,
    tabla, filas, resumen, colaboradoresFiltrados, colaboradoresVista, criteriosExportacion, hayCriteriosActivos, filtrosAvanzados, aplicarFiltrosAvanzados,
    filtrosActivos, aplicarBasicos, quitarFiltro,
  } = usarTablaColaboradores(COLABORADORES, FILTROS_ESTADO_COLABORADORES)

  const { pageIndex } = tabla.getState().pagination

  return (
    <section className={clases.seccion}>
      <SeccionListado2 alInvitar={alInvitarColaborador} />

      <Pestanas elementos={elementosPestana} activa={pestanaActiva} alCambiar={cambiarPestana} className={clases.pestanas} />

      <BarraHerramientasColaboradores
        busqueda={busqueda}
        cambiarBusqueda={cambiarBusqueda}
        rol={rol}
        aplicacion={aplicacion}
        aplicarBasicos={aplicarBasicos}
        filtrosAvanzados={filtrosAvanzados}
        aplicarFiltrosAvanzados={aplicarFiltrosAvanzados}
        filtrosActivos={filtrosActivos}
        quitarFiltro={quitarFiltro}
        accionesExportar={crearAccionesExportar(colaboradoresVista, colaboradoresFiltrados, criteriosExportacion, hayCriteriosActivos, alFalloExportar)}
      />

      <BloqueColaboradores1 datos={{ rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor }} />

      <VistaColaboradores datos={datos} filas={filas} />

      <div className={clases.pie_tabla}>
        <span className={clases.resumen_tabla}>{resumen}</span>
        <Paginacion total={tabla.getPageCount()} pagina={pageIndex + 1} alCambiar={(nuevaPagina) => tabla.setPageIndex(nuevaPagina - 1)} />
      </div>
    </section>
  )
}
