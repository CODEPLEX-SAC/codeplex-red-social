import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { Selector } from '../../compartido/interfaz/selector'
import { imagenPerfilPedroRedSocial } from '../../compartido/imagenes_red_social'
import { propiasDelUsuario } from './logica_contenido_propio'
import { usarOrdenContenido } from './usar_orden_contenido'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ContenidoPropioGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.tus_contenido
const clases = catalogoGrupos.clases.contenido

export function ContenidoPropioGrupo({ grupo, feed, alVerEnGrupo, alVolver }: ContenidoPropioGrupoProps) {
  const orden = usarOrdenContenido()
  const propias = propiasDelUsuario(feed, orden.orden)

  return (
    <div className={clases.pagina}>
      <Boton type="button" variant="enlace" size="enlace_accion" onClick={alVolver}>
        <Icono name="flecha-izquierda" className="h-4 w-4" /> {catalogoGrupos.detalle.volver_grupo}
      </Boton>
      <div className={clases.cabecera}>
        <h1 className={clases.titulo}>{textos.titulo}</h1>
        {propias.length > 0 && (
          <Selector variant="default" className={clases.orden} aria-label={textos.orden} value={orden.orden} onChange={(evento) => orden.cambiarOrden(String(evento.target.value))}>
            {textos.ordenes.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </Selector>
        )}
      </div>
      {propias.length > 0 && <h2 className={clases.titulo}>{textos.publicado.replace(':n', String(propias.length))}</h2>}
      {propias.map((publicacion) => (
        <article key={publicacion.id} className={clases.tarjeta}>
          <div className={clases.autor}>
            <AvatarUsuario tamano="md" imagen={imagenPerfilPedroRedSocial} />
            <div>
              <strong className={clases.nombre}>{textos.en_el_grupo.replace(':autor', publicacion.nombre).replace(':grupo', grupo.nombre)}</strong>
              <p className={clases.meta}>{publicacion.tiempo}</p>
            </div>
          </div>
          <p className={clases.texto}>{publicacion.texto}</p>
          <Boton type="button" variant="secundario" size="default" onClick={alVerEnGrupo}>
            {textos.ver_en_grupo}
          </Boton>
        </article>
      ))}
      {propias.length === 0 && (
        <div className={clases.vacio}>
          <span aria-hidden="true" className={clases.ilustracion}>
            <Icono name="documento" className="h-14 w-14" />
          </span>
          <p className={clases.vacio_texto}>{textos.vacio}</p>
        </div>
      )}
    </div>
  )
}
