import { BotonIcono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { useEffect, useState } from 'react'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { PestanasMensajes, PanelLateralMensajeria, ListaConversaciones, PanelConversacion, PanelVacioMensajes, conversacionesConEtiqueta, usarHistoriasConversacion, marcarConversacionLeida, totalMensajesSinLeer, proximoCambioReloj, usarAhora, usarMensajeria } from '../../componentes/mensajeria'
import { usarParametroDeRuta } from '../../rutas/compartido/navegacion'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { ALMACEN_HISTORIAS, ALMACEN_HISTORIAS_VISTAS, HISTORIAS_CONTACTOS } from '../../rutas/inicio/rutas_inicio'
import { VisorHistoria, usarHistoriasInicio } from '../../componentes/inicio'
import { ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, CONTACTOS_LINEA_MENSAJERIA, GRUPOS_RECIENTES_MENSAJERIA, EVENTOS_PROXIMOS_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

export function PaginaMensajesTodos() {
  const solicitada = usarParametroDeRuta(catalogoMensajeria.parametros_ruta.conversacion)
  const [parametroAplicado, setParametroAplicado] = useState(solicitada)
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(solicitada)
  const mensajeria = usarMensajeria(ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, SESION_ACTUAL.id)
  const historias = usarHistoriasConversacion(HISTORIAS_CONTACTOS, ALMACEN_HISTORIAS_VISTAS)
  const { acciones: accionesVisor } = usarHistoriasInicio(ALMACEN_HISTORIAS, HISTORIAS_CONTACTOS)
  const activa = mensajeria.estado.conversaciones.find((conversacion) => conversacion.id === conversacionActiva)
  const ahora = usarAhora(RELOJ_MENSAJERIA, (instante) => proximoCambioReloj(activa ? (mensajeria.estado.hilos[activa.id] ?? []) : [], SESION_ACTUAL.id, instante))

  if (solicitada !== parametroAplicado) {
    setParametroAplicado(solicitada)
    setConversacionActiva(solicitada)
  }

  const idMarcable = activa?.id
  useEffect(() => {
    if (idMarcable) ALMACEN_MENSAJERIA.modificar((estado) => marcarConversacionLeida(estado, idMarcable))
  }, [idMarcable])

  function alSeleccionar(id: string) {
    setConversacionActiva(id)
  }

  const accionesConversacion = {
    onMarcarLeido: mensajeria.marcarLeida,
    onMarcarNoLeido: mensajeria.marcarNoLeida,
    onAlternarSilencio: mensajeria.alternarSilencio,
    onAlternarFavorita: mensajeria.alternarFavorita,
    onEliminar: (id: string) => {
      mensajeria.eliminarConversacion(id)
      if (id === conversacionActiva) setConversacionActiva(null)
    },
    onAbandonar: (id: string) => {
      mensajeria.abandonarGrupo(id)
      if (id === conversacionActiva) setConversacionActiva(null)
    },
  }

  return (
    <EstructuraApp paginaActiva="mensajes" alturaCompleta>
      <EstructuraTresColumnas
        alturaCompleta
        principal={
          <section className="flex h-full flex-col">
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-titulo-pagina text-texto">{catalogoMensajeria.titulos.todos}</h1>
              <div className="flex items-center gap-2.5">
                <BotonIcono icono="editar-oficial" type="button" aria-label={catalogoMensajeria.botones.nuevo_mensaje} variant="contorno" size="default" />
              </div>
            </div>

            <PestanasMensajes
              activa="todos"
              tabs={[
                { etiqueta: catalogoMensajeria.titulos_pestanas.mensajes, clave: 'todos' },
                { etiqueta: catalogoMensajeria.titulos_pestanas.videollamadas, clave: 'videollamadas' },
              ]}
            />

            <section data-zona="panel-mensajes" className={catalogoMensajeria.clases.panel}>
              <ListaConversaciones
                conversaciones={conversacionesConEtiqueta(mensajeria.estado.conversaciones, mensajeria.estado, ahora, historias.cantidad)}
                activa={conversacionActiva}
                onSeleccionar={alSeleccionar}
                oculta={conversacionActiva !== null}
                contadorNoLeidos={totalMensajesSinLeer(mensajeria.estado.conversaciones)}
                acciones={accionesConversacion}
                participantes={mensajeria.estado.participantes.filter((persona) => persona.id !== SESION_ACTUAL.id)}
                onCrearGrupo={mensajeria.crearGrupo}
                historias={{ porParticipante: historias.porParticipante, abrir: historias.abrir }}
              />
              {activa ? (
                <PanelConversacion
                  key={activa.id}
                  conversacion={activa}
                  mensajes={mensajeria.estado.hilos[activa.id] ?? []}
                  participantes={mensajeria.estado.participantes.filter((persona) => persona.id !== SESION_ACTUAL.id)}
                  usuarioId={SESION_ACTUAL.id}
                  ahora={ahora}
                  conversaciones={mensajeria.estado.conversaciones}
                  {...mensajeria.accionesDe(activa.id)}
                  onVolver={() => setConversacionActiva(null)}
                  oculta={false}
                />
              ) : (
                <PanelVacioMensajes oculta />
              )}
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelLateralMensajeria contactosLinea={CONTACTOS_LINEA_MENSAJERIA} gruposRecientes={GRUPOS_RECIENTES_MENSAJERIA} eventosProximos={EVENTOS_PROXIMOS_MENSAJERIA} />}
      />
      {historias.visor.abierto && <VisorHistoria {...historias.visor} acciones={accionesVisor} />}
    </EstructuraApp>
  )
}
