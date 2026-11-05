import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.dialogos_rol

export function ModalAgregarPermiso({ recurso, alAgregar, alCerrar }: { recurso: string; alAgregar: (etiqueta: string) => string | null; alCerrar: () => void }) {
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState<string | null>(null)

  function confirmar() {
    const resultado = alAgregar(nombre)
    if (resultado === null) alCerrar()
    else setError(resultado)
  }

  return (
    <Modal titulo={textos.titulo_agregar.replace(':recurso', recurso)} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className={clases.modal_permiso}>
      <div className={clases.rol_cuerpo}>
        <CampoTexto
          id={textos.id_permiso}
          etiqueta={textos.permiso_etiqueta}
          valor={nombre}
          alCambiar={(valor) => {
            setNombre(valor)
            setError(null)
          }}
          error={error !== null}
          mensajeError={error ?? undefined}
        />
        <p className={clases.ajuste_nota}>{textos.nota_agregar}</p>
      </div>
      <div className={clases.rol_pie}>
        <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>{textosRedSocial.CANCELAR}</Boton>
        <Boton type="button" variant="primario" size="md" onClick={confirmar}>{textos.agregar_confirmar}</Boton>
      </div>
    </Modal>
  )
}
