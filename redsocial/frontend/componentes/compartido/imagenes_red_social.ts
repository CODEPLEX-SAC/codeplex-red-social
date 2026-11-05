import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import { imagenUsuarioPredeterminada } from './icono'

const ARCHIVOS_IMAGEN = import.meta.glob('../../../recursos/imagenes/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>

function imagenDe(nombre: string): string {
  const entrada = Object.entries(ARCHIVOS_IMAGEN).find(([ruta]) => ruta.endsWith(`/${nombre}`))
  return entrada ? entrada[1] : imagenUsuarioPredeterminada
}

export const imagenPerfilPedroSas = imagenDe('perfil-pedro-lozano.png')
export const imagenPerfilPedroRedSocial = imagenDe('perfil-pedro-red-social.jpg')
export const imagenFotoRedSocial1 = imagenDe('foto1_red-social.jpg')
export const imagenFotoRedSocial2 = imagenDe('foto2_red-social.jpg')
export const imagenFotoRedSocial3 = imagenDe('foto3_red-social.jpg')
export const imagenFotoRedSocial4 = imagenDe('foto4_red-social.jpg')

export function imagenRedSocialDe(autorId?: string) {
  return autorId === catalogoCompartido.sesion_actual.id ? imagenPerfilPedroRedSocial : imagenUsuarioPredeterminada
}
