import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { TablaColaboradores } from './tabla_colaboradores'
import type { TablaColaboradoresProps } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const clases = catalogoColaboradores.clases.listado

export function VistaColaboradores({ datos, filas }: TablaColaboradoresProps) {
  return (
    <div className={clases.vista}>
      <TablaColaboradores datos={datos} filas={filas} />
    </div>
  )
}
