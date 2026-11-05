import { CodeplexSelectorHora } from '@codeplex-sac/selectores-fecha'
import type { CodeplexSelectorHoraProps } from '@codeplex-sac/selectores-fecha'
import type { PropiedadesRanuraSelectorHora, SelectorHoraProps } from '@/tipos/compartido/contrato_selector_hora'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.controles.selector_hora as CodeplexSelectorHoraProps
const ATRIBUTO_ACCESIBLE = catalogoCompartido.controles.atributo_accesible

export function SelectorHora({ nombreAccesible, slotProps, ...props }: SelectorHoraProps) {
  const campo = {
    ...configuracion.slotProps?.textField,
    ...slotProps?.textField,
    ...(nombreAccesible ? { inputProps: { [ATRIBUTO_ACCESIBLE]: nombreAccesible } } : {}),
  }

  return (
    <ProveedorTemaGraficos>
      <CodeplexSelectorHora {...configuracion} {...props} slotProps={{ ...configuracion.slotProps, ...slotProps, textField: campo } as PropiedadesRanuraSelectorHora} />
    </ProveedorTemaGraficos>
  )
}
