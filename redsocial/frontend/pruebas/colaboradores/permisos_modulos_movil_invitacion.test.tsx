import { fireEvent, screen } from '@testing-library/react'
import { DATOS_ASISTENTE_INVITACION } from '../../servicios/colaboradores/asistente_invitacion'
import { reiniciarRolesDemostracion } from '../../servicios/colaboradores/roles_modulo'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { abrirPasoDos, casilla, casillaModulo, elegirRol, expandir, restaurarMatchMedia, simularMovil, textosPermisos } from './ayudas_permisos'

const modulos = DATOS_ASISTENTE_INVITACION.modulos
const PRIMERO = modulos[0].nombre
const etiquetas = Object.fromEntries(catalogoColaboradores.perfiles_permisos.map((perfil) => [perfil.clave, perfil.etiqueta]))

function entrarAModulo(dialogo: ReturnType<typeof abrirPasoDos>, nombre: string) {
  const tarjeta = dialogo.getAllByRole('button').find((boton) => boton.textContent?.includes(nombre) && !boton.textContent.includes(textosPermisos.volver_modulos))
  fireEvent.click(tarjeta as HTMLElement)
}

function volverAModulos(dialogo: ReturnType<typeof abrirPasoDos>) {
  fireEvent.click(dialogo.getByRole('button', { name: new RegExp(textosPermisos.volver_modulos) }))
}

describe('Invitar colaborador: permisos módulo por módulo en móvil', { timeout: 30000 }, () => {
  beforeEach(() => {
    simularMovil(true)
    reiniciarRolesDemostracion()
  })
  afterEach(() => restaurarMatchMedia())

  it('muestra primero el listado de módulos con su rol y sin casillas ni matriz', () => {
    const dialogo = abrirPasoDos()
    expect(dialogo.getByText(textosPermisos.modulos_instruccion)).toBeInTheDocument()
    for (const modulo of modulos) expect(dialogo.getByText(modulo.descripcion)).toBeInTheDocument()
    expect(dialogo.queryAllByRole('checkbox')).toHaveLength(0)
    expect(dialogo.queryAllByRole('table')).toHaveLength(0)
    expect(dialogo.getByText(textosPermisos.estado_modulo_rol.replace(':rol', etiquetas.supervisor))).toBeInTheDocument()
  })

  it('al entrar a un módulo muestra el rol, «Seleccionar todos» y los recursos expandibles en una sola columna, y permite volver', () => {
    const dialogo = abrirPasoDos()
    entrarAModulo(dialogo, PRIMERO)
    expect(dialogo.getAllByRole('combobox', { name: `${textosPermisos.rol_modulo}: ${PRIMERO}` })[0]).toBeInTheDocument()
    expect(dialogo.getByRole('button', { name: textosPermisos.crear_rol })).toBeInTheDocument()
    expect(casillaModulo(dialogo)).toBeInTheDocument()
    expect(dialogo.queryByRole('table')).toBeNull()
    expect(dialogo.queryByRole('button', { name: /guardar configuración/i })).toBeNull()
    expandir('Empleados')
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(true)
    volverAModulos(dialogo)
    expect(dialogo.getByText(textosPermisos.modulos_instruccion)).toBeInTheDocument()
  })

  it('los ajustes hechos en un módulo se conservan al volver al listado, que lo indica, y no afectan a otro módulo', () => {
    const dialogo = abrirPasoDos()
    entrarAModulo(dialogo, PRIMERO)
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Eliminar', 'Empleados'))
    volverAModulos(dialogo)
    expect(dialogo.getByText(textosPermisos.estado_modulo_ajustado.replace(':rol', etiquetas.supervisor))).toBeInTheDocument()
    entrarAModulo(dialogo, 'Contabilidad')
    elegirRol(dialogo, 'Contabilidad', etiquetas.administrador)
    volverAModulos(dialogo)
    entrarAModulo(dialogo, PRIMERO)
    expandir('Empleados')
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(true)
    volverAModulos(dialogo)
    expect(screen.getAllByText(textosPermisos.estado_modulo_rol.replace(':rol', etiquetas.administrador)).length).toBe(1)
  })
})
