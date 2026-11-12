import { useState } from 'react'

export function usarMiembrosGrupo() {
  const [consulta, setConsulta] = useState(String())

  return { consulta, cambiarConsulta: setConsulta }
}
