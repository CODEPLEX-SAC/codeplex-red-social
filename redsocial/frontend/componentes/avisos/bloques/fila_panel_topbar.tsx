import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { FilaPanelTopbarProps } from '@/tipos/avisos/contrato_notificaciones_topbar'

void catalogoAvisos

export function FilaPanelTopbar({ aviso: n, claseIcono }: FilaPanelTopbarProps) {
  return (
    <article className="flex items-start gap-2.5 border-b border-borde-suave p-3 last:border-b-0 hover:bg-fondo">
      {n.tipo === 'avatar' ? (
        <span className="relative flex-none">
          <AvatarImagen src={usuarioImg} className="h-9 w-9 rounded-full bg-primario-suave" />
          {n.conInsigniaIcono && (
            <span className={`absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-white ${claseIcono}`}>
              <Icono name={n.icono} className="h-3 w-3" />
            </span>
          )}
        </span>
      ) : (
        <div className={`grid h-9 w-9 flex-none place-items-center rounded-full ${claseIcono}`}>
          <Icono name={n.icono} className="h-4 w-4" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-cuerpo text-texto">
          <span className="font-titulo text-texto">{n.nombreUsuario}</span>
          {n.nombreGrupo && <span className="font-titulo text-primario"> {n.nombreGrupo}</span>}
          {n.accion && <span className="text-texto-suave"> {n.accion}</span>}
        </p>
        {n.detalle && <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{n.detalle}</p>}
        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{n.tiempo}</span>
      </div>

      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primario" />
    </article>
  )
}
