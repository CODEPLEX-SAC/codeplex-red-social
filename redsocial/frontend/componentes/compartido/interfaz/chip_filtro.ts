import type { ClasesChipOpciones } from '@/tipos/compartido/contrato_chip_filtro'
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
