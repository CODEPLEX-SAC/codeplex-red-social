import { CodeplexPaginacion } from '@codeplex-sac/navegacion'
import type { CodeplexPaginacionProps } from '@codeplex-sac/navegacion'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { PaginacionProps } from '@/tipos/compartido/contrato_paginacion'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function Paginacion({ total, pagina, alCambiar }: PaginacionProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexPaginacion {...(catalogoCompartido.paginacion as CodeplexPaginacionProps)} total={total} pagina={pagina} alCambiar={(_, nuevaPagina) => alCambiar(nuevaPagina)} />
    </ProveedorTemaGraficos>
  )
}
