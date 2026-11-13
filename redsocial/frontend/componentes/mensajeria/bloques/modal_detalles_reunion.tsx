import { Modal } from '../../compartido/interfaz/modal'
import { ContenidoDetallesReunion } from './contenido_detalles_reunion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalDetallesReunionProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos.sala
const clases = catalogoMensajeria.videollamada.clases.sala

export function ModalDetallesReunion({ reunion, enlaceReunion, onCerrar }: ModalDetallesReunionProps) {
  return (
    <Modal titulo={textos.detalles} etiquetaCerrar={textos.detalles_panel.cerrar} onCerrar={onCerrar} className={clases.detalles_modal}>
      <ContenidoDetallesReunion reunion={reunion} enlaceReunion={enlaceReunion} />
    </Modal>
  )
}
