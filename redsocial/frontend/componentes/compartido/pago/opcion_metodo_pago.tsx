import { Icono } from '../icono'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import type { OpcionMetodoPagoProps } from '@/tipos/compartido/contrato_flujo_pago'

export function OpcionMetodoPago({ titulo, detalle, icono, activa, deshabilitada = false, adicional, alElegir }: OpcionMetodoPagoProps) {
  const estado = activa ? clases.metodo_activo : clases.metodo_inactivo
  return (
    <button type="button" role="radio" aria-checked={activa} disabled={deshabilitada} onClick={alElegir} className={[clases.metodo, estado, deshabilitada ? clases.metodo_deshabilitado : ''].join(' ').trim()}>
      <span className={clases.metodo_icono}>
        <Icono name={icono} className={clases.metodo_glifo} />
      </span>
      <span className={clases.metodo_texto}>
        <strong className={clases.metodo_titulo}>
          {titulo}
          {adicional}
        </strong>
        {detalle && <span className={clases.metodo_detalle}>{detalle}</span>}
      </span>
      <span className={`${clases.indicador} ${activa ? clases.indicador_activo : clases.indicador_inactivo}`}>
        {activa && <Icono name="marca-pequena" className={clases.indicador_glifo} />}
      </span>
    </button>
  )
}
