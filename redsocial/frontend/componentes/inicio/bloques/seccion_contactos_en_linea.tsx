import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import { ContactosEnLineaPanel, EventosProximosPanel, GruposRecomendadosPanel } from '../../compartido'
import type { SeccionContactosEnLineaProps } from '@/tipos/inicio/contrato_seccion_contactos_en_linea'

export function SeccionContactosEnLinea({ CONTACTOS_LINEA, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS }: SeccionContactosEnLineaProps) {
  return (
    <aside className="grid gap-4">
      <ContactosEnLineaPanel contactos={CONTACTOS_LINEA} />
      <GruposRecomendadosPanel titulo={catalogoInicio.secciones.grupos_recomendados} grupos={GRUPOS_RECOMENDADOS} />
      <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
    </aside>
  )
}
