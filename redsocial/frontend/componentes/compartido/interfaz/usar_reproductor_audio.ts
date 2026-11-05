import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

export function usarReproductorAudio(duracionInicial: number) {
  const audio = useRef<HTMLAudioElement>(null)
  const [sonando, setSonando] = useState(false)
  const [posicion, setPosicion] = useState(0)
  const [duracion, setDuracion] = useState(duracionInicial)

  function alternar() {
    const elemento = audio.current
    if (!elemento) return
    if (elemento.paused) void elemento.play()
    else elemento.pause()
  }

  function buscar(evento: ChangeEvent<HTMLInputElement>) {
    const valor = Number(evento.target.value)
    if (audio.current) audio.current.currentTime = valor
    setPosicion(valor)
  }

  const eventos = {
    onPlay: () => setSonando(true),
    onPause: () => setSonando(false),
    onEnded: () => setPosicion(0),
    onTimeUpdate: (evento: { currentTarget: HTMLAudioElement }) => setPosicion(evento.currentTarget.currentTime),
    onLoadedMetadata: (evento: { currentTarget: HTMLAudioElement }) => Number.isFinite(evento.currentTarget.duration) && setDuracion(evento.currentTarget.duration),
  }

  return { audio, sonando, posicion, duracion, alternar, buscar, eventos }
}
