import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { MiembroGrupo, RolGrupo } from '@/tipos/grupos/contrato_gestion_grupos'
import type { RegistroGrupo } from '@/tipos/grupos/contrato_puerto_grupos'
import type { GrupoAdmin, GrupoMis } from '@/tipos/grupos/modelo_grupos_mis_grupos'
import { AMIGOS } from '../amigos/todos'
import { COLABORADORES } from '../colaboradores/colaboradores'
import { PERFILES_USUARIO } from '../perfil/perfiles'
import { imagenDeGrupo } from './imagenes_grupos'
import { GRUPOS_ADMIN, MIS_GRUPOS } from './mis_grupos'
import datos from './detalle_grupos.json'
import visitas from './visitas_grupos.json'

const MARCAS_DIACRITICAS = /[\u0300-\u036f]/g
const NO_ALFANUMERICO = /[^a-z0-9]+/g
const BORDES_GUION = /^-+|-+$/g
const VISITAS = new Map(Object.entries(visitas.grupos))
const SEPARADOR_MILES = /\B(?=(\d{3})+(?!\d))/g
const TOTALES = new Map(Object.entries(datos.miembrosTotales))
const POOL_PERSONAS = [...new Set([...PERFILES_USUARIO.map((perfil) => perfil.nombre), ...AMIGOS.map((amigo) => amigo.nombre), ...COLABORADORES.map((colaborador) => colaborador.nombre)])]

export const SEGUIDORES_DISPONIBLES = false
export const GRUPOS_EXTERNOS = datos.externos

export function idDeGrupo(nombre: string): string {
  return nombre.normalize(catalogoGrupos.parametros_ruta.normalizacion).replace(MARCAS_DIACRITICAS, String()).toLowerCase().replace(NO_ALFANUMERICO, catalogoGrupos.parametros_ruta.separador_id).replace(BORDES_GUION, String())
}

export function rutaDeGrupo(id: string, vista?: string): string {
  const consulta = new URLSearchParams({ [catalogoGrupos.parametros_ruta.grupo]: id })
  if (vista) consulta.set(catalogoGrupos.parametros_ruta.vista, vista)
  return [catalogoGrupos.rutas.detalle, consulta.toString()].join(catalogoGrupos.parametros_ruta.inicio_consulta)
}

export function formatoMiles(cantidad: number): string {
  return String(cantidad).replace(SEPARADOR_MILES, catalogoGrupos.detalle.separador_miles)
}

function rotar<T>(lista: readonly T[], desplazamiento: number): T[] {
  const inicio = desplazamiento % lista.length
  return [...lista.slice(inicio), ...lista.slice(0, inicio)]
}

function desplazamientoDe(id: string): number {
  return [...id].reduce((suma, caracter) => suma + caracter.charCodeAt(0), 0)
}

export function miembrosDe(registro: RegistroGrupo): MiembroGrupo[] {
  const sesion = catalogoCompartido.sesion_actual
  const yo: MiembroGrupo = { id: sesion.id, nombre: sesion.usuario, rol: registro.rol }
  const administrativos = registro.administradores.filter((nombre) => nombre !== sesion.usuario).map((nombre) => ({ id: idDeGrupo(nombre), nombre, rol: 'administrador' as const }))
  const propios = { administrador: [yo], miembro: [...administrativos, yo], visitante: administrativos }[registro.rol]
  const excluidos = new Set([sesion.usuario, ...registro.administradores])
  const limite = Math.min(registro.totalMiembros, datos.limiteListado)
  const otros = rotar(POOL_PERSONAS.filter((nombre) => !excluidos.has(nombre)), desplazamientoDe(registro.id)).map((nombre) => ({ id: idDeGrupo(nombre), nombre, rol: 'miembro' as const }))
  return [...propios, ...otros].slice(0, limite)
}

export function textoDeMiembros(cantidad: number): string {
  if (cantidad === 1) return catalogoGrupos.detalle.miembros_uno
  return catalogoGrupos.detalle.miembros_otros.replace(':n', formatoMiles(cantidad))
}

export function administradoresDe(rol: RolGrupo): string[] {
  if (rol === 'administrador') return datos.administradoresPropios
  return datos.administradoresDeMiembro
}

function registroDe(grupo: GrupoAdmin | GrupoMis, rol: Exclude<RolGrupo, 'visitante'>, indice: number): RegistroGrupo {
  const propios = Object.entries(datos.grupos).find(([nombre]) => nombre === grupo.nombre)?.[1]
  const visita = VISITAS.get(grupo.nombre) ?? visitas.porDefecto
  return {
    id: idDeGrupo(grupo.nombre),
    nombre: grupo.nombre,
    descripcion: grupo.descripcion,
    rol,
    imagen: imagenDeGrupo(grupo.nombre, indice),
    ultimaVisita: visita.texto,
    diasVisita: visita.dias,
    fechaCreacion: propios?.fechaCreacion ?? datos.fechaCreacion,
    totalMiembros: TOTALES.get(grupo.nombre) ?? datos.miembrosPorDefecto[rol],
    creado: propios?.creado ?? datos.fechaCreacion,
    administradores: administradoresDe(rol),
    publicacion: propios?.publicacion ?? grupo.descripcion,
  }
}

export function registrosBase(): RegistroGrupo[] {
  return [...GRUPOS_ADMIN.map((grupo, indice) => registroDe(grupo, 'administrador', indice)), ...MIS_GRUPOS.map((grupo, indice) => registroDe(grupo, 'miembro', indice))]
}
