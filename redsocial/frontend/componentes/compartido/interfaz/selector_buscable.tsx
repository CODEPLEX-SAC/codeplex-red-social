import Tooltip from '@mui/material/Tooltip'
import { FondoPanelFlotante } from './fondo_panel_flotante'
import { PanelSelectorBuscable } from './panel_selector_buscable'
import { usarSelectorBuscable } from './usar_selector_buscable'
import { usarTruncamiento } from './usar_truncamiento'
import { Icono } from '../icono'
import { ProveedorTemaGraficos } from '../proveedor_tema_graficos'
import type { SelectorBuscableProps } from '@/tipos/compartido/contrato_selector_buscable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.selector_buscable

export function SelectorBuscable({ seleccionada, fuente, limite, textos, icono, alSeleccionar, className }: SelectorBuscableProps) {
  const estado = usarSelectorBuscable(fuente, limite)
  const { referencia: titulo, truncado, medir: medirTitulo } = usarTruncamiento<HTMLElement>()

  function elegir(id: string) {
    alSeleccionar(id)
    estado.cerrar()
  }

  return (
    <div className={className ? `${clases.contenedor} ${className}` : clases.contenedor}>
      <ProveedorTemaGraficos>
        <Tooltip title={truncado && !estado.abierto && seleccionada.titulo} describeChild>
          <button type="button" aria-haspopup="dialog" aria-expanded={estado.abierto} aria-controls={estado.abierto ? clases.id_panel : undefined} onClick={estado.abrir} onMouseEnter={medirTitulo} onFocus={medirTitulo} className={clases.disparador}>
            <span className={clases.icono_caja}>
              <Icono name={icono} />
            </span>
            <span className={clases.disparador_texto}>
              <strong ref={titulo} className={clases.titulo}>{seleccionada.titulo}</strong>
              {seleccionada.subtitulo && <span className={clases.subtitulo}>{seleccionada.subtitulo}</span>}
            </span>
            <Icono name="flecha-abajo" className={clases.flecha} />
          </button>
        </Tooltip>
      </ProveedorTemaGraficos>
      {estado.abierto && (
        <>
          <FondoPanelFlotante onCerrar={estado.cerrar} atenuarMovil={false} />
          <PanelSelectorBuscable seleccionadaId={seleccionada.id} resultado={estado.resultado} texto={estado.texto} textos={textos} alCambiarTexto={estado.cambiarTexto} alLimpiar={estado.limpiar} alElegir={elegir} />
        </>
      )}
    </div>
  )
}
