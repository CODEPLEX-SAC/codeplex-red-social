import { CodeplexCargando } from '@codeplex-sac/ui'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { IndicadorCargaProps } from '@/tipos/compartido/contrato_indicador_carga'

const predeterminado = catalogoCompartido.carga.predeterminado

export function IndicadorCarga({ tamano = predeterminado.tamano as IndicadorCargaProps['tamano'], color = predeterminado.color as IndicadorCargaProps['color'], tipo = predeterminado.tipo as IndicadorCargaProps['tipo'], etiqueta, className }: IndicadorCargaProps) {
  return <CodeplexCargando tamano={tamano} color={color} tipo={tipo} etiqueta={etiqueta} className={className} />
}
