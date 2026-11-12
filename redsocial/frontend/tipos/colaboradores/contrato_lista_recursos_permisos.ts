import type { CodeplexCasillaProps } from '@codeplex-sac/formularios'
import type { ClavePermiso, ConfiguracionPermisos, RecursoPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface FilaPermisoProps {
  icono: IconName
  color: string
  etiqueta: string
  colorCasilla?: CodeplexCasillaProps['color']
  nombreAccesible: string
  activo: boolean
  alCambiar: (activo: boolean) => void
  soloLectura: boolean
}

export interface SeccionRecursoProps {
  prefijoId: string
  recurso: RecursoPermiso
  configuracion: ConfiguracionPermisos
  abierto: boolean
  soloLectura: boolean
  alAlternarApertura: () => void
  alSeleccionar: (activo: boolean) => void
  alAlternar: (clave: ClavePermiso, activo: boolean) => void
  alAlternarEspecifico: (id: string, activo: boolean) => void
  alAgregar: () => void
}

export interface ManejadoresListaRecursos {
  alSeleccionarRecurso: (recurso: string, activo: boolean) => void
  alAlternar: (recurso: string, clave: ClavePermiso, activo: boolean) => void
  alAlternarEspecifico: (recurso: string, id: string, activo: boolean) => void
  alAgregar: (recurso: string) => void
}

export interface ListaRecursosPermisosProps {
  prefijoId: string
  recursos: RecursoPermiso[]
  configuracion: ConfiguracionPermisos
  expandidos: string[]
  soloLectura: boolean
  alCambiarExpandidos: (nombres: string[]) => void
  manejadores: ManejadoresListaRecursos
}
