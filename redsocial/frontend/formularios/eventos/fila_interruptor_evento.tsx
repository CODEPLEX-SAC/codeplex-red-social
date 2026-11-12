import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../componentes/compartido/icono'
import { Interruptor } from '../../componentes/compartido/interfaz/interruptor'
import type { FilaInterruptorEventoProps } from '@/formularios/eventos/modelo_formulario_evento'

const clases = catalogoEventos.clases_formulario_evento

export function FilaInterruptorEvento({ etiqueta, activo, onCambiar }: FilaInterruptorEventoProps) {
  return (
    <div className={clases.interruptor}>
      <span className={clases.interruptor_etiqueta}>
        <Icono name="configuracion" className={clases.interruptor_icono} /> {etiqueta}
      </span>
      <Interruptor seleccionado={activo} alCambiar={(_, valor) => onCambiar(valor)} inputProps={{ 'aria-label': etiqueta }} />
    </div>
  )
}
