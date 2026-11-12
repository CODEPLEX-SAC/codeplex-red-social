import { Icono, EstructuraApp, usarCarrusel, clasesBoton, CLASE_ENLACE_ACCION_SECUNDARIO } from '../../componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { BotonProgramarReunion, BotonReunionMasTarde, PestanasMensajes, SeccionContactosFrecuentes, usarVersionReuniones } from '../../componentes/mensajeria'
import { CONTACTOS_LINEA_MENSAJERIA, GRUPOS_RECIENTES_MENSAJERIA, EVENTOS_PROXIMOS_MENSAJERIA, LLAMADAS_RECIENTES, CONTACTOS_FRECUENTES, HISTORIAL, reunionesProgramadasActuales, crearReunionParaMasTarde, crearSalaNavegador, programarReunion, suscribirReuniones, versionReuniones } from '../../rutas/mensajeria/rutas_mensajeria'
import { contactosInvitables, fotografiaDeParticipante } from '../../rutas/mensajeria/fotografias_participantes'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import type { ReunionCreada } from '@/tipos/mensajeria/contrato_programar_reunion'

const PUERTO_SALA = crearSalaNavegador()
const ORIGEN_VERSION = { suscribir: suscribirReuniones, leer: versionReuniones }
const CANDIDATOS = contactosInvitables([SESION_ACTUAL.usuario])

function rutaDeSala(reunion: ReunionCreada): string {
  return `${catalogoMensajeria.rutas.videollamada_en_curso}?${catalogoMensajeria.parametros_ruta.reunion}=${reunion.id}`
}

export function PaginaMensajesVideollamadas() {
  const carrusel = usarCarrusel()
  usarVersionReuniones(ORIGEN_VERSION)

  return (
    <EstructuraApp paginaActiva="mensajes">
      <div>
        <div className="mb-5 flex items-start justify-between gap-5">
          <h1 className="m-0 text-titulo-pagina text-texto">{catalogoMensajeria.titulos.videollamadas}</h1>
          <div className="flex items-center gap-2.5">
            <a href={`#${catalogoMensajeria.videollamada.ancla_historial}`} className={[CLASE_ENLACE_ACCION_SECUNDARIO, 'inline-flex items-center gap-1.5'].join(' ')}>
              <Icono name="reloj" className="h-4 w-4" /> {catalogoMensajeria.leyendas.historial_de_llamadas}
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <PestanasMensajes
            activa="videollamadas"
            tabs={[
              { etiqueta: catalogoMensajeria.titulos_pestanas.mensajes, clave: 'todos' },
              { etiqueta: catalogoMensajeria.titulos_pestanas.videollamadas, clave: 'videollamadas' },
            ]}
          />
          <div className="mb-3 flex max-w-full flex-wrap items-center gap-2.5">
            <BotonReunionMasTarde crearEnlace={() => crearReunionParaMasTarde(window.location.origin).enlace} copiarEnlace={PUERTO_SALA.copiarEnlace} />
            <BotonProgramarReunion candidatos={CANDIDATOS} fotografiaDe={fotografiaDeParticipante} rutaSala={rutaDeSala} programar={(datos) => programarReunion(datos, window.location.origin)} copiarEnlace={PUERTO_SALA.copiarEnlace} />
            <a href={catalogoMensajeria.rutas.videollamada_iniciar} className={clasesBoton({ variant: 'primario', size: 'md' })}>
              <Icono name="video" className="h-4 w-4" /> {catalogoMensajeria.botones.iniciar_videollamada}
            </a>
          </div>
        </div>

        <SeccionContactosFrecuentes
          LLAMADAS_RECIENTES={LLAMADAS_RECIENTES}
          carrusel={carrusel}
          CONTACTOS_FRECUENTES={CONTACTOS_FRECUENTES}
          REUNIONES_PROGRAMADAS={reunionesProgramadasActuales()}
          HISTORIAL={HISTORIAL}
          CONTACTOS_LINEA_MENSAJERIA={CONTACTOS_LINEA_MENSAJERIA}
          GRUPOS_RECIENTES_MENSAJERIA={GRUPOS_RECIENTES_MENSAJERIA}
          EVENTOS_PROXIMOS_MENSAJERIA={EVENTOS_PROXIMOS_MENSAJERIA}
        />
      </div>
    </EstructuraApp>
  )
}
