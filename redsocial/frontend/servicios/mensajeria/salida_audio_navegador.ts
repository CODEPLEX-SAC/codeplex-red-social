import datos from './dispositivos_navegador.json'
import { motivoDe } from './motivo_fallo_dispositivo'
import type { ContextoConSalida, PuertoSalidaAudio, ResultadoOperacion } from '@/tipos/mensajeria/contrato_integracion_llamada'

const PROPIEDAD_SALIDA = datos.propiedadSalida
const FRECUENCIA_TONO = datos.frecuenciaTono
const DURACION_TONO_MS = datos.duracionTonoMs
const MILISEGUNDOS_POR_SEGUNDO = 1000
const NO_SOPORTADO: ResultadoOperacion = { exito: false, motivo: 'no_soportado' }

function tieneSalida(contexto: AudioContext): contexto is AudioContext & ContextoConSalida {
  return PROPIEDAD_SALIDA in contexto
}

async function admiteSalidaDeAudio(): Promise<boolean> {
  if (typeof AudioContext === 'undefined') return false
  const contexto = new AudioContext()
  const admite = tieneSalida(contexto)
  await contexto.close()
  return admite
}

export function crearSalidaAudio(): PuertoSalidaAudio {
  let salida: string | null = null

  async function seleccionarSalida(idDispositivo: string): Promise<ResultadoOperacion> {
    const admite = await admiteSalidaDeAudio()
    if (!admite) return NO_SOPORTADO
    salida = idDispositivo
    return { exito: true }
  }

  async function probarSalida(): Promise<ResultadoOperacion> {
    if (typeof AudioContext === 'undefined') return NO_SOPORTADO
    try {
      const contexto = new AudioContext()
      if (salida !== null && tieneSalida(contexto)) await contexto.setSinkId(salida)
      const oscilador = contexto.createOscillator()
      oscilador.frequency.value = FRECUENCIA_TONO
      oscilador.connect(contexto.destination)
      oscilador.start()
      oscilador.stop(contexto.currentTime + DURACION_TONO_MS / MILISEGUNDOS_POR_SEGUNDO)
      oscilador.onended = () => void contexto.close()
      return { exito: true }
    } catch (error) {
      return { exito: false, motivo: motivoDe(error) }
    }
  }

  return { seleccionarSalida, probarSalida }
}
