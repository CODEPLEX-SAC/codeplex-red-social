import { imagenRedSocialDe } from '@/componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { PERFILES_USUARIO } from '../perfil/rutas_perfil'
import type { ParticipanteVL } from '@/tipos/mensajeria/modelo_mensajes_videollamada_en_curso'

const PERFIL_POR_NOMBRE = new Map(PERFILES_USUARIO.map((perfil) => [perfil.nombre, perfil]))
const SUFIJO_PROPIO = /\s*\(.*\)\s*$/

export function fotografiaDeParticipante(nombre: string): string {
  const perfil = PERFIL_POR_NOMBRE.get(nombre.replace(SUFIJO_PROPIO, String()))
  return perfil?.avatar || imagenRedSocialDe(perfil?.id)
}

export function contactosInvitables(excluidos: readonly string[]) {
  const omitidos = new Set(excluidos)
  return PERFILES_USUARIO.filter((perfil) => !omitidos.has(perfil.nombre)).map((perfil) => ({ id: perfil.id, nombre: perfil.nombre, detalle: perfil.titular }))
}

export function participantesDesdePerfiles(excluidos: readonly string[]): ParticipanteVL[] {
  const omitidos = new Set(excluidos)
  return PERFILES_USUARIO.filter((perfil) => !omitidos.has(perfil.nombre)).map((perfil) => ({ nombre: perfil.nombre, rol: catalogoMensajeria.leyendas.colaborador, micActivo: true, videoActivo: true }))
}
