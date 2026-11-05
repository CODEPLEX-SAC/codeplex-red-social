import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { TarjetaSolicitudEnviadaProps, TarjetaSolicitudRecibidaProps } from '@/tipos/amigos/contrato_solicitudes'

const clases = catalogoAmigos.clases.solicitud

export function TarjetaSolicitudRecibida({ solicitud }: TarjetaSolicitudRecibidaProps) {
  return (
    <article className={clases.tarjeta}>
      <AvatarUsuario tamano="lg" imagen={usuarioImg} />
      <div className={clases.cuerpo}>
        <div className={clases.cabecera}>
          <strong className={clases.nombre}>{solicitud.nombre}</strong>
        </div>
        <span className={clases.tiempo}>{solicitud.tiempo}</span>
        <p className={clases.descripcion}>{solicitud.descripcion}</p>
        <div className={clases.comunes_fila}>
          <span className={clases.comunes_texto}>{solicitud.comunes}</span>
          <GrupoAvatares avatares={solicitud.masAvatares ? 4 : 3} tamano="xs" tono="neutro" resto={solicitud.masAvatares} />
        </div>
      </div>
      <div className={clases.acciones}>
        <Boton type="button" variant="primario" size="default" className={clases.boton}>{catalogoAmigos.botones.aceptar}</Boton>
        <Boton type="button" variant="secundario" size="default" className={clases.boton}>{catalogoAmigos.botones.eliminar}</Boton>
        <Boton type="button" variant="secundario" size="default" className={clases.boton}>{catalogoAmigos.botones.ignorar}</Boton>
      </div>
    </article>
  )
}

export function TarjetaSolicitudEnviada({ solicitud }: TarjetaSolicitudEnviadaProps) {
  return (
    <article className={clases.tarjeta}>
      <AvatarUsuario tamano="lg" imagen={usuarioImg} />
      <div className={clases.cuerpo}>
        <div className={clases.cabecera}>
          <strong className={clases.nombre}>{solicitud.nombre}</strong>
        </div>
        <span className={clases.estado}>{solicitud.estado}</span>
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
