import type { ConfiguracionPermisos, RecursoPermiso, ResultadoCreacionRol } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export type ModoModalRol = 'crear' | 'duplicar' | 'editar'

export interface ModalRolProps {
  modo: ModoModalRol
  modulo: string
  recursos: RecursoPermiso[]
  nombreInicial: string
  configuracionInicial: ConfiguracionPermisos
  alGuardar: (nombre: string, configuracion: ConfiguracionPermisos) => ResultadoCreacionRol
  alCerrar: () => void
}
