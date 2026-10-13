import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Selector } from '../../compartido/interfaz/selector'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoHistorialProps } from '@/tipos/empresas/contrato_historial_empresa'

const textos = catalogoEmpresas.historial_empresa
const fecha = textos.fecha
const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

export function FiltrosHistorialEmpresa({ listado }: ListadoHistorialProps) {
  return (
    <div className="flex flex-col gap-3">
      <CampoBusqueda
        placeholder={textos.placeholder_busqueda}
        aria-label={textos.etiquetas.busqueda}
        className="w-full"
        value={listado.busqueda}
        onChange={listado.cambiarBusqueda}
      />
      <div className="grid w-full grid-cols-3 items-end gap-3 max-900:grid-cols-2 max-480:grid-cols-1">
        <CodeplexProveedorFechas idioma={fecha.idioma}>
          <div className="flex min-w-0 flex-col gap-1">
            <span className={claseEtiqueta}>{textos.etiquetas.desde}</span>
            <SelectorFecha marcador={fecha.marcador} formato={fecha.formato} anchoCompleto valor={listado.desde} alCambiar={listado.cambiarDesde} />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className={claseEtiqueta}>{textos.etiquetas.hasta}</span>
            <SelectorFecha marcador={fecha.marcador} formato={fecha.formato} anchoCompleto valor={listado.hasta} alCambiar={listado.cambiarHasta} />
          </div>
        </CodeplexProveedorFechas>
        <div className="max-900:col-span-2 max-480:col-span-1">
          <Selector variant="colaboradores" aria-label={textos.etiquetas.tipo} value={listado.tipo} onChange={listado.cambiarTipo}>
            {textos.filtros_tipo.map((opcion) => <option key={opcion}>{opcion}</option>)}
          </Selector>
        </div>
      </div>
    </div>
  )
}
