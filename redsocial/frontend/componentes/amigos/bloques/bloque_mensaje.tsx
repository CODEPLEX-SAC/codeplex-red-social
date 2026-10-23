import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { Amigo } from '@/tipos/amigos/modelo_amigos_todos'

export function BloqueMensaje({ AMIGOS }: { AMIGOS: Amigo[] }) {
  return (
    <div>
      {AMIGOS.length === 0 && <MensajeVacio texto={catalogoAmigos.mensajes.sin_amigos} className="col-span-full py-8" />}
      {AMIGOS.map((a) => (
        <article key={a.nombre} className="flex items-center gap-3.5 border-b border-borde py-3.5 last:border-b-0">
          <AvatarUsuario tamano="lg" imagen={usuarioImg} estado={a.enLinea ? 'conectado' : 'desconectado'} />
          <div className="w-42.5 min-w-0 shrink max-900:w-32.5">
            <strong className="block truncate text-nombre-entidad text-texto">{a.nombre}</strong>
            <span className={'mt-0.75 block text-badge ' + (a.enLinea ? 'text-exito-texto' : 'text-texto-suave')}>
              {a.estado}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2.5 max-900:hidden">
            <span className="whitespace-nowrap text-auxiliar text-texto-suave">{a.comunes}</span>
            <GrupoAvatares avatares={4} tamano="xs" tono="neutro" resto={a.masAvatares} />
          </div>
          <div className="flex flex-none items-center gap-2">
            <Boton variant="secundario" size="mini">{catalogoAmigos.botones.mensaje}</Boton>
            <BotonIcono icono="puntos" aria-label={textosRedSocial.MAS_OPCIONES} />
          </div>
        </article>
      ))}
    </div>
  )
}
