import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { etiquetaTotal, fechaPrimerCobro, monto, precioNumerico, SUPER_VIP_HABILITADO, sumarPrecios } from './logica_pago_planes'
import type { ConfiguracionFlujoPago, FilaCalendarioPago, FilaResumenPago, MetodoPagoId, PedidoPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

const pago = catalogoMarketplace.pago
const planes = catalogoMarketplace.planes
const resumen = pago.resumen
const mejoraTextos = pago.mejora
const calendario = pago.paso3
const METODOS: MetodoPagoId[] = ['tarjeta', 'billetera']

export interface ParametrosPedido {
  items: ItemCarrito[]
  configuracion: ConfiguracionPago
  clasesModulo: Record<string, string>
  aplicacionesConVip: string[]
  vip: boolean
  mejora: boolean
}

export interface DatosPedido {
  pedido: PedidoPago
  calendario: ConfiguracionFlujoPago['calendario']
  avisoRenovacion: string | null
  elegiblesVip: number
  fechaCobro: string
  totalNumerico: number
}

function filasCalendario(fechaCobro: string, total: number, hoy: number): FilaCalendarioPago[] {
  return [
    { titulo: calendario.hoy.titulo, detalle: hoy > 0 ? calendario.hoy_vip.detalle : calendario.hoy.detalle, valor: hoy > 0 ? monto(hoy) : calendario.hoy.valor },
    { titulo: calendario.primer.titulo.replace(':fecha', fechaCobro), detalle: calendario.primer.detalle, valor: monto(total) },
    { titulo: calendario.siguientes.titulo, detalle: calendario.siguientes.detalle, valor: calendario.siguientes.valor },
  ]
}

function filasResumen(mejora: boolean, hoy: number): FilaResumenPago[] {
  if (mejora) return [{ etiqueta: mejoraTextos.importe, valor: mejoraTextos.importe_valor }]
  return [
    { etiqueta: resumen.prueba, valor: resumen.prueba_valor },
    { etiqueta: resumen.cobro_hoy, valor: hoy > 0 ? monto(hoy) : resumen.cobro_hoy_valor },
  ]
}

export function construirPedido({ items, configuracion, clasesModulo, aplicacionesConVip, vip, mejora }: ParametrosPedido): DatosPedido {
  const fechaCobro = fechaPrimerCobro()
  const elegiblesVip = SUPER_VIP_HABILITADO && !mejora ? items.filter((item) => !aplicacionesConVip.includes(item.aplicacion)).length : 0
  const vipTotal = configuracion.vip.precio * elegiblesVip
  const vipActivo = vip && elegiblesVip > 0
  const total = sumarPrecios(items.map((item) => item.precio)) + (vipActivo ? vipTotal : 0)
  const hoy = vipActivo ? vipTotal : 0
  const etiquetaAdicional = elegiblesVip > 1 ? resumen.addon_varios.replace(':n', String(elegiblesVip)) : resumen.addon

  const pedido: PedidoPago = {
    lineas: items.map((item) => ({
      id: item.aplicacion,
      nombre: item.nombre,
      detalle: [resumen.plan, item.planNombre].join(' '),
      precio: [monto(precioNumerico(item.precio)), item.periodo === 'mensual' ? planes.sufijo_mensual : planes.sufijo_anual].join(' '),
      icono: item.icono,
      claseIcono: clasesModulo[item.tema],
    })),
    adicionales: vipActivo ? [{ etiqueta: etiquetaAdicional, valor: [resumen.addon_signo, monto(vipTotal)].join(resumen.addon_union) }] : [],
    filas: filasResumen(mejora, hoy),
    totalEtiqueta: mejora ? mejoraTextos.precio_nuevo : etiquetaTotal(items),
    totalDetalle: mejora ? undefined : resumen.desde.replace(':fecha', fechaCobro),
    total: monto(total),
    accion: mejora ? mejoraTextos.activar : resumen.activar,
    aviso: mejora ? mejoraTextos.demostrativo : hoy > 0 ? resumen.seguro_vip : resumen.seguro,
  }

  return {
    pedido,
    calendario: mejora ? null : { titulo: calendario.titulo, detalle: calendario.detalle, filas: filasCalendario(fechaCobro, total, hoy) },
    avisoRenovacion: mejora ? null : pago.aviso_renovacion.replace(':fecha', fechaCobro).replace(':total', monto(total)),
    elegiblesVip,
    fechaCobro,
    totalNumerico: total,
  }
}

export function configurarFlujo(datos: DatosPedido, configuracion: ConfiguracionPago, mejora: boolean, perfilInicialId: string | null): ConfiguracionFlujoPago {
  return {
    metodos: METODOS,
    metodoInicial: pago.metodos.abiertos_inicialmente[0] as MetodoPagoId,
    billeteras: pago.metodos.billeteras,
    paises: configuracion.paises,
    perfilInicialId,
    avisoRenovacion: datos.avisoRenovacion,
    calendario: datos.calendario,
    autorizaciones: { titulo: pago.paso4.titulo, detalle: pago.paso4.detalle, elementos: [{ id: pago.paso4.id_cobro_recurrente, texto: pago.paso4.acepto, obligatoria: true }] },
    demostracion: { tarjetas: pago.demostracion.metodos, perfiles: pago.demostracion.perfiles },
    textos: { metodos: { detalle: mejora ? mejoraTextos.metodo_detalle : pago.metodos.detalle } },
  }
}
