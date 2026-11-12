import { useState } from 'react'

export function usarSugerenciasGrupos() {
  const [texto, setTexto] = useState(String())
  const [categoria, setCategoria] = useState(String())
  const [aviso, setAviso] = useState(String())

  return { texto, categoria, aviso, cambiarTexto: setTexto, cambiarCategoria: setCategoria, mostrarAviso: setAviso }
}
