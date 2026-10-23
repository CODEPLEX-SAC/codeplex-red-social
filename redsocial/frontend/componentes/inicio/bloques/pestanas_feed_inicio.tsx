import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { PestanasFeedInicioProps } from '@/tipos/inicio/contrato_feed_inicio'
import type { PestanaFeed } from '@/tipos/inicio/modelo_inicio'

const textos = catalogoInicio.feed

export function PestanasFeedInicio({ activa, onCambiar }: PestanasFeedInicioProps) {
  return (
    <nav aria-label={textos.etiqueta_pestanas} className={textos.clases.pestanas}>
      <Pestanas elementos={textos.pestanas} activa={activa} alCambiar={(clave) => onCambiar(clave as PestanaFeed)} />
    </nav>
  )
}
