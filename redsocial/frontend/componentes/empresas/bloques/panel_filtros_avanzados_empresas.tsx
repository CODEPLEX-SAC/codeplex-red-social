import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Selector } from '../../compartido/interfaz/selector'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import { usarFiltrosAvanzadosEmpresas } from './usar_filtros_avanzados_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelFiltrosAvanzadosEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const textos = catalogoEmpresas.filtros_avanzados
const selectores = catalogoEmpresas.selectores
const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

function detenerPropagacion(evento: { stopPropagation: () => void }) {
  evento.stopPropagation()
}

export function PanelFiltrosAvanzadosEmpresas({ listado, alCerrar }: PanelFiltrosAvanzadosEmpresasProps) {
  const filtros = usarFiltrosAvanzadosEmpresas(listado, alCerrar)
  const { borrador } = filtros

  return (
    <div
      role="dialog"
      aria-label={textos.titulo}
      onClick={detenerPropagacion}
      className="absolute right-0 top-tooltip z-20 flex max-h-150 w-112 flex-col overflow-hidden rounded-xl border border-borde bg-white shadow-t13 max-600:fixed max-600:max-h-4/5 max-600:inset-x-0 max-600:bottom-0 max-600:top-auto max-600:z-30 max-600:w-full max-600:max-w-none max-600:rounded-b-none max-600:rounded-t-2xl panel-hoja-movil"
    >
      <div className="hidden flex-none pt-2.5 max-600:block">
        <div className="mx-auto h-1 w-10 rounded-full bg-borde" />
      </div>
      <div className="flex flex-none items-center justify-between border-b border-borde p-4 pb-3 max-600:border-b-0">
        <h3 className={catalogoEmpresas.clases.titulo_ventana}>{textos.titulo}</h3>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="sm" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 max-480:grid-cols-1">
          <Selector variant="colaboradores" label={selectores.rubro.etiqueta} value={borrador.rubro} onChange={filtros.cambiarRubro}>
            {selectores.rubro.opciones.map((opcion) => <option key={opcion}>{opcion}</option>)}
          </Selector>
          <Selector variant="colaboradores" label={selectores.tipo_plan.etiqueta} value={borrador.plan} onChange={filtros.cambiarPlan}>
            {selectores.tipo_plan.opciones.map((opcion) => <option key={opcion}>{opcion}</option>)}
          </Selector>
        </div>
        <section className="flex flex-col gap-2">
          <h4 className="m-0 text-titulo-subseccion text-texto">{textos.fecha_registro}</h4>
          <CodeplexProveedorFechas idioma={textos.idioma}>
            <div className="grid grid-cols-2 gap-3 max-480:grid-cols-1">
              <div className="flex min-w-0 flex-col gap-1">
                <span className={claseEtiqueta}>{textos.desde}</span>
                <SelectorFecha marcador={textos.marcador} formato={textos.formato} anchoCompleto valor={borrador.desde} alCambiar={filtros.cambiarDesde} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className={claseEtiqueta}>{textos.hasta}</span>
                <SelectorFecha marcador={textos.marcador} formato={textos.formato} anchoCompleto valor={borrador.hasta} alCambiar={filtros.cambiarHasta} />
              </div>
            </div>
          </CodeplexProveedorFechas>
        </section>
      </div>
      <div className="grid flex-none grid-cols-2 gap-2 border-t border-borde p-4">
        <Boton type="button" variant="secundario" onClick={filtros.limpiar}>{textos.limpiar}</Boton>
        <Boton type="button" variant="primario" onClick={filtros.aplicar}>{textos.aplicar}</Boton>
      </div>
    </div>
  )
}
