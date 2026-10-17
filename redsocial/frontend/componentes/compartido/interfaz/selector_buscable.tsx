import { FondoPanelFlotante } from './fondo_panel_flotante'
import { PanelSelectorBuscable } from './panel_selector_buscable'
import { usarSelectorBuscable } from './usar_selector_buscable'
import { Icono } from '../icono'
import type { SelectorBuscableProps } from '@/tipos/compartido/contrato_selector_buscable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.selector_buscable

export function SelectorBuscable({ seleccionada, fuente, limite, textos, icono, alSeleccionar, className }: SelectorBuscableProps) {
  const estado = usarSelectorBuscable(fuente, limite)

  function elegir(id: string) {
    alSeleccionar(id)
    estado.cerrar()
  }

  return (
    <div className={className ? `${clases.contenedor} ${className}` : clases.contenedor}>
      <button type="button" title={seleccionada.titulo} aria-haspopup="dialog" aria-expanded={estado.abierto} aria-controls={estado.abierto ? clases.id_panel : undefined} onClick={estado.abrir} className={clases.disparador}>
        <span className={clases.icono_caja}>
          <Icono name={icono} />
        </span>
        <strong className={clases.disparador_titulo}>{seleccionada.titulo}</strong>
        <Icono name="flecha-abajo" className={clases.flecha} />
      </button>
      {estado.abierto && (
        <>
          <FondoPanelFlotante onCerrar={estado.cerrar} atenuarMovil={false} />
          <PanelSelectorBuscable seleccionadaId={seleccionada.id} resultado={estado.resultado} texto={estado.texto} textos={textos} alCambiarTexto={estado.cambiarTexto} alLimpiar={estado.limpiar} alElegir={elegir} />
        </>
      )}
    </div>
  )
}
