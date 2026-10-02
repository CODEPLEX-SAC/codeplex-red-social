import { Boton } from '../../compartido/interfaz/boton'
import type { ReactNode } from 'react'
import { Icono } from '../../compartido/icono'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { IconName } from '../../../tipos/compartido/contrato_icono'

export function PanelLateralAmigos({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-t-eeeeee bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="m-0 text-titulo-seccion font-bold text-texto">{titulo}</h3>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
      </div>
      {children}
    </section>
  )
}

export function FilaPersonaConocer({ nombre, comunes }: { nombre: string; comunes: string }) {
  return (
    <article className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2.25 last:border-b-0">
      <img className="h-9 w-9 flex-none rounded-full object-cover" src={usuarioImg} alt="" />
      <div className="min-w-0 flex-1">
        <span className="block text-nombre-entidad font-semibold text-texto">{nombre}</span>
        <span className="text-auxiliar text-texto-suave">{comunes}</span>
      </div>
      <Boton type="button" variant="secundario" size="mini" className="flex-none">
        Agregar
      </Boton>
    </article>
  )
}

export function FilaListaLateral({ icono, color, nombre, miembros }: { icono: IconName; color: string; nombre: string; miembros: string }) {
  return (
    <article className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2.25 last:border-b-0">
      <SuperficieColor variante={color} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-9">
        <Icono name={icono} className="h-4.25 w-4.25 text-white" />
      </SuperficieColor>
      <div className="min-w-0 flex-1">
        <span className="block text-nombre-entidad font-semibold text-texto">{nombre}</span>
        <span className="text-auxiliar text-texto-suave">{miembros}</span>
      </div>
    </article>
  )
}

export function FilaActividadReciente({ nombre, accion, tiempo }: { nombre: string; accion: string; tiempo: string }) {
  return (
    <article className="flex items-start gap-2.5 border-b border-t-f5f5f5 py-2.25 last:border-b-0">
      <img className="h-8 w-8 flex-none rounded-full object-cover" src={usuarioImg} alt="" />
      <div className="min-w-0 flex-1 text-cuerpo leading-1.4 text-texto">
        <strong className="font-semibold">{nombre}</strong> {accion}
        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{tiempo}</span>
      </div>
    </article>
  )
}
