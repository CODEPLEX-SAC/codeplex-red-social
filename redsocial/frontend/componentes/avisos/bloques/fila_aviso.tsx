import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { FilaAvisoProps } from '@/tipos/avisos/contrato_aviso'

export function FilaAviso({ aviso: n, claseIcono, seleccionable }: FilaAvisoProps) {
  return (
    <article className="flex items-start gap-3 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo">
      {seleccionable && <Casilla />}

      {n.tipo === 'avatar' ? (
        <AvatarUsuario tamano="md" imagen={usuarioImg} insignia={n.conInsigniaIcono ? <Icono name={n.icono} className="h-3 w-3" /> : undefined} claseInsignia={claseIcono} />
      ) : (
        <div className={`grid h-10 w-10 flex-none place-items-center rounded-full ${claseIcono}`}>
          <Icono name={n.icono} className="h-4.5 w-4.5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-cuerpo text-texto">
          <span className="font-titulo text-texto">{n.nombreUsuario}</span>
          {n.nombreGrupo && <span className="font-titulo text-primario"> {n.nombreGrupo}</span>}
          {n.accion && <span className="text-texto-suave"> {n.accion}</span>}
        </p>
        {n.detalle && <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{n.detalle}</p>}
        <span className="mt-1 block text-fecha-abreviada text-texto-suave">{n.tiempo}</span>
      </div>

      {n.avataresExtra !== undefined && (
        <GrupoAvatares avatares={2} tamano="xs" resto={`+${n.avataresExtra}`} className="flex-none" />
      )}

      {n.solicitud ? (
        <div className="flex flex-none items-center gap-2">
          <Boton type="button" variant="primario" size="default">
            {catalogoAvisos.botones.confirmar}
          </Boton>
          <Boton type="button" variant="secundario" size="default">
            {catalogoAvisos.botones.eliminar}
          </Boton>
        </div>
      ) : (
        <>
          <span className={'mt-1.5 h-2 w-2 flex-none rounded-full ' + (n.leida ? 'bg-transparent' : 'bg-primario')} />
          <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
        </>
      )}
    </article>
  )
}
