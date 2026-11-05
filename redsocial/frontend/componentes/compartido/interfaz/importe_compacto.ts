import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const compacto = catalogoCompartido.dona_progreso.compacto
const FORMATO_IMPORTE = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/
const CIFRAS_ENTERAS_DESDE = 100

export function compactarImporte(texto: string): string | null {
  const partes = FORMATO_IMPORTE.exec(texto.trim())
  if (!partes) return null
  const numero = Number(partes[2].replaceAll(',', ''))
  const umbral = compacto.umbrales.find((candidato) => numero >= candidato.desde)
  if (!Number.isFinite(numero) || !umbral) return null
  const cociente = numero / umbral.desde
  const cifra = cociente >= CIFRAS_ENTERAS_DESDE ? Math.round(cociente) : Math.round(cociente * 10) / 10
  return [partes[1], cifra, compacto.separador, umbral.sufijo, partes[3]].join('')
}
