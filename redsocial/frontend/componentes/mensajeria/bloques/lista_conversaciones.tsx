import { useLayoutEffect, useRef } from 'react'
import { Icono } from '../../compartido/icono'
import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import type { ListaConversacionesProps } from '@/tipos/mensajeria/lista_conversaciones'

export function ListaConversaciones({ conversaciones, activa, onSeleccionar, oculta }: ListaConversacionesProps) {
  const pistaRef = useRef<HTMLDivElement>(null)
  const scrollGuardado = useRef(0)

  useLayoutEffect(() => {
    if (!oculta && pistaRef.current) {
      pistaRef.current.scrollTop = scrollGuardado.current
    }
  }, [oculta])

  function alSeleccionar(nombre: string) {
    if (pistaRef.current) scrollGuardado.current = pistaRef.current.scrollTop
    onSeleccionar(nombre)
  }

  return (
    <aside
      data-zona="lista-conversaciones"
      className={
        'flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[10px] border border-borde bg-white max-[900px]:rounded-none max-[900px]:border-0 max-[900px]:bg-transparent ' +
        (oculta ? 'max-[900px]:hidden' : '')
      }
    >
      <div className="mx-3.5 mb-2.5 mt-3.5 flex items-center gap-2 rounded-[10px] border border-borde bg-white px-3.5 py-2.25">
        <Icono name="buscar" className="h-4 w-4 flex-none text-texto-suave" />
        <input type="search" placeholder="Buscar mensajes..." aria-label="Buscar mensajes" className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-texto outline-none placeholder:text-texto-suave" />
      </div>

      <div className="flex flex-shrink-0 gap-1 border-b border-borde px-3.5 pb-3.5 pt-2.5">
        <a href="09-04-mensajes-01-todos-web.html" className="flex h-7 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl border border-primario bg-primario px-3 text-[11px] font-medium text-white no-underline">Todos</a>
        <a href="10-04-mensajes-02-no-leidos.html" className="flex h-7 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl border border-borde bg-white px-3 text-[11px] font-medium text-texto-suave no-underline hover:bg-[#f7f6fa]">
          No leídos <span className="inline-grid h-4 min-w-4 place-items-center rounded-lg bg-primario px-1 text-[9px] font-bold leading-none text-white">5</span>
        </a>
        <a href="11-04-mensajes-03-favoritos.html" className="flex h-7 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl border border-borde bg-white px-3 text-[11px] font-medium text-texto-suave no-underline hover:bg-[#f7f6fa]">Favoritos</a>
      </div>

      <div ref={pistaRef} className="min-h-0 flex-1 overflow-y-auto">
        {conversaciones.map((c) => (
          <button
            key={c.nombre}
            type="button"
            onClick={() => alSeleccionar(c.nombre)}
            className={'flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left transition-colors ' + (c.nombre === activa ? 'bg-[#f5f3ff]' : 'bg-transparent hover:bg-[#f5f3ff]')}
          >
            {c.esGrupo ? (
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primario text-white">
                <Icono name="usuarios" className="h-4 w-4" />
              </span>
            ) : (
              <span
                className="h-10 w-10 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${usuarioImg})` }}
              />
            )}
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-xs font-semibold text-texto">{c.nombre}</strong>
              <small className="mt-0.5 block truncate text-[11px] text-texto-suave">{c.extracto}</small>
            </span>
            <span className="flex flex-none flex-col items-end gap-1">
              <time className="whitespace-nowrap text-[10px] text-[#aaa7b5]">{c.hora}</time>
              {c.noLeidos !== undefined && (
                <span className="inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primario px-1.25 text-[9px] font-bold leading-none text-white">{c.noLeidos}</span>
              )}
              {c.silenciado && <Icono name="silenciado" className="h-[13px] w-[13px] text-[#b3b0c2]" />}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
