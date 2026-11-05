import { useState } from 'react'
import { Modal } from '../../compartido/interfaz/modal'
import { ModalConfirmacionRol } from './modal_confirmacion_rol'
import { ContenidoPasoInvitacion } from './contenido_paso_invitacion'
import { PieInvitarColaborador } from './pie_invitar_colaborador'
import { StepperInvitarColaborador } from './stepper_invitar_colaborador'
import { usarAsistenteInvitacion } from './usar_asistente_invitacion'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ModalInvitarColaboradorProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const PASO_PERMISOS = 2
const dialogos = catalogoColaboradores.dialogos_rol

export function ModalInvitarColaborador({ datos, alCerrar, alEnviar }: ModalInvitarColaboradorProps) {
  const asistente = usarAsistenteInvitacion(datos)
  const [confirmados, setConfirmados] = useState<string[]>([])
  const [sinPermisos, setSinPermisos] = useState<string[]>([])

  function avanzar(lista: string[]) {
    const pendientes = asistente.permisos.revisarAvance(lista)
    if (pendientes.length > 0) {
      setSinPermisos(pendientes)
      return
    }
    setSinPermisos([])
    setConfirmados([])
    asistente.siguiente()
  }

  function siguiente() {
    if (asistente.paso === PASO_PERMISOS) avanzar(confirmados)
    else asistente.siguiente()
  }

  function continuarSinAcceso() {
    const lista = [...confirmados, sinPermisos[0]]
    setConfirmados(lista)
    avanzar(lista)
  }

  function volverAPermisos() {
    asistente.permisos.activarModulo(sinPermisos[0])
    setSinPermisos([])
  }

  return (
    <Modal titulo={catalogoColaboradores.titulos.invitar} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className={catalogoColaboradores.clases.invitar_permisos.modal}>
      <StepperInvitarColaborador pasoActivo={asistente.paso} />
      <div key={asistente.paso} className={catalogoColaboradores.clases.invitar_comun.cuerpo}>
        <ContenidoPasoInvitacion
          paso={asistente.paso}
          datos={datos}
          colaborador={asistente.colaborador}
          resumen={asistente.resumen}
          alCambiarCampo={asistente.cambiarCampo}
          alEditarPaso={asistente.irAPaso}
          permisos={asistente.permisos}
          vigencia={asistente.vigencia}
        />
      </div>
      <PieInvitarColaborador paso={asistente.paso} etiquetaSiguiente={asistente.paso === PASO_PERMISOS && asistente.permisos.hayBorradores ? dialogos.guardar_y_continuar : undefined} alCancelar={alCerrar} alAnterior={asistente.anterior} alSiguiente={siguiente} alEnviar={() => alEnviar(asistente.colaborador)} />
      {sinPermisos.length > 0 && (
        <ModalConfirmacionRol
          titulo={dialogos.sin_permisos_titulo}
          mensaje={dialogos.sin_permisos_pregunta.replace(':modulo', sinPermisos[0])}
          etiquetaCancelar={dialogos.volver}
          etiquetaConfirmar={dialogos.continuar_sin_acceso}
          alCancelar={volverAPermisos}
          alConfirmar={continuarSinAcceso}
        />
      )}
    </Modal>
  )
}
