import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'

const clases = catalogoAmigos.clases.lateral

export function FilaActividadReciente({ nombre, accion, tiempo }: { nombre: string; accion: string; tiempo: string }) {
  return (
    <article className={clases.fila_actividad}>
      <AvatarUsuario tamano="sm" imagen={usuarioImg} />
      <div className={clases.actividad_cuerpo}>
        <strong className={clases.actividad_nombre}>{nombre}</strong> {accion}
        <span className={clases.actividad_tiempo}>{tiempo}</span>
      </div>
    </article>
  )
}
