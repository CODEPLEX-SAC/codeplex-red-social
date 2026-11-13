import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { ContenidoDetallesReunion } from './contenido_detalles_reunion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { PanelDetallesSalaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos.sala
const clases = catalogoMensajeria.videollamada.clases.sala

export function PanelDetallesSala({ reunion, enlaceReunion, onCerrar }: PanelDetallesSalaProps) {
  return (
    <aside aria-label={textos.detalles} className={clases.panel}>
      <div className={clases.panel_cabecera}>
        <h2 className={clases.panel_titulo}>{textos.detalles}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={textos.detalles_panel.cerrar} variant="discreto" size="default" onClick={onCerrar} />
      </div>
      <ContenidoDetallesReunion reunion={reunion} enlaceReunion={enlaceReunion} />
    </aside>
  )
}
