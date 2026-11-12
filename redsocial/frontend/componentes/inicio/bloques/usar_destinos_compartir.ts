import { useContext } from 'react'
import { CONTEXTO_DESTINOS_COMPARTIR } from './contexto_destinos_compartir'

export function usarDestinosCompartir() {
  return useContext(CONTEXTO_DESTINOS_COMPARTIR)
}
