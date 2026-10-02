import { CodeplexInterruptor } from '@codeplex-sac/formularios'
import type { CodeplexInterruptorProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function Interruptor(props: CodeplexInterruptorProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexInterruptor {...(catalogoCompartido.controles.interruptor as CodeplexInterruptorProps)} {...props} />
    </ProveedorTemaGraficos>
  )
}
