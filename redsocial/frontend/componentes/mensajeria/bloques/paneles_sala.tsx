import { PanelChatSala } from './panel_chat_sala'
import { PanelParticipantesSala } from './panel_participantes_sala'
import type { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ContactoInvitable, InvitacionesLlamada } from '@/tipos/mensajeria/contrato_integracion_llamada'

const clases = catalogoMensajeria.videollamada.clases.sala

export function PanelesSala({ sala, contactos, invitaciones, enlaceReunion }: {
  sala: ReturnType<typeof usarSalaLlamada>
  contactos: readonly ContactoInvitable[]
  invitaciones: InvitacionesLlamada
  enlaceReunion: string
}) {
  return (
    <>
      {sala.panel !== null && <div className={clases.fondo_panel} onClick={sala.cerrarPanel} />}
      {sala.panel === 'participantes' && <PanelParticipantesSala participantes={sala.todos} contactos={contactos} invitaciones={invitaciones} enlaceReunion={enlaceReunion} fijadoId={sala.fijado} onFijar={sala.alternarFijacion} onGestionar={sala.gestionar} onCerrar={sala.cerrarPanel} />}
      {sala.panel === 'chat' && <PanelChatSala onCerrar={sala.cerrarPanel} />}
    </>
  )
}
