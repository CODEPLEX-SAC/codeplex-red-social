import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ListaAlbumesGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.multimedia
const clases = catalogoGrupos.clases.detalle

export function ListaAlbumesGrupo({ albumes }: ListaAlbumesGrupoProps) {
  if (albumes.length === 0) return <MensajeVacio texto={textos.vacio_albumes} className={clases.vacio} />

  return (
    <ul aria-label={textos.pestanas[2].etiqueta} className={clases.albumes_rejilla}>
      {albumes.map((album) => (
        <li key={album.id} className={clases.album}>
          <img src={album.portada} alt={textos.album_portada.replace(':nombre', album.nombre)} className={clases.album_portada} />
          <span className={clases.album_nombre}>{album.nombre}</span>
        </li>
      ))}
    </ul>
  )
}
