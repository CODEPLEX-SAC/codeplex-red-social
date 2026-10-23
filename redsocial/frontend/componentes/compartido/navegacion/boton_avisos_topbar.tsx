import { useState } from 'react'
import { Icono } from '../icono'
import { FondoPanelFlotante } from '../interfaz/fondo_panel_flotante'
import { Insignia } from '../interfaz/insignia'
import { PanelNotificacionesTopbar } from '../../avisos/bloques/panel_notificaciones_topbar'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ElementoNavegacion } from '@/tipos/compartido/contrato_navegacion'

const NAV_PRINCIPAL = catalogoCompartido.navegacion.navPrincipal as readonly ElementoNavegacion[]
const INSIGNIA_AVISOS = NAV_PRINCIPAL.find((item) => item.clave === 'avisos')?.insignia

export function BotonAvisosTopbar() {
  const [panelAvisosAbierto, setPanelAvisosAbierto] = useState(false)

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        aria-label={textosRedSocial.AVISO_CAMPANA}
        onClick={() => setPanelAvisosAbierto((abierto) => !abierto)}
        className="relative flex h-9 w-9 items-center justify-center rounded-control border-0 bg-transparent text-texto"
      >
        <Insignia variant="superpuesta" contenido={INSIGNIA_AVISOS}>
          <Icono name="campana" />
        </Insignia>
      </button>
      {panelAvisosAbierto && (
        <>
          <FondoPanelFlotante onCerrar={() => setPanelAvisosAbierto(false)} atenuarMovil={false} />
          <PanelNotificacionesTopbar onCerrar={() => setPanelAvisosAbierto(false)} />
        </>
      )}
    </div>
  )
}
