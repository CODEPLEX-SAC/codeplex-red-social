import type { ReactNode } from 'react'
import type { ClavePermiso, ConfiguracionPermisos, RecursoPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export interface PanelEdicionPermisosProps {
  prefijoId: string
  claveLista: string
  titulo: string
  subtitulo: string
  acciones?: ReactNode
  recursos: RecursoPermiso[]
  configuracion: ConfiguracionPermisos
  expandidos: string[]
  soloLectura?: boolean
  errorPermisos?: string | null
  alCambiarExpandidos: (ids: string[]) => void
  alSeleccionarModulo: (activo: boolean) => void
  alSeleccionarRecurso: (recurso: string, activo: boolean) => void
  alAlternar: (recurso: string, clave: ClavePermiso, activo: boolean) => void
  alAlternarEspecifico: (recurso: string, id: string, activo: boolean) => void
  alAgregar: (recurso: string, etiqueta: string) => string | null
}
