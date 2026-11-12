import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { marcaTarjeta, soloDigitos, tarjetaVencida } from './logica_tarjeta_pago'
import type { DatosTarjetaPago, ErroresTarjetaPago, TarjetaPorGuardar, TextosFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

const reglas = catalogoCompartido.flujo_pago.reglas.tarjeta
const ESPACIOS = /\s/g

function cumpleLuhn(numero: string) {
  let suma = 0
  numero.split('').reverse().forEach((caracter, indice) => {
    const valor = Number(caracter) * (1 + (indice % 2))
    suma += valor > 9 ? valor - 9 : valor
  })
  return suma % 10 === 0
}

export function validarTarjetaNueva(datos: DatosTarjetaPago, errores: TextosFlujoPago['errores'], ahora: Date = new Date()): ErroresTarjetaPago {
  const numero = soloDigitos(datos.numero)
  const resultado: ErroresTarjetaPago = {}
  if (numero.length < reglas.digitos_minimos || numero.length > reglas.digitos_maximos || !cumpleLuhn(numero)) resultado.numero = errores.numero
  if (!datos.vencimiento.replace(ESPACIOS, '')) resultado.vencimiento = errores.vencimiento
  else if (tarjetaVencida(datos.vencimiento, ahora)) resultado.vencimiento = errores.vencida
  const cvv = soloDigitos(datos.cvv)
  if (cvv.length < reglas.cvv_minimo || cvv.length > reglas.cvv_maximo) resultado.cvv = errores.cvv
  if (!datos.propietario.trim()) resultado.propietario = errores.propietario
  return resultado
}

export function sinErrores(resultado: ErroresTarjetaPago) {
  return Object.keys(resultado).length === 0
}

export function datosParaGuardar(datos: DatosTarjetaPago): TarjetaPorGuardar {
  const numero = soloDigitos(datos.numero)
  return { marca: marcaTarjeta(datos.numero), ultimos4: numero.slice(-reglas.ultimos), vencimiento: datos.vencimiento, titular: datos.propietario.trim() }
}
