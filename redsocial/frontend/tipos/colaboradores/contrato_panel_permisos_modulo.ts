import type { Dispatch, SetStateAction } from 'react'
import type { ModoModalRol } from '@/tipos/colaboradores/contrato_modal_rol'
import type { EstadoPermisosInvitacion, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export type Dialogo =
  | { tipo: 'administrar' }
  | { tipo: 'formulario'; modo: ModoModalRol; rol: RolModulo | null }
  | { tipo: 'editar'; rol: RolModulo }
  | { tipo: 'eliminar'; rol: RolModulo }

export interface PilaDialogosRolesProps {
  modulo: string
  PERMISOS: EstadoPermisosInvitacion
  pila: Dialogo[]
  setPila: Dispatch<SetStateAction<Dialogo[]>>
}
