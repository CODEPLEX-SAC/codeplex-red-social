import { Boton } from '../../compartido/interfaz/boton'
import { AccionesSolicitud } from './acciones_solicitud'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { FilaEventoAvisoProps } from '@/tipos/avisos/contrato_evento_aviso'

export function FilaNovedadEvento({ evento: e, claseIcono }: FilaEventoAvisoProps) {
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
        <p className="m-0 text-nombre-fila text-texto">{e.titulo}</p>
        <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{e.detalle}</p>
        {e.detalleSecundario && <p className="m-0 mt-0.5 truncate text-auxiliar text-texto-suave">{e.detalleSecundario}</p>}
        <span className="mt-1 block text-fecha-abreviada text-texto-suave">{e.tiempo}</span>
      </div>

      {e.accion === 'invitacion' && <AccionesSolicitud primaria="aceptar" secundaria="rechazar" contexto="invitacion" />}

      {e.accion === 'ver_evento' && (
        <Boton type="button" variant="secundario" size="default" className="flex-none">
          {catalogoAvisos.botones.ver_evento}
        </Boton>
      )}
    </article>
  )
}
