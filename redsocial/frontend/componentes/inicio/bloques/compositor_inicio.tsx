import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CompositorInicioProps } from '@/tipos/inicio/contrato_feed_inicio'

const botones = catalogoInicio.botones

export function CompositorInicio({ placeholderPublicar, onAbrir }: CompositorInicioProps) {
  const { usuario } = usarSesionDemostracion()

  return (
    <article className={catalogoInicio.compositor.clases.tarjeta}>
      <div className={catalogoInicio.compositor.clases.fila}>
        {usuario ? (
          <EnlacePerfilUsuario autorId={usuario.id} nombre={usuario.usuario} className="flex-none">
            <AvatarUsuario tamano="sm" imagen={usuarioImg} />
          </EnlacePerfilUsuario>
        ) : (
          <AvatarUsuario tamano="sm" imagen={usuarioImg} />
        )}
        <div className="min-w-0 flex-1">
          <button type="button" aria-haspopup="dialog" onClick={() => onAbrir('publicacion')} className={catalogoInicio.compositor.clases.disparador}>
            {placeholderPublicar}
          </button>
        </div>
      </div>
      <div className={catalogoInicio.compositor.clases.accesos}>
        <Boton type="button" variant="fantasma" size="default" aria-haspopup="dialog" onClick={() => onAbrir('publicacion')} className="flex-1 basis-30">
          <Icono name="foto-video" className="h-4 w-4" /> {botones.foto_video}
        </Boton>
        <Boton type="button" variant="fantasma" size="default" aria-haspopup="dialog" onClick={() => onAbrir('encuesta')} className="flex-1 basis-30">
          <Icono name="datos" className="h-4 w-4" /> {botones.encuesta}
        </Boton>
      </div>
    </article>
  )
}
