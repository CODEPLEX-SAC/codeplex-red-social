import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { useLayoutEffect, useRef } from 'react'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ListaConversacionesProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

export function ListaConversaciones({ conversaciones, activa, onSeleccionar, oculta, contadorNoLeidos }: ListaConversacionesProps) {
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
        'flex min-h-0 min-w-0 flex-col overflow-hidden rounded-control border border-borde bg-white max-900:rounded-none max-900:border-0 max-900:bg-transparent ' +
        (oculta ? 'max-900:hidden' : '')
      }
    >
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_mensajes} aria-label={catalogoMensajeria.placeholders.buscar_mensajes} className="mx-3.5 mb-2.5 mt-3.5" />

      <div className="flex flex-shrink-0 gap-1 border-b border-borde px-3.5 pb-3.5 pt-2.5">
        <a href={catalogoMensajeria.rutas.todos} className="flex h-7 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl border border-primario bg-primario px-3 text-navegacion font-medium text-white no-underline">{catalogoMensajeria.titulos_pestanas.todos}</a>
        <a href={catalogoMensajeria.rutas.no_leidos} className="flex h-7 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl border border-borde bg-white px-3 text-navegacion font-medium text-texto-suave no-underline hover:bg-t-f7f6fa">
          {catalogoMensajeria.titulos_pestanas.no_leidos} <span className="inline-grid h-4 min-w-4 place-items-center rounded-lg bg-primario px-1 text-contador font-bold leading-none text-white">{contadorNoLeidos}</span>
        </a>
        <a href={catalogoMensajeria.rutas.favoritos} className="flex h-7 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl border border-borde bg-white px-3 text-navegacion font-medium text-texto-suave no-underline hover:bg-t-f7f6fa">{catalogoMensajeria.titulos_pestanas.favoritos}</a>
      </div>

      <div ref={pistaRef} className="min-h-0 flex-1 overflow-y-auto">
        {conversaciones.map((c) => (
          <button
            key={c.nombre}
            type="button"
            onClick={() => alSeleccionar(c.nombre)}
            className={'flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left transition-colors ' + (c.nombre === activa ? 'bg-t-f5f3ff' : 'bg-transparent hover:bg-t-f5f3ff')}
          >
            {c.esGrupo ? (
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primario text-white">
                <Icono name="usuarios" className="h-4 w-4" />
              </span>
            ) : (
              <AvatarImagen src={usuarioImg} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
            )}
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-nombre-entidad font-semibold text-texto">{c.nombre}</strong>
              <small className="mt-0.5 block truncate text-cuerpo text-texto-suave">{c.extracto}</small>
            </span>
            <span className="flex flex-none flex-col items-end gap-1">
              <time className="whitespace-nowrap text-fecha-abreviada text-t-aaa7b5">{c.hora}</time>
              {c.noLeidos !== undefined && (
                <span className="inline-grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primario px-1.25 text-contador font-bold leading-none text-white">{c.noLeidos}</span>
              )}
              {c.silenciado && <Icono name="silenciado" className="h-3.25 w-3.25 text-t-b3b0c2" />}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
