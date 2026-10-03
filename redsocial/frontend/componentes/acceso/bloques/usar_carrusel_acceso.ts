import { useEffect, useState } from 'react'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

const consultaMovimientoReducido = catalogoAcceso.carrusel.consulta_movimiento_reducido

export function usarCarruselAcceso(total: number, intervaloMs: number) {
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(() => window.matchMedia(consultaMovimientoReducido).matches)

  function irA(indice: number) {
    setActual(((indice % total) + total) % total)
  }

  function siguiente() {
    setActual((indice) => (indice + 1) % total)
  }

  function anterior() {
    setActual((indice) => (indice - 1 + total) % total)
  }

  function pausar() {
    setPausado(true)
  }

  function reanudar() {
    setPausado(false)
  }

  useEffect(() => {
    if (pausado || total < 2) return
    const temporizador = window.setTimeout(() => setActual((indice) => (indice + 1) % total), intervaloMs)
    return () => window.clearTimeout(temporizador)
  }, [actual, pausado, total, intervaloMs])

  return { actual, irA, siguiente, anterior, pausar, reanudar }
}
