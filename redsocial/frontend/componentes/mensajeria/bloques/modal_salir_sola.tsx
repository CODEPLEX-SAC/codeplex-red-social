import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalSalirSolaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const salida = catalogoMensajeria.videollamada.textos.salida
const sola = salida.sola
const clases = catalogoMensajeria.videollamada.clases.sala
const UN_MINUTO = 1

export function ModalSalirSola({ minutos, onAbandonar, onPermanecer }: ModalSalirSolaProps) {
  const mensaje = { [UN_MINUTO]: sola.mensaje_uno }[minutos] ?? sola.mensaje_otros.replace(':n', String(minutos))

  return (
    <Modal titulo={sola.titulo} etiquetaCerrar={salida.cerrar} onCerrar={onPermanecer} className={clases.salida_dialogo}>
      <p className={clases.salida_texto}>{mensaje}</p>
      <div className={clases.salida_pie_sola}>
        <Boton type="button" variant="secundario" size="cta" onClick={onAbandonar}>
          {sola.abandonar}
        </Boton>
        <Boton type="button" variant="primario" size="cta" onClick={onPermanecer}>
          {sola.permanecer}
        </Boton>
      </div>
    </Modal>
  )
}
