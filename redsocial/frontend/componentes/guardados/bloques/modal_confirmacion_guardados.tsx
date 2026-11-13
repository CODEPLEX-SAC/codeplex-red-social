import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ModalConfirmacionGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases
const botones = catalogoGuardados.botones

export function ModalConfirmacionGuardados({ titulo, mensaje, confirmar, alConfirmar, alCerrar }: ModalConfirmacionGuardadosProps) {
  return (
    <Modal titulo={titulo} etiquetaCerrar={botones.cerrar} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.modal_cuerpo}>
        <p className={clases.modal_texto}>{mensaje}</p>
      </div>
      <div className={clases.modal_pie}>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCerrar}>{botones.cancelar}</Boton>
        <Boton type="button" variant="peligro" size="md" onClick={alConfirmar}>{confirmar}</Boton>
      </div>
    </Modal>
  )
}
