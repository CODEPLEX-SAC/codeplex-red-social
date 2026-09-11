import { Icono } from '../../compartido/icono'
import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import type { TarjetaActividadProps } from '@/tipos/actividad/tarjeta_actividad'

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
    <article className="flex gap-2.5 border-b border-[#f0eef5] p-3.5 last:border-b-0 hover:bg-[#fdfcff]">
      {iconoSistema ? (
        <div className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-[#e8f5e9] text-[#2e7d32]">
          <Icono name={iconoSistema} className="h-[22px] w-[22px]" />
        </div>
      ) : (
        <div
          className="h-9 w-9 flex-none overflow-hidden rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${usuarioImg})` }}
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-0 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 text-xs">
            <span className="font-bold text-texto">{nombreUsuario}</span>
            {accion && <span className="text-texto-suave">{accion}</span>}
            {nombreGrupo && <span className="font-bold text-primario">{nombreGrupo}</span>}
            {nombreModulo && <span className="font-bold text-texto">{nombreModulo}</span>}
          </div>
          <button type="button" aria-label="Más opciones" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-[#f5f3fa] hover:text-texto">
            <Icono name="puntos" className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mb-1 flex items-center gap-1">
          <span className="whitespace-nowrap text-[10px] text-[#aaa7b5]">{tiempo}</span>
          {visibilidad && (
            <span className="grid h-3 w-3 place-items-center text-[#c4c0d3]">
              <Icono name="mundo" className="h-2.5 w-2.5" />
            </span>
          )}
        </div>
        {children}
        {interacciones && (
          <div className="mt-0.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <span className="-ml-0 grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] border-white bg-[#e3f2fd] text-[10px]">👍</span>
                <span className="-ml-[3px] grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] border-white bg-[#fce4ec] text-[10px]">❤️</span>
                <span className="-ml-[3px] grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] border-white bg-[#fff8e1] text-[10px]">😄</span>
              </div>
              <span className="ml-1 text-[11px] text-texto-suave">{interacciones.reacciones}</span>
            </div>
            <button type="button" className="p-0 text-[11px] text-texto-suave hover:text-primario">
              {interacciones.comentarios} {interacciones.comentarios === 1 ? 'comentario' : 'comentarios'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
