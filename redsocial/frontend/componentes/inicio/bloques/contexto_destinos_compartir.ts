import { createContext } from 'react'
import type { DestinosCompartir } from '@/tipos/inicio/contrato_compartir_publicacion'

export const CONTEXTO_DESTINOS_COMPARTIR = createContext<DestinosCompartir>({ grupos: [], amigos: [], compartirEnGrupo: () => undefined, compartirEnHistoria: () => false })
