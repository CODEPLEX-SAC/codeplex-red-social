import { usarActividadGrupo } from './usar_actividad_grupo'
import { VistaComunidadGrupo } from './vista_comunidad_grupo'
import { VistaEstadisticaGrupo } from './vista_estadistica_grupo'
import { VistaListaGrupo } from './vista_lista_grupo'
import { VistaResumenGrupo } from './vista_resumen_grupo'
import type { ReactNode } from 'react'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { VistaAdministracionGrupoProps, VistaComunidadGrupoSeccion, VistaEstadisticaClave, VistaListaClave } from '@/tipos/grupos/contrato_administracion_grupo'

const familias: Record<string, string> = catalogoGrupos.administracion.familias

export function VistaAdministracionGrupo({ seccion, grupo, puerto }: VistaAdministracionGrupoProps) {
  const actividad = usarActividadGrupo(puerto.publicaciones(grupo.id))
  const vistas: Record<string, () => ReactNode> = {
    resumen: () => <VistaResumenGrupo grupo={grupo} actividad={actividad} />,
    comunidad: () => <VistaComunidadGrupo seccion={seccion as VistaComunidadGrupoSeccion} grupo={grupo} />,
    estadistica: () => <VistaEstadisticaGrupo clave={seccion as VistaEstadisticaClave} actividad={actividad} />,
    lista: () => <VistaListaGrupo key={seccion} clave={seccion as VistaListaClave} grupo={grupo} />,
  }

  return vistas[familias[seccion]]?.() ?? null
}
