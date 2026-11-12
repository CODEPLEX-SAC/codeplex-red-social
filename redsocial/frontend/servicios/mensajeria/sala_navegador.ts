import datos from './sala_navegador.json'
import type { MotivoCaptura, PuertoSala, ResultadoCaptura, ResultadoOperacion } from '@/tipos/mensajeria/contrato_integracion_llamada'

function motivoDe(error: unknown): MotivoCaptura {
  const nombre = error instanceof DOMException ? error.name : String()
  if (nombre === datos.errores.cancelado) return 'cancelado'
  if (nombre === datos.errores.sinPermiso) return 'sin_permiso'
  if (nombre === datos.errores.noDisponible) return 'no_disponible'
  return 'error'
}

export function crearSalaNavegador(): PuertoSala {
  let captura: MediaStream | null = null

  function detenerPantalla() {
    captura?.getTracks().forEach((pista) => pista.stop())
    captura = null
  }

  async function compartirPantalla(): Promise<ResultadoCaptura> {
    if (!navigator.mediaDevices?.getDisplayMedia) return { exito: false, motivo: 'no_soportado' }
    try {
      detenerPantalla()
      captura = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      return { exito: true, flujo: captura }
    } catch (error) {
      return { exito: false, motivo: motivoDe(error) }
    }
  }

  async function copiarEnlace(enlace: string): Promise<ResultadoOperacion> {
    if (!navigator.clipboard?.writeText) return { exito: false, motivo: 'no_soportado' }
    try {
      await navigator.clipboard.writeText(enlace)
      return { exito: true }
    } catch {
      return { exito: false, motivo: 'sin_permiso' }
    }
  }

  return {
    flujoDe: () => null,
    compartirPantalla,
    detenerPantalla,
    invitar: async () => ({ exito: false, motivo: 'no_disponible' }),
    silenciarParticipante: async () => ({ exito: false, motivo: 'no_disponible' }),
    quitarParticipante: async () => ({ exito: false, motivo: 'no_disponible' }),
    finalizarParaTodos: async () => ({ exito: false, motivo: 'no_disponible' }),
    informarProblema: async () => ({ exito: false, motivo: 'no_disponible' }),
    copiarEnlace,
  }
}
