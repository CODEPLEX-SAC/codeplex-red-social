import { BotonIcono, AvatarUsuario, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, usarCarrusel, SuperficieColor, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import { ALMACEN_PUBLICACIONES, HISTORIAS, CONTACTOS_LINEA, PUBLICACION_INICIO, PUBLICACION_COMPARTIDA_INICIO } from '../../rutas/inicio/rutas_inicio'
import { GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS, SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { NO_LEIDOS } from '../../rutas/mensajeria/rutas_mensajeria'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { BloqueFotoVideo, EstadisticasActividadInicio, MensajesFlotantesInicio, SeccionContactosEnLinea, usarPublicacionesInicio } from '../../componentes/inicio'


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
                <span className="relative grid h-26 w-26 place-items-center rounded-full bg-borde">
                  <AvatarUsuario tamano="historia" imagen={usuarioImg} className="border-3 border-white" insignia="+" colorInsignia="primario" />
                </span>
              ) : (
                <SuperficieColor
                  as="span"
                  degradado="primario"
                  className="relative grid h-26 w-26 place-items-center rounded-full"
                >
                  <AvatarUsuario tamano="historia" imagen={usuarioImg} className="border-3 border-white" />
                </SuperficieColor>
              )}
              <span className={'w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-auxiliar ' + (h.crear ? 'font-titulo text-texto' : 'text-texto-suave')}>
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
  const { feed, estadisticas, publicar, acciones } = usarPublicacionesInicio(ALMACEN_PUBLICACIONES)

  const placeholderPublicar = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', SESION_ACTUAL.usuario.split(' ')[0])
  return (
    <EstructuraApp paginaActiva="inicio">
      <EstructuraTresColumnas
        distribucion="social"
        principal={
          <>
            <EstadisticasActividadInicio estadisticas={estadisticas} />
            <BloqueFotoVideo
              placeholderPublicar={placeholderPublicar}
              Historias={Historias}
              PUBLICACION_INICIO={PUBLICACION_INICIO}
              PUBLICACION_COMPARTIDA_INICIO={PUBLICACION_COMPARTIDA_INICIO}
              publicaciones={feed}
              onPublicar={publicar}
              acciones={acciones}
            />
          </>
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
      <MensajesFlotantesInicio mensajes={NO_LEIDOS} />
    </EstructuraApp>
  )
}
