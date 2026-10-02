import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { PestanaAmigos } from '@/tipos/amigos/contrato_amigos'

const TABS = catalogoAmigos.pestanas

export function PestanasAmigos({ activa, insigniaSolicitudes }: { activa: PestanaAmigos; insigniaSolicitudes?: number }) {
  const elementos = TABS.map((t) => ({ ...t, insignia: t.clave === 'solicitudes' ? insigniaSolicitudes : undefined }))

  return <Pestanas elementos={elementos} activa={activa} className="mb-4.5" />
}
