import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { ControlGuardados } from '@/tipos/guardados/contrato_control_guardados'
import type { ColeccionGuardada, GrupoGuardado, ModalGuardados } from '@/tipos/guardados/modelo_guardados'

const botones = catalogoGuardados.botones
const unidades = catalogoGuardados.unidades
const modales = catalogoGuardados.modales

export function etiquetaUnidad(cantidad: number): string {
  return cantidad === 1 ? unidades.elemento_singular : unidades.elemento_plural
}

export function etiquetaExpandir(expandido: boolean): string {
  if (expandido) return botones.ver_menos
  return botones.ver_todos
}

export function mensajeListaVacia(enColeccion: boolean): string {
  if (enColeccion) return catalogoGuardados.vacios.coleccion
  return catalogoGuardados.mensajes.sin_guardados
}

export function compartirColeccion(coleccion: ColeccionGuardada): ModalGuardados {
  return { tipo: 'compartir', titulo: modales.compartir.coleccion, nombre: coleccion.nombre, texto: `${coleccion.grupos.length} ${etiquetaUnidad(coleccion.grupos.length)}` }
}

export function accionesDeGrupo(control: ControlGuardados, grupo: GrupoGuardado): ElementoMenu[] {
  const { acciones, coleccionAbierta } = control
  const agregar: ElementoMenu = { etiqueta: botones.agregar_a_coleccion, icono: 'guardados', alHacerClick: () => acciones.abrir({ tipo: 'agregar', grupoId: grupo.id }) }
  const compartir: ElementoMenu = { etiqueta: botones.compartir, icono: 'compartir', alHacerClick: () => acciones.abrir({ tipo: 'compartir', titulo: modales.compartir.grupo, nombre: grupo.nombre, texto: grupo.descripcion }) }
  const deColeccion: ElementoMenu[] = coleccionAbierta ? [{ etiqueta: botones.quitar_de_coleccion, icono: 'cerrar', alHacerClick: () => acciones.quitarDeColeccion(coleccionAbierta.id, grupo.id) }] : []
  const quitar: ElementoMenu = { etiqueta: botones.quitar_guardado, icono: 'eliminar', peligro: true, alHacerClick: () => acciones.abrir({ tipo: 'quitar', grupoId: grupo.id }) }
  return [agregar, compartir, ...deColeccion, quitar]
}

export function accionesDeColeccion(control: ControlGuardados, coleccion: ColeccionGuardada): ElementoMenu[] {
  const { acciones, navegacion } = control
  const ver: ElementoMenu = { etiqueta: botones.ver_coleccion, icono: 'ver', alHacerClick: () => navegacion.abrirColeccion(coleccion.id) }
  const compartir: ElementoMenu = { etiqueta: botones.compartir_coleccion, icono: 'compartir', alHacerClick: () => acciones.abrir(compartirColeccion(coleccion)) }
  const renombrar: ElementoMenu = { etiqueta: botones.cambiar_nombre, icono: 'editar', alHacerClick: () => acciones.abrir({ tipo: 'renombrar', coleccionId: coleccion.id }) }
  const eliminar: ElementoMenu = { etiqueta: botones.eliminar_coleccion, icono: 'eliminar', peligro: true, alHacerClick: () => acciones.abrir({ tipo: 'eliminar', coleccionId: coleccion.id }) }
  return [ver, compartir, renombrar, eliminar]
}
