import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { CuadriculaMediosGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.multimedia
const clases = catalogoGrupos.clases.detalle

export function CuadriculaVideosGrupo({ grupo, medios }: CuadriculaMediosGrupoProps) {
  if (medios.length === 0) return <MensajeVacio texto={textos.vacio_videos} className={clases.vacio} />

  return (
    <div className={clases.video_rejilla}>
      {medios.map((medio, indice) => (
        <video key={medio.id} src={medio.url} controls aria-label={textos.video.replace(':n', String(indice + 1)).replace(':nombre', grupo.nombre)} className={clases.video_medio} />
      ))}
    </div>
  )
}
