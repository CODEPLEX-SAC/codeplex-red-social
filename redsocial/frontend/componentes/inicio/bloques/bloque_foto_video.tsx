import { useState } from 'react'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import { CompositorInicio } from './compositor_inicio'
import { ModalCrearPublicacion } from './modal_crear_publicacion'
import { SeccionFeedInicio } from './seccion_feed_inicio'
import type { AccionesFeedInicio } from '@/tipos/inicio/contrato_feed_inicio'
import type { ElementoFeed, PublicacionInicio, PublicacionCompartidaInicio } from '@/tipos/inicio/modelo_inicio'
import type { ContenidoPublicacion, TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'


export function BloqueFotoVideo({
  placeholderPublicar,
  Historias,
  PUBLICACION_INICIO,
  PUBLICACION_COMPARTIDA_INICIO,
  publicaciones,
  onPublicar,
  acciones,
}: {
  placeholderPublicar: string
  Historias: () => React.JSX.Element
  PUBLICACION_INICIO: PublicacionInicio
  PUBLICACION_COMPARTIDA_INICIO: PublicacionCompartidaInicio
  publicaciones: ElementoFeed[]
  onPublicar: (contenido: ContenidoPublicacion) => void
  acciones: AccionesFeedInicio
}) {
  const [apertura, setApertura] = useState<TipoPublicacion | null>(null)

  return (
    <section className={catalogoInicio.compositor.clases.seccion}>
                <CompositorInicio placeholderPublicar={placeholderPublicar} onAbrir={setApertura} />

                {apertura && <ModalCrearPublicacion tipoInicial={apertura} onPublicar={onPublicar} onCerrar={() => setApertura(null)} />}

                <Historias />

                <SeccionFeedInicio
                  feed={publicaciones}
                  publicacionDemostracion={PUBLICACION_INICIO}
                  compartidaDemostracion={PUBLICACION_COMPARTIDA_INICIO}
                  acciones={acciones}
                />
              </section>
  )
}
