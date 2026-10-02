import { CodeplexCampoNumero } from '@codeplex-sac/formularios'
import type { CodeplexCampoNumeroProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function CampoNumero(props: CodeplexCampoNumeroProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexCampoNumero
        {...(catalogoCompartido.controles.campo_numero as CodeplexCampoNumeroProps)}
        {...props}
      />
    </ProveedorTemaGraficos>
  )
}
