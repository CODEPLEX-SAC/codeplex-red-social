import { Modal } from '../../compartido/interfaz/modal'
import { ContenidoPasoInvitacion } from './contenido_paso_invitacion'
import { PieInvitarColaborador } from './pie_invitar_colaborador'
import { StepperInvitarColaborador } from './stepper_invitar_colaborador'
import { usarAsistenteInvitacion } from './usar_asistente_invitacion'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ModalInvitarColaboradorProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function ModalInvitarColaborador({ datos, alCerrar, alEnviar }: ModalInvitarColaboradorProps) {
  const asistente = usarAsistenteInvitacion(datos)

  return (
    <Modal titulo={catalogoColaboradores.titulos.invitar} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className="max-w-240 rounded-2xl max-600:rounded-none">
      <StepperInvitarColaborador pasoActivo={asistente.paso} />
      <div key={asistente.paso} className="min-h-0 flex-1 overflow-y-auto">
        <ContenidoPasoInvitacion
          paso={asistente.paso}
          datos={datos}
          colaborador={asistente.colaborador}
          resumen={asistente.resumen}
          alCambiarCampo={asistente.cambiarCampo}
          alEditarPaso={asistente.irAPaso}
        />
      </div>
      <PieInvitarColaborador paso={asistente.paso} alCancelar={alCerrar} alAnterior={asistente.anterior} alSiguiente={asistente.siguiente} alEnviar={alEnviar} />
    </Modal>
  )
}
