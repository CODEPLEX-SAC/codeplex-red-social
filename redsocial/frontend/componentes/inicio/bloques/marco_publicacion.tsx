import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MarcoPublicacionProps } from '@/tipos/inicio/contrato_publicacion_visual'

export function MarcoPublicacion({ children }: MarcoPublicacionProps) {
  return <article className={catalogoInicio.publicacion.clase_marco}>{children}</article>
}
