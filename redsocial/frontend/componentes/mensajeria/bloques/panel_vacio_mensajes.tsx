import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { PanelVacioMensajesProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function PanelVacioMensajes({ oculta }: PanelVacioMensajesProps) {
  return (
    <section data-zona="panel-vacio-mensajes" className={`${clases.contenedor} ${clases.vacio} ${oculta ? clases.oculta : ''}`}>
      <MensajeVacio titulo={textos.vacio_titulo} texto={textos.vacio_texto} />
    </section>
  )
}
