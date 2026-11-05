import { fireEvent, screen, within } from '@testing-library/react'
import { DATOS_ASISTENTE_INVITACION } from '../../servicios/colaboradores/asistente_invitacion'
import { REPOSITORIO_ROLES_MODULO, reiniciarRolesDemostracion } from '../../servicios/colaboradores/roles_modulo'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { abrirAdministracion, abrirInvitacion, abrirPasoDos, accionDeRol, casilla, casillaModulo, crearRolSimple, dialogosRol, expandir, guardarYContinuar, irAModulo, opcionesDeRol, registrarRol, selectorRol, textosPermisos } from './ayudas_permisos'

const avisos = dialogosRol.avisos
const NOMBRE = 'Asistente de planillas'
const ambito = dialogosRol.ambito_predeterminado
const clasesPermisos = catalogoColaboradores.clases.invitar_permisos

function formulario(modo: keyof typeof dialogosRol.titulos, modulo = 'Planillas', rol = '') {
  return within(screen.getByRole('dialog', { name: dialogosRol.titulos[modo].replace(':modulo', modulo).replace(':rol', rol) }))
}

function confirmarEdicion(admin: ReturnType<typeof abrirAdministracion>, rol: string) {
  accionDeRol(admin, rol, 'editar')
  const confirmacion = within(screen.getByRole('dialog', { name: dialogosRol.editar_confirmar_titulo }))
  expect(confirmacion.getByText(dialogosRol.editar_confirmar_pregunta.replace(':rol', rol))).toBeInTheDocument()
  fireEvent.click(confirmacion.getByRole('button', { name: dialogosRol.editar_confirmar }))
  return formulario('editar', 'Planillas', rol)
}

describe('Invitar colaborador: borrador de rol, guardado y confirmación sin permisos', { timeout: 40000 }, () => {
  beforeEach(() => reiniciarRolesDemostracion())

  it('crear un rol muestra el aviso oficial fuera del modal, lo deja como borrador y cambia el botón a «Guardar y continuar»', () => {
    const dialogo = abrirPasoDos()
    expect(dialogo.queryByRole('button', { name: dialogosRol.guardar_y_continuar })).toBeNull()
    crearRolSimple(dialogo, 'Planillas', NOMBRE)
    expect(screen.getByText(avisos.creado_titulo)).toBeInTheDocument()
    const aviso = screen.getByText(avisos.creado.replace(':rol', NOMBRE).replace(':modulo', 'Planillas'))
    expect(aviso.closest('[role=dialog]')?.getAttribute('aria-label')).toBe(catalogoColaboradores.titulos.invitar)
    expect(dialogo.getByRole('button', { name: dialogosRol.guardar_y_continuar })).toBeInTheDocument()
    expect(dialogo.queryByRole('button', { name: textosRedSocial.SIGUIENTE })).toBeNull()
  })

  it('el borrador no es una plantilla: no aparece en Administrar roles ni en el repositorio, y sobrevive al cambio de módulo', () => {
    const dialogo = abrirPasoDos()
    crearRolSimple(dialogo, 'Planillas', NOMBRE)
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Ver', 'Empleados'))
    irAModulo(dialogo, 'Contabilidad')
    irAModulo(dialogo, 'Planillas')
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(dialogosRol.etiqueta_borrador.replace(':rol', NOMBRE))
    expandir('Empleados')
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(true)
    expect(REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')).toHaveLength(0)
    const admin = abrirAdministracion(dialogo, 'Planillas')
    expect(admin.queryByText(NOMBRE)).toBeNull()
  })

  it('«Guardar y continuar» registra el rol con los permisos configurados, conserva la asignación y avanza a Vigencia', () => {
    const dialogo = abrirPasoDos()
    crearRolSimple(dialogo, 'Planillas', NOMBRE)
    fireEvent.click(casillaModulo(dialogo))
    guardarYContinuar(dialogo)
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.vigencia.titulo })).toBeInTheDocument()
    const [rol] = REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')
    expect(rol.etiqueta).toBe(NOMBRE)
    expect(rol.borrador).toBeFalsy()
    expect(rol.configuracion.operaciones.Empleados).toContain('exportar')
    fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.anterior }))
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(NOMBRE)
    expect(dialogo.queryByRole('button', { name: dialogosRol.guardar_y_continuar })).toBeNull()
    const admin = abrirAdministracion(dialogo, 'Planillas')
    expect(admin.getByText(dialogosRol.tipos.empresa)).toBeInTheDocument()
  })

  it('sin permisos asignados pide confirmación con el módulo; «Volver» conserva el paso y «Continuar sin acceso» avanza sin guardar una plantilla vacía', () => {
    const dialogo = abrirPasoDos()
    crearRolSimple(dialogo, 'Planillas', NOMBRE)
    guardarYContinuar(dialogo)
    const confirmacion = within(screen.getByRole('dialog', { name: dialogosRol.sin_permisos_titulo }))
    expect(confirmacion.getByText(dialogosRol.sin_permisos_pregunta.replace(':modulo', 'Planillas'))).toBeInTheDocument()
    fireEvent.click(confirmacion.getByRole('button', { name: dialogosRol.volver }))
    expect(screen.queryByRole('dialog', { name: dialogosRol.sin_permisos_titulo })).toBeNull()
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.rol_permisos.titulo })).toBeInTheDocument()

    guardarYContinuar(dialogo)
    fireEvent.click(within(screen.getByRole('dialog', { name: dialogosRol.sin_permisos_titulo })).getByRole('button', { name: dialogosRol.continuar_sin_acceso }))
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.vigencia.titulo })).toBeInTheDocument()
    expect(REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')).toHaveLength(0)
    fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.anterior }))
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(dialogosRol.sin_rol)
  })

  it('vaciar los permisos de un módulo ya ajustado también pide confirmación; un módulo sin tocar no la pide', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.vigencia.titulo })).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.anterior }))
    fireEvent.click(casillaModulo(dialogo))
    fireEvent.click(casillaModulo(dialogo))
    fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expect(screen.getByRole('dialog', { name: dialogosRol.sin_permisos_titulo })).toBeInTheDocument()
  })
})

describe('Invitar colaborador: administración de roles por módulo', { timeout: 40000 }, () => {
  beforeEach(() => reiniciarRolesDemostracion())

  it('el menú ⋮ solo ofrece «Administrar roles» y abre el listado del módulo actual con el tipo de cada rol y editar y duplicar para todos', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(dialogo.getByRole('button', { name: dialogosRol.menu_rol }))
    expect(screen.getAllByRole('menuitem')).toHaveLength(1)
    fireEvent.click(screen.getByRole('menuitem', { name: dialogosRol.opciones_rol.administrar }))
    const admin = within(screen.getByRole('dialog', { name: dialogosRol.titulos.administrar.replace(':modulo', 'Planillas') }))
    const filas = admin.getAllByRole('row').slice(1)
    expect(filas).toHaveLength(Object.keys(DATOS_ASISTENTE_INVITACION.perfilesModulos.Planillas).length)
    expect(admin.getAllByText(dialogosRol.tipos.predefinido)).toHaveLength(filas.length)
    for (const rol of ['Administrador', 'Supervisor', 'Operador', 'Consulta']) {
      expect(admin.getByRole('button', { name: dialogosRol.acciones.editar.replace(':rol', rol) })).toBeInTheDocument()
      expect(admin.getByRole('button', { name: dialogosRol.acciones.duplicar.replace(':rol', rol) })).toBeInTheDocument()
      expect(admin.queryByRole('button', { name: dialogosRol.acciones.eliminar.replace(':rol', rol) })).toBeNull()
    }
  })

  it('un rol predefinido se edita tras confirmar: carga nombre y permisos, conserva su identificador y no altera la asignación', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Crear', 'Empleados'))
    const admin = abrirAdministracion(dialogo, 'Planillas')
    const editor = confirmarEdicion(admin, 'Supervisor')
    expect(editor.getByRole('textbox', { name: dialogosRol.nombre_etiqueta })).toHaveValue('Supervisor')
    expandir('Empleados', catalogoColaboradores.ids_permisos.rol)
    expect(casilla(editor, 'Ver', 'Empleados').checked).toBe(true)
    fireEvent.change(editor.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'Supervisor de turno' } })
    fireEvent.click(casilla(editor, 'Eliminar', 'Empleados'))
    fireEvent.click(editor.getByRole('button', { name: dialogosRol.boton_guardar.editar }))
    expect(screen.getByText(avisos.actualizado)).toBeInTheDocument()
    const [editado] = REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')
    expect(editado.clave).toBe('supervisor')
    expect(editado.etiqueta).toBe('Supervisor de turno')
    expect(editado.configuracion.operaciones.Empleados).toContain('eliminar')
    expect(DATOS_ASISTENTE_INVITACION.perfilesModulos.Planillas.supervisor.Empleados).not.toContain('eliminar')
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe('Supervisor de turno')
    expect(casilla(dialogo, 'Crear', 'Empleados').checked).toBe(true)
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(false)
    fireEvent.click(admin.getAllByRole('button', { name: dialogosRol.cerrar }).at(-1) as HTMLElement)
    expect(opcionesDeRol(dialogo, 'Planillas')).toContain('Supervisor de turno')
  })

  it('la edición de una plantilla de la empresa no cruza a otro módulo ni a otra empresa, y una nueva invitación la usa', () => {
    const dialogo = abrirPasoDos()
    const admin = abrirAdministracion(dialogo, 'Planillas')
    const editor = confirmarEdicion(admin, 'Supervisor')
    fireEvent.change(editor.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'Supervisor propio' } })
    fireEvent.click(editor.getByRole('button', { name: dialogosRol.boton_guardar.editar }))
    fireEvent.click(admin.getAllByRole('button', { name: dialogosRol.cerrar }).at(-1) as HTMLElement)
    irAModulo(dialogo, 'Contabilidad')
    expect(opcionesDeRol(dialogo, 'Contabilidad')).toContain('Supervisor')
    expect(REPOSITORIO_ROLES_MODULO.listar('otra-empresa', 'Planillas')).toHaveLength(0)
    fireEvent.click(screen.getByRole('button', { name: textosRedSocial.CERRAR }))
    const otra = abrirInvitacion()
    fireEvent.change(otra.getByRole('textbox', { name: catalogoColaboradores.campos_informacion.nombres }), { target: { value: 'Rosa' } })
    fireEvent.click(otra.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expect(opcionesDeRol(otra, 'Planillas')).toContain('Supervisor propio')
  })

  it('cancelar la edición sin cambios cierra directamente; con cambios pide confirmación y conserva la definición original', () => {
    const dialogo = abrirPasoDos()
    const admin = abrirAdministracion(dialogo, 'Planillas')
    const editor = confirmarEdicion(admin, 'Operador')
    fireEvent.click(editor.getByRole('button', { name: textosRedSocial.CANCELAR }))
    expect(screen.queryByRole('dialog', { name: dialogosRol.titulos.editar.replace(':modulo', 'Planillas').replace(':rol', 'Operador') })).toBeNull()

    const segundo = confirmarEdicion(admin, 'Operador')
    fireEvent.change(segundo.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'Otro nombre' } })
    fireEvent.click(segundo.getByRole('button', { name: textosRedSocial.CANCELAR }))
    const descarte = within(screen.getByRole('dialog', { name: dialogosRol.descartar_titulo }))
    fireEvent.click(descarte.getByRole('button', { name: dialogosRol.seguir_editando }))
    expect(segundo.getByRole('textbox', { name: dialogosRol.nombre_etiqueta })).toHaveValue('Otro nombre')
    fireEvent.click(segundo.getByRole('button', { name: textosRedSocial.CANCELAR }))
    fireEvent.click(within(screen.getByRole('dialog', { name: dialogosRol.descartar_titulo })).getByRole('button', { name: dialogosRol.descartar }))
    expect(REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')).toHaveLength(0)
    expect(admin.getByText('Operador')).toBeInTheDocument()
  })

  it('declinar la confirmación previa no abre el editor; guardar sin permisos o con un nombre repetido se rechaza', () => {
    const dialogo = abrirPasoDos()
    const admin = abrirAdministracion(dialogo, 'Planillas')
    accionDeRol(admin, 'Consulta', 'editar')
    fireEvent.click(within(screen.getByRole('dialog', { name: dialogosRol.editar_confirmar_titulo })).getByRole('button', { name: dialogosRol.cancelar }))
    expect(screen.queryByRole('dialog', { name: dialogosRol.titulos.editar.replace(':modulo', 'Planillas').replace(':rol', 'Consulta') })).toBeNull()

    const editor = confirmarEdicion(admin, 'Consulta')
    fireEvent.change(editor.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'supervisor' } })
    fireEvent.click(editor.getByRole('button', { name: dialogosRol.boton_guardar.editar }))
    expect(editor.getByText(dialogosRol.errores.nombre_repetido)).toBeInTheDocument()
    fireEvent.change(editor.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'Consulta' } })
    fireEvent.click(casillaModulo(editor))
    fireEvent.click(casillaModulo(editor))
    fireEvent.click(editor.getByRole('button', { name: dialogosRol.boton_guardar.editar }))
    expect(editor.getByText(dialogosRol.errores.sin_permisos)).toHaveAttribute('role', 'alert')
  })

  it('duplicar funciona con cualquier rol: copia los permisos con nombre editable y clave nueva, y no modifica el original', () => {
    const dialogo = abrirPasoDos()
    const admin = abrirAdministracion(dialogo, 'Planillas')
    accionDeRol(admin, 'Supervisor', 'duplicar')
    const modal = formulario('duplicar')
    expect(modal.queryAllByRole('checkbox')).toHaveLength(0)
    expect(modal.getByRole('textbox', { name: dialogosRol.nombre_etiqueta })).toHaveValue(dialogosRol.copia_de.replace(':rol', 'Supervisor'))
    fireEvent.change(modal.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'Supervisor' } })
    fireEvent.click(modal.getByRole('button', { name: dialogosRol.boton_guardar.duplicar }))
    expect(modal.getByText(dialogosRol.errores.nombre_repetido)).toBeInTheDocument()
    fireEvent.change(modal.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: 'Supervisor de turno' } })
    fireEvent.click(modal.getByRole('button', { name: dialogosRol.boton_guardar.duplicar }))
    expect(screen.getByText(avisos.duplicado.replace(':rol', 'Supervisor de turno').replace(':modulo', 'Planillas'))).toBeInTheDocument()
    const [copia] = REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')
    expect(copia.clave).not.toBe('supervisor')
    expect(copia.configuracion.operaciones).toEqual(DATOS_ASISTENTE_INVITACION.perfilesModulos.Planillas.supervisor)
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe('Supervisor de turno')
    expect(opcionesDeRol(dialogo, 'Planillas')).toContain('Supervisor')
  })

  it('eliminar solo se ofrece para roles de la empresa, pide confirmación, retira el rol y conserva los permisos de la asignación', () => {
    const dialogo = abrirPasoDos()
    registrarRol(dialogo, 'Planillas', NOMBRE)
    expandir('Empleados')
    expect(casilla(dialogo, 'Exportar', 'Empleados').checked).toBe(true)
    const admin = abrirAdministracion(dialogo, 'Planillas')
    expect(admin.queryByRole('button', { name: dialogosRol.acciones.eliminar.replace(':rol', 'Supervisor') })).toBeNull()
    accionDeRol(admin, NOMBRE, 'eliminar')
    const confirmacion = within(screen.getByRole('dialog', { name: dialogosRol.eliminar_titulo }))
    expect(confirmacion.getByText(dialogosRol.eliminar_pregunta.replace(':rol', NOMBRE))).toBeInTheDocument()
    fireEvent.click(confirmacion.getByRole('button', { name: dialogosRol.cancelar }))
    expect(REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')).toHaveLength(1)

    accionDeRol(admin, NOMBRE, 'eliminar')
    fireEvent.click(within(screen.getByRole('dialog', { name: dialogosRol.eliminar_titulo })).getByRole('button', { name: dialogosRol.eliminar_confirmar }))
    expect(screen.getByText(avisos.eliminado.replace(':modulo', 'Planillas'))).toBeInTheDocument()
    expect(REPOSITORIO_ROLES_MODULO.listar(ambito, 'Planillas')).toHaveLength(0)
    expect(admin.queryByText(NOMBRE)).toBeNull()
    fireEvent.click(admin.getAllByRole('button', { name: dialogosRol.cerrar }).at(-1) as HTMLElement)
    expect(opcionesDeRol(dialogo, 'Planillas')).not.toContain(NOMBRE)
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(dialogosRol.sin_rol)
    expect(casilla(dialogo, 'Exportar', 'Empleados').checked).toBe(true)
  })
})

describe('Invitar colaborador: selector de rol', { timeout: 40000 }, () => {
  beforeEach(() => reiniciarRolesDemostracion())

  it('los controles comparten altura: «Crear rol» y el botón ⋮ usan la altura de control, y el valor usa el rol tipográfico de formulario', () => {
    const dialogo = abrirPasoDos()
    const kebab = dialogo.getByRole('button', { name: dialogosRol.menu_rol })
    const crear = dialogo.getByRole('button', { name: textosPermisos.crear_rol })
    expect(kebab).toHaveClass('h-control', 'aspect-square')
    expect(crear).toHaveClass('min-h-control')
    for (const clase of clasesPermisos.nivel_crear.split(' ')) expect(crear).toHaveClass(clase)
    const titulo = dialogo.getByRole('heading', { name: textosPermisos.rol_titulo })
    expect(titulo.parentElement).toContainElement(dialogo.getByText(textosPermisos.rol_subtitulo))
    expect(selectorRol(dialogo, 'Planillas').closest(`.${clasesPermisos.nivel_selector.split(' ')[0]}`)).not.toBeNull()
  })
})
