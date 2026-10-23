import Tooltip from '@mui/material/Tooltip'
import { usarTruncamiento } from './usar_truncamiento'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { TextoTruncableProps } from '@/tipos/compartido/contrato_texto_truncable'

const clase = catalogoCompartido.texto_truncable

export function TextoTruncable({ texto, className }: TextoTruncableProps) {
  const { referencia, truncado, medir } = usarTruncamiento<HTMLElement>()

  return (
    <ProveedorTemaGraficos>
      <Tooltip title={truncado && texto} describeChild>
        <span ref={referencia} tabIndex={0} onMouseEnter={medir} onFocus={medir} className={className ? `${clase} ${className}` : clase}>{texto}</span>
      </Tooltip>
    </ProveedorTemaGraficos>
  )
}
