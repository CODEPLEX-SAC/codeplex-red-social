import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalConfirmarConversacionProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.chat
const textos = {
  eliminar_chat: catalogoMensajeria.acciones_conversacion.modal_eliminar_chat,
  abandonar_grupo: catalogoMensajeria.acciones_conversacion.modal_abandonar_grupo,
}

export function ModalConfirmarConversacion({ tipo, nombre, onConfirmar, onCancelar }: ModalConfirmarConversacionProps) {
  const contenido = textos[tipo]
  return (
    <Modal titulo={contenido.titulo} etiquetaCerrar={contenido.cerrar} onCerrar={onCancelar}>
      <div className={clases.modal_cuerpo}>
        <p className={clases.modal_texto}>{contenido.texto.replace(':nombre', nombre)}</p>
        <div className={clases.modal_pie}>
          <Boton type="button" variant="secundario" size="md" onClick={onCancelar}>
            {contenido.cancelar}
          </Boton>
          <Boton type="button" variant="peligro" size="md" onClick={onConfirmar}>
            {contenido.confirmar}
          </Boton>
        </div>
      </div>
    </Modal>
  )
}
