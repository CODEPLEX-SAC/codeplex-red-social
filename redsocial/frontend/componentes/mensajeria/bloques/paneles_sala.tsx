import { minutosDeLlamada } from './logica_sala_llamada'
import { ModalDetallesReunion } from './modal_detalles_reunion'
import { ModalSalirSola } from './modal_salir_sola'
import { PanelChatSala } from './panel_chat_sala'
import { PanelDetallesSala } from './panel_detalles_sala'
import { PanelParticipantesSala } from './panel_participantes_sala'
import type { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ContactoInvitable, InvitacionesLlamada } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { ReunionEnSala } from '@/tipos/mensajeria/contrato_reunion'

const clases = catalogoMensajeria.videollamada.clases.sala
const UNICO = 1

export function PanelesSala({ sala, reunion, contactos, invitaciones, enlaceReunion, alEscribir, alAbandonar }: {
  sala: ReturnType<typeof usarSalaLlamada>
  reunion: ReunionEnSala
  contactos: readonly ContactoInvitable[]
  invitaciones: InvitacionesLlamada
  enlaceReunion: string
  alEscribir?: (nombre: string) => void
  alAbandonar: () => void
}) {
  return (
    <>
      {sala.panel !== null && <div className={clases.fondo_panel} onClick={sala.cerrarPanel} />}
      {sala.panel === 'participantes' && <PanelParticipantesSala participantes={sala.todos} contactos={contactos} invitaciones={invitaciones} fijadoId={sala.fijado} onFijar={sala.alternarFijacion} onGestionar={sala.gestionar} onEscribir={alEscribir} onCerrar={sala.cerrarPanel} />}
      {sala.panel === 'chat' && <PanelChatSala onCerrar={sala.cerrarPanel} />}
      {sala.panel === 'detalles' && <PanelDetallesSala reunion={reunion} enlaceReunion={enlaceReunion} onCerrar={sala.cerrarPanel} />}
      {sala.saliendo && sala.todos.length === UNICO && <ModalSalirSola minutos={minutosDeLlamada(sala.duracion)} onAbandonar={alAbandonar} onPermanecer={sala.cerrarSalida} />}
      {sala.detallesAbiertos && <ModalDetallesReunion reunion={reunion} enlaceReunion={enlaceReunion} onCerrar={sala.cerrarDetalles} />}
    </>
  )
}
