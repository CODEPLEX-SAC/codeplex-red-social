import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { Icono } from '../icono'
import type { CabeceraTarjetaKpiProps } from '@/tipos/compartido/contrato_cabecera_tarjeta_kpi'

const clases = catalogoCompartido.cabecera_tarjeta_kpi

export function CabeceraTarjetaKpi({ etiqueta, icono, claseIcono }: CabeceraTarjetaKpiProps) {
  return (
    <div className={clases.contenedor}>
      <span className={[clases.icono_caja, claseIcono].join(' ')}>
        <Icono name={icono} className={clases.icono} />
      </span>
      <span>{etiqueta}</span>
    </div>
  )
}
