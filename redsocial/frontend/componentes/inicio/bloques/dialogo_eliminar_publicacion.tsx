import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { DialogoEliminarPublicacionProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.eliminar

export function DialogoEliminarPublicacion({ onConfirmar, onCerrar }: DialogoEliminarPublicacionProps) {
  function confirmar() {
    onConfirmar()
    onCerrar()
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-110 rounded-2xl max-600:h-full max-600:rounded-none">
      <div className="flex flex-col gap-5 px-5 py-4">
        <p className="m-0 text-cuerpo leading-texto text-texto-suave">{textos.mensaje}</p>
        <div className="flex justify-end gap-2 max-600:flex-col-reverse">
          <Boton type="button" variant="secundario" size="md" onClick={onCerrar}>
            {textos.cancelar}
          </Boton>
          <Boton type="button" variant="peligro" size="md" onClick={confirmar}>
            {textos.confirmar}
          </Boton>
        </div>
      </div>
    </Modal>
  )
}
