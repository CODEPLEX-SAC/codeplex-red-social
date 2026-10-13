import { useState } from 'react'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import { BloqueMeGusta } from './bloque_me_gusta'
import { ModalCrearPublicacion } from './modal_crear_publicacion'
import { TarjetaCompartida } from './tarjeta_compartida'
import { TarjetaPublicacion } from './tarjeta_publicacion'
import type { PublicacionInicio, PublicacionCompartidaInicio, PublicacionTextoInicio } from '@/tipos/inicio/modelo_inicio'
import type { ContenidoPublicacion, TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

export function BloqueFotoVideo({
  placeholderPublicar,
  Historias,
  PUBLICACION_INICIO,
  PUBLICACION_COMPARTIDA_INICIO,
  publicaciones,
  onPublicar,
  onEditar,
  onEliminar,
}: {
  placeholderPublicar: string
  Historias: () => React.JSX.Element
  PUBLICACION_INICIO: PublicacionInicio
  PUBLICACION_COMPARTIDA_INICIO: PublicacionCompartidaInicio
  publicaciones: PublicacionTextoInicio[]
  onPublicar: (contenido: ContenidoPublicacion) => void
  onEditar: (id: string, texto: string) => void
  onEliminar: (id: string) => void
}) {
  const [apertura, setApertura] = useState<TipoPublicacion | null>(null)

  return (
    <section>
                <article className="mb-4 rounded-xl border border-borde bg-white p-4 shadow-sombra">
                  <div className="mb-3 flex items-center gap-2.5">
                    <AvatarImagen src={usuarioImg} className={AVATAR} />
    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setApertura('publicacion')}
                        className="block w-full cursor-pointer rounded-control border border-borde bg-white px-3.5 py-2.5 text-left text-campo-formulario text-texto-suave hover:bg-fondo"
                      >
                        {placeholderPublicar}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 border-t border-borde pt-2.5">
                    <Boton type="button" variant="fantasma" size="default" aria-haspopup="dialog" onClick={() => setApertura('publicacion')} className="flex-1 basis-30">
                      <Icono name="foto-video" className="h-4 w-4" /> {catalogoInicio.botones.foto_video}
                    </Boton>
                    <Boton type="button" variant="fantasma" size="default" aria-haspopup="dialog" onClick={() => setApertura('encuesta')} className="flex-1 basis-30">
                      <Icono name="datos" className="h-4 w-4" /> {catalogoInicio.botones.encuesta}
                    </Boton>
                    <Boton type="button" variant="fantasma" size="default" className="flex-1 basis-30">
                      <Icono name="sentimiento" className="h-4 w-4" /> {catalogoInicio.botones.sentimiento}
                    </Boton>
                    <Boton type="button" variant="fantasma" size="default" className="flex-1 basis-30">
                      <Icono name="puntos" className="h-4 w-4" /> {catalogoInicio.botones.mas}
                    </Boton>
                  </div>
                </article>

                {apertura && <ModalCrearPublicacion tipoInicial={apertura} onPublicar={onPublicar} onCerrar={() => setApertura(null)} />}

                <Historias />

                {publicaciones.map((publicacion) => (
                  <TarjetaPublicacion key={publicacion.id} publicacion={publicacion} onEditar={onEditar} onEliminar={onEliminar} />
                ))}

                <BloqueMeGusta PUBLICACION_INICIO={PUBLICACION_INICIO} />

                <TarjetaCompartida publicacion={PUBLICACION_COMPARTIDA_INICIO} />
              </section>
  )
}
