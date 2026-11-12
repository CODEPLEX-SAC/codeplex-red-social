import datos from './sala_demostracion.json'
import type { ParticipanteVL } from '@/tipos/mensajeria/modelo_mensajes_videollamada_en_curso'
import type { ParticipanteSala } from '@/tipos/mensajeria/contrato_integracion_llamada'

const ARCHIVOS = import.meta.glob('../../../recursos/imagenes/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>
const URL_POR_NOMBRE = new Map(Object.entries(ARCHIVOS).map(([ruta, url]) => [ruta.split('/').pop() ?? ruta, url]))
const ROL_INVITADO = datos.rolInvitado
const INDICE_PARTICIPANTE_HABLANDO = datos.indiceHablando

export const IMAGEN_PRESENTACION_DEMOSTRACION = URL_POR_NOMBRE.get(datos.imagenPresentacion)

function identificadorDe(nombre: string, indice: number): string {
  return `${datos.prefijoIdentificador}-${indice + 1}-${nombre.toLowerCase().normalize(datos.normalizacion).replace(/\p{Diacritic}/gu, String()).replace(/[^a-z0-9]+/g, datos.separadorIdentificador)}`
}

export function ampliarParticipantes(propios: readonly ParticipanteVL[], reserva: readonly ParticipanteVL[]): ParticipanteVL[] {
  const nombres = new Set(propios.map((participante) => participante.nombre))
  return [...propios, ...reserva.filter((participante) => !nombres.has(participante.nombre))]
}

export function participantesDemostracion(base: readonly ParticipanteVL[], cantidad: number, fotografiaDe: (nombre: string) => string): ParticipanteSala[] {
  return base.slice(0, cantidad).map((participante, indice) => {
    const local = participante.organizador === true
    return {
      id: identificadorDe(participante.nombre, indice),
      nombre: participante.nombre,
      rol: participante.rol,
      local,
      organizador: local,
      enLinea: participante.rol !== ROL_INVITADO,
      invitado: participante.rol === ROL_INVITADO,
      micActivo: participante.micActivo,
      camaraActiva: participante.videoActivo,
      hablando: indice === INDICE_PARTICIPANTE_HABLANDO,
      manoLevantada: false,
      fotografia: fotografiaDe(participante.nombre),
    }
  })
}
