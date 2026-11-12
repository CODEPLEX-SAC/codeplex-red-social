import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { Radio } from '../../componentes/compartido/interfaz/radio'
import type { OpcionCostoEventoProps } from '@/formularios/eventos/modelo_formulario_evento'

const clases = catalogoEventos.clases_formulario_evento

export function OpcionCostoEvento({ etiqueta, detalle, activa, onElegir }: OpcionCostoEventoProps) {
  return (
    <div className={clases.costo}>
      <Radio checked={activa} onChange={onElegir} inputProps={{ 'aria-label': etiqueta }} sx={{ mt: -0.5 }} />
      <div className={clases.costo_cuerpo} onClick={onElegir}>
        <span className={clases.costo_etiqueta}>{etiqueta}</span>
        <span className={clases.costo_detalle}>{detalle}</span>
      </div>
    </div>
  )
}
