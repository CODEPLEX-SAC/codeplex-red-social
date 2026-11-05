import { CodeplexTooltip } from '@codeplex-sac/feedback'
import { BotonIcono } from './boton_icono'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AyudaContextualProps } from '@/tipos/compartido/contrato_ayuda_contextual'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const configuracion = catalogoCompartido.ayuda_contextual

export function AyudaContextual({ texto, etiqueta }: AyudaContextualProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexTooltip contenido={texto} describeChild enterTouchDelay={configuracion.demora_toque} leaveTouchDelay={configuracion.permanencia_toque}>
        <span className={configuracion.clase}>
          <BotonIcono icono={configuracion.icono as IconName} type="button" aria-label={etiqueta} variant="discreto" size="sm" />
        </span>
      </CodeplexTooltip>
    </ProveedorTemaGraficos>
  )
}
