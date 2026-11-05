import type { CodeplexSelectorFechaProps } from '@codeplex-sac/selectores-fecha'

export type PropiedadesRanuraSelectorFecha = CodeplexSelectorFechaProps['slotProps']

export interface SelectorFechaProps extends CodeplexSelectorFechaProps {
  nombreAccesible?: string
}
