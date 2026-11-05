import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { Amigo } from '@/tipos/amigos/modelo_amigos_todos'

const clases = catalogoAmigos.clases.amigo

export function BloqueMensaje({ AMIGOS, alMensaje }: { AMIGOS: Amigo[]; alMensaje?: ((nombre: string) => void) | undefined }) {
  return (
    <div>
      {AMIGOS.length === 0 && <MensajeVacio texto={catalogoAmigos.mensajes.sin_amigos} className={clases.vacio} />}
      {AMIGOS.map((a) => (
        <article key={a.nombre} className={clases.fila}>
          <AvatarUsuario tamano="lg" imagen={usuarioImg} estado={a.enLinea ? 'conectado' : 'desconectado'} />
          <div className={clases.identidad}>
            <strong className={clases.nombre}>{a.nombre}</strong>
            <span className={`${clases.estado} ${a.enLinea ? clases.estado_en_linea : clases.estado_fuera}`}>
              {a.estado}
            </span>
            <span className={clases.comunes_compacto}>{a.comunes}</span>
          </div>
          <div className={clases.comunes_columna}>
            <span className={clases.comunes_texto}>{a.comunes}</span>
            <GrupoAvatares avatares={4} tamano="xs" tono="neutro" resto={a.masAvatares} />
          </div>
          <div className={clases.acciones}>
            <Boton type="button" variant="secundario" size="default" onClick={() => alMensaje?.(a.nombre)}>{catalogoAmigos.botones.mensaje}</Boton>
            <BotonIcono icono="puntos" aria-label={textosRedSocial.MAS_OPCIONES} />
          </div>
        </article>
      ))}
    </div>
  )
}
