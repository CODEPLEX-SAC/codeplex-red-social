import { useState } from 'react'
import { CodeplexCampoTexto } from '@codeplex-sac/formularios'
import type { CodeplexCampoTextoProps } from '@codeplex-sac/formularios'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function CampoTexto({ defaultValue, valor, alCambiar, ...resto }: CodeplexCampoTextoProps) {
  const [textoInterno, setTextoInterno] = useState((defaultValue as string | undefined) ?? valor ?? catalogoCompartido.controles.texto_vacio)

  return (
    <ProveedorTemaGraficos>
      <CodeplexCampoTexto
        {...(catalogoCompartido.controles.campo_texto as CodeplexCampoTextoProps)}
        {...resto}
        valor={valor ?? textoInterno}
        alCambiar={(texto) => {
          setTextoInterno(texto)
          alCambiar?.(texto)
        }}
      />
    </ProveedorTemaGraficos>
  )
}
