import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { tarjetaVencida } from './logica_metodos_pago'
import { marcaTarjeta } from './logica_pago_planes'
import type { DatosMetodoGuardado, DatosTarjeta, ErroresTarjeta } from '@/tipos/marketplace/modelo_pago'

const errores = catalogoMarketplace.pago.errores
const reglas = catalogoMarketplace.pago.reglas_tarjeta
const NO_DIGITO = /\D/g
const ESPACIOS = /\s/g

function digitos(texto: string) {
  return texto.replace(NO_DIGITO, '')
}

function cumpleLuhn(numero: string) {
  let suma = 0
  numero.split('').reverse().forEach((caracter, indice) => {
    const valor = Number(caracter) * (indice % 2 === 1 ? 2 : 1)
    suma += valor > 9 ? valor - 9 : valor
  })
  return suma % 10 === 0
}

export function validarTarjetaNueva(datos: DatosTarjeta, ahora: Date = new Date()): ErroresTarjeta {
  const numero = digitos(datos.numero)
  const resultado: ErroresTarjeta = {}
  if (numero.length < reglas.digitos_minimos || numero.length > reglas.digitos_maximos || !cumpleLuhn(numero)) resultado.numero = errores.numero
  if (!datos.vencimiento.replace(ESPACIOS, '')) resultado.vencimiento = errores.vencimiento
  else if (tarjetaVencida(datos.vencimiento, ahora)) resultado.vencimiento = errores.vencida
  const cvv = digitos(datos.cvv)
  if (cvv.length < reglas.cvv_minimo || cvv.length > reglas.cvv_maximo) resultado.cvv = errores.cvv
  if (!datos.propietario.trim()) resultado.propietario = errores.propietario
  return resultado
}

export function sinErrores(resultado: ErroresTarjeta) {
  return Object.keys(resultado).length === 0
}

export function datosParaGuardar(datos: DatosTarjeta): DatosMetodoGuardado {
  const numero = digitos(datos.numero)
  return { marca: marcaTarjeta(datos.numero), ultimos4: numero.slice(-reglas.ultimos), vencimiento: datos.vencimiento, titular: datos.propietario.trim() }
}
