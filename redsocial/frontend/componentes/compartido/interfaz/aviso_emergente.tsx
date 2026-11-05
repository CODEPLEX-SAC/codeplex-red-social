import { CodeplexNotificacion } from '@codeplex-sac/feedback'
import type { CodeplexNotificacionProps } from '@codeplex-sac/feedback'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function AvisoEmergente(props: CodeplexNotificacionProps) {
  return (
    <ProveedorTemaGraficos>
      <CodeplexNotificacion
        {...(catalogoCompartido.controles.aviso_emergente as Omit<CodeplexNotificacionProps, 'abierto' | 'mensaje'>)}
        {...props}
      />
    </ProveedorTemaGraficos>
  )
}
