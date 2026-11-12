import { useState } from 'react'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { idPerfilDeNombre } from './logica_amigos'
import { Boton } from '../../compartido/interfaz/boton'
import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { TarjetaSolicitudRecibidaProps } from '@/tipos/amigos/contrato_solicitudes'

const clases = catalogoAmigos.clases.solicitud

export function TarjetaSolicitudRecibida({ solicitud }: TarjetaSolicitudRecibidaProps) {
  const [aceptada, setAceptada] = useState(false)
  const [eliminada, setEliminada] = useState(false)

  if (eliminada) return null

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
        <span className={clases.tiempo}>{solicitud.tiempo}</span>
        <p className={clases.descripcion}>{solicitud.descripcion}</p>
        <div className={clases.comunes_fila}>
          <span className={clases.comunes_texto}>{solicitud.comunes}</span>
          <GrupoAvatares avatares={solicitud.masAvatares ? 4 : 3} tamano="xs" tono="neutro" resto={solicitud.masAvatares} />
        </div>
      </div>
      <div className={clases.acciones}>
        {aceptada ? (
          <p aria-live="polite" className={clases.aceptada}>{catalogoAmigos.mensajes.solicitud_aceptada_corta}</p>
        ) : (
          <>
            <Boton type="button" variant="primario" size="default" className={clases.boton} onClick={() => setAceptada(true)}>{catalogoAmigos.botones.aceptar}</Boton>
            <Boton type="button" variant="secundario" size="default" className={clases.boton} onClick={() => setEliminada(true)}>{catalogoAmigos.botones.eliminar}</Boton>
          </>
        )}
      </div>
    </article>
  )
}
