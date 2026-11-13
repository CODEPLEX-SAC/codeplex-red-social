import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import { estaIncluido } from './logica_colecciones_guardados'
import { etiquetaUnidad } from './menus_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ModalAgregarAColeccionProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases
const botones = catalogoGuardados.botones
const textos = catalogoGuardados.modales.agregar

export function ModalAgregarAColeccion({ grupoId, colecciones, alAgregar, alCerrar }: ModalAgregarAColeccionProps) {
  const [elegida, setElegida] = useState<string | null>(null)

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={botones.cerrar} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.modal_cuerpo}>
        {colecciones.length === 0 && <p className={clases.modal_texto}>{textos.sin_colecciones}</p>}
        <ul className={clases.modal_lista}>
          {colecciones.map((coleccion) => {
            const incluido = estaIncluido(coleccion, grupoId)
            return (
              <li key={coleccion.id}>
                <Boton type="button" variant={elegida === coleccion.id ? 'secundario' : 'fantasma'} size="default" disabled={incluido} aria-pressed={elegida === coleccion.id} className={clases.coleccion_boton} onClick={() => setElegida(coleccion.id)}>
                  <span className={clases.coleccion_textos}>
                    <span className={clases.coleccion_nombre}>{coleccion.nombre}</span>
                    <span className={clases.coleccion_cantidad}>{incluido ? textos.incluido : `${coleccion.grupos.length} ${etiquetaUnidad(coleccion.grupos.length)}`}</span>
                  </span>
                </Boton>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={clases.modal_pie}>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCerrar}>{botones.cancelar}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={elegida === null} onClick={() => elegida && alAgregar(elegida)}>{botones.agregar}</Boton>
      </div>
    </Modal>
  )
}
