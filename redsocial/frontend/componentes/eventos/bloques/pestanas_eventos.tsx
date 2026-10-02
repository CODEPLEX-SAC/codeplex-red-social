import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { PestanaEvento, InsigniaInvitaciones } from '@/tipos/eventos/contrato_eventos'

const TABS = catalogoEventos.pestanas

export function PestanasEventos({ activa, insigniaInvitaciones }: { activa: PestanaEvento; insigniaInvitaciones: InsigniaInvitaciones }) {
  const elementos = TABS.map((t) => ({ ...t, insignia: t.clave === 'invitaciones' ? insigniaInvitaciones.valor : undefined }))

  return <Pestanas elementos={elementos} activa={activa} className="mb-4" />
}
