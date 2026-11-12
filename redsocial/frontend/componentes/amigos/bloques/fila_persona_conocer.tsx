import { Boton } from '../../compartido/interfaz/boton'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'

const clases = catalogoAmigos.clases.lateral

export function FilaPersonaConocer({ nombre, comunes }: { nombre: string; comunes: string }) {
  return (
    <article className={clases.fila}>
      <AvatarUsuario tamano="sm" imagen={usuarioImg} />
      <div className={clases.cuerpo}>
        <span className={clases.nombre}>{nombre}</span>
        <span className={clases.auxiliar}>{comunes}</span>
      </div>
      <Boton type="button" variant="secundario" size="mini" className={clases.boton}>
        {catalogoAmigos.botones.agregar}
      </Boton>
    </article>
  )
}
