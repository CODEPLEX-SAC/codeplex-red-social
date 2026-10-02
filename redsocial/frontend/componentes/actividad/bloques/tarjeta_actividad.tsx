import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { TarjetaActividadProps } from '@/tipos/actividad/contrato_actividad_item'

export function TarjetaActividad({
  iconoSistema,
  nombreUsuario,
  accion,
  nombreGrupo,
  nombreModulo,
  tiempo,
  visibilidad,
  children,
  interacciones,
}: TarjetaActividadProps) {
  return (
    <article className="flex gap-2.5 border-b border-t-f0eef5 p-3.5 last:border-b-0 hover:bg-t-fdfcff">
      {iconoSistema ? (
        <div className="grid h-9 w-9 flex-none place-items-center rounded-control bg-t-e8f5e9 text-t-2e7d32">
          <Icono name={iconoSistema} className="h-5.5 w-5.5" />
        </div>
      ) : (
        <AvatarImagen src={usuarioImg} className="h-9 w-9 flex-none overflow-hidden rounded-full bg-primario-suave" />
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-0 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 text-cuerpo">
            <span className="font-bold text-texto">{nombreUsuario}</span>
            {accion && <span className="text-texto-suave">{accion}</span>}
            {nombreGrupo && <span className="font-bold text-primario">{nombreGrupo}</span>}
            {nombreModulo && <span className="font-bold text-texto">{nombreModulo}</span>}
          </div>
          <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
        </div>
        <div className="mb-1 flex items-center gap-1">
          <span className="whitespace-nowrap text-fecha-abreviada text-t-aaa7b5">{tiempo}</span>
          {visibilidad && (
            <span className="grid h-3 w-3 place-items-center text-t-c4c0d3">
              <Icono name="mundo" className="h-2.5 w-2.5" />
            </span>
          )}
        </div>
        {children}
        {interacciones && (
          <div className="mt-0.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <span className="-ml-0 grid h-4.5 w-4.5 place-items-center rounded-full border-1.5 border-white bg-t-e3f2fd text-2.5">👍</span>
                <span className="-ml-0.75 grid h-4.5 w-4.5 place-items-center rounded-full border-1.5 border-white bg-t-fce4ec text-2.5">❤️</span>
                <span className="-ml-0.75 grid h-4.5 w-4.5 place-items-center rounded-full border-1.5 border-white bg-t-fff8e1 text-2.5">😄</span>
              </div>
              <span className="ml-1 text-contador text-texto-suave">{interacciones.reacciones}</span>
            </div>
            <Boton type="button" variant="enlace" size="enlace">
              {interacciones.comentarios} {interacciones.comentarios === 1 ? 'comentario' : 'comentarios'}
            </Boton>
          </div>
        )}
      </div>
    </article>
  )
}
