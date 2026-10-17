import type { CampoEtiquetadoProps } from '@/tipos/compartido/contrato_campo_etiquetado'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.campo_etiquetado

export function CampoEtiquetado({ etiqueta, requerido, className, children }: CampoEtiquetadoProps) {
  return (
    <div className={className ? `${clases.contenedor} ${className}` : clases.contenedor}>
      <span className={clases.etiqueta}>
        {etiqueta} {requerido && <span className={clases.requerido}>{clases.simbolo_requerido}</span>}
      </span>
      {children}
    </div>
  )
}
