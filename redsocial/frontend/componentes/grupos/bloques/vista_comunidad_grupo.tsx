import { VistaMiembrosGrupo } from './vista_miembros_grupo'
import { VistaPreguntasGrupo } from './vista_preguntas_grupo'
import { VistaRolesGrupo } from './vista_roles_grupo'
import type { ReactNode } from 'react'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { VistaComunidadGrupoProps } from '@/tipos/grupos/contrato_administracion_grupo'

const soloAdministradores = catalogoGrupos.administracion.solo_administradores

export function VistaComunidadGrupo({ seccion, grupo }: VistaComunidadGrupoProps) {
  const vistas: Record<string, () => ReactNode> = {
    preguntas: () => <VistaPreguntasGrupo />,
    roles: () => <VistaRolesGrupo grupo={grupo} />,
    miembros: () => <VistaMiembrosGrupo grupo={grupo} soloAdministradores={false} />,
    administradores: () => <VistaMiembrosGrupo grupo={grupo} soloAdministradores={seccion === soloAdministradores} />,
  }

  return vistas[seccion]()
}
