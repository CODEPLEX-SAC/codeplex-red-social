import { Icono } from '../icono'
import { SESION_ACTUAL } from '../../../datos/compartido/sesion_actual'
import { NAV_PRINCIPAL } from '../../../datos/compartido/navegacion'
import mensajesGlobales from '../../../mensajes/globales/textos.json'
import type { BarraSuperiorProps } from '@/tipos/compartido/barra_superior'

const INSIGNIA_AVISOS = NAV_PRINCIPAL.find((item) => item.clave === 'avisos')?.insignia
const NOMBRE_MARCA = mensajesGlobales.MARCA
const INICIAL_MARCA = NOMBRE_MARCA.charAt(0)

export function BarraSuperior({ onAlternarSidebar, colapsado = false }: BarraSuperiorProps) {
  return (
    <header className="flex h-16 items-center gap-md border-b border-borde bg-superficie px-md">
      <div className={'flex flex-none items-center overflow-hidden max-[800px]:w-auto ' + (colapsado ? 'w-19 justify-center gap-0' : 'w-60 gap-sm')}>
        <button
          type="button"
          aria-label={mensajesGlobales.ABRIR_O_CERRAR_MENU}
          onClick={onAlternarSidebar}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-control border-0 bg-transparent"
        >
          <Icono name="menu-hamburguesa" />
        </button>

        <a href="01-01-inicio-web.html" className="flex items-center gap-sm text-texto no-underline">
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-control bg-primario font-bold text-white">
            {INICIAL_MARCA}
          </span>
          {!colapsado && <span className="font-extrabold tracking-wide">{mensajesGlobales.MARCA}</span>}
        </a>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-sm max-[800px]:hidden">
        <label className="flex min-w-0 flex-1 items-center gap-sm rounded-control border border-borde px-sm max-w-[300px] h-[var(--control-height)]">
          <Icono name="buscar" className="text-texto-suave" />
          <input
            type="search"
            placeholder={mensajesGlobales.BUSCAR_EN_CODEPLEX}
            aria-label={mensajesGlobales.BUSCAR}
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
            <strong className="block truncate text-[11px]">{SESION_ACTUAL.empresa}</strong>
            <span className="block truncate text-[9.5px] text-texto-suave">{SESION_ACTUAL.ruc}</span>
          </span>
          <Icono name="flecha-abajo" className="flex-none text-texto-suave w-[13px] h-[13px]" />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-sm max-[800px]:gap-1.5">
        <button type="button" aria-label={mensajesGlobales.CREAR} className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-primario text-white">
          <Icono name="mas" />
        </button>
        <button type="button" aria-label={mensajesGlobales.AMIGOS} className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent max-[800px]:hidden">
          <Icono name="amigos" />
        </button>
        <button type="button" aria-label={mensajesGlobales.MENSAJES} className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent">
          <Icono name="mensajes" />
        </button>
        <button type="button" aria-label={mensajesGlobales.AVISO_CAMPANA} className="relative flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent">
          <Icono name="campana" />
          <span className="absolute right-0 top-0 rounded-full bg-primario px-1 text-[8px] font-extrabold text-white">{INSIGNIA_AVISOS}</span>
        </button>
        <button type="button" aria-label={mensajesGlobales.MODULOS} className="flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent max-[800px]:hidden">
          <Icono name="cuadricula" />
        </button>
        <button type="button" className="flex items-center gap-xs rounded-full border-0 bg-transparent px-sm py-1 max-[800px]:p-1">
          <span className="h-8 w-8 rounded-full bg-borde" />
          <strong className="text-xs max-[800px]:hidden">{SESION_ACTUAL.usuario}</strong>
          <Icono name="flecha-abajo" className="flex-none text-texto-suave max-[800px]:hidden w-[13px] h-[13px]" />
        </button>
      </div>
    </header>
  )
}
