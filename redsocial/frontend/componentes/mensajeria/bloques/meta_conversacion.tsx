import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { MetaConversacionProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const clases = catalogoMensajeria.clases.lista
const textos = catalogoMensajeria.acciones_conversacion

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

export function ContadorConversacion({ conversacion: c, marcadaManual }: MetaConversacionProps) {
  return (
    <span className={clases.contador}>
      {c.silenciado && <Icono name="silenciado" className={clases.silenciado} />}
      {c.noLeidos > 0 && (
        <>
          <span aria-hidden="true"><Insignia variant="counter" tamano="sm">{c.noLeidos}</Insignia></span>
          <span className={clases.solo_lectores}>{c.noLeidos === 1 ? textos.aria_sin_leer_singular : textos.aria_sin_leer_plural.replace(':n', String(c.noLeidos))}</span>
        </>
      )}
      {marcadaManual && <span className={clases.solo_lectores}>{textos.aria_marcada_no_leida}</span>}
    </span>
  )
}
