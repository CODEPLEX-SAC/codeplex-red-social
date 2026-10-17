import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ItemCarrito, TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'

const formato = catalogoMarketplace.pago.formato_fecha
const formatoCorto = catalogoMarketplace.pago.formato_fecha_corta
const marcas = catalogoMarketplace.pago.marcas
const prefijos = catalogoMarketplace.pago.prefijos

const VACIO = catalogoCompartido.controles.texto_vacio

export const SUPER_VIP_HABILITADO = catalogoMarketplace.super_vip.habilitado

export function formatearTarjeta(valor: string) {
  return valor.replace(/\D/g, VACIO).slice(0, 16).match(/\d{1,4}/g)?.join(catalogoMarketplace.pago.formato.separador_tarjeta) ?? VACIO
}

export function formatearVencimiento(valor: string) {
  const digitos = valor.replace(/\D/g, VACIO).slice(0, 4)
  return digitos.length >= 3 ? [digitos.slice(0, 2), digitos.slice(2)].join(catalogoMarketplace.pago.formato.separador_vencimiento) : digitos
}

function empiezaPor(digitos: string, prefijos: string[]) {
  return prefijos.some((prefijo) => digitos.startsWith(prefijo))
}

export function marcaTarjeta(numero: string) {
  const digitos = numero.replace(/\s/g, VACIO)
  if (empiezaPor(digitos, prefijos.visa)) return marcas.visa
  if (empiezaPor(digitos, prefijos.mastercard)) return marcas.mastercard
  if (empiezaPor(digitos, prefijos.amex)) return marcas.amex
  return marcas.otra
}

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

export function detalleTarjeta(tarjeta: TarjetaGuardada) {
  const partes = [tarjeta.propietario, tarjeta.vencimiento ? catalogoMarketplace.pago.guardados.vence.replace(':fecha', tarjeta.vencimiento) : tarjeta.vencimiento]
  return partes.filter((parte) => parte).join(catalogoMarketplace.pago.guardados.separador)
}
