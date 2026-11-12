import { useState } from 'react'
import { Boton, CampoTexto } from '../../compartido'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { ModalNombreListaProps } from '@/tipos/amigos/contrato_listas'

const clases = catalogoAmigos.clases.listas
const textos = catalogoAmigos.listas

function textosDelModo(creando: boolean) {
  if (creando) return { titulo: textos.crear.titulo, confirmar: textos.crear.confirmar }
  return { titulo: textos.editar.titulo, confirmar: textos.editar.confirmar }
}

export function ModalNombreLista({ modo, nombreInicial, alConfirmar, alCerrar }: ModalNombreListaProps) {
  const [nombre, setNombre] = useState(nombreInicial)
  const creando = modo === 'crear'
  const { titulo, confirmar } = textosDelModo(creando)
  const valido = nombre.trim() !== String()

  return (
    <Modal titulo={titulo} etiquetaCerrar={textos.crear.cerrar} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.cuerpo}>
        {creando && <p className={clases.texto}>{textos.crear.descripcion}</p>}
        <CampoTexto anchoCompleto marcador={textos.crear.marcador} valor={nombre} alCambiar={setNombre} inputProps={{ 'aria-label': textos.crear.marcador }} />
      </div>
      <div className={clases.pie_final}>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCerrar}>{textos.crear.cancelar}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={!valido} onClick={() => alConfirmar(nombre)}>{confirmar}</Boton>
      </div>
    </Modal>
  )
}
