import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'

const formato = catalogoMarketplace.pago.formato_fecha
const formatoCorto = catalogoMarketplace.pago.formato_fecha_corta

const VACIO = catalogoCompartido.controles.texto_vacio

export const SUPER_VIP_HABILITADO = catalogoMarketplace.super_vip.habilitado

export function precioNumerico(texto: string) {
  return Number(texto.replace(/,/g, ''))
}

export function fechaPrimerCobro() {
  const fecha = new Date()
  fecha.setMonth(fecha.getMonth() + 1)
  return fecha.toLocaleDateString(formato.locale, { day: formato.opciones.day, month: formato.opciones.month, year: formato.opciones.year } as Intl.DateTimeFormatOptions).replace(/\./g, VACIO)
}

export function monto(valor: number, separador = '') {
  return [catalogoMarketplace.planes.moneda, valor.toLocaleString(formato.locale)].join(separador)
}

export function textoTotal(items: ItemCarrito[]) {
  const separador = catalogoMarketplace.carrito.separador_moneda
  const periodos = new Set(items.map((i) => i.periodo))
  const sufijo = periodos.has('anual') ? catalogoMarketplace.planes.sufijo_anual : catalogoMarketplace.planes.sufijo_mensual
  const total = monto(sumarPrecios(items.map((i) => i.precio)), separador)
  return periodos.size > 1 ? total : [total, sufijo].join(separador)
}

export function fechaCorta(meses = 0) {
  const fecha = new Date()
  fecha.setMonth(fecha.getMonth() + meses)
  return fecha.toLocaleDateString(formatoCorto.locale, { day: formatoCorto.opciones.day, month: formatoCorto.opciones.month, year: formatoCorto.opciones.year } as Intl.DateTimeFormatOptions)
}

export function diasPrueba() {
  const hoy = new Date()
  const vence = new Date(hoy)
  vence.setMonth(hoy.getMonth() + 1)
  return Math.round((vence.getTime() - hoy.getTime()) / catalogoMarketplace.mis_compras.milisegundos_dia)
}

export function sumarPrecios(precios: string[]) {
  return precios.reduce((suma, precio) => suma + precioNumerico(precio), 0)
}

export function etiquetaTotal(items: ItemCarrito[]) {
  const periodos = new Set(items.map((i) => i.periodo))
  if (periodos.size > 1) return catalogoMarketplace.carrito.total
  return periodos.has('anual') ? catalogoMarketplace.pago.resumen.total_anual : catalogoMarketplace.pago.resumen.total_mensual
}
