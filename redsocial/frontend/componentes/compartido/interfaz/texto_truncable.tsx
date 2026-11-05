import { CodeplexTooltip } from '@codeplex-sac/feedback'
import { usarTruncamiento } from './usar_truncamiento'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { TextoTruncableProps } from '@/tipos/compartido/contrato_texto_truncable'

const clase = catalogoCompartido.texto_truncable
const claseDosLineas = catalogoCompartido.texto_truncable_dos_lineas

export function TextoTruncable({ texto, dosLineas = false, className }: TextoTruncableProps) {
  const base = dosLineas ? claseDosLineas : clase
  const { referencia, truncado, medir } = usarTruncamiento<HTMLElement>()

  return (
    <ProveedorTemaGraficos>
      <CodeplexTooltip contenido={truncado && texto} describeChild>
        <span ref={referencia} tabIndex={0} onMouseEnter={medir} onFocus={medir} className={className ? `${base} ${className}` : base}>{texto}</span>
      </CodeplexTooltip>
    </ProveedorTemaGraficos>
  )
}
