import { CodeplexTooltip } from '@codeplex-sac/feedback'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { TooltipProps } from '@/tipos/compartido/contrato_tooltip'

const configuracion = catalogoCompartido.tooltip

export function Tooltip({ texto, children }: TooltipProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexTooltip contenido={texto} enterTouchDelay={configuracion.demora_toque} leaveTouchDelay={configuracion.permanencia_toque}>
        <span className={configuracion.clase}>{children}</span>
      </CodeplexTooltip>
    </ProveedorTemaGraficos>
  )
}
