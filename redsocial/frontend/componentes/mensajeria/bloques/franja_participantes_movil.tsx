import { TarjetaMasParticipantes } from './tarjeta_mas_participantes'
import { TarjetaParticipante } from './tarjeta_participante'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FranjaParticipantesMovilProps } from '@/tipos/mensajeria/contrato_disposicion_movil'

const clases = catalogoMensajeria.videollamada.clases.sala
const VISIBLES = 2

export function FranjaParticipantesMovil({ muestra, total, local, flujoLocal, reaccion, alAbrirParticipantes }: FranjaParticipantesMovilProps) {
  return (
    <div className={clases.movil_franja}>
      <TarjetaMasParticipantes muestra={muestra.slice(0, VISIBLES)} restantes={Math.max(0, total - VISIBLES)} alAbrir={alAbrirParticipantes} />
      <div className={clases.movil_ficha}>{local && <TarjetaParticipante participante={local} flujo={flujoLocal} reaccion={reaccion} compacta />}</div>
    </div>
  )
}
