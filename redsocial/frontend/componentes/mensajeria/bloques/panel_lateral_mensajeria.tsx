import { ContactosEnLineaPanel, EventosProximosPanel, GruposRecomendadosPanel } from '../../compartido'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { PanelLateralMensajeriaProps } from '@/tipos/mensajeria/contrato_lateral_mensajeria'

export function PanelLateralMensajeria({ contactosLinea, gruposRecientes, eventosProximos }: PanelLateralMensajeriaProps) {
  return (
    <aside className={catalogoMensajeria.panel_lateral.contenedor}>
      <ContactosEnLineaPanel contactos={contactosLinea} />
      <GruposRecomendadosPanel grupos={gruposRecientes} />
      <EventosProximosPanel eventos={eventosProximos} />
    </aside>
  )
}
