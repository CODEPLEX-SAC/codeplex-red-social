import { EstructuraApp } from '../../componentes/compartido'
import { rutaDeMensajeAmigo } from '../../componentes/amigos'
import { elegirCantidadInicial, estadoInicial, SalaVideollamada } from '../../componentes/mensajeria'
import { ALMACEN_MENSAJERIA, ampliarParticipantes, crearSalaNavegador, IMAGEN_PRESENTACION_DEMOSTRACION, PARTICIPANTES, participantesDemostracion, resolverLlamadaDirecta, resolverReunionEnSala, resolverReunionNueva } from '../../rutas/mensajeria/rutas_mensajeria'
import { contactosInvitables, fotografiaDeParticipante, participantesDesdePerfiles } from '../../rutas/mensajeria/fotografias_participantes'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { navegar, usarParametroDeRuta } from '../../rutas/compartido/navegacion'
import { PaginaNoEncontrada } from '../compartido/pagina_no_encontrada'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

const PUERTO_SALA = crearSalaNavegador()
const parametros = catalogoMensajeria.parametros_ruta
const CONTACTOS = contactosInvitables([SESION_ACTUAL.usuario])

function resolverReunion(id: string | null, contacto: string | null, esNueva: boolean) {
  if (id === null && contacto) return resolverLlamadaDirecta(contacto)
  if (id === null && esNueva) return resolverReunionNueva()
  return resolverReunionEnSala(id)
}

export function PaginaMensajesVideollamadaEnCurso({ instantanea = false }: { instantanea?: boolean }) {
  const id = usarParametroDeRuta(catalogoMensajeria.parametros_ruta.reunion)
  const contacto = usarParametroDeRuta(catalogoMensajeria.parametros_ruta.contacto)
  const esNueva = instantanea || usarParametroDeRuta(catalogoMensajeria.parametros_ruta.modo) === catalogoMensajeria.videollamada.modo_reunion
  const reunion = resolverReunion(id, contacto, esNueva)
  if (!reunion) return <PaginaNoEncontrada />

  const reserva = [...PARTICIPANTES, ...participantesDesdePerfiles([SESION_ACTUAL.usuario, ...PARTICIPANTES.map((participante) => participante.nombre)])]
  const base = ampliarParticipantes(reunion.participantes, reserva)
  const esPredeterminada = id === null && !contacto && !esNueva
  const cantidadInicial = elegirCantidadInicial(esPredeterminada, contacto !== null, base.length)
  function escribirA(nombre: string) {
    navegar(rutaDeMensajeAmigo(nombre, ALMACEN_MENSAJERIA.leer().conversaciones, catalogoMensajeria.rutas.todos, parametros.conversacion))
  }

  const enlaceReunion = new URL(catalogoMensajeria.rutas.videollamada_en_curso, window.location.origin).toString()

  return (
    <EstructuraApp paginaActiva="mensajes">
      <SalaVideollamada
        key={id ?? contacto ?? (esNueva ? 'nueva' : 'en-curso')}
        reunion={reunion}
        puerto={PUERTO_SALA}
        generar={(cantidad) => participantesDemostracion(base, cantidad, fotografiaDeParticipante)}
        contactos={CONTACTOS}
        enlaceReunion={enlaceReunion}
        imagenPresentacion={IMAGEN_PRESENTACION_DEMOSTRACION}
        maximoParticipantes={base.length}
        alEscribir={escribirA}
        cantidadInicial={cantidadInicial}
        microfonoInicial={estadoInicial(usarParametroDeRuta(parametros.microfono), !instantanea)}
        camaraInicial={estadoInicial(usarParametroDeRuta(parametros.camara), !instantanea)}
      />
    </EstructuraApp>
  )
}
