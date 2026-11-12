import { Selector } from '../../compartido/interfaz/selector'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SelectorDemostracionProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos
const clases = catalogoMensajeria.videollamada.clases.sala

export function SelectorDemostracion({ cantidad, opciones, onCambiar }: SelectorDemostracionProps) {
  return (
    <div className={clases.selector_demostracion}>
      <span>{textos.demostracion_selector}</span>
      <Selector variant="mini" aria-label={textos.demostracion_selector} value={String(cantidad)} onChange={(evento) => onCambiar(Number(evento.target.value))}>
        {opciones.map((opcion) => (
          <option key={opcion} value={String(opcion)}>
            {opcion}
          </option>
        ))}
      </Selector>
    </div>
  )
}
