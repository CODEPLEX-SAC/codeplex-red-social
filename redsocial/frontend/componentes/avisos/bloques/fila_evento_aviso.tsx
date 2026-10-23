import { Menu } from '../../compartido/interfaz/menu'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { FilaEventoAvisoProps } from '@/tipos/avisos/contrato_evento_aviso'

export function FilaEventoAviso({ evento: e, claseIcono }: FilaEventoAvisoProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  return (
    <article className="flex items-start gap-3 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo">
      {e.avatar ? (
        <AvatarUsuario tamano="md" imagen={usuarioImg} insignia={e.conInsigniaIcono ? <Icono name={e.icono} className="h-3 w-3" /> : undefined} claseInsignia={claseIcono} />
      ) : (
        <div className={`grid h-10 w-10 flex-none place-items-center ${e.forma === 'cuadrado' ? 'rounded-md' : 'rounded-full'} ${claseIcono}`}>
          <Icono name={e.icono} className="h-4.5 w-4.5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-nombre-entidad text-texto">{e.titulo}</p>
        <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{e.detalle}</p>
        {e.detalleSecundario && <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{e.detalleSecundario}</p>}
        <span className="mt-1 block text-fecha-abreviada text-texto-suave">{e.tiempo}</span>
      </div>

      {e.accion === 'invitacion' && (
        <div className="flex flex-none items-center gap-2">
          <Boton type="button" variant="primario" size="default">
            {catalogoAvisos.botones.aceptar}
          </Boton>
          <Boton type="button" variant="secundario" size="default">
            {catalogoAvisos.botones.rechazar}
          </Boton>
        </div>
      )}

      {e.accion === 'ver_evento' && (
        <Boton type="button" variant="secundario" size="default" className="flex-none">
          {catalogoAvisos.botones.ver_evento}
        </Boton>
      )}

      <div className="flex-none">
        <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} onClick={(evento) => setAncla(evento.currentTarget)} variant="discreto" size="sm" className="flex-none" />
        <Menu
          ancla={ancla}
          alCerrar={() => setAncla(null)}
          elementos={[
            { icono: 'ver', etiqueta: catalogoAvisos.menu_evento.ver_evento },
            { icono: 'verificado', etiqueta: catalogoAvisos.menu_evento.marcar_como_leida },
            { icono: 'silenciado', etiqueta: catalogoAvisos.menu_evento.silenciar_este_tipo },
            { icono: 'eliminar', etiqueta: catalogoAvisos.menu_evento.eliminar_notificacion, peligro: true },
          ]}
        />
      </div>
    </article>
  )
}
