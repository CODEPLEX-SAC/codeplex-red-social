import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BloqueExportarColaboradores } from './bloque_exportar_colaboradores'
import { BloqueFiltrosAvanzados } from './bloque_filtros_avanzados'
import { FiltrosActivosColaboradores } from './filtros_activos_colaboradores'
import type { BarraHerramientasColaboradoresProps } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const clases = catalogoColaboradores.clases.listado

export function BarraHerramientasColaboradores(props: BarraHerramientasColaboradoresProps) {
  const { busqueda, cambiarBusqueda, rol, aplicacion, aplicarBasicos, filtrosAvanzados, aplicarFiltrosAvanzados, filtrosActivos, quitarFiltro, accionesExportar } = props
  const movil = usarVistaMovil()

  return (
    <>
      <div className={clases.barra_herramientas}>
        <CampoBusqueda placeholder={catalogoColaboradores.placeholders.buscar_colaborador} className={clases.busqueda} value={busqueda} onChange={cambiarBusqueda} />
        <div className={clases.acciones_barra}>
          <BloqueFiltrosAvanzados
            aplicados={filtrosAvanzados}
            alAplicar={aplicarFiltrosAvanzados}
            basicos={movil ? { rol, aplicacion, alAplicar: aplicarBasicos } : undefined}
            totalActivos={filtrosActivos.length}
          />
          <BloqueExportarColaboradores acciones={accionesExportar} />
        </div>
      </div>
      {movil && <FiltrosActivosColaboradores filtros={filtrosActivos} alQuitar={quitarFiltro} />}
    </>
  )
}
