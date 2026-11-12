import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { fechaPrimerCobro, monto, precioNumerico, SUPER_VIP_HABILITADO, sumarPrecios } from './logica_pago_planes'
import type { ConfiguracionFlujoPago, MetodoPagoId, PedidoPago } from '@/tipos/compartido/contrato_flujo_pago'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'
import type { ParametrosPedido, DatosPedido } from '@/tipos/marketplace/contrato_pedido_pago'
import { etiquetaDeAdicional, filasCalendario, filasResumen, sufijoDePeriodo, textosDelPedido } from './logica_textos_pedido_pago'

const pago = catalogoMarketplace.pago
const resumen = pago.resumen
const mejoraTextos = pago.mejora
const calendario = pago.paso3
const METODOS: MetodoPagoId[] = ['tarjeta', 'billetera']

function contarElegiblesVip(items: ParametrosPedido['items'], aplicacionesConVip: string[], mejora: boolean) {
  if (!SUPER_VIP_HABILITADO || mejora) return 0
  const conVip = new Set(aplicacionesConVip)
  return items.filter((item) => !conVip.has(item.aplicacion)).length
}

export function construirPedido({ items, configuracion, clasesModulo, aplicacionesConVip, vip, mejora }: ParametrosPedido): DatosPedido {
  const fechaCobro = fechaPrimerCobro()
  const elegiblesVip = contarElegiblesVip(items, aplicacionesConVip, mejora)
  const vipTotal = configuracion.vip.precio * elegiblesVip
  const vipActivo = vip && elegiblesVip > 0
  const hoy = vipActivo ? vipTotal : 0
  const total = sumarPrecios(items.map((item) => item.precio)) + hoy
  const etiquetaAdicional = etiquetaDeAdicional(elegiblesVip)

  const pedido: PedidoPago = {
    lineas: items.map((item) => ({
      id: item.aplicacion,
      nombre: item.nombre,
      detalle: [resumen.plan, item.planNombre].join(' '),
      precio: [monto(precioNumerico(item.precio)), sufijoDePeriodo(item.periodo)].join(' '),
      icono: item.icono,
      claseIcono: clasesModulo[item.tema],
    })),
    adicionales: vipActivo ? [{ etiqueta: etiquetaAdicional, valor: [resumen.addon_signo, monto(vipTotal)].join(resumen.addon_union) }] : [],
    filas: filasResumen(mejora, hoy),
    ...textosDelPedido(mejora, items, fechaCobro, hoy),
    total: monto(total),
  }
  const comun = { pedido, elegiblesVip, fechaCobro, totalNumerico: total }

  if (mejora) return { ...comun, calendario: null, avisoRenovacion: null }
  return {
    ...comun,
    calendario: { titulo: calendario.titulo, detalle: calendario.detalle, filas: filasCalendario(fechaCobro, total, hoy) },
    avisoRenovacion: pago.aviso_renovacion.replace(':fecha', fechaCobro).replace(':total', monto(total)),
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
