import { useRef, useState } from 'react'

export function usarTruncamiento<T extends HTMLElement>() {
  const referencia = useRef<T>(null)
  const [truncado, setTruncado] = useState(false)

  function medir() {
    const elemento = referencia.current
    setTruncado(elemento !== null && elemento.scrollWidth > elemento.clientWidth)
  }

  return { referencia, truncado, medir }
}
