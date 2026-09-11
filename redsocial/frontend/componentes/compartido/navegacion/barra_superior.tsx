import { Icono } from '../icono'
import type { BarraSuperiorProps } from '@/tipos/compartido/barra_superior'

export function BarraSuperior({ onAlternarSidebar, colapsado = false }: BarraSuperiorProps) {
  return (
    <header className="flex h-16 items-center gap-md border-b border-borde bg-superficie px-md">
      <div className={'flex flex-none items-center overflow-hidden max-[800px]:w-auto ' + (colapsado ? 'w-19 justify-center gap-0' : 'w-60 gap-sm')}>
        <button
          type="button"
          aria-label="Abrir o cerrar menú"
          onClick={onAlternarSidebar}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-control border-0 bg-transparent"
        >
          <Icono name="menu-hamburguesa" />
        </button>

        <a href="01-01-inicio-web.html" className="flex items-center gap-sm text-texto no-underline">
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-control bg-primario font-bold text-white">
            C
          </span>
          {!colapsado && <span className="font-extrabold tracking-wide">CODEPLEX</span>}
        </a>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-sm max-[800px]:hidden">
        <label className="flex min-w-0 flex-1 items-center gap-sm rounded-control border border-borde px-sm" style={{ maxWidth: 300, height: 'var(--control-height)' }}>
          <Icono name="buscar" className="text-texto-suave" />
          <input
            type="search"
            placeholder="Buscar en Codeplex..."
            aria-label="Buscar"
            className="w-full border-0 bg-transparent text-sm outline-none"
          />
        </label>

        <button
          type="button"
          className="flex min-w-0 items-center gap-sm rounded-control border border-borde bg-superficie px-sm py-1 text-left max-[1100px]:hidden"
        >
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-control bg-primario-suave text-primario">
            <Icono name="empresa" />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-[11px]">Constructora del Norte SAC</strong>
            <span className="block truncate text-[9.5px] text-texto-suave">RUC 20501234567</span>
          </span>
          <Icono name="flecha-abajo" className="flex-none text-texto-suave" style={{ width: 13, height: 13 }} />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-sm max-[800px]:gap-1.5">
        <button type="button" aria-label="Crear" className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-primario text-white">
          <Icono name="mas" />
        </button>
        <button type="button" aria-label="Amigos" className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent max-[800px]:hidden">
          <Icono name="amigos" />
        </button>
        <button type="button" aria-label="Mensajes" className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent">
          <Icono name="mensajes" />
        </button>
        <button type="button" aria-label="Notificaciones" className="relative flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent">
          <Icono name="notificaciones" />
          <span className="absolute right-0 top-0 rounded-full bg-primario px-1 text-[8px] font-extrabold text-white">3</span>
        </button>
        <button type="button" aria-label="Módulos" className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent max-[800px]:hidden">
          <Icono name="cuadricula" />
        </button>
        <button type="button" className="flex items-center gap-xs rounded-full border-0 bg-transparent px-sm py-1 max-[800px]:p-1">
          <span className="h-8 w-8 rounded-full bg-borde" />
          <strong className="text-xs max-[800px]:hidden">Pedro Lozano</strong>
          <Icono name="flecha-abajo" className="flex-none text-texto-suave max-[800px]:hidden" style={{ width: 13, height: 13 }} />
        </button>
      </div>
    </header>
  )
}
