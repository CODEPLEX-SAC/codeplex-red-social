import { useState } from 'react'
import type { ElementoDemostracion } from '@/tipos/grupos/contrato_administracion_grupo'

let secuencia = 0

export function usarElementosDemostracion(inicial: readonly ElementoDemostracion[]) {
  const [elementos, setElementos] = useState<ElementoDemostracion[]>([...inicial])
  const [resultado, setResultado] = useState(String())

  function quitar(id: string, mensaje: string) {
    setElementos((actuales) => actuales.filter((elemento) => elemento.id !== id))
    setResultado(mensaje)
  }

  function agregar(titulo: string) {
    secuencia += 1
    setElementos((actuales) => [...actuales, { id: ['nuevo', secuencia].join('-'), titulo, detalle: String() }])
  }

  return { elementos, resultado, quitar, agregar }
}
