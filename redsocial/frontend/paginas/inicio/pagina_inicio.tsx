import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { ALMACEN_HISTORIAS, ALMACEN_PUBLICACIONES, HISTORIAS, HISTORIAS_CONTACTOS, CONTACTOS_LINEA, PUBLICACION_INICIO, PUBLICACION_COMPARTIDA_INICIO } from '../../rutas/inicio/rutas_inicio'
import { GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS, SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, rutasMensajeria } from '../../rutas/mensajeria/rutas_mensajeria'
import { PanelConversacion, conversacionesConEtiqueta, proximoCambioReloj, usarAhora, usarMensajeria } from '../../componentes/mensajeria'
import { navegar } from '../../rutas/compartido/navegacion'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { BloqueFotoVideo, EstadisticasActividadInicio, MensajesFlotantesInicio, SeccionContactosEnLinea, SeccionHistoriasInicio, usarHistoriasInicio, usarPublicacionesInicio } from '../../componentes/inicio'


function Historias() {
  const { publicadas, deContactos, publicar, acciones } = usarHistoriasInicio(ALMACEN_HISTORIAS, HISTORIAS_CONTACTOS)

  return <SeccionHistoriasInicio historias={HISTORIAS} publicadas={publicadas} deContactos={deContactos} acciones={acciones} onPublicar={publicar} />
}

export function PaginaInicio() {
  const { feed, estadisticas, publicar, acciones } = usarPublicacionesInicio(ALMACEN_PUBLICACIONES)
  const mensajeria = usarMensajeria(ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, SESION_ACTUAL.id)
  const ahora = usarAhora(RELOJ_MENSAJERIA, (instante) => proximoCambioReloj(Object.values(mensajeria.estado.hilos).flat(), SESION_ACTUAL.id, instante))

  function ampliarMensajes(id: string | null) {
    navegar(id ? `${rutasMensajeria.todos}?${catalogoMensajeria.parametros_ruta.conversacion}=${id}` : rutasMensajeria.todos)
  }

  function renderizarHilo(id: string, volver: () => void) {
    const conversacion = mensajeria.estado.conversaciones.find((candidata) => candidata.id === id)
    if (!conversacion) return null
    return (
      <PanelConversacion
        key={id}
        conversacion={conversacion}
        mensajes={mensajeria.estado.hilos[id] ?? []}
        participantes={mensajeria.estado.participantes}
        usuarioId={SESION_ACTUAL.id}
        ahora={ahora}
        conversaciones={mensajeria.estado.conversaciones}
        {...mensajeria.accionesDe(id)}
        onVolver={volver}
        oculta={false}
        compacto
      />
    )
  }

  const placeholderPublicar =catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', SESION_ACTUAL.usuario.split(' ')[0])
  return (
    <EstructuraApp paginaActiva="inicio">
      <EstructuraTresColumnas
        distribucion="social"
        principal={
          <>
            <h1 className="sr-only">{catalogoInicio.titulos.principal}</h1>
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
      <MensajesFlotantesInicio
        conversaciones={conversacionesConEtiqueta(mensajeria.estado.conversaciones, mensajeria.estado, ahora)}
        onAbrirConversacion={mensajeria.marcarLeida}
        onAmpliar={ampliarMensajes}
        renderHilo={renderizarHilo}
      />
    </EstructuraApp>
  )
}
