import { inicialesDesdeNombreCompleto } from './logica_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { AvatarUsuarioEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const PLANTILLA_AVATAR = catalogoEmpresas.usuarios_empresa.etiquetas.avatar
const clases = catalogoEmpresas.usuarios_empresa.clases

export function AvatarUsuarioEmpresa({ usuario }: AvatarUsuarioEmpresaProps) {
  const descripcion = PLANTILLA_AVATAR.replace(':nombre', usuario.nombre)

  return (
    <span role="img" aria-label={descripcion} className={clases.avatar_iniciales}>
      {usuario.iniciales ?? inicialesDesdeNombreCompleto(usuario.nombre)}
    </span>
  )
}
