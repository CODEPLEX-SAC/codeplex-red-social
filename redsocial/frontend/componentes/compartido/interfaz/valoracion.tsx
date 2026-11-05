import { CodeplexValoracion } from '@codeplex-sac/ui'
import type { CodeplexValoracionTamano } from '@codeplex-sac/ui'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ValoracionProps } from '@/tipos/compartido/contrato_valoracion'

const configuracion = catalogoCompartido.valoracion

export function Valoracion({ valor, maximo, etiqueta }: ValoracionProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexValoracion valor={valor} maximo={maximo} tamano={configuracion.tamano as CodeplexValoracionTamano} soloLectura aria-label={etiqueta} />
    </ProveedorTemaGraficos>
  )
}
