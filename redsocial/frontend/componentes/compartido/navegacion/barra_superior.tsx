import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../interfaz/campo_busqueda'
import { useState } from 'react'
import { Icono } from '../icono'
import { PanelNotificacionesTopbar } from '../../avisos/bloques/panel_notificaciones_topbar'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ElementoNavegacion } from '@/tipos/compartido/contrato_navegacion'

const SESION_ACTUAL = catalogoCompartido.sesion_actual
const NAV_PRINCIPAL = catalogoCompartido.navegacion.navPrincipal as readonly ElementoNavegacion[]
const INSIGNIA_AVISOS = NAV_PRINCIPAL.find((item) => item.clave === 'avisos')?.insignia

export function BarraSuperior() {
  const [panelAvisosAbierto, setPanelAvisosAbierto] = useState(false)

  return (
    <header className="flex h-16 items-center gap-md border-b border-borde bg-superficie px-md max-800:pl-16">
      <div className="flex min-w-0 flex-1 items-center gap-sm max-800:hidden">
        <CampoBusqueda placeholder={textosRedSocial.BUSCAR_EN_CODEPLEX} aria-label={textosRedSocial.BUSCAR} className="min-w-0 max-w-75 flex-1" />

        <button
          type="button"
          className="flex min-w-0 items-center gap-sm rounded-control border border-borde bg-superficie px-sm py-1 text-left max-1100:hidden"
        >
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-control bg-primario-suave text-primario">
            <Icono name="empresa" />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-nombre-entidad">{SESION_ACTUAL.empresa}</strong>
            <span className="block truncate text-auxiliar text-texto-suave">{SESION_ACTUAL.ruc}</span>
          </span>
          <Icono name="flecha-abajo" className="flex-none text-texto-suave w-3.25 h-3.25" />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-sm max-800:gap-1.5">
        <BotonIcono icono="mas" type="button" aria-label={textosRedSocial.CREAR} variant="primario" size="default" />
        <BotonIcono icono="amigos" type="button" aria-label={textosRedSocial.AMIGOS} variant="sutil" size="default" className="max-800:hidden" />
        <BotonIcono icono="mensajes" type="button" aria-label={textosRedSocial.MENSAJES} variant="sutil" size="default" />
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label={textosRedSocial.AVISO_CAMPANA}
            onClick={() => setPanelAvisosAbierto((abierto) => !abierto)}
            className="relative flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent text-texto"
          >
            <Icono name="campana" />
            <span className="absolute right-0 top-0 rounded-full bg-primario px-1 text-contador font-extrabold text-white">{INSIGNIA_AVISOS}</span>
          </button>
          {panelAvisosAbierto && (
            <>
              <div className="fixed inset-0 z-19" onClick={() => setPanelAvisosAbierto(false)} />
              <PanelNotificacionesTopbar onCerrar={() => setPanelAvisosAbierto(false)} />
            </>
          )}
        </div>
        <BotonIcono icono="cuadricula" type="button" aria-label={textosRedSocial.MODULOS} variant="sutil" size="default" className="max-800:hidden" />
        <button type="button" className="flex items-center gap-xs rounded-full border-0 bg-transparent px-sm py-1 max-800:p-1">
          <span className="h-8 w-8 rounded-full bg-borde" />
          <strong className="text-nombre-entidad max-800:hidden">{SESION_ACTUAL.usuario}</strong>
          <Icono name="flecha-abajo" className="flex-none text-texto-suave max-800:hidden w-3.25 h-3.25" />
        </button>
      </div>
    </header>
  )
}
