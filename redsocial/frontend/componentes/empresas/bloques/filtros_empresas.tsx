import { Boton } from '../../compartido/interfaz/boton'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueFiltrosAvanzadosEmpresas } from './bloque_filtros_avanzados_empresas'
import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import { OPCIONES_MODULO, TODOS } from './logica_listado_empresas'
import { opcionesDePlan } from './logica_suscripciones_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const selectores = catalogoEmpresas.selectores
const clases = catalogoEmpresas.clases.filtros

export function FiltrosEmpresas({ listado }: ListadoEmpresasProps) {
  const planes = [TODOS, ...opcionesDePlan(usarSuscripciones())]

  return (
    <div className={clases.contenedor}>
      <CampoBusqueda
        placeholder={catalogoEmpresas.placeholders.buscar_empresa}
        aria-label={catalogoEmpresas.campos.buscar_empresa}
        className={clases.buscador}
        value={listado.busqueda}
        onChange={listado.cambiarBusqueda}
      />
      <div className={clases.selector}>
        <Selector variant="colaboradores" label={selectores.estado.etiqueta} value={listado.estado} onChange={listado.cambiarEstado}>
          {selectores.estado.opciones.map((opcion) => <option key={opcion}>{opcion}</option>)}
        </Selector>
      </div>
      <div className={clases.selector}>
        <Selector variant="colaboradores" label={selectores.plan.etiqueta} value={listado.plan} onChange={listado.cambiarPlan}>
          {planes.map((opcion) => <option key={opcion}>{opcion}</option>)}
        </Selector>
      </div>
      <div className={clases.selector}>
        <Selector variant="colaboradores" label={selectores.modulo.etiqueta} value={listado.modulo} onChange={listado.cambiarModulo}>
          {OPCIONES_MODULO.map((opcion) => <option key={opcion}>{opcion}</option>)}
        </Selector>
      </div>
      <Boton type="button" variant="enlace" size="md" onClick={listado.limpiarTodo} className={clases.limpiar}>
        {catalogoEmpresas.botones.limpiar}
      </Boton>
      <BloqueFiltrosAvanzadosEmpresas listado={listado} />
    </div>
  )
}
