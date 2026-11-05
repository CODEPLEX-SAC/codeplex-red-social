import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { TarjetaPago, TextosFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

const reglas = catalogoCompartido.flujo_pago.reglas
const VACIO = catalogoCompartido.controles.texto_vacio
const NO_DIGITO = /\D/g
const ESPACIOS = /\s/g

function empiezaPor(digitos: string, prefijos: string[]) {
  return prefijos.some((prefijo) => digitos.startsWith(prefijo))
}

export function soloDigitos(valor: string) {
  return valor.replace(NO_DIGITO, VACIO)
}

export function formatearTarjeta(valor: string) {
  return soloDigitos(valor).slice(0, 16).match(/\d{1,4}/g)?.join(reglas.formato.separador_tarjeta) ?? VACIO
}

export function formatearVencimiento(valor: string) {
  const digitos = soloDigitos(valor).slice(0, 4)
  return digitos.length >= 3 ? [digitos.slice(0, 2), digitos.slice(2)].join(reglas.formato.separador_vencimiento) : digitos
}

export function marcaTarjeta(numero: string) {
  const digitos = numero.replace(ESPACIOS, VACIO)
  if (empiezaPor(digitos, reglas.prefijos.visa)) return reglas.marcas.visa
  if (empiezaPor(digitos, reglas.prefijos.mastercard)) return reglas.marcas.mastercard
  if (empiezaPor(digitos, reglas.prefijos.amex)) return reglas.marcas.amex
  return reglas.marcas.otra
}

export function tarjetaVencida(vencimiento: string, ahora: Date = new Date()) {
  const [mes, anio] = vencimiento.split(reglas.formato.separador_vencimiento).map(Number)
  if (!mes || mes > reglas.tarjeta.meses || Number.isNaN(anio)) return true
  return new Date(reglas.tarjeta.siglo + anio, mes, 1).getTime() <= ahora.getTime()
}

export function tituloTarjeta(tarjeta: TarjetaPago, textos: TextosFlujoPago) {
  return textos.metodo_guardado.titulo_tarjeta.replace(':marca', tarjeta.marca).replace(':ultimos', tarjeta.ultimos4)
}

export function detalleTarjeta(tarjeta: TarjetaPago, textos: TextosFlujoPago) {
  return [textos.guardados.vence.replace(':fecha', tarjeta.vencimiento), tarjeta.titular].filter(Boolean).join(textos.guardados.separador)
}

export function elegirTarjetaInicial(tarjetas: TarjetaPago[]) {
  const predeterminada = tarjetas.find((tarjeta) => tarjeta.predeterminada)
  return predeterminada && !tarjetaVencida(predeterminada.vencimiento) ? predeterminada : null
}

export function predeterminadaVencida(tarjetas: TarjetaPago[]) {
  const predeterminada = tarjetas.find((tarjeta) => tarjeta.predeterminada)
  return predeterminada !== undefined && tarjetaVencida(predeterminada.vencimiento)
}
