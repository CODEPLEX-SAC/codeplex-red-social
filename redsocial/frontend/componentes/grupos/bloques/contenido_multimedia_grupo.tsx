import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { CuadriculaFotosGrupo } from './cuadricula_fotos_grupo'
import { CuadriculaVideosGrupo } from './cuadricula_videos_grupo'
import { ListaAlbumesGrupo } from './lista_albumes_grupo'
import { ModalCrearAlbumGrupo } from './modal_crear_album_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ContenidoMultimediaGrupoProps, SubpestanaMultimedia } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.multimedia
const clases = catalogoGrupos.clases.detalle

export function ContenidoMultimediaGrupo({ grupo, subpestana, alCambiar, medios }: ContenidoMultimediaGrupoProps) {
  return (
    <section className={clases.tarjeta}>
      <div className={clases.multimedia_cabecera}>
        <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
        <div className={clases.multimedia_acciones}>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={medios.abrirCrearAlbum}>
            <Icono name="mas" className="h-3.5 w-3.5" /> {textos.crear_album}
          </Boton>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={medios.abrirSelector}>
            {textos.anadir}
          </Boton>
          <input ref={medios.selector} type="file" multiple hidden tabIndex={-1} accept={textos.tipos_aceptados} aria-label={textos.selector} onChange={medios.elegir} />
        </div>
      </div>
      <Pestanas elementos={textos.pestanas} activa={subpestana} alCambiar={(clave) => alCambiar(clave as SubpestanaMultimedia)} />
      {medios.aviso !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {medios.aviso}
        </p>
      )}
      {subpestana === 'fotos' && <CuadriculaFotosGrupo grupo={grupo} medios={medios.fotos} />}
      {subpestana === 'videos' && <CuadriculaVideosGrupo grupo={grupo} medios={medios.videos} />}
      {subpestana === 'albumes' && <ListaAlbumesGrupo albumes={medios.albumes} />}
      {medios.creandoAlbum && <ModalCrearAlbumGrupo alCrear={medios.crearAlbum} onCerrar={medios.cerrarCrearAlbum} />}
    </section>
  )
}
