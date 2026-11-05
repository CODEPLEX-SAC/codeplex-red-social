import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import type { EstadoPermisosInvitacion } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.campos_rol_permisos

export function BotonRestablecerPermisos({ modulo, PERMISOS }: { modulo: string; PERMISOS: EstadoPermisosInvitacion }) {
  const hayRol = PERMISOS.roles[modulo]?.some((rol) => rol.clave === PERMISOS.perfiles[modulo]) === true
  if (!PERMISOS.ajustados[modulo] || !hayRol) return null

  return (
    <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => PERMISOS.restablecer(modulo)}>
      <Icono name="actualizar" className={clases.pie_boton_glifo} /> {textos.restablecer_permisos}
    </Boton>
  )
}
