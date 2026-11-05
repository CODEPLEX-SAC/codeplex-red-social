import { FONDOS_HISTORIA } from './logica_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { OpcionTipoFondo } from '@/tipos/inicio/contrato_historia'
import type { FondoHistoria, TipoFondoHistoria } from '@/tipos/inicio/modelo_historia'

const TIPOS_FONDO = catalogoInicio.historias.tipos_fondo as OpcionTipoFondo[]

export function fondosDeTipo(tipo: TipoFondoHistoria): FondoHistoria[] {
  const fondos: FondoHistoria[] = []
  for (const fondo of FONDOS_HISTORIA) {
    if (fondo.tipo === tipo) fondos.push(fondo)
  }
  return fondos
}

export function tiposFondoDisponibles(): OpcionTipoFondo[] {
  const disponibles: OpcionTipoFondo[] = []
  for (const opcion of TIPOS_FONDO) {
    if (fondosDeTipo(opcion.clave).length > 0) disponibles.push(opcion)
  }
  return disponibles
}
