import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../componentes/compartido/icono'
import type { OpcionModalidadEventoProps } from '@/formularios/eventos/modelo_formulario_evento'

const clases = catalogoEventos.clases_formulario_evento

export function OpcionFormatoEvento({ icono, etiqueta, activa, onElegir }: OpcionModalidadEventoProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={activa}
      onClick={onElegir}
      className={[clases.modalidad, activa ? clases.modalidad_activa : clases.modalidad_inactiva].join(' ')}
    >
      <Icono name={icono} className={clases.modalidad_icono} /> {etiqueta}
    </button>
  )
}
