import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Modal } from '../../compartido/interfaz/modal'
import { FormularioProgramarReunion } from './formulario_programar_reunion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ModalProgramarReunionProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const programar = catalogoMensajeria.videollamada.programar
const clases = programar.clases

export function ModalProgramarReunion({ titulo, ...formulario }: ModalProgramarReunionProps) {
  const cabecera = (
    <div className={clases.cabecera_modal}>
      <span className={clases.icono_modal}>
        <Icono name="calendario" className="h-6 w-6" />
      </span>
      <div className={clases.titulos_modal}>
        <h2 className={clases.titulo}>{titulo}</h2>
        <p className={clases.subtitulo_tarjeta}>{programar.textos.subtitulo}</p>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={catalogoMensajeria.botones.cerrar} variant="discreto" size="default" onClick={formulario.onCerrar} />
    </div>
  )

  return (
    <Modal titulo={titulo} etiquetaCerrar={catalogoMensajeria.botones.cerrar} onCerrar={formulario.onCerrar} className={clases.dialogo} cabecera={cabecera}>
      <div className={clases.cuerpo_modal}>
        <FormularioProgramarReunion {...formulario} />
      </div>
    </Modal>
  )
}
