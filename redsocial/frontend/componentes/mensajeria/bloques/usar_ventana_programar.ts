import { useState } from 'react'

export function usarVentanaProgramar() {
  const [abierta, setAbierta] = useState(false)

  return { abierta, abrir: () => setAbierta(true), cerrar: () => setAbierta(false) }
}
