import type { CodeplexSelectorHoraProps } from '@codeplex-sac/selectores-fecha'

export type PropiedadesRanuraSelectorHora = CodeplexSelectorHoraProps['slotProps']

export interface SelectorHoraProps extends CodeplexSelectorHoraProps {
  nombreAccesible?: string
}
