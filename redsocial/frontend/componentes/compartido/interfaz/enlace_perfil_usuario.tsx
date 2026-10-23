import { rutaPerfilUsuario } from './ruta_perfil_usuario'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { EnlacePerfilUsuarioProps } from '@/tipos/compartido/contrato_enlace_perfil'

export function EnlacePerfilUsuario({ autorId, nombre, className = '', children }: EnlacePerfilUsuarioProps) {
  const etiqueta = nombre ? catalogoPerfil.enlace.ver_perfil_de.replace(':nombre', nombre) : undefined

  return (
    <a href={rutaPerfilUsuario(autorId)} aria-label={etiqueta} className={`no-underline hover:underline ${className}`}>
      {children}
    </a>
  )
}
