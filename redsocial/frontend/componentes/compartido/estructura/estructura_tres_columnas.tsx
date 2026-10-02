import type { EstructuraTresColumnasProps } from '@/tipos/compartido/contrato_estructura_tres_columnas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function EstructuraTresColumnas({ principal, publicidad, lateral, alturaCompleta }: EstructuraTresColumnasProps) {
  return (
    <div
      className={
        'grid w-full gap-10 grid-cols-minmax400-900-minmax260-300-minmax300-340 max-1600:grid-cols-minmax400-1fr-minmax230-300 max-1600:gap-6 max-1250:grid-cols-1 max-950:gap-4 ' +
        (alturaCompleta ? 'items-stretch min-h-0' : 'items-start')
      }
    >
      <div className="min-h-0 min-w-0">{principal}</div>
      <div className="min-h-0 max-1600:hidden">{publicidad}</div>
      <div className="min-h-0 max-1250:hidden">{lateral}</div>
    </div>
  )
}
