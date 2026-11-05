import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalEliminarMensajeProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion.eliminar_modal

export function ModalEliminarMensaje({ onConfirmar, onCancelar }: ModalEliminarMensajeProps) {
  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCancelar}>
      <div className={clases.modal_cuerpo}>
        <p className="m-0 text-cuerpo text-texto-suave">{textos.texto}</p>
        <div className={clases.modal_pie}>
          <Boton type="button" variant="secundario" size="md" onClick={onCancelar}>
            {textos.cancelar}
          </Boton>
          <Boton type="button" variant="peligro" size="md" onClick={onConfirmar}>
            {textos.confirmar}
          </Boton>
        </div>
      </div>
    </Modal>
  )
}
