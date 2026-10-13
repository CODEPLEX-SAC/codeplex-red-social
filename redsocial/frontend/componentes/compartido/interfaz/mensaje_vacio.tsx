import type { MensajeVacioProps } from '@/tipos/compartido/contrato_mensaje_vacio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function MensajeVacio({ titulo, texto, className }: MensajeVacioProps) {
  const clases = catalogoCompartido.mensaje_vacio
  return (
    <div className={[clases.contenedor, className ?? ''].join(' ').trim()}>
      {titulo ? <h3 className={clases.titulo}>{titulo}</h3> : null}
      <p className={clases.texto}>{texto}</p>
    </div>
  )
}
