import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { PestanasGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const TABS = catalogoGuardados.pestanas

export function PestanasGuardados({ activa }: PestanasGuardadosProps) {
  return <Pestanas elementos={TABS} activa={activa} className="mb-5" />
}
