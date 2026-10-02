import { CodeplexSelectorFecha } from '@codeplex-sac/selectores-fecha'
import type { CodeplexSelectorFechaProps } from '@codeplex-sac/selectores-fecha'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function SelectorFecha(props: CodeplexSelectorFechaProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexSelectorFecha
        {...(catalogoCompartido.controles.selector_fecha as CodeplexSelectorFechaProps)}
        {...props}
      />
    </ProveedorTemaGraficos>
  )
}
