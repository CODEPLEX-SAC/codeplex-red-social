import { useState } from 'react'
import { AvatarUsuario, Boton, GrupoAvatares, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { idPerfilDeNombre } from './logica_amigos'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { TarjetaSugerenciaProps } from '@/tipos/amigos/contrato_sugerencias'

const clases = catalogoAmigos.clases.sugerencia
const botones = catalogoAmigos.botones

export function TarjetaSugerencia({ sugerencia }: TarjetaSugerenciaProps) {
  const [enviada, setEnviada] = useState(false)
  const [suprimida, setSuprimida] = useState(false)
  const idPerfil = idPerfilDeNombre(sugerencia.nombre)

  if (suprimida) return null

  return (
    <article className={clases.tarjeta}>
      <EnlacePerfilUsuario autorId={idPerfil} nombre={sugerencia.nombre} className={clases.enlace_avatar}>
        <AvatarUsuario tamano="xl" imagen={usuarioImg} estado={sugerencia.enLinea ? 'conectado' : undefined} />
      </EnlacePerfilUsuario>
      <div className={clases.cuerpo}>
        <strong className={clases.nombre}>
          <EnlacePerfilUsuario autorId={idPerfil} nombre={sugerencia.nombre}>{sugerencia.nombre}</EnlacePerfilUsuario>
        </strong>
        <p className={clases.descripcion}>{sugerencia.descripcion}</p>
        <div className={clases.comunes_fila}>
          <GrupoAvatares avatares={3} tamano="xs" tono="neutro" />
          <span className={clases.comunes_texto}>{sugerencia.comunes}</span>
        </div>
      </div>
      <div className={clases.acciones}>
        {enviada ? (
          <Boton type="button" variant="secundario" size="default" className={clases.boton} onClick={() => setEnviada(false)}>{botones.cancelar_solicitud}</Boton>
        ) : (
          <>
            <Boton type="button" variant="primario" size="default" className={clases.boton} onClick={() => setEnviada(true)}>{botones.anadir_amigo}</Boton>
            <Boton type="button" variant="secundario" size="default" className={clases.boton} onClick={() => setSuprimida(true)}>{botones.suprimir}</Boton>
          </>
        )}
      </div>
    </article>
  )
}
