import type { CodeplexAcordeonProps, CodeplexElementoAcordeon } from '@codeplex-sac/diseno'
import type { IconName } from './contrato_icono'

export type ElementoAcordeon = Omit<CodeplexElementoAcordeon, 'iconoIzquierda'> & { icono?: IconName }

export type AcordeonProps = Omit<CodeplexAcordeonProps, 'elementos'> & { elementos: ElementoAcordeon[] }
