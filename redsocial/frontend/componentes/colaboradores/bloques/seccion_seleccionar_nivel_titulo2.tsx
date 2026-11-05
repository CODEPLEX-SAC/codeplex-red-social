import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import { PanelPermisosModulo } from './panel_permisos_modulo'
import { PermisosModulosMovil } from './permisos_modulos_movil'
import type { EstadoPermisosInvitacion, Modulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos

export function SeccionSeleccionarNivelTitulo2({
  MODULO,
  MODULOS,
  PERMISOS,
}: {
  MODULO: string
  MODULOS: Modulo[]
  PERMISOS: EstadoPermisosInvitacion
}) {
  const movil = usarVistaMovil()

  return (
    <div className={clases.panel}>
      {movil ? <PermisosModulosMovil MODULOS={MODULOS} PERMISOS={PERMISOS} /> : <PanelPermisosModulo modulo={MODULO} PERMISOS={PERMISOS} />}
    </div>
  )
}
