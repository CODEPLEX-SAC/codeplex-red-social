import { useState } from 'react'
import { CodeplexCampoTexto } from '@codeplex-sac/formularios'
import type { CodeplexCampoTextoProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const sxBase = catalogoCompartido.controles.campo_texto.sx
const raizBase = sxBase['& .MuiInputBase-root']

function sxDelCampo(multilinea: boolean, propio: CodeplexCampoTextoProps['sx']): CodeplexCampoTextoProps['sx'] {
  const base = multilinea ? { ...sxBase, '& .MuiInputBase-root': { ...raizBase, ...catalogoCompartido.controles.campo_texto_multilinea_raiz } } : sxBase
  return (propio ? { ...base, ...(propio as object) } : base) as CodeplexCampoTextoProps['sx']
}

export function CampoTexto({ defaultValue, valor, alCambiar, ...resto }: CodeplexCampoTextoProps) {
  const [textoInterno, setTextoInterno] = useState((defaultValue as string | undefined) ?? valor ?? catalogoCompartido.controles.texto_vacio)

  return (
    <ProveedorTemaGraficos>
      <CodeplexCampoTexto
        {...(catalogoCompartido.controles.campo_texto as CodeplexCampoTextoProps)}
        {...resto}
        sx={sxDelCampo(resto.multilinea === true, resto.sx)}
        valor={valor ?? textoInterno}
        alCambiar={(texto) => {
          setTextoInterno(texto)
          alCambiar?.(texto)
        }}
      />
    </ProveedorTemaGraficos>
  )
}
