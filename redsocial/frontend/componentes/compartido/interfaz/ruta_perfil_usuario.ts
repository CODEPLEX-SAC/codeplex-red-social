import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'

export function rutaPerfilUsuario(autorId: string): string {
  return `${catalogoPerfil.rutas.principal}?${catalogoPerfil.parametros_ruta.usuario}=${encodeURIComponent(autorId)}`
}
