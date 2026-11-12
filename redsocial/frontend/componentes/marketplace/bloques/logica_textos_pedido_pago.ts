import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { etiquetaTotal, monto } from './logica_pago_planes'
import type { FilaCalendarioPago, FilaResumenPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { ParametrosPedido } from '@/tipos/marketplace/contrato_pedido_pago'

const pago = catalogoMarketplace.pago
const planes = catalogoMarketplace.planes
const resumen = pago.resumen
const mejoraTextos = pago.mejora
const calendario = pago.paso3

function cobroDeHoy(hoy: number) {
  if (hoy > 0) return { detalle: calendario.hoy_vip.detalle, valor: monto(hoy) }
  return { detalle: calendario.hoy.detalle, valor: calendario.hoy.valor }
}

export function filasCalendario(fechaCobro: string, total: number, hoy: number): FilaCalendarioPago[] {
  return [
    { titulo: calendario.hoy.titulo, ...cobroDeHoy(hoy) },
    { titulo: calendario.primer.titulo.replace(':fecha', fechaCobro), detalle: calendario.primer.detalle, valor: monto(total) },
    { titulo: calendario.siguientes.titulo, detalle: calendario.siguientes.detalle, valor: calendario.siguientes.valor },
  ]
}

export function filasResumen(mejora: boolean, hoy: number): FilaResumenPago[] {
  if (mejora) return [{ etiqueta: mejoraTextos.importe, valor: mejoraTextos.importe_valor }]
  return [
    { etiqueta: resumen.prueba, valor: resumen.prueba_valor },
    { etiqueta: resumen.cobro_hoy, valor: hoy > 0 ? monto(hoy) : resumen.cobro_hoy_valor },
  ]
}

export function etiquetaDeAdicional(elegiblesVip: number) {
  if (elegiblesVip > 1) return resumen.addon_varios.replace(':n', String(elegiblesVip))
  return resumen.addon
}

export function sufijoDePeriodo(periodo: string) {
  if (periodo === 'mensual') return planes.sufijo_mensual
  return planes.sufijo_anual
}

export function textosDelPedido(mejora: boolean, items: ParametrosPedido['items'], fechaCobro: string, hoy: number) {
  if (mejora) return { totalEtiqueta: mejoraTextos.precio_nuevo, totalDetalle: undefined, accion: mejoraTextos.activar, aviso: mejoraTextos.demostrativo }
  return { totalEtiqueta: etiquetaTotal(items), totalDetalle: resumen.desde.replace(':fecha', fechaCobro), accion: resumen.activar, aviso: hoy > 0 ? resumen.seguro_vip : resumen.seguro }
}
