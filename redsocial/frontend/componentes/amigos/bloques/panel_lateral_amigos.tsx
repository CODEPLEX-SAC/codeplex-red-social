import type { ReactNode } from 'react'
import { Icono } from '../../compartido/icono'
import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import type { IconName } from '../../../tipos/compartido/icono'

export function PanelLateralAmigos({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[#eee] bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold text-texto">{titulo}</h3>
        <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todas</a>
      </div>
      {children}
    </section>
  )
}

export function FilaPersonaConocer({ nombre, comunes }: { nombre: string; comunes: string }) {
  return (
    <article className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
      <img className="h-9 w-9 flex-none rounded-full object-cover" src={usuarioImg} alt="" />
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-texto">{nombre}</span>
        <span className="text-[11px] text-texto-suave">{comunes}</span>
      </div>
      <button type="button" className="flex-none whitespace-nowrap rounded-md border border-borde bg-white px-3 py-1.25 text-[11px] font-semibold text-texto hover:border-primario hover:bg-[#f5f3ff] hover:text-primario">
        Agregar
      </button>
    </article>
  )
}

export function FilaListaLateral({ icono, color, nombre, miembros }: { icono: IconName; color: string; nombre: string; miembros: string }) {
  return (
    <article className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
      <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px]" style={{ background: color }}>
        <Icono name={icono} className="h-[17px] w-[17px] text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-texto">{nombre}</span>
        <span className="text-[11px] text-texto-suave">{miembros}</span>
      </div>
    </article>
  )
}

export function FilaActividadReciente({ nombre, accion, tiempo }: { nombre: string; accion: string; tiempo: string }) {
  return (
    <article className="flex items-start gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
      <img className="h-8 w-8 flex-none rounded-full object-cover" src={usuarioImg} alt="" />
      <div className="min-w-0 flex-1 text-xs leading-[1.4] text-texto">
        <strong className="font-semibold">{nombre}</strong> {accion}
        <span className="mt-0.5 block text-[11px] text-texto-suave">{tiempo}</span>
      </div>
    </article>
  )
}
