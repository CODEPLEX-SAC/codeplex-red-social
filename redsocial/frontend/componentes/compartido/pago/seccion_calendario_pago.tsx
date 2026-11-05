import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import type { FilaCalendarioPago } from '@/tipos/compartido/contrato_flujo_pago'

export function SeccionCalendarioPago({ numero, titulo, detalle, filas }: { numero: number; titulo: string; detalle: string; filas: FilaCalendarioPago[] }) {
  return (
    <section className={clases.seccion}>
      <EncabezadoPasoPago numero={numero} titulo={titulo} detalle={detalle} />
      {filas.map((fila) => (
        <div key={fila.titulo} className={clases.calendario_fila}>
          <div className={clases.calendario_texto}>
            <div className={clases.calendario_titulo}>{fila.titulo}</div>
            <div className={clases.calendario_detalle}>{fila.detalle}</div>
          </div>
          <span className={clases.calendario_valor}>{fila.valor}</span>
        </div>
      ))}
    </section>
  )
}
