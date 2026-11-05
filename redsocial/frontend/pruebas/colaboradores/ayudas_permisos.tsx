import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

export const textosPermisos = catalogoColaboradores.campos_rol_permisos
export const dialogosRol = catalogoColaboradores.dialogos_rol
export const seleccion = catalogoColaboradores.seleccion_jerarquica
export const columnas = catalogoColaboradores.columnas_permisos

export type Dialogo = ReturnType<typeof abrirPasoDos>

const matchMediaOriginal = window.matchMedia

export function simularMovil(activo: boolean) {
  window.matchMedia = ((consulta: string) => ({
    matches: activo && consulta === catalogoCompartido.consultas.movil,
    media: consulta,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

export function restaurarMatchMedia() {
  window.matchMedia = matchMediaOriginal
}

export function abrirInvitacion() {
  fireEvent.click(screen.getByRole('button', { name: catalogoColaboradores.botones.invitar_colaborador }))
  return within(screen.getByRole('dialog', { name: catalogoColaboradores.titulos.invitar }))
}

export function abrirPasoDos() {
  render(<PaginaColaboradores />)
  const dialogo = abrirInvitacion()
  fireEvent.change(dialogo.getByRole('textbox', { name: catalogoColaboradores.campos_informacion.nombres }), { target: { value: 'Carlos' } })
  fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
  return dialogo
}

export function idCabecera(prefijo: string, recurso: string) {
  return `acordeon-cabecera-${[prefijo, recurso].join(catalogoColaboradores.ids_permisos.separador)}`
}

export function expandir(recurso: string, prefijo: string = catalogoColaboradores.ids_permisos.asignacion) {
  const cabecera = document.getElementById(idCabecera(prefijo, recurso)) as HTMLElement
  if (cabecera.getAttribute('aria-expanded') !== 'true') fireEvent.click(cabecera)
  return cabecera
}

export function casilla(dialogo: Dialogo, permiso: string, recurso: string) {
  return dialogo.getByRole('checkbox', { name: textosPermisos.casilla_etiqueta.replace(':permiso', permiso).replace(':recurso', recurso) }) as HTMLInputElement
}

export function hayCasilla(dialogo: Dialogo, permiso: string, recurso: string) {
  return dialogo.queryByRole('checkbox', { name: textosPermisos.casilla_etiqueta.replace(':permiso', permiso).replace(':recurso', recurso) }) !== null
}

export function irAModulo(dialogo: Dialogo, nombre: string) {
  fireEvent.click(dialogo.getAllByRole('button', { name: new RegExp(`^${nombre}`) }).filter((boton) => !boton.hasAttribute('aria-controls') && !boton.id.startsWith('acordeon'))[0])
}

export function selectorRol(dialogo: Dialogo, modulo: string) {
  return dialogo.getAllByRole('combobox', { name: `${textosPermisos.rol_modulo}: ${modulo}` })[0]
}

export function opcionesDeRol(dialogo: Dialogo, modulo: string) {
  fireEvent.mouseDown(selectorRol(dialogo, modulo))
  const opciones = within(screen.getByRole('listbox')).getAllByRole('option').map((opcion) => opcion.textContent)
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' })
  return opciones
}

export function elegirRol(dialogo: Dialogo, modulo: string, etiqueta: string) {
  fireEvent.mouseDown(selectorRol(dialogo, modulo))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: etiqueta }))
}

export function casillaModulo(contenedor: Dialogo | ReturnType<typeof within>) {
  return contenedor.getByRole('checkbox', { name: seleccion.seleccionar_todos }) as HTMLInputElement
}

export function casillaRecurso(contenedor: Dialogo | ReturnType<typeof within>, recurso: string) {
  return contenedor.getByRole('checkbox', { name: seleccion.seleccionar_recurso.replace(':recurso', recurso) }) as HTMLInputElement
}

export function estadoDe(casillaMarcada: HTMLInputElement) {
  if (casillaMarcada.getAttribute('aria-checked') === 'mixed') return 'parcial'
  return casillaMarcada.checked ? 'todos' : 'ninguno'
}

export function agregarPermiso(dialogo: Dialogo, recurso: string, nombre: string) {
  fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.agregar_permiso_recurso.replace(':recurso', recurso) }))
  const modal = within(screen.getByRole('dialog', { name: dialogosRol.titulo_agregar.replace(':recurso', recurso) }))
  fireEvent.change(modal.getByRole('textbox', { name: dialogosRol.permiso_etiqueta }), { target: { value: nombre } })
  fireEvent.click(modal.getByRole('button', { name: dialogosRol.agregar_confirmar }))
  return modal
}

export function abrirAdministracion(dialogo: Dialogo, modulo: string) {
  fireEvent.click(dialogo.getByRole('button', { name: dialogosRol.menu_rol }))
  fireEvent.click(screen.getByRole('menuitem', { name: dialogosRol.opciones_rol.administrar }))
  return within(screen.getByRole('dialog', { name: dialogosRol.titulos.administrar.replace(':modulo', modulo) }))
}

export function accionDeRol(administracion: ReturnType<typeof abrirAdministracion>, rol: string, accion: keyof typeof dialogosRol.acciones) {
  fireEvent.click(administracion.getByRole('button', { name: dialogosRol.acciones[accion].replace(':rol', rol) }))
}

export function crearRolSimple(dialogo: Dialogo, modulo: string, nombre: string) {
  fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.crear_rol }))
  const modal = within(screen.getByRole('dialog', { name: dialogosRol.titulos.crear.replace(':modulo', modulo) }))
  fireEvent.change(modal.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: nombre } })
  fireEvent.click(modal.getByRole('button', { name: dialogosRol.boton_guardar.crear }))
}

export function guardarYContinuar(dialogo: Dialogo) {
  fireEvent.click(dialogo.getByRole('button', { name: dialogosRol.guardar_y_continuar }))
}

export function registrarRol(dialogo: Dialogo, modulo: string, nombre: string) {
  crearRolSimple(dialogo, modulo, nombre)
  fireEvent.click(casillaDelModulo(dialogo))
  guardarYContinuar(dialogo)
  fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.anterior }))
}

export function casillaDelModulo(dialogo: Dialogo) {
  return dialogo.getByRole('checkbox', { name: seleccion.seleccionar_todos }) as HTMLInputElement
}
