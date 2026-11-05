import { fireEvent, screen } from '@testing-library/react'
import { DATOS_ASISTENTE_INVITACION } from '../../servicios/colaboradores/asistente_invitacion'
import { reiniciarRolesDemostracion } from '../../servicios/colaboradores/roles_modulo'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { abrirInvitacion, abrirPasoDos, casilla, casillaModulo, elegirRol, expandir, irAModulo, textosPermisos } from './ayudas_permisos'

const etiquetas = Object.fromEntries(catalogoColaboradores.perfiles_permisos.map((perfil) => [perfil.clave, perfil.etiqueta]))
const inicial = DATOS_ASISTENTE_INVITACION.perfilInicialModulos
const definicion = DATOS_ASISTENTE_INVITACION.perfilesModulos

function copiaDeDefiniciones() {
  return JSON.parse(JSON.stringify(definicion))
}

describe('Invitar colaborador: asignación individual aislada de la definición del rol', { timeout: 30000 }, () => {
  beforeEach(() => reiniciarRolesDemostracion())

  it('modificar permisos de Carlos en Planillas no altera la definición del rol, ni Contabilidad, ni otra invitación', () => {
    const antes = copiaDeDefiniciones()
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    expect(inicial.Planillas).toBe('supervisor')
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(false)
    fireEvent.click(casilla(dialogo, 'Eliminar', 'Empleados'))
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(true)

    expect(definicion).toEqual(antes)

    irAModulo(dialogo, 'Contabilidad')
    expandir('Asientos contables')
    expect(casilla(dialogo, 'Eliminar', 'Asientos contables').checked).toBe(false)

    fireEvent.click(screen.getByRole('button', { name: textosRedSocial.CERRAR }))
    const otra = abrirInvitacion()
    fireEvent.change(otra.getByRole('textbox', { name: catalogoColaboradores.campos_informacion.nombres }), { target: { value: 'Rosa' } })
    fireEvent.click(otra.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expandir('Empleados')
    expect(casilla(otra, 'Eliminar', 'Empleados').checked).toBe(false)
  })

  it('volver a elegir el rol recarga su definición original y descarta los ajustes del colaborador', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Eliminar', 'Empleados'))
    elegirRol(dialogo, 'Planillas', etiquetas.operador)
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(false)
    elegirRol(dialogo, 'Planillas', etiquetas.supervisor)
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(false)
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(true)
  })

  it('«Restablecer permisos» solo aparece con ajustes, está junto al encabezado de permisos y devuelve la definición del rol', () => {
    const dialogo = abrirPasoDos()
    expect(dialogo.queryByRole('button', { name: textosPermisos.restablecer_permisos })).toBeNull()
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Eliminar', 'Empleados'))
    const restablecer = dialogo.getByRole('button', { name: textosPermisos.restablecer_permisos })
    const cabecera = dialogo.getByRole('heading', { name: catalogoColaboradores.seleccion_jerarquica.permisos_de.replace(':modulo', 'Planillas') }).closest(`.${catalogoColaboradores.clases.invitar_permisos.modulo_cabecera.split(' ')[0]}`)
    expect(cabecera).toContainElement(restablecer)
    expect(dialogo.getByRole('button', { name: textosRedSocial.CANCELAR }).parentElement).not.toContainElement(restablecer)
    fireEvent.click(restablecer)
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(false)
    expect(dialogo.queryByRole('button', { name: textosPermisos.restablecer_permisos })).toBeNull()
  })

  it('el pie conserva Cancelar, Anterior y Siguiente en una sola línea sin grilla, con clases compactas solo para móvil', () => {
    const dialogo = abrirPasoDos()
    const comun = catalogoColaboradores.clases.invitar_comun
    const siguiente = dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE })
    const anterior = dialogo.getByRole('button', { name: textosPermisos.anterior })
    const cancelar = dialogo.getByRole('button', { name: textosRedSocial.CANCELAR })
    const pie = cancelar.parentElement as HTMLElement
    expect(pie).toContainElement(siguiente)
    expect(pie).toContainElement(anterior)
    expect(pie.className).not.toMatch(/grid/)
    for (const clase of comun.pie_primario.split(' ')) expect(siguiente).toHaveClass(clase)
    for (const clase of comun.pie_secundario.split(' ')) expect(anterior).toHaveClass(clase)
    for (const clase of comun.pie_cancelar.split(' ')) expect(cancelar).toHaveClass(clase)
    for (const boton of [siguiente, anterior, cancelar]) {
      expect(boton).toHaveClass('min-h-control')
      expect(boton.className).not.toMatch(/(^| )w-full( |$)/)
    }
    expect(comun.pie_primario).not.toMatch(/(^| )(min-h-|h-)/)
    expect(comun.pie_primario).toMatch(/max-600:min-h-11/)
  })

  it('el pie no lleva línea superior ni sombra y Cancelar y Anterior comparten el mismo tratamiento secundario', () => {
    const dialogo = abrirPasoDos()
    const comun = catalogoColaboradores.clases.invitar_comun
    const cancelar = dialogo.getByRole('button', { name: textosRedSocial.CANCELAR })
    const anterior = dialogo.getByRole('button', { name: textosPermisos.anterior })
    const pie = cancelar.parentElement as HTMLElement
    expect(comun.pie).not.toMatch(/border|shadow/)
    expect(pie.className).not.toMatch(/border|shadow/)
    expect(comun).not.toHaveProperty('pie_terciario')
    for (const boton of [cancelar, anterior]) {
      expect(boton).toHaveClass('border-gris-borde', 'bg-white')
      expect(boton.className).not.toMatch(/(^| )max-600:(border-transparent|bg-transparent)/)
    }
    expect(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE })).toHaveClass('bg-primario')
  })

  it('no hay un botón «Guardar configuración» aparte: la acción de avanzar es única', () => {
    const dialogo = abrirPasoDos()
    expect(dialogo.queryByRole('button', { name: /guardar configuración/i })).toBeNull()
    expect(dialogo.getAllByRole('button', { name: textosRedSocial.SIGUIENTE })).toHaveLength(1)
  })

  it('cada módulo conserva su rol, sus permisos ajustados y su expansión al cambiar de módulo y volver', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    fireEvent.click(casillaModulo(dialogo))
    irAModulo(dialogo, 'Contabilidad')
    elegirRol(dialogo, 'Contabilidad', etiquetas.administrador)
    irAModulo(dialogo, 'Planillas')
    expect(document.getElementById(`acordeon-cabecera-${catalogoColaboradores.ids_permisos.asignacion}--Empleados`)).toHaveAttribute('aria-expanded', 'true')
    expect(casilla(dialogo, 'Exportar', 'Empleados').checked).toBe(true)
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(true)
    irAModulo(dialogo, 'Contabilidad')
    expect(dialogo.getAllByRole('combobox', { name: `${textosPermisos.rol_modulo}: Contabilidad` })[0].textContent).toBe(etiquetas.administrador)
  })

  it('Anterior y Siguiente conservan lo configurado en el paso de permisos', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    fireEvent.click(casilla(dialogo, 'Eliminar', 'Empleados'))
    fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.anterior }))
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.informacion.titulo })).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expect(dialogo.getByRole('heading', { name: catalogoColaboradores.pasos_invitar.rol_permisos.titulo })).toBeInTheDocument()
    expandir('Empleados')
    expect(casilla(dialogo, 'Eliminar', 'Empleados').checked).toBe(true)
  })

  it('la lista de módulos marca el actual con fondo y línea izquierda, sin puntos verdes ni checks redundantes', () => {
    const dialogo = abrirPasoDos()
    const clases = catalogoColaboradores.clases.invitar_permisos
    const activo = dialogo.getAllByRole('button', { name: /^Planillas/ }).filter((boton) => boton.hasAttribute('aria-current'))[0]
    expect(activo).toHaveAttribute('aria-current', 'true')
    for (const clase of clases.modulo_activo.split(' ')) expect(activo).toHaveClass(clase)
    expect(activo.querySelector(`.${clases.modulo_marca.split(' ')[0]}`)).not.toBeNull()
    expect(dialogo.queryAllByRole('img')).toHaveLength(0)
    expect(activo.querySelectorAll('svg, .material-symbols-rounded')).toHaveLength(1)
    expect(activo.className).not.toMatch(/rounded|shadow|(^| )border( |$)|border-[1-9a-z]/)
  })
})
