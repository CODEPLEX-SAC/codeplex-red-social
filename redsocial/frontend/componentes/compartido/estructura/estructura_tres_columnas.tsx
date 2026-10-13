import type { EstructuraTresColumnasProps } from '@/tipos/compartido/contrato_estructura_tres_columnas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const ESTRUCTURA = catalogoCompartido.estructura_tres_columnas

export function EstructuraTresColumnas({ principal, publicidad, lateral, alturaCompleta, distribucion = 'amplia' }: EstructuraTresColumnasProps) {
  const clases = ESTRUCTURA.distribuciones[distribucion]
  return (
    <div className={`${clases.contenedor} ${alturaCompleta ? ESTRUCTURA.altura_completa : ESTRUCTURA.altura_libre}`}>
      <div className={clases.principal}>{principal}</div>
      <div className={clases.publicidad}>{publicidad}</div>
      <div className={clases.lateral}>{lateral}</div>
    </div>
  )
}
