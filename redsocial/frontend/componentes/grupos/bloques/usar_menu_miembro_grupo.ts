import { useState } from 'react'
import type { MouseEvent } from 'react'

export function usarMenuMiembroGrupo() {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  return { ancla, abrir: (evento: MouseEvent<HTMLElement>) => setAncla(evento.currentTarget), cerrar: () => setAncla(null) }
}
