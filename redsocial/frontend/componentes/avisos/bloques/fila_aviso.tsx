import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { Casilla } from '../../compartido/interfaz/casilla'
import { AccionesSolicitud } from './acciones_solicitud'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { FilaAvisoProps } from '@/tipos/avisos/contrato_aviso'

export function FilaNovedad({ aviso: n, claseIcono, seleccionable, leida = n.leida, seleccionada = false, alSeleccionar }: FilaAvisoProps) {
  return (
    <article className="flex items-start gap-3 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo">
      {seleccionable && <Casilla seleccionado={seleccionada} alCambiar={(_, marcada) => alSeleccionar?.(marcada)} inputProps={{ 'aria-label': catalogoAvisos.campos_lista.seleccionar_una.replace(':nombre', n.nombreUsuario) }} />}

      {n.tipo === 'avatar' ? (
        <AvatarUsuario tamano="md" imagen={usuarioImg} insignia={n.conInsigniaIcono ? <Icono name={n.icono} className="h-3 w-3" /> : undefined} claseInsignia={claseIcono} />
      ) : (
        <div className={`grid h-10 w-10 flex-none place-items-center rounded-full ${claseIcono}`}>
          <Icono name={n.icono} className="h-4.5 w-4.5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-subtitulo text-texto">
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
        <AccionesSolicitud primaria="confirmar" secundaria="eliminar" />
      ) : (
        <>
          <span className={'mt-1.5 h-2 w-2 flex-none rounded-full ' + (leida ? 'bg-transparent' : 'bg-primario')} />
        </>
      )}
    </article>
  )
}
