import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { inicialesDesdeNombreCompleto } from './logica_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { AvatarUsuarioEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const PLANTILLA_AVATAR = catalogoEmpresas.usuarios_empresa.etiquetas.avatar

export function AvatarUsuarioEmpresa({ usuario }: AvatarUsuarioEmpresaProps) {
  const descripcion = PLANTILLA_AVATAR.replace(':nombre', usuario.nombre)
  return <AvatarUsuario tamano="sm" iniciales={usuario.iniciales ?? inicialesDesdeNombreCompleto(usuario.nombre)} etiqueta={descripcion} />
}
