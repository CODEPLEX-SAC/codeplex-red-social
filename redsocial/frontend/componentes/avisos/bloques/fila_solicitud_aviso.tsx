import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { FilaSolicitudAvisoProps } from '@/tipos/avisos/contrato_solicitud_aviso'

export function FilaSolicitudAviso({ miniatura: m, titulo, lineaSecundaria, lineaTerciaria, tiempo, accionPrimaria, accionSecundaria }: FilaSolicitudAvisoProps) {
  return (
    <article className="flex items-center gap-3 border-b border-t-f0eef5 p-3.5 last:border-b-0 hover:bg-t-fdfcff max-800:flex-wrap">
      {m.tipo === 'avatar' && <AvatarImagen src={usuarioImg} className="h-12 w-12 flex-none rounded-full bg-primario-suave" />}
      {m.tipo === 'icono' && (
        <SuperficieColor degradado={m.color} className="grid h-12 w-12 flex-none place-items-center rounded-lg text-white">
          <Icono name={m.icono} className="h-5 w-5" />
        </SuperficieColor>
      )}
      {m.tipo === 'calendario' && (
        <SuperficieColor degradado={m.color} className="grid h-12 w-12 flex-none place-items-center rounded-lg text-white">
          <div className="text-center leading-none">
            <span className="block text-dia-evento font-extrabold">{m.dia}</span>
            <span className="mt-0.5 block text-mes-evento font-bold uppercase">{m.mes}</span>
          </div>
        </SuperficieColor>
      )}

      <div className="min-w-0 flex-1">
        <strong className="block truncate text-subtitulo text-texto">{titulo}</strong>
        <span className="mt-0.5 block truncate text-auxiliar text-texto-suave">{lineaSecundaria}</span>
        {lineaTerciaria && <span className="mt-0.5 block truncate text-auxiliar text-texto-suave">{lineaTerciaria}</span>}
      </div>

      <span className="flex-none whitespace-nowrap text-fecha-abreviada text-texto-suave max-800:order-1 max-800:ml-15">{tiempo}</span>

      <div className="flex flex-none items-center gap-2 max-800:order-3 max-800:ml-15 max-800:mt-1">
        <Boton type="button" variant="primario" size="mini">
          {accionPrimaria}
        </Boton>
        <Boton type="button" variant="secundario" size="mini">
          {accionSecundaria}
        </Boton>
      </div>

      <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none max-800:order-2" />
    </article>
  )
}
