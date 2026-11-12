import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { ElementoFeedInicio } from '../../inicio/bloques/elemento_feed_inicio'
import { PublicadorGrupo } from './publicador_grupo'
import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { PublicadorGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'
import type { AccionesFeedInicio } from '@/tipos/inicio/contrato_feed_inicio'
import type { ElementoFeed } from '@/tipos/inicio/modelo_inicio'

export function ConversacionGrupo({ feed, acciones, consulta, ...publicador }: PublicadorGrupoProps & { feed: readonly ElementoFeed[]; acciones: AccionesFeedInicio; consulta: string }) {
  const visibles = feed.filter((elemento) => elemento.clase === 'compartida' || contieneTexto(elemento.texto, consulta))

  return (
    <>
      {publicador.rol !== 'visitante' && <PublicadorGrupo {...publicador} />}
      {visibles.length === 0 && <MensajeVacio texto={catalogoGrupos.detalle.sin_publicaciones_busqueda} className="py-6" />}
      {visibles.map((elemento) => (
        <ElementoFeedInicio key={elemento.id} elemento={elemento} acciones={acciones} />
      ))}
    </>
  )
}
