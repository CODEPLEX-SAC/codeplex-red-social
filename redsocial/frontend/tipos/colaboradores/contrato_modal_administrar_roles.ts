import type { RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export interface ModalAdministrarRolesProps {
  modulo: string
  roles: RolModulo[]
  alEditar: (rol: RolModulo) => void
  alDuplicar: (rol: RolModulo) => void
  alEliminar: (rol: RolModulo) => void
  alCerrar: () => void
}
