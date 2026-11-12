import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import type { AccionesSolicitudProps, ClaveAccionSolicitud } from '@/tipos/avisos/contrato_acciones_solicitud'

const clases = catalogoAvisos.clases_solicitud
const etiquetas: Record<string, string> = catalogoAvisos.botones
const resultados: Record<string, Record<string, string>> = { solicitud: catalogoAvisos.resultados_solicitud, invitacion: catalogoAvisos.resultados_invitacion }

export function AccionesSolicitud({ primaria, secundaria, contexto = 'solicitud', compacta = false }: AccionesSolicitudProps) {
  const [resuelta, setResuelta] = useState<ClaveAccionSolicitud | null>(null)

  if (resuelta !== null) {
    return (
      <p aria-live="polite" className={compacta ? clases.resultado_compacto : clases.resultado}>
        {resultados[contexto][resuelta]}
      </p>
    )
  }

  return (
    <div className={compacta ? clases.acciones_compactas : clases.acciones}>
      <Boton type="button" variant="primario" size="default" onClick={() => setResuelta(primaria)}>
        {etiquetas[primaria]}
      </Boton>
      <Boton type="button" variant="secundario" size="default" onClick={() => setResuelta(secundaria)}>
        {etiquetas[secundaria]}
      </Boton>
    </div>
  )
}
