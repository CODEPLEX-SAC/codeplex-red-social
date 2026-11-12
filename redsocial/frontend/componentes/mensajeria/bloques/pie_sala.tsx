import { BarraControlesSala } from './barra_controles_sala'
import { DetallesReunionSala } from './detalles_reunion_sala'
import type { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ReunionEnSala } from '@/tipos/mensajeria/contrato_reunion'

const clases = catalogoMensajeria.videollamada.clases.sala

export function PieSala({ sala, reunion, enlaceReunion }: { sala: ReturnType<typeof usarSalaLlamada>; reunion: ReunionEnSala; enlaceReunion: string }) {
  return (
    <div className={clases.pie_sala}>
      <DetallesReunionSala reunion={reunion} total={sala.todos.length} enlaceReunion={enlaceReunion} />
      <BarraControlesSala sala={sala} />
      <span aria-hidden="true" className={clases.pie_equilibrio} />
    </div>
  )
}
