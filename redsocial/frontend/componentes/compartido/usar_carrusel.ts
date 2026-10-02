import { useEffect, useRef } from 'react'

function conectarCarrusel(elemento: HTMLDivElement | null) {
  if (!elemento) return

  const pista = elemento
  let arrastrando = false
  let seMovio = false
  let inicioX = 0
  let scrollInicial = 0

  function alUsarRueda(evento: WheelEvent) {
    if (Math.abs(evento.deltaY) <= Math.abs(evento.deltaX)) return
    evento.preventDefault()
    pista.scrollLeft += evento.deltaY
  }

  function alPresionar(evento: PointerEvent) {
    if (evento.pointerType === 'touch') return
    arrastrando = true
    seMovio = false
    inicioX = evento.clientX
    scrollInicial = pista.scrollLeft
  }

  function alMover(evento: PointerEvent) {
    if (!arrastrando) return
    const delta = evento.clientX - inicioX
    seMovio = seMovio || Math.abs(delta) > 4
    pista.scrollLeft = scrollInicial - delta
  }

  function alSoltar() {
    arrastrando = false
  }

  function alValidarClic(evento: MouseEvent) {
    if (!seMovio) return
    evento.preventDefault()
    evento.stopPropagation()
  }

  pista.addEventListener('wheel', alUsarRueda, { passive: false })
  pista.addEventListener('pointerdown', alPresionar)
  window.addEventListener('pointermove', alMover)
  window.addEventListener('pointerup', alSoltar)
  pista.addEventListener('click', alValidarClic, true)

  return () => {
    pista.removeEventListener('wheel', alUsarRueda)
    pista.removeEventListener('pointerdown', alPresionar)
    window.removeEventListener('pointermove', alMover)
    window.removeEventListener('pointerup', alSoltar)
    pista.removeEventListener('click', alValidarClic, true)
  }
}

export function usarCarrusel() {
  const pistaRef = useRef<HTMLDivElement>(null)

  useEffect(() => conectarCarrusel(pistaRef.current), [pistaRef])

  return { pistaRef }
}
