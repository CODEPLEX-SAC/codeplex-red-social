import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ClaveAccionGrupo, GrupoMenu, RolGrupo } from '@/tipos/grupos/contrato_gestion_grupos'

const SOLO_ADMINISTRADOR: ReadonlySet<string> = new Set(['eliminar', 'ver_solicitudes', 'estado', 'editar'])

function disponibleParaRol(clave: string, rol: RolGrupo): boolean {
  if (SOLO_ADMINISTRADOR.has(clave)) return rol === 'administrador'
  if (clave === 'abandonar') return rol === 'miembro'
  return true
}

function coincideFijado(clave: string, fijado: boolean): boolean {
  if (clave === 'fijar') return !fijado
  if (clave === 'desfijar') return fijado
  return true
}

export function referenciaDeMenu(grupo: { id: string; nombre: string; rol: RolGrupo; fijado: boolean; siguiendo?: boolean }, ruta: string): GrupoMenu {
  return { id: grupo.id, nombre: grupo.nombre, rol: grupo.rol, fijado: grupo.fijado, siguiendo: grupo.siguiendo, ruta }
}

export function elementosMembresia(grupo: GrupoMenu, ejecutar: (clave: ClaveAccionGrupo) => void): ElementoMenu[] {
  const siguiendo = grupo.siguiendo !== false
  return catalogoGrupos.detalle.membresia.elementos
    .filter((elemento) => (elemento.clave === 'seguir' ? !siguiendo : elemento.clave !== 'dejar_seguir' || siguiendo))
    .map((elemento) => ({ etiqueta: elemento.etiqueta, icono: elemento.icono as IconName, divisor: elemento.clave === 'abandonar', alHacerClick: () => ejecutar(elemento.clave as ClaveAccionGrupo) }))
}

export function elementosMenuGrupo(grupo: GrupoMenu, ejecutar: (clave: ClaveAccionGrupo | 'editar' | 'desfijar') => void): ElementoMenu[] {
  return catalogoGrupos.menu.elementos
    .filter((elemento) => disponibleParaRol(elemento.clave, grupo.rol) && coincideFijado(elemento.clave, grupo.fijado))
    .map((elemento) => ({
      etiqueta: elemento.etiqueta,
      icono: elemento.icono as IconName,
      peligro: elemento.clave === 'eliminar',
      divisor: elemento.clave === 'abandonar' || elemento.clave === 'eliminar',
      alHacerClick: () => ejecutar(elemento.clave as ClaveAccionGrupo | 'editar' | 'desfijar'),
    }))
}
