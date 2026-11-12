import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ModalCrearAlbumGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.multimedia.crear
const clases = catalogoGrupos.clases.detalle
const gestion = catalogoGrupos.clases.gestion

export function ModalCrearAlbumGrupo({ alCrear, onCerrar }: ModalCrearAlbumGrupoProps) {
  const [nombre, setNombre] = useState(String())
  const [error, setError] = useState(false)

  function crear() {
    if (nombre.trim() === String()) {
      setError(true)
      return
    }
    alCrear(nombre.trim())
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className={gestion.dialogo}>
      <div className={clases.modal_album_campo}>
        <CampoEtiquetado variante="compacta" etiqueta={textos.nombre} requerido>
          <CampoTexto valor={nombre} alCambiar={setNombre} marcador={textos.marcador} error={error} mensajeError={error ? textos.error : undefined} inputProps={{ 'aria-label': textos.nombre }} anchoCompleto />
        </CampoEtiquetado>
      </div>
      <div className={gestion.pie}>
        <Boton type="button" variant="secundario" size="default" onClick={onCerrar}>
          {textos.cancelar}
        </Boton>
        <Boton type="button" variant="primario" size="default" onClick={crear}>
          {textos.confirmar}
        </Boton>
      </div>
    </Modal>
  )
}
