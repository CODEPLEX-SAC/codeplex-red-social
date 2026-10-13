import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { ClavePermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const CLASES_RADIO: Record<ClavePermiso, { bg: string; punto: string }> = catalogoColaboradores.clases_celda_permiso

export function CeldaPermisoInvitacion({ columna, activa }: { columna: { clave: ClavePermiso }; activa: boolean }) {
  if (!activa) {
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-texto-icono-control bg-white" />
  }
  const clases = CLASES_RADIO[columna.clave]
  return (
    <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 ${clases.bg}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${clases.punto}`} />
    </span>
  )
}
