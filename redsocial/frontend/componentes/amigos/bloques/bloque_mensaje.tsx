import { posicionesDe } from '../../compartido/posiciones'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { Amigo } from '@/tipos/amigos/modelo_amigos_todos'

export function BloqueMensaje({ AMIGOS }: { AMIGOS: Amigo[] }) {
  return (
    <div>
      {AMIGOS.map((a) => (
        <article key={a.nombre} className="flex items-center gap-3.5 border-b border-borde py-3.5 last:border-b-0">
          <AvatarImagen src={usuarioImg} className="h-12 w-12 flex-none rounded-full bg-primario-suave" />
          <div className="w-42.5 min-w-0 flex-none max-900:w-32.5">
            <strong className="block truncate text-nombre-entidad text-texto">{a.nombre}</strong>
            <span className={'mt-0.75 flex items-center gap-1.25 text-etiqueta-estado before:h-1.5 before:w-1.5 before:flex-none before:rounded-full ' + (a.enLinea ? 'text-exito before:bg-exito' : 'text-texto-suave before:bg-t-c7c4d6')}>
              {a.estado}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2.5 max-900:hidden">
            <span className="whitespace-nowrap text-auxiliar text-texto-suave">{a.comunes}</span>
            <div className="flex items-center">
              {posicionesDe(4).map((posicion) => (
                <AvatarImagen
                  key={posicion.id}
                  src={usuarioImg}
                  className={'h-5.5 w-5.5 rounded-full border-2 border-white bg-primario-suave ' + (posicion.orden > 0 ? '-ml-2' : '')}
                />
              ))}
              <span className="-ml-2 grid h-5.5 w-5.5 place-items-center rounded-full border-2 border-white bg-t-efedf7 text-contador font-bold text-texto-suave">{a.masAvatares}</span>
            </div>
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
