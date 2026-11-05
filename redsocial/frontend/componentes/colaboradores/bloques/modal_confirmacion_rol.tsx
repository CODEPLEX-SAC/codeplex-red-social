import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'

const clases = catalogoColaboradores.clases.invitar_permisos

export interface ModalConfirmacionRolProps {
  titulo: string
  mensaje: string
  detalle?: string
  etiquetaCancelar: string
  etiquetaConfirmar: string
  peligro?: boolean
  alCancelar: () => void
  alConfirmar: () => void
}

export function ModalConfirmacionRol({ titulo, mensaje, detalle, etiquetaCancelar, etiquetaConfirmar, peligro = false, alCancelar, alConfirmar }: ModalConfirmacionRolProps) {
  return (
    <Modal titulo={titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCancelar} className={clases.modal_permiso}>
      <div className={clases.rol_cuerpo}>
        <p className={clases.rol_pregunta}>{mensaje}</p>
        {detalle && <p className={clases.ajuste_nota}>{detalle}</p>}
      </div>
      <div className={clases.rol_pie}>
        <Boton type="button" variant="secundario" size="md" onClick={alCancelar}>{etiquetaCancelar}</Boton>
        <Boton type="button" variant={peligro ? 'peligro' : 'primario'} size="md" onClick={alConfirmar}>{etiquetaConfirmar}</Boton>
      </div>
    </Modal>
  )
}
