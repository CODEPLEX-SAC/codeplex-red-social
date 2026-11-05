import { useState } from 'react'
import { BotonIcono } from '../interfaz/boton_icono'
import { FondoPanelFlotante } from '../interfaz/fondo_panel_flotante'
import { Insignia } from '../interfaz/insignia'
import { PanelNotificacionesTopbar } from '../../avisos/bloques/panel_notificaciones_topbar'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { nombreAccesibleConConteo } from './nombre_accesible_conteo'
import type { ElementoNavegacion } from '@/tipos/compartido/contrato_navegacion'

const NAV_PRINCIPAL = catalogoCompartido.navegacion.navPrincipal as readonly ElementoNavegacion[]
const INSIGNIA_AVISOS = NAV_PRINCIPAL.find((item) => item.clave === 'avisos')?.insignia

export function BotonAvisosTopbar() {
  const [panelAvisosAbierto, setPanelAvisosAbierto] = useState(false)

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <Insignia variant="superpuesta" contenido={INSIGNIA_AVISOS}>
        <BotonIcono
          icono="campana"
          type="button"
          aria-label={nombreAccesibleConConteo(textosRedSocial.AVISO_CAMPANA, INSIGNIA_AVISOS)}
          onClick={() => setPanelAvisosAbierto((abierto) => !abierto)}
          variant="sutil"
          size="default"
        />
      </Insignia>
      {panelAvisosAbierto && (
        <>
          <FondoPanelFlotante onCerrar={() => setPanelAvisosAbierto(false)} atenuarMovil={false} />
          <PanelNotificacionesTopbar onCerrar={() => setPanelAvisosAbierto(false)} />
        </>
      )}
    </div>
  )
}
