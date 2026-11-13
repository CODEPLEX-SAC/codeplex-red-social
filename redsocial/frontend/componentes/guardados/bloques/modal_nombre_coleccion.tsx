import { useState } from 'react'
import { AlertaEstado } from '../../compartido/interfaz/alerta_estado'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ModalNombreColeccionProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases
const botones = catalogoGuardados.botones

export function ModalNombreColeccion({ titulo, confirmar, nombreInicial, esValido, alConfirmar, alCerrar }: ModalNombreColeccionProps) {
  const [nombre, setNombre] = useState(nombreInicial)
  const vacio = nombre.trim() === String()
  const repetido = !vacio && !esValido(nombre)

  return (
    <Modal titulo={titulo} etiquetaCerrar={botones.cerrar} onCerrar={alCerrar} className={clases.modal}>
      <form
        onSubmit={(evento) => {
          evento.preventDefault()
          if (!vacio && !repetido) alConfirmar(nombre)
        }}
      >
        <div className={clases.modal_cuerpo}>
          <CampoTexto anchoCompleto marcador={catalogoGuardados.modales.marcador} valor={nombre} alCambiar={setNombre} inputProps={{ 'aria-label': catalogoGuardados.modales.marcador }} />
          {repetido && <AlertaEstado className={clases.modal_error}>{catalogoGuardados.modales.repetido}</AlertaEstado>}
        </div>
        <div className={clases.modal_pie}>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCerrar}>{botones.cancelar}</Boton>
          <Boton type="submit" variant="primario" size="md" disabled={vacio || repetido}>{confirmar}</Boton>
        </div>
      </form>
    </Modal>
  )
}
