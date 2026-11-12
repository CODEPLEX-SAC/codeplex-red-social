import { Icono, Radio } from '../../compartido'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { FilaCiudadProps } from '@/tipos/eventos/contrato_filtro_ubicacion'

const clases = catalogoEventos.panel_filtro_ubicacion.clases_fila_ciudad

export function FilaCiudad({ nombre, activa, onElegir }: FilaCiudadProps) {
  return (
    <div onClick={onElegir} className={[clases.base, activa ? clases.activa : clases.inactiva].join(' ')}>
      <Radio checked={activa} onChange={onElegir} inputProps={{ 'aria-label': nombre }} />
      <Icono name="ubicacion" className={clases.icono} />
      <span className={[clases.nombre, activa ? clases.nombre_activo : clases.nombre_inactivo].join(' ')}>{nombre}</span>
    </div>
  )
}
