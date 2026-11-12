import { Icono, EstructuraApp, CLASE_ENLACE_ACCION } from '../../componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { usarParametroDeRuta } from '../../rutas/compartido/navegacion'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { crearDispositivosNavegador, crearSalaNavegador, PARTICIPANTES_PREPARACION, DETALLE_REUNION, VOLVER_A_VIDEOLLAMADAS, participantesDemostracion } from '../../rutas/mensajeria/rutas_mensajeria'
import { contactosInvitables, fotografiaDeParticipante } from '../../rutas/mensajeria/fotografias_participantes'
import { enlacesDeSala, SeccionVideollamadaIniciar, SeccionParticipantes2, usarInvitaciones, usarPreparacionLlamada } from '../../componentes/mensajeria'

const clases = catalogoMensajeria.videollamada.clases.preparacion
const PUERTO_DISPOSITIVOS = crearDispositivosNavegador()
const PUERTO_SALA = crearSalaNavegador()
const parametros = catalogoMensajeria.parametros_ruta

export function PaginaMensajesVideollamadaIniciar() {
  const contacto = usarParametroDeRuta(parametros.contacto)
  const esReunion = usarParametroDeRuta(parametros.modo) === catalogoMensajeria.videollamada.modo_reunion
  const preparacion = usarPreparacionLlamada(PUERTO_DISPOSITIVOS)
  const invitaciones = usarInvitaciones(PUERTO_SALA)
  const base = contacto ? PARTICIPANTES_PREPARACION.map((participante, indice) => (indice === 0 ? participante : { ...participante, nombre: contacto })) : PARTICIPANTES_PREPARACION
  const contactos = contactosInvitables([SESION_ACTUAL.usuario, contacto ?? String()])
  const enlaces = enlacesDeSala(contacto, { microfono: preparacion.micActivo, camara: preparacion.camaraActiva })

  return (
    <EstructuraApp paginaActiva="mensajes">
      <a href={catalogoMensajeria.rutas.videollamadas} className={[CLASE_ENLACE_ACCION, clases.enlace_volver].join(' ')}>
        <Icono name="flecha-izquierda" className="h-4 w-4" /> {VOLVER_A_VIDEOLLAMADAS}
      </a>

      <div className={clases.rejilla}>
        <SeccionVideollamadaIniciar usuario={SESION_ACTUAL.usuario} contacto={contacto} esReunion={esReunion} preparacion={preparacion} enlaceInicio={enlaces.inicio} />

        <aside className={clases.lateral}>
          <SeccionParticipantes2 participantes={participantesDemostracion(base, base.length, fotografiaDeParticipante)} contactos={contactos} invitaciones={invitaciones} enlaceReunion={enlaces.reunion} />

          {!contacto && (
            <section className="rounded-xl border border-borde bg-white p-4">
              <h2 className="m-0 mb-2.5 text-titulo-seccion text-texto">{catalogoMensajeria.secciones.detalles_reunion}</h2>
              <strong className="mb-2.5 block text-nombre-entidad text-texto">{DETALLE_REUNION.titulo}</strong>
              <div className="mb-2 flex items-center gap-2 text-campo-formulario text-texto-suave">
                <Icono name="calendario" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.fecha}
              </div>
              <div className="mb-2 flex items-center gap-2 text-campo-formulario text-texto-suave">
                <Icono name="reloj" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.horario}
              </div>
              <div className="flex items-center gap-2 text-campo-formulario text-texto-suave">
                <Icono name="grupo" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.participantes}
              </div>
            </section>
          )}
        </aside>
      </div>
    </EstructuraApp>
  )
}
