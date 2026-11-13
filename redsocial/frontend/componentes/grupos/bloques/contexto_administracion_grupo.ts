import { createContext } from 'react'

export const ContextoAdministracionGrupo = createContext<(() => void) | null>(null)
