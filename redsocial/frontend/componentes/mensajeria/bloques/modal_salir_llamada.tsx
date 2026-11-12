import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalSalirLlamadaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const salida = catalogoMensajeria.videollamada.textos.salida
const clases = catalogoMensajeria.videollamada.clases.sala

export function ModalSalirLlamada({ onAbandonar, onFinalizar, onCerrar }: ModalSalirLlamadaProps) {
  const cabecera = (
    <div className={clases.salida_cabecera}>
      <h2 className={clases.salida_titulo}>{salida.titulo}</h2>
      <BotonIcono icono="cerrar" type="button" aria-label={salida.cerrar} variant="discreto" size="default" onClick={onCerrar} />
    </div>
  )

  return (
    <Modal titulo={salida.titulo} etiquetaCerrar={salida.cerrar} onCerrar={onCerrar} className={clases.salida_dialogo} cabecera={cabecera}>
      <p className={clases.salida_texto}>{salida.descripcion}</p>
      <div className={clases.salida_pie}>
        <Boton type="button" variant="peligro" size="cta" className={clases.salida_boton} onClick={onFinalizar}>
          {salida.finalizar_todos}
        </Boton>
        <Boton type="button" variant="secundario" size="cta" className={clases.salida_boton} onClick={onAbandonar}>
          {salida.abandonar}
        </Boton>
      </div>
    </Modal>
  )
}
