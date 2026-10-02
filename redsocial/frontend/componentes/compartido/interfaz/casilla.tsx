import { CodeplexCasilla } from '@codeplex-sac/formularios'
import type { CodeplexCasillaProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function Casilla(props: CodeplexCasillaProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexCasilla tamano={catalogoCompartido.controles.casilla_tamano as CodeplexCasillaProps['tamano']} {...props} />
    </ProveedorTemaGraficos>
  )
}
