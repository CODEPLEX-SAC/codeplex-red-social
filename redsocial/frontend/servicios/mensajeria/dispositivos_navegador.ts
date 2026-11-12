import datos from './dispositivos_navegador.json'
import { motivoDe } from './motivo_fallo_dispositivo'
import { crearSalidaAudio } from './salida_audio_navegador'
import type { DispositivoMultimedia, InventarioDispositivos, PuertoDispositivos, ResultadoFlujo, TipoDispositivo } from '@/tipos/mensajeria/contrato_integracion_llamada'

const TIPO_POR_VARIANTE: Record<string, TipoDispositivo | undefined> = { videoinput: 'camara', audioinput: 'microfono', audiooutput: 'altavoz' }
const ETIQUETA_GENERICA: Record<TipoDispositivo, string> = datos.etiquetas

function dispositivosDe(lista: MediaDeviceInfo[]): DispositivoMultimedia[] {
  const contadores: Record<TipoDispositivo, number> = { camara: 0, microfono: 0, altavoz: 0 }
  return lista.flatMap((dispositivo) => {
    const tipo = TIPO_POR_VARIANTE[dispositivo.kind]
    if (tipo === undefined) return []
    contadores[tipo] += 1
    return [{ id: dispositivo.deviceId, etiqueta: dispositivo.label || `${ETIQUETA_GENERICA[tipo]} ${contadores[tipo]}`, tipo }]
  })
}

export function crearDispositivosNavegador(): PuertoDispositivos {
  let flujoCamara: MediaStream | null = null

  async function listar(): Promise<InventarioDispositivos> {
    if (!navigator.mediaDevices?.enumerateDevices) return { acceso: 'no_soportado', dispositivos: [] }
    try {
      const lista = await navigator.mediaDevices.enumerateDevices()
      const conEtiqueta = lista.some((dispositivo) => dispositivo.label !== String())
      return { acceso: conEtiqueta ? 'disponible' : 'sin_permiso', dispositivos: dispositivosDe(lista) }
    } catch {
      return { acceso: 'sin_permiso', dispositivos: [] }
    }
  }

  async function abrirCamara(idDispositivo: string | null): Promise<ResultadoFlujo> {
    if (!navigator.mediaDevices?.getUserMedia) return { exito: false, motivo: 'no_soportado' }
    try {
      flujoCamara?.getTracks().forEach((pista) => pista.stop())
      flujoCamara = await navigator.mediaDevices.getUserMedia({ video: idDispositivo ? { deviceId: { exact: idDispositivo } } : true })
      return { exito: true, flujo: flujoCamara }
    } catch (error) {
      return { exito: false, motivo: motivoDe(error) }
    }
  }

  function detenerCamara() {
    flujoCamara?.getTracks().forEach((pista) => pista.stop())
    flujoCamara = null
  }

  return { listar, abrirCamara, detenerCamara, ...crearSalidaAudio() }
}
