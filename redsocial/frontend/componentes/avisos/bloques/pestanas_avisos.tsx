import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { PestanasAvisosProps } from '@/tipos/avisos/contrato_avisos'

const TABS = catalogoAvisos.pestanas as readonly { clave: keyof PestanasAvisosProps['conteos']; etiqueta: string; ruta: string }[]

export function PestanasAvisos({ activa, conteos }: PestanasAvisosProps) {
  const elementos = TABS.map((t) => ({ ...t, insignia: conteos[t.clave] }))

  return <Pestanas elementos={elementos} activa={activa} className="mb-5" />
}
