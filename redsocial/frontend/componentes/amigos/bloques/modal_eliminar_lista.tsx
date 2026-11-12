import { Boton } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { ModalEliminarListaProps } from '@/tipos/amigos/contrato_listas'

const clases = catalogoAmigos.clases.listas
const textos = catalogoAmigos.listas

export function ModalEliminarLista({ lista, alConfirmar, alCerrar }: ModalEliminarListaProps) {
  return (
    <Modal titulo={textos.eliminar.titulo} etiquetaCerrar={textos.crear.cerrar} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.cuerpo}>
        <p className={clases.texto}>{textos.eliminar.mensaje.replace(':nombre', lista.nombre)}</p>
      </div>
      <div className={clases.pie_final}>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCerrar}>{textos.crear.cancelar}</Boton>
        <Boton type="button" variant="peligro" size="md" onClick={alConfirmar}>{textos.eliminar.confirmar}</Boton>
      </div>
    </Modal>
  )
}
