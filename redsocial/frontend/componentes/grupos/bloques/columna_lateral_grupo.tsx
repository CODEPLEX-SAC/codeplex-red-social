import { InformacionGrupo } from './informacion_grupo'
import { MultimediaRecienteGrupo } from './multimedia_reciente_grupo'
import { PanelConfiguracionGrupo } from './panel_configuracion_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ColumnaLateralGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const clases = catalogoGrupos.clases.detalle

export function ColumnaLateralGrupo({ grupo, hechos, guiaVisible, alAccion, alCerrarGuia, alVerTodoMultimedia }: ColumnaLateralGrupoProps) {
  return (
    <div className={clases.columna}>
      {grupo.rol === 'administrador' && guiaVisible && <PanelConfiguracionGrupo hechos={hechos} alAccion={alAccion} alCerrar={alCerrarGuia} />}
      <InformacionGrupo grupo={grupo} />
      {grupo.rol === 'miembro' && <MultimediaRecienteGrupo grupo={grupo} alVerTodo={alVerTodoMultimedia} />}
    </div>
  )
}
