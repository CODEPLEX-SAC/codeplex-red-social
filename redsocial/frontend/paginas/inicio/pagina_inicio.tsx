import { useRef, useState } from 'react'
import { BotonIcono, AvatarImagen, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, usarCarrusel, SuperficieColor, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import { HISTORIAS, CONTACTOS_LINEA, PUBLICACION_INICIO, PUBLICACION_COMPARTIDA_INICIO } from '../../rutas/inicio/rutas_inicio'
import { GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS, SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { BloqueFotoVideo, SeccionContactosEnLinea } from '../../componentes/inicio'
import type { PublicacionTextoInicio } from '@/tipos/inicio/modelo_inicio'
import type { ContenidoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'


function Historias() {
  const carrusel = usarCarrusel()

  function alDesplazar(direccion: -1 | 1) {
    const pista = carrusel.pistaRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section className="relative mb-4 rounded-xl border border-borde bg-white pt-4">
      <h2 className="m-0 mb-3 px-4 text-titulo-seccion text-texto">{catalogoInicio.secciones.historias}</h2>
      <div className="relative">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => alDesplazar(-1)} variant="flotante" size="default" className="absolute left-1 top-1/2 z-10 -translate-y-1/2 max-800:hidden" />
        <div
          ref={carrusel.pistaRef}
          className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-oculto"
        >
          {HISTORIAS.map((h) => (
            <div key={h.nombre} className="flex w-27.5 flex-none cursor-pointer flex-col items-center gap-2">
              {h.crear ? (
                <span className="relative grid h-26 w-26 place-items-center rounded-full bg-borde p-0.88">
                  <AvatarImagen src={usuarioImg} className="h-full w-full rounded-full border-3 border-white bg-primario-suave" />
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-7.5 w-7.5 place-items-center rounded-full border-3 border-white bg-primario text-contador font-bold leading-none text-white">
                    +
                  </span>
                </span>
              ) : (
                <SuperficieColor
                  as="span"
                  degradado="primario"
                  className="relative grid h-26 w-26 place-items-center rounded-full p-0.88"
                >
                  <AvatarImagen src={usuarioImg} className="h-full w-full rounded-full border-3 border-white bg-primario-suave" />
                </SuperficieColor>
              )}
              <span className={'w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-auxiliar ' + (h.crear ? 'font-semibold text-texto' : 'text-texto-suave')}>
                {h.nombre}
              </span>
            </div>
          ))}
        </div>
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alDesplazar(1)} variant="flotante" size="default" className="absolute right-1 top-1/2 z-10 -translate-y-1/2 max-800:hidden" />
      </div>
    </section>
  )
}

export function PaginaInicio() {
  const [publicaciones, setPublicaciones] = useState<PublicacionTextoInicio[]>([])
  const contadorPublicaciones = useRef(0)

  function publicar(contenido: ContenidoPublicacion) {
    if (contenido.tipo !== 'publicacion' || !contenido.texto) return
    contadorPublicaciones.current += 1
    const nueva: PublicacionTextoInicio = {
      id: String(contadorPublicaciones.current),
      nombre: SESION_ACTUAL.usuario,
      tiempo: catalogoInicio.publicacion.tiempo_ahora,
      texto: contenido.texto,
      reacciones: 0,
      comentarios: 0,
    }
    setPublicaciones((anteriores) => [nueva, ...anteriores])
  }

  const placeholderPublicar = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', SESION_ACTUAL.usuario.split(' ')[0])
  return (
    <EstructuraApp paginaActiva="inicio">
      <EstructuraTresColumnas
        principal={
          <BloqueFotoVideo
            placeholderPublicar={placeholderPublicar}
            Historias={Historias}
            PUBLICACION_INICIO={PUBLICACION_INICIO}
            PUBLICACION_COMPARTIDA_INICIO={PUBLICACION_COMPARTIDA_INICIO}
            publicaciones={publicaciones}
            onPublicar={publicar}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionContactosEnLinea
            CONTACTOS_LINEA={CONTACTOS_LINEA}
            GRUPOS_RECOMENDADOS={GRUPOS_RECOMENDADOS}
            EVENTOS_PROXIMOS={EVENTOS_PROXIMOS}
          />
        }
      />
    </EstructuraApp>
  )
}
