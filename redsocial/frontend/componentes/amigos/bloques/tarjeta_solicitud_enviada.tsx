import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { idPerfilDeNombre } from './logica_amigos'
import { Boton } from '../../compartido/interfaz/boton'
import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { TarjetaSolicitudEnviadaProps } from '@/tipos/amigos/contrato_solicitudes'

const clases = catalogoAmigos.clases.solicitud

export function TarjetaSolicitudEnviada({ solicitud }: TarjetaSolicitudEnviadaProps) {
  return (
    <article className={clases.tarjeta}>
      <EnlacePerfilUsuario autorId={idPerfilDeNombre(solicitud.nombre)} nombre={solicitud.nombre}>
        <AvatarUsuario tamano="lg" imagen={usuarioImg} />
      </EnlacePerfilUsuario>
      <div className={clases.cuerpo}>
        <div className={clases.cabecera}>
          <strong className={clases.nombre}>
            <EnlacePerfilUsuario autorId={idPerfilDeNombre(solicitud.nombre)} nombre={solicitud.nombre}>{solicitud.nombre}</EnlacePerfilUsuario>
          </strong>
        </div>
        <p className={clases.descripcion}>{solicitud.descripcion}</p>
        <div className={clases.comunes_fila}>
          <span className={clases.comunes_texto}>{solicitud.comunes}</span>
          <GrupoAvatares avatares={2} tamano="xs" />
        </div>
      </div>
      <div className={clases.acciones}>
        <Boton type="button" variant="secundario" size="default" className={clases.boton}>{catalogoAmigos.botones.cancelar_solicitud}</Boton>
      </div>
    </article>
  )
}
