import { useState } from 'react'
import type { AsignadoresFormularioEvento, ValoresFormularioEvento } from './modelo_formulario_evento'

export function usarFormularioEvento(inicial: ValoresFormularioEvento) {
  const [valores, setValores] = useState(inicial)
  const asignar = Object.fromEntries(
    Object.keys(inicial).map((campo) => [campo, (valor: unknown) => setValores((actual) => ({ ...actual, [campo]: valor }))]),
  ) as AsignadoresFormularioEvento

  return { valores, asignar }
}
