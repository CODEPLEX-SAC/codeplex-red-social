import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { CabeceraPlanes } from './cabecera_planes'
import { FilaPlanes, RejillaPlanes } from './lista_planes'
import { SelectorPeriodoPlanes } from './selector_periodo_planes'
import { TabsTipoPlanes } from './tabs_tipo_planes'
import type { usarSelectorPlanes } from './usar_selector_planes'
import type { ConfiguracionPlanes, EstiloPlanDestacado, EstiloSelectorPlanes, PropiedadesListaPlanes } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes

export function CuerpoPlanes({
  configuracion,
  claseModulo,
  estilo,
  estiloDestacado,
  estado,
}: {
  configuracion: ConfiguracionPlanes
  claseModulo: string
  estilo: EstiloSelectorPlanes
  estiloDestacado: EstiloPlanDestacado
  estado: ReturnType<typeof usarSelectorPlanes>
}) {
  const { tipo, plan } = estado
  const Lista = tipo.disposicion === 'fila' ? FilaPlanes : RejillaPlanes
  const propiedadesLista: PropiedadesListaPlanes = {
    planes: tipo.planes,
    periodo: estado.periodo,
    planId: plan?.id,
    estilo,
    estiloDestacado,
    detalles: configuracion.detalles,
    etiqueta: textos.lista,
    paquetes: configuracion.paquetes,
    alVerPaquetes: estado.abrirPaquetes,
    alSeleccionar: estado.seleccionarPlan,
    alAbrirDetalle: estado.abrirCaracteristica,
  }

  return (
    <div className="grid min-h-0 flex-1 auto-rows-max content-start justify-items-stretch gap-4 overflow-y-auto p-5 pb-20 max-600:p-4 max-600:pb-20">
      <CabeceraPlanes configuracion={configuracion} claseModulo={claseModulo} estilo={estilo} />
      <div className="grid justify-items-center gap-3">
        {configuracion.tipos.length > 1 && <TabsTipoPlanes tipos={configuracion.tipos} activo={tipo.id} alCambiar={estado.cambiarTipo} />}
        <SelectorPeriodoPlanes periodo={estado.periodo} alCambiar={estado.alternarPeriodo} />
      </div>
      <Lista {...propiedadesLista} />
      <div className="flex justify-end">
        <Boton type="button" variant="enlace" size="enlace" aria-expanded={estado.asistenteAbierto} onClick={estado.alternarAsistente}>
          <Icono name="comentario" className="h-4 w-4" /> {textos.asistente.abrir}
        </Boton>
      </div>
      {plan && (
        <Boton type="button" variant="primario" size="md" className="justify-self-end max-600:w-full" onClick={estado.confirmar}>
          {[textos.continuar, plan.nombre].join(' ')} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
        </Boton>
      )}
    </div>
  )
}
