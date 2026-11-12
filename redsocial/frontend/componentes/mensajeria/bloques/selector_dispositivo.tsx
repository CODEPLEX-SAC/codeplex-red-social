import { Icono } from '../../compartido/icono'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SelectorDispositivoProps } from '@/tipos/mensajeria/contrato_preparacion_llamada'

const textos = catalogoMensajeria.videollamada.textos.dispositivos
const clases = catalogoMensajeria.videollamada.clases.dispositivos

export function SelectorDispositivo({ tipo, icono, dispositivos, valor, onElegir }: SelectorDispositivoProps) {
  const titulo = textos[tipo]
  const vacio = dispositivos.length === 0

  return (
    <div className={clases.fila_selector}>
      <span className={clases.etiqueta_selector}>
        <Icono name={icono} className={clases.icono} />
        {titulo}
      </span>
      <Selector variant="default" aria-label={titulo} value={valor} placeholder={textos.sin_dispositivos} disabled={vacio} onChange={(evento) => onElegir(tipo, evento.target.value)}>
        {vacio && (
          <option value={String()} disabled>
            {textos.sin_dispositivos}
          </option>
        )}
        {dispositivos.map((dispositivo) => (
          <option key={dispositivo.id} value={dispositivo.id}>
            {dispositivo.etiqueta}
          </option>
        ))}
      </Selector>
    </div>
  )
}
