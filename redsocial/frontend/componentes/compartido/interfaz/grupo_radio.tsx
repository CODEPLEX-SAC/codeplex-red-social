import { CodeplexGrupoRadio } from '@codeplex-sac/formularios'
import type { CodeplexGrupoRadioProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function GrupoRadio(props: CodeplexGrupoRadioProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexGrupoRadio {...(catalogoCompartido.controles.grupo_radio as CodeplexGrupoRadioProps)} {...props} />
    </ProveedorTemaGraficos>
  )
}
