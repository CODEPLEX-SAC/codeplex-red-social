import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { MetaConversacionProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista

export function HoraConversacion({ conversacion: c, marcadaManual }: MetaConversacionProps) {
  const hora = <time dateTime={c.fechaActividad ?? undefined} aria-label={c.etiquetaCompleta} className={clases.hora}>{c.etiquetaTiempo}</time>
  return marcadaManual ? (
    <Insignia variant="superpuesta" contenido={null} punto compacta superposicion="circular">
      {hora}
    </Insignia>
  ) : (
    hora
  )
}
