import { AccionesSolicitud } from './acciones_solicitud'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import type { FilaSolicitudAvisoProps } from '@/tipos/avisos/contrato_solicitud_aviso'

export function FilaNovedadSolicitud({ miniatura: m, titulo, lineaSecundaria, lineaTerciaria, tiempo, accionPrimaria, accionSecundaria }: FilaSolicitudAvisoProps) {
  return (
    <article className="flex items-center gap-3 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo max-800:flex-wrap">
      {m.tipo === 'avatar' && <AvatarUsuario tamano="lg" imagen={usuarioImg} />}
      {m.tipo === 'icono' && (
        <SuperficieColor degradado={m.color} className="grid h-12 w-12 flex-none place-items-center rounded-lg text-white">
          <Icono name={m.icono} className="h-5 w-5" />
        </SuperficieColor>
      )}
      {m.tipo === 'calendario' && (
        <SuperficieColor degradado={m.color} className="grid h-12 w-12 flex-none place-items-center rounded-lg text-white">
          <div className="text-center leading-none">
            <span className="block text-dia-evento">{m.dia}</span>
            <span className="mt-0.5 block text-mes-evento uppercase">{m.mes}</span>
          </div>
        </SuperficieColor>
      )}

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-subtitulo text-texto">{titulo}</strong>
        <span className="mt-0.5 block truncate text-auxiliar text-texto-suave">{lineaSecundaria}</span>
        {lineaTerciaria && <span className="mt-0.5 block truncate text-auxiliar text-texto-suave">{lineaTerciaria}</span>}
      </div>

      <span className="flex-none whitespace-nowrap text-fecha-abreviada text-texto-suave max-800:order-1 max-800:ml-15">{tiempo}</span>

      <div className={catalogoAvisos.clases_solicitud.fila_acciones}>
        <AccionesSolicitud primaria={accionPrimaria} secundaria={accionSecundaria} />
      </div>
    </article>
  )
}
