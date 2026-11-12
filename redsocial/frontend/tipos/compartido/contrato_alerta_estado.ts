import type { CodeplexAlertaProps } from '@codeplex-sac/ui'

export type AlertaEstadoProps = Omit<CodeplexAlertaProps, 'diseno' | 'icono' | 'role'> & { tipo?: 'estado' }
