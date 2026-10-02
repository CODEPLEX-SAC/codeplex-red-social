import { useState } from 'react'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { BloqueMeGusta } from './bloque_me_gusta'
import { ModalCrearPublicacion } from './modal_crear_publicacion'
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
}: {
  placeholderPublicar: string
  Historias: () => React.JSX.Element
  PUBLICACION_INICIO: PublicacionInicio
  PUBLICACION_COMPARTIDA_INICIO: PublicacionCompartidaInicio
  publicaciones: PublicacionTextoInicio[]
  onPublicar: (contenido: ContenidoPublicacion) => void
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
                      <Icono name="encuesta" className="h-4 w-4" /> {catalogoInicio.botones.encuesta}
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
                  <TarjetaPublicacion key={publicacion.id} publicacion={publicacion} />
                ))}

                <BloqueMeGusta PUBLICACION_INICIO={PUBLICACION_INICIO} />

                <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
                  <div className="flex items-center gap-2.5 px-4 py-3.5">
                    <AvatarImagen src={usuarioImg} className={AVATAR} />
                    <div className="min-w-0 flex-1">
                      <strong className="block text-nombre-entidad text-texto">{PUBLICACION_COMPARTIDA_INICIO.nombre}</strong>
                      <span className="mt-0.5 block text-auxiliar text-texto-suave">{catalogoInicio.leyendas.compartio_una_publicacion}</span>
                      <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{PUBLICACION_COMPARTIDA_INICIO.tiempoCompartio}</span>
                    </div>
                    <BotonIcono icono="puntos" type="button" aria-label={catalogoInicio.botones.mas_opciones} variant="sutil" size="default" className="flex-none" />
                  </div>
                  <div className="mx-4 mb-4 overflow-hidden rounded-control border border-borde">
                    <div className="flex items-center gap-2.5 px-3.5 pb-2 pt-3">
                      <AvatarImagen src={usuarioImg} className={AVATAR} />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-nombre-entidad text-texto">{PUBLICACION_COMPARTIDA_INICIO.origenNombre}</strong>
                        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{PUBLICACION_COMPARTIDA_INICIO.origenTiempo}</span>
                      </div>
                    </div>
                    <p className="m-0 px-3.5 pb-2.5 text-cuerpo leading-1.55 text-t-3c394f">
                      {PUBLICACION_COMPARTIDA_INICIO.texto}
                    </p>
                    <div className="mx-3.5 mb-3 h-35 rounded-lg degradado-lavanda-suave" />
                    <a href="#" className="mx-3.5 mb-3 block text-enlace-accion text-primario no-underline">{catalogoInicio.botones.ver_mas}</a>
                  </div>
                </article>
              </section>
  )
}
