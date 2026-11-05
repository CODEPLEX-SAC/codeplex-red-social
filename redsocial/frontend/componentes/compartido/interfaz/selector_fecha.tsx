import { CodeplexSelectorFecha } from '@codeplex-sac/selectores-fecha'
import type { CodeplexSelectorFechaProps } from '@codeplex-sac/selectores-fecha'
import type { PropiedadesRanuraSelectorFecha, SelectorFechaProps } from '@/tipos/compartido/contrato_selector_fecha'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.controles.selector_fecha as CodeplexSelectorFechaProps
const ATRIBUTO_ACCESIBLE = catalogoCompartido.controles.atributo_accesible

export function SelectorFecha({ nombreAccesible, slotProps, ...props }: SelectorFechaProps) {
  const campo = {
    ...configuracion.slotProps?.textField,
    ...slotProps?.textField,
    ...(nombreAccesible ? { inputProps: { [ATRIBUTO_ACCESIBLE]: nombreAccesible } } : {}),
  }

  return (
    <ProveedorTemaGraficos>
      <CodeplexSelectorFecha {...configuracion} {...props} slotProps={{ ...configuracion.slotProps, ...slotProps, textField: campo } as PropiedadesRanuraSelectorFecha} />
    </ProveedorTemaGraficos>
  )
}
