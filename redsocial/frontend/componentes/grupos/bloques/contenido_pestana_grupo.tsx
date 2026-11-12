import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { ContenidoArchivosGrupo } from './contenido_archivos_grupo'
import { ContenidoMiembrosGrupo } from './contenido_miembros_grupo'
import { InformacionGrupo } from './informacion_grupo'
import { ContenidoMultimediaGrupo } from './contenido_multimedia_grupo'
import { ConversacionGrupo } from './conversacion_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ContenidoPestanaGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'
import type { AccionesFeedInicio } from '@/tipos/inicio/contrato_feed_inicio'
import type { ElementoFeed } from '@/tipos/inicio/modelo_inicio'

const clases = catalogoGrupos.clases.detalle

export function ContenidoPestanaGrupo({ pestana, grupo, multimedia, alCambiarMultimedia, medios, alAviso, alAbrirPublicacion, feed, acciones, consulta }: ContenidoPestanaGrupoProps & { feed: readonly ElementoFeed[]; acciones: AccionesFeedInicio; consulta: string }) {
  if (pestana === 'conversacion') return <ConversacionGrupo rol={grupo.rol} alAccion={alAviso} alAbrirPublicacion={alAbrirPublicacion} feed={feed} acciones={acciones} consulta={consulta} />
  if (pestana === 'informacion') return <InformacionGrupo grupo={grupo} />
  if (pestana === 'miembros') return <ContenidoMiembrosGrupo grupo={grupo} alAccion={alAviso} />
  if (pestana === 'multimedia') return <ContenidoMultimediaGrupo grupo={grupo} subpestana={multimedia} alCambiar={alCambiarMultimedia} medios={medios} />
  if (pestana === 'archivos') return <ContenidoArchivosGrupo />

  return (
    <section className={clases.tarjeta}>
      <MensajeVacio texto={catalogoGrupos.detalle.vacio.eventos} className={clases.vacio} />
    </section>
  )
}
