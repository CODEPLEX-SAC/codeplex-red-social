import type { ClasesChipOpciones, ClasesConteoChipOpciones } from '@/tipos/compartido/contrato_chip_filtro'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const chip = catalogoCompartido.chip_filtro

export function clasesChip({ activo, className }: ClasesChipOpciones) {
  return [
    chip.base,
    activo ? chip.activo : chip.inactivo,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function clasesConteoChip({ activo, destacado }: ClasesConteoChipOpciones) {
  return [
    chip.conteo,
    destacado ? chip.conteo_destacado : activo ? chip.conteo_activo : chip.conteo_inactivo,
  ].join(' ')
}
