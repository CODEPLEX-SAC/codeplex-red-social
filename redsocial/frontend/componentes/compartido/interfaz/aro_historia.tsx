import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AroHistoriaProps } from '@/tipos/compartido/contrato_aro_historia'

const aro = catalogoCompartido.aro_historia

export function AroHistoria({ estado, etiqueta, onAbrir, className = '', children }: AroHistoriaProps) {
  if (estado === 'ninguna') return <>{children}</>
  return (
    <button type="button" aria-label={etiqueta} data-estado-historia={estado} onClick={onAbrir} className={[aro.boton, aro.estados[estado], className].join(' ').trim()}>
      {children}
    </button>
  )
}
