import { useEffect, useRef, useState } from 'react'
import { resumirNiveles } from './logica_audio'
import { usarCronometroAudio } from './usar_cronometro_audio'
import { usarNivelesAudio } from './usar_niveles_audio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { GrabacionAudio, MensajesGrabacionAudio } from '@/tipos/compartido/contrato_audio'

const configuracion = catalogoCompartido.audio.grabacion

export function usarGrabacionAudio(mensajes: MensajesGrabacionAudio) {
  const [grabando, setGrabando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [borrador, setBorrador] = useState<GrabacionAudio | null>(null)
  const medidor = usarNivelesAudio()
  const cronometro = usarCronometroAudio()
  const grabador = useRef<MediaRecorder | null>(null)
  const trozos = useRef<Blob[]>([])
  const pendiente = useRef<GrabacionAudio | null>(null)

  function liberar() {
    cronometro.parar()
    medidor.parar()
    grabador.current?.stream.getTracks().forEach((pista) => pista.stop())
    grabador.current = null
    setGrabando(false)
  }

  function soltarBorrador() {
    if (pendiente.current) URL.revokeObjectURL(pendiente.current.url)
    pendiente.current = null
    setBorrador(null)
  }

  useEffect(
    () => () => {
      liberar()
      soltarBorrador()
    },
    [],
  )

  async function iniciar() {
    if (grabando || pendiente.current) return
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') return setError(mensajes.sinSoporte)
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ audio: true })
      const nuevo = new MediaRecorder(flujo)
      trozos.current = []
      nuevo.ondataavailable = (evento) => trozos.current.push(evento.data)
      nuevo.start()
      grabador.current = nuevo
      medidor.comenzar(flujo)
      setError(null)
      setGrabando(true)
      cronometro.comenzar(configuracion.duracion_maxima_segundos, () => void detener(mensajes.limite))
    } catch {
      setError(mensajes.sinPermiso)
    }
  }

  function cancelar() {
    if (grabador.current) grabador.current.onstop = null
    grabador.current?.stop()
    liberar()
  }

  function finalizar(): Promise<GrabacionAudio | null> {
    const actual = grabador.current
    if (!actual) return Promise.resolve(null)
    const duracion = cronometro.parar()
    const picos = resumirNiveles(medidor.parar())
    return new Promise((resolver) => {
      actual.onstop = () => {
        const tipo = actual.mimeType || configuracion.tipo_mime
        const audio = new Blob(trozos.current, { type: tipo })
        resolver({ url: URL.createObjectURL(audio), duracion, picos, bytes: audio.size, tipo })
      }
      actual.stop()
      liberar()
    })
  }

  async function detener(aviso: string | null = null) {
    setError(aviso)
    const grabacion = await finalizar()
    pendiente.current = grabacion
    setBorrador(grabacion)
  }

  function tomarBorrador(): GrabacionAudio | null {
    const actual = pendiente.current
    pendiente.current = null
    setBorrador(null)
    return actual
  }

  function entregar(alTerminar: (grabacion: GrabacionAudio) => void) {
    void finalizar().then((grabacion) => grabacion && alTerminar(grabacion))
  }

  return { grabando, segundos: cronometro.segundos, error, borrador, niveles: medidor.niveles, iniciar, cancelar, detener: () => detener(), entregar, descartar: soltarBorrador, tomarBorrador }
}
