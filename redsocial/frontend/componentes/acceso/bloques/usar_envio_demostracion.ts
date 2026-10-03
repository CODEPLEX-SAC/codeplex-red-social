import { useEffect, useRef, useState } from 'react'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

const tiempos = catalogoAcceso.tiempos

export function usarEnvioDemostracion(alTerminar: () => void) {
  const temporizadores = useRef<number[]>([])
  const [cargando, setCargando] = useState(false)
  const [exitoso, setExitoso] = useState(false)

  function finalizarCarga() {
    setCargando(false)
    setExitoso(true)
    temporizadores.current.push(window.setTimeout(alTerminar, tiempos.exito_ms))
  }

  function iniciar() {
    setCargando(true)
    temporizadores.current.push(window.setTimeout(finalizarCarga, tiempos.carga_ms))
  }

  useEffect(() => {
    const pendientes = temporizadores.current
    return () => pendientes.forEach((identificador) => window.clearTimeout(identificador))
  }, [])

  return { cargando, exitoso, iniciar }
}
