import { Icono } from '../icono'
import { TextoTruncable } from '../interfaz/texto_truncable'
import { BotonActivarPago } from './boton_activar_pago'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFlujoPago } from './usar_flujo_pago'
import type { FilaResumenPago, PedidoPago } from '@/tipos/compartido/contrato_flujo_pago'

function Fila({ fila }: { fila: FilaResumenPago }) {
  return (
    <div className={clases.resumen_fila}>
      <span className={clases.resumen_fila_etiqueta}>{fila.etiqueta}</span>
      <span className={clases.resumen_fila_valor}>{fila.valor}</span>
    </div>
  )
}

export function ResumenPedidoPago({ pedido, estado, conAccion }: { pedido: PedidoPago; estado: ReturnType<typeof usarFlujoPago>; conAccion: boolean }) {
  const textos = usarTextosPago()
  return (
    <aside className={`${clases.seccion} ${clases.resumen_fijo} ${clases.resumen}`}>
      <h3 className={clases.resumen_titulo}>{textos.resumen.titulo}</h3>
      {pedido.lineas.map((linea) => (
        <div key={linea.id} className={clases.resumen_linea_pedido}>
          <span className={`${clases.resumen_icono_caja} ${linea.claseIcono}`}>
            <Icono name={linea.icono} className={clases.resumen_icono} />
          </span>
          <div className={clases.resumen_texto}>
            <TextoTruncable texto={linea.nombre} className={clases.resumen_nombre} />
            <div className={clases.resumen_detalle}>{linea.detalle}</div>
          </div>
          <span className={clases.resumen_precio}>{linea.precio}</span>
        </div>
      ))}
      {pedido.adicionales.map((fila) => <Fila key={fila.etiqueta} fila={fila} />)}
      <div className={clases.resumen_bloque}>
        {pedido.filas.map((fila) => <Fila key={fila.etiqueta} fila={fila} />)}
      </div>
      <div className={clases.resumen_total}>
        <div>
          <div className={clases.resumen_total_etiqueta}>{pedido.totalEtiqueta}</div>
          {pedido.totalDetalle && <div className={clases.resumen_total_detalle}>{pedido.totalDetalle}</div>}
        </div>
        <span className={clases.resumen_total_valor}>{pedido.total}</span>
      </div>
      {conAccion && <BotonActivarPago estado={estado} accion={pedido.accion} />}
      <p className={clases.resumen_pie}>
        <Icono name="escudo" className={clases.resumen_pie_glifo} /> {pedido.aviso}
      </p>
    </aside>
  )
}
