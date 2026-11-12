import { AlertaEstado } from './alerta_estado'
import { IndicadorCarga } from './indicador_carga'
import { MensajeVacio } from './mensaje_vacio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { MensajeEstadoBusquedaProps } from '@/tipos/compartido/contrato_mensaje_estado_busqueda'

const textos = catalogoCompartido.busqueda

export function MensajeEstadoBusqueda({ estado, error = null, sinCoincidencias = true, className }: MensajeEstadoBusquedaProps) {
  if (error !== null || estado === 'error') {
    return (
      <AlertaEstado>
        <MensajeVacio texto={textos.error} className={className} />
      </AlertaEstado>
    )
  }
  if (estado === 'cargando') {
    return (
      <AlertaEstado tipo="estado" className={className}>
        <IndicadorCarga etiqueta={textos.cargando} />
      </AlertaEstado>
    )
  }
  if (estado === 'sin_coincidencias' && sinCoincidencias) {
    return (
      <AlertaEstado tipo="estado">
        <MensajeVacio texto={textos.sin_resultados} className={className} />
      </AlertaEstado>
    )
  }
  return null
}
