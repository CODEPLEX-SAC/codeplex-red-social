import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueFiltrosAvanzadosEmpresas } from './bloque_filtros_avanzados_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const selectores = catalogoEmpresas.selectores

export function FiltrosEmpresas({ listado }: ListadoEmpresasProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-3 max-900:flex-col max-900:items-stretch">
      <CampoBusqueda
        placeholder={catalogoEmpresas.placeholders.buscar_empresa}
        aria-label={catalogoEmpresas.campos.buscar_empresa}
        className="min-w-60 flex-1 max-900:min-w-full"
        value={listado.busqueda}
        onChange={listado.cambiarBusqueda}
      />
      <div className="w-44 max-900:w-full">
        <Selector variant="colaboradores" label={selectores.estado.etiqueta} value={listado.estado} onChange={listado.cambiarEstado}>
          {selectores.estado.opciones.map((opcion) => <option key={opcion}>{opcion}</option>)}
        </Selector>
      </div>
      <BloqueFiltrosAvanzadosEmpresas listado={listado} />
    </div>
  )
}
