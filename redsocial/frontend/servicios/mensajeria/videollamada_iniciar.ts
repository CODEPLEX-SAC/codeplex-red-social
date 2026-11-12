import type { IconName } from '../../tipos/compartido/contrato_icono'
import datos from './videollamada_iniciar.json'
import type { ParticipanteVL } from '../../tipos/mensajeria/modelo_mensajes_videollamada_en_curso'

export const DISPOSITIVOS = datos.dispositivos as { icono: IconName; titulo: string; detalle: string }[]
export const CONFIGURACION_LLAMADA = datos.configuracionLlamada as { icono: IconName; titulo: string; detalle: string }[]
export const PARTICIPANTES_INICIAR = datos.participantesIniciar as { nombre: string; rol: string }[]
export const CONTACTOS_INVITAR = datos.contactosInvitar
export const OPCIONES_LLAMADA = datos.opcionesLlamada as { icono: IconName; titulo: string; detalle: string }[]
export const DETALLE_REUNION = datos.detalleReunion
export const VOLVER_A_VIDEOLLAMADAS = datos.volverAVideollamadas
export const PARTICIPANTES_PREPARACION: ParticipanteVL[] = PARTICIPANTES_INICIAR.map((participante, indice) => ({ nombre: participante.nombre, rol: participante.rol, organizador: indice === 0, micActivo: true, videoActivo: true }))
