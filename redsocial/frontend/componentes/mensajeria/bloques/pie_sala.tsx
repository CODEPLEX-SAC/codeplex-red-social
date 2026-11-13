import { BarraControlesSala } from './barra_controles_sala'
import type { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'

const clases = catalogoMensajeria.videollamada.clases.sala

export function PieSala({ sala }: { sala: ReturnType<typeof usarSalaLlamada> }) {
  return (
    <div className={clases.pie_sala}>
      <BarraControlesSala sala={sala} />
    </div>
  )
}
