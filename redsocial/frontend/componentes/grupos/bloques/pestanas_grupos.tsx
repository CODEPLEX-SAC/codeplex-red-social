import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { PestanaGrupo } from '@/tipos/grupos/contrato_grupos'

const TABS = catalogoGrupos.pestanas

export function PestanasGrupos({ activa }: { activa: PestanaGrupo }) {
  return <Pestanas elementos={TABS} activa={activa} className="mb-4" />
}
