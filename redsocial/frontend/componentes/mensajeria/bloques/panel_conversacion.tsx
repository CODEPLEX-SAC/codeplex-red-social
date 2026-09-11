import { Icono } from '../../compartido/icono'
import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import type { IconName } from '../../../tipos/compartido/icono'
import type { PanelConversacionProps } from '@/tipos/mensajeria/panel_conversacion'

export function PanelConversacion({ conversacion, onVolver, oculta }: PanelConversacionProps) {
  return (
    <section data-zona="panel-conversacion" className={'grid min-h-0 min-w-0 grid-cols-1 grid-rows-[auto_auto_1fr_auto] rounded-[10px] border border-borde ' + (oculta ? 'max-[900px]:hidden' : '')}>
      <header className="flex items-center gap-2.5 rounded-t-[10px] border-b border-borde bg-white px-4.5 py-3">
        <button
          type="button"
          aria-label="Volver a la lista de conversaciones"
          onClick={onVolver}
          className="hidden h-8 w-8 flex-none items-center justify-center rounded-full border-0 bg-transparent text-texto-suave hover:bg-[#f7f6fa] hover:text-primario max-[900px]:flex"
        >
          <Icono name="flecha-izquierda" className="h-[18px] w-[18px]" />
        </button>
        <span
          className="h-10 w-10 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${usuarioImg})` }}
        />
        <div className="min-w-0 flex-1">
          <strong className="block text-[13px] font-bold text-texto">{conversacion.nombre}</strong>
          {conversacion.enLinea && (
            <span className="mt-0.5 flex items-center gap-1.25 text-[11px] text-exito">
              <span className="h-1.5 w-1.5 rounded-full bg-exito" /> En línea
            </span>
          )}
        </div>
        <div className="flex flex-none gap-1.5">
          <button type="button" aria-label="Videollamada" className="grid h-8.5 w-8.5 place-items-center rounded-full border border-borde bg-white text-texto-suave hover:border-primario hover:bg-[#f7f6fa] hover:text-primario">
            <Icono name="video" className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Llamada" className="grid h-8.5 w-8.5 place-items-center rounded-full border border-borde bg-white text-texto-suave hover:border-primario hover:bg-[#f7f6fa] hover:text-primario">
            <Icono name="llamada" className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Información" className="grid h-8.5 w-8.5 place-items-center rounded-full border border-borde bg-white text-texto-suave hover:border-primario hover:bg-[#f7f6fa] hover:text-primario">
            <Icono name="informacion" className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex items-start gap-2.5 border-b border-borde bg-[#faf9fc] px-4.5 py-3">
        <div className="min-w-0 flex-1">
          <strong className="mb-0.5 flex items-center gap-1.25 text-[11px] font-bold text-texto">
            <Icono name="fijar" className="h-[13px] w-[13px] text-primario" /> Mensaje fijado
          </strong>
          <p className="m-0 text-[11px] text-texto-suave">{conversacion.mensajeFijado}</p>
        </div>
        <button type="button" aria-label="Cerrar" className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full border-0 bg-transparent text-[#b3b0c2] hover:bg-black/[.06]">
          <Icono name="cerrar" className="h-3 w-3" />
        </button>
      </div>

      <div className="min-h-0 min-w-0 overflow-y-auto bg-[#fbfaff] p-5">
        {conversacion.hilo.map((m, i) => {
          const meta = (m.hora || m.confirmado) && (
            <span className="flex items-center gap-1 text-[11px] text-texto-suave">
              {m.hora}
              {m.confirmado && <span className="text-primario">✓✓</span>}
            </span>
          )
          return (
            <div key={i}>
              {m.fecha && <div className="my-4 mb-2.5 text-center text-[10px] text-[#aaa7b5]">{m.fecha}</div>}
              <div className={'mb-2 flex max-w-[75%] flex-col gap-0.5 ' + (m.propio ? 'ml-auto items-end text-right' : 'items-start')}>
                {m.propio && meta}
                {m.contenido && (
                  <div
                    className={
                      'my-1.5 max-w-full rounded-xl px-3.5 py-2.5 text-xs leading-[1.5] ' +
                      (m.propio ? 'rounded-tr-[4px] bg-primario text-white' : 'rounded-tl-[4px] border border-borde bg-white text-texto')
                    }
                  >
                    {m.contenido}
                  </div>
                )}
                {m.adjunto && (
                  <div className="my-2 flex items-center gap-2.5 rounded-[10px] border border-borde bg-white px-3.5 py-2.5">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-[#fdeceb] text-[#dc2626]">
                      <Icono name="caja" className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-[11px] font-semibold text-texto">{m.adjunto.nombre}</strong>
                      <span className="block text-[10px] text-texto-suave">{m.adjunto.peso}</span>
                    </span>
                    <button type="button" aria-label="Descargar" className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full border border-borde bg-white text-texto-suave hover:bg-[#f7f6fa] hover:text-primario">
                      <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                {!m.propio && meta}
                {m.reaccion && (
                  <div className="mt-1 flex gap-1">
                    <span className="inline-flex items-center gap-0.75 rounded-xl border border-borde bg-white px-2 py-0.5 text-xs">
                      {m.reaccion.emoji} <span className="text-[10px] text-texto-suave">{m.reaccion.cantidad}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <form className="flex items-center gap-2 rounded-b-[10px] border-t border-borde bg-white px-4.5 py-3">
        <input type="text" placeholder="Escribe un mensaje..." aria-label="Mensaje" className="h-[38px] min-w-0 flex-1 rounded-2xl border border-borde px-3.5 text-xs outline-none focus:border-primario" />
        <div className="flex flex-none gap-1">
          <button type="button" aria-label="Adjuntar archivo" className="grid h-8 w-8 place-items-center rounded-full border-0 bg-transparent text-texto-suave hover:bg-[#f7f6fa] hover:text-primario">
            <Icono name="adjuntar" className="h-4.5 w-4.5" />
          </button>
          <button type="button" aria-label="Enviar imagen" className="grid h-8 w-8 place-items-center rounded-full border-0 bg-transparent text-texto-suave hover:bg-[#f7f6fa] hover:text-primario">
            <Icono name="imagen" className="h-4.5 w-4.5" />
          </button>
          <button type="button" aria-label="Emojis" className="grid h-8 w-8 place-items-center rounded-full border-0 bg-transparent text-texto-suave hover:bg-[#f7f6fa] hover:text-primario">
            <Icono name={'sentimiento' as IconName} className="h-4.5 w-4.5" />
          </button>
          <button type="button" className="rounded-md border border-borde bg-white px-2 py-1 text-[11px] font-bold text-texto-suave hover:border-primario hover:text-primario">GIF</button>
        </div>
        <button type="submit" aria-label="Enviar" className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full border-0 bg-primario text-white hover:opacity-[.88]">
          <Icono name="enviar" className="h-4.5 w-4.5" />
        </button>
      </form>
    </section>
  )
}
