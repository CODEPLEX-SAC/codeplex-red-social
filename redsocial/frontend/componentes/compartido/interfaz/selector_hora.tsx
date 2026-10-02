import { CodeplexSelectorHora } from '@codeplex-sac/selectores-fecha'
import type { CodeplexSelectorHoraProps } from '@codeplex-sac/selectores-fecha'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function SelectorHora(props: CodeplexSelectorHoraProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexSelectorHora
        {...(catalogoCompartido.controles.selector_hora as CodeplexSelectorHoraProps)}
        {...props}
      />
    </ProveedorTemaGraficos>
  )
}
