import { fireEvent, screen, within } from '@testing-library/react'
import { DATOS_ASISTENTE_INVITACION } from '../../servicios/colaboradores/asistente_invitacion'
import { REPOSITORIO_ROLES_MODULO, reiniciarRolesDemostracion } from '../../servicios/colaboradores/roles_modulo'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { abrirInvitacion, abrirPasoDos, casilla, casillaModulo, crearRolSimple, dialogosRol, elegirRol, estadoDe, expandir, guardarYContinuar, irAModulo, opcionesDeRol, selectorRol, textosPermisos } from './ayudas_permisos'

const etiquetas = Object.fromEntries(catalogoColaboradores.perfiles_permisos.map((perfil) => [perfil.clave, perfil.etiqueta]))
const NOMBRE = 'Asistente de planillas'

function abrirCreacion(dialogo: ReturnType<typeof abrirPasoDos>) {
  fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.crear_rol }))
  return within(screen.getByRole('dialog', { name: dialogosRol.titulos.crear.replace(':modulo', 'Planillas') }))
}

describe('Invitar colaborador: roles por módulo', { timeout: 30000 }, () => {
  beforeEach(() => reiniciarRolesDemostracion())

  it('cada módulo presenta sus propios roles, tomados de sus definiciones', () => {
    const dialogo = abrirPasoDos()
    for (const modulo of ['Planillas', 'Contabilidad']) {
      irAModulo(dialogo, modulo)
      expect(opcionesDeRol(dialogo, modulo)).toEqual(Object.keys(DATOS_ASISTENTE_INVITACION.perfilesModulos[modulo]).map((clave) => etiquetas[clave]))
    }
  })

  it('el rol inicial de cada módulo sale de su configuración, no de uno global', () => {
    const dialogo = abrirPasoDos()
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(etiquetas[DATOS_ASISTENTE_INVITACION.perfilInicialModulos.Planillas])
    irAModulo(dialogo, 'Contabilidad')
    expect(selectorRol(dialogo, 'Contabilidad').textContent).toBe(etiquetas[DATOS_ASISTENTE_INVITACION.perfilInicialModulos.Contabilidad])
  })

  it('elegir un rol carga sus permisos como configuración inicial', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    expect(casilla(dialogo, 'Crear', 'Empleados').checked).toBe(false)
    elegirRol(dialogo, 'Planillas', etiquetas.administrador)
    for (const permiso of ['Ver', 'Crear', 'Modificar', 'Eliminar', 'Imprimir', 'Exportar']) expect(casilla(dialogo, permiso, 'Empleados').checked).toBe(true)
    elegirRol(dialogo, 'Planillas', etiquetas.consulta)
    expect(casilla(dialogo, 'Crear', 'Empleados').checked).toBe(false)
    expect(casilla(dialogo, 'Exportar', 'Empleados').checked).toBe(true)
  })

  it('«Crear rol» pide solo el nombre: sin recursos ni casillas, y valida nombres vacíos o repetidos', () => {
    const dialogo = abrirPasoDos()
    const modal = abrirCreacion(dialogo)
    expect(modal.queryAllByRole('checkbox')).toHaveLength(0)
    expect(modal.getByText(dialogosRol.nota_crear)).toBeInTheDocument()
    fireEvent.click(modal.getByRole('button', { name: dialogosRol.boton_guardar.crear }))
    expect(modal.getByText(dialogosRol.errores.nombre_vacio)).toBeInTheDocument()
    fireEvent.change(modal.getByRole('textbox', { name: dialogosRol.nombre_etiqueta }), { target: { value: etiquetas.supervisor.toLowerCase() } })
    fireEvent.click(modal.getByRole('button', { name: dialogosRol.boton_guardar.crear }))
    expect(modal.getByText(dialogosRol.errores.nombre_repetido)).toBeInTheDocument()
  })

  it('un rol nuevo queda seleccionado como borrador, con permisos vacíos, y solo existe en su módulo', () => {
    const dialogo = abrirPasoDos()
    crearRolSimple(dialogo, 'Planillas', NOMBRE)
    expect(screen.queryByRole('dialog', { name: dialogosRol.titulos.crear.replace(':modulo', 'Planillas') })).toBeNull()
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(dialogosRol.etiqueta_borrador.replace(':rol', NOMBRE))
    expect(estadoDe(casillaModulo(dialogo))).toBe('ninguno')
    expandir('Empleados')
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(false)
    irAModulo(dialogo, 'Contabilidad')
    expect(opcionesDeRol(dialogo, 'Contabilidad').join()).not.toContain(NOMBRE)
    irAModulo(dialogo, 'Planillas')
    expect(selectorRol(dialogo, 'Planillas').textContent).toBe(dialogosRol.etiqueta_borrador.replace(':rol', NOMBRE))
  })

  it('el rol queda como plantilla solo al guardar y continuar, y se reutiliza en una invitación posterior de su ámbito', () => {
    const dialogo = abrirPasoDos()
    crearRolSimple(dialogo, 'Planillas', NOMBRE)
    expect(REPOSITORIO_ROLES_MODULO.listar(dialogosRol.ambito_predeterminado, 'Planillas')).toHaveLength(0)
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Ver', 'Empleados'))
    guardarYContinuar(dialogo)
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.vigencia.titulo })).toBeInTheDocument()
    expect(REPOSITORIO_ROLES_MODULO.listar(dialogosRol.ambito_predeterminado, 'Planillas').map((rol) => rol.etiqueta)).toEqual([NOMBRE])
    fireEvent.click(screen.getByRole('button', { name: textosRedSocial.CERRAR }))
    const nuevo = abrirInvitacion()
    fireEvent.change(nuevo.getByRole('textbox', { name: catalogoColaboradores.campos_informacion.nombres }), { target: { value: 'Lucía' } })
    fireEvent.click(nuevo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expect(opcionesDeRol(nuevo, 'Planillas')).toContain(NOMBRE)
    elegirRol(nuevo, 'Planillas', NOMBRE)
    expandir('Empleados')
    expect(casilla(nuevo, 'Ver', 'Empleados').checked).toBe(true)
    expect(casilla(nuevo, 'Crear', 'Empleados').checked).toBe(false)
    irAModulo(nuevo, 'Contabilidad')
    expect(opcionesDeRol(nuevo, 'Contabilidad')).not.toContain(NOMBRE)
  })
})
