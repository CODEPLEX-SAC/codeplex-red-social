import { Pestanas } from '../../compartido/interfaz/pestanas'
import type { PestanaMensajeItem } from '@/tipos/mensajeria/contrato_navegacion_mensajes'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'

export function PestanasMensajes({ tabs, activa }: { tabs: readonly PestanaMensajeItem[]; activa: string }) {
  const elementos = tabs.map((p) => ({ clave: p.clave, etiqueta: p.etiqueta, ruta: catalogoMensajeria.rutas[p.clave], insignia: p.insignia }))

  return <Pestanas elementos={elementos} activa={activa} className="mb-3" />
}
