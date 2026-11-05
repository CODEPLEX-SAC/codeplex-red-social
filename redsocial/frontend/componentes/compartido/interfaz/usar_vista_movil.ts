import { useMediaQuery } from '@mui/material'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function usarVistaMovil(): boolean {
  return useMediaQuery(catalogoCompartido.consultas.movil, { noSsr: true })
}
