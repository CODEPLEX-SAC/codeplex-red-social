import { CodeplexRadio } from '@codeplex-sac/formularios'
import type { CodeplexRadioProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function Radio(props: CodeplexRadioProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexRadio {...(catalogoCompartido.controles.radio as CodeplexRadioProps)} {...props} />
    </ProveedorTemaGraficos>
  )
}
