import { imagenPerfilPedroRedSocial as usuarioImg } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CompositorInicioProps } from '@/tipos/inicio/contrato_feed_inicio'

export function CompositorInicio({ placeholderPublicar, onAbrir }: CompositorInicioProps) {
  const { usuario } = usarSesionDemostracion()

  return (
    <article className={catalogoInicio.compositor.clases.tarjeta}>
      <div className={catalogoInicio.compositor.clases.fila}>
        {usuario ? (
          <EnlacePerfilUsuario autorId={usuario.id} nombre={usuario.usuario} className="flex-none">
            <AvatarUsuario tamano="lg" imagen={usuarioImg} />
          </EnlacePerfilUsuario>
        ) : (
          <AvatarUsuario tamano="lg" imagen={usuarioImg} />
        )}
        <div className="min-w-0 flex-1">
          <button type="button" aria-haspopup="dialog" onClick={() => onAbrir('publicacion')} className={catalogoInicio.compositor.clases.disparador}>
            {placeholderPublicar}
          </button>
        </div>
      </div>
    </article>
  )
}
