import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoActividad from '../../../catalogos/capacidades/redsocial/actividad.json'
import type { PestanaActividad } from '@/tipos/actividad/contrato_actividad'

const TABS = catalogoActividad.pestanas

export function PestanasActividad({ activa }: { activa: PestanaActividad }) {
  return <Pestanas elementos={TABS} activa={activa} className="mb-4.5" />
}
