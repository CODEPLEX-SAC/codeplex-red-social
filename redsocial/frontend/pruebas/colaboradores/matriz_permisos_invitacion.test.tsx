import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { DATOS_ASISTENTE_INVITACION } from '../../servicios/colaboradores/asistente_invitacion'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { abrirPasoDos, agregarPermiso, casilla, casillaModulo, casillaRecurso, dialogosRol, estadoDe, expandir, hayCasilla, idCabecera, irAModulo, seleccion, textosPermisos } from './ayudas_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const recursos = DATOS_ASISTENTE_INVITACION.recursosModulos.Planillas

describe('Invitar colaborador: permisos verticales por recurso', { timeout: 30000 }, () => {
  it('el modal es más ancho en escritorio y ocupa la pantalla en móvil, con la clase tomada del catálogo', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: catalogoColaboradores.botones.invitar_colaborador }))
    const clase = screen.getByRole('dialog', { name: catalogoColaboradores.titulos.invitar }).className
    expect(clase).toContain('max-w-280')
    expect(clase).toContain('max-600:h-full')
  })

  it('ya no existe la matriz horizontal: cada recurso es una sección expandible con su descripción', () => {
    const dialogo = abrirPasoDos()
    expect(dialogo.queryByRole('table')).toBeNull()
    expect(dialogo.queryByRole('columnheader')).toBeNull()
    for (const recurso of recursos) {
      const cabecera = document.getElementById(idCabecera(catalogoColaboradores.ids_permisos.asignacion, recurso.nombre)) as HTMLElement
      expect(cabecera).toHaveAttribute('aria-expanded', 'false')
      expect(cabecera).toHaveTextContent(recurso.descripcion)
    }
  })

  it('al expandir un recurso muestra sus operaciones disponibles en vertical, con icono y la casilla al extremo derecho', () => {
    const dialogo = abrirPasoDos()
    const empleados = recursos[0]
    expect(hayCasilla(dialogo, 'Ver', empleados.nombre)).toBe(false)
    expandir(empleados.nombre)
    const filas = catalogoColaboradores.columnas_permisos.filter((c) => empleados.operaciones.includes(c.clave as never))
    for (const columna of filas) {
      const caja = casilla(dialogo, columna.etiqueta_fila, empleados.nombre)
      const fila = caja.closest('li') as HTMLElement
      expect(within(fila).getByText(columna.etiqueta_fila)).toBeInTheDocument()
      expect(fila.querySelector('.material-symbols-rounded, svg')).not.toBeNull()
      const ultimo = fila.lastElementChild as HTMLElement
      expect(ultimo.contains(caja)).toBe(true)
      for (const clase of clases.permiso_fila.split(' ')) expect(fila).toHaveClass(clase)
      expect(fila.className).not.toMatch(/\bborder/)
    }
    expect(dialogo.getAllByRole('checkbox').length).toBeGreaterThanOrEqual(filas.length)
  })

  it('solo se listan las operaciones que el recurso admite', () => {
    const dialogo = abrirPasoDos()
    const reportes = recursos.find((recurso) => recurso.nombre === 'Reportes')!
    expandir(reportes.nombre)
    expect(hayCasilla(dialogo, 'Ver', reportes.nombre)).toBe(true)
    expect(hayCasilla(dialogo, 'Crear', reportes.nombre)).toBe(false)
    expect(hayCasilla(dialogo, 'Eliminar', reportes.nombre)).toBe(false)
  })

  it('activar y desactivar una casilla cambia solo esa operación', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(true)
    expect(casilla(dialogo, 'Crear', 'Empleados').checked).toBe(false)
    fireEvent.click(casilla(dialogo, 'Crear', 'Empleados'))
    expect(casilla(dialogo, 'Crear', 'Empleados').checked).toBe(true)
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(true)
    fireEvent.click(casilla(dialogo, 'Ver', 'Empleados'))
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(false)
  })

  it('los recursos se expanden y se contraen', () => {
    const dialogo = abrirPasoDos()
    const cabecera = expandir('Pagos')
    expect(cabecera).toHaveAttribute('aria-expanded', 'true')
    expect(hayCasilla(dialogo, 'Ver', 'Pagos')).toBe(true)
    fireEvent.click(cabecera)
    expect(cabecera).toHaveAttribute('aria-expanded', 'false')
  })

  it('«Agregar permiso» añade una fila vertical activa, sin duplicados y con validación', () => {
    const dialogo = abrirPasoDos()
    expandir('Planillas')
    const antes = dialogo.getAllByRole('checkbox').length
    const modal = agregarPermiso(dialogo, 'Planillas', 'Ver presupuesto de utilidades')
    expect(screen.queryByRole('dialog', { name: dialogosRol.titulo_agregar.replace(':recurso', 'Planillas') })).toBeNull()
    const nueva = dialogo.getByRole('checkbox', { name: textosPermisos.casilla_etiqueta.replace(':permiso', 'Ver presupuesto de utilidades').replace(':recurso', 'Planillas') }) as HTMLInputElement
    expect(nueva.checked).toBe(true)
    expect(dialogo.getAllByRole('checkbox')).toHaveLength(antes + 1)
    expect(modal).toBeDefined()

    fireEvent.click(dialogo.getByRole('button', { name: textosPermisos.agregar_permiso_recurso.replace(':recurso', 'Planillas') }))
    const segundo = within(screen.getByRole('dialog', { name: dialogosRol.titulo_agregar.replace(':recurso', 'Planillas') }))
    fireEvent.click(segundo.getByRole('button', { name: dialogosRol.agregar_confirmar }))
    expect(segundo.getByText(dialogosRol.errores.permiso_vacio)).toBeInTheDocument()
    fireEvent.change(segundo.getByRole('textbox', { name: dialogosRol.permiso_etiqueta }), { target: { value: 'ver presupuesto de utilidades' } })
    fireEvent.click(segundo.getByRole('button', { name: dialogosRol.agregar_confirmar }))
    expect(segundo.getByText(dialogosRol.errores.permiso_repetido)).toBeInTheDocument()
    fireEvent.change(segundo.getByRole('textbox', { name: dialogosRol.permiso_etiqueta }), { target: { value: 'Ver' } })
    fireEvent.click(segundo.getByRole('button', { name: dialogosRol.agregar_confirmar }))
    expect(segundo.getByText(dialogosRol.errores.permiso_repetido)).toBeInTheDocument()
  })
})

const OPERACIONES = catalogoColaboradores.columnas_permisos.filter((c) => c.clave !== 'sin-acceso')

function disponibles(recurso: (typeof recursos)[number]) {
  return OPERACIONES.filter((columna) => recurso.operaciones.includes(columna.clave as never))
}

describe('Invitar colaborador: selección jerárquica (módulo, recurso y operación)', { timeout: 30000 }, () => {
  it('el encabezado "Permisos de <módulo>" cambia con el módulo y lleva «Seleccionar todos»', () => {
    const dialogo = abrirPasoDos()
    expect(dialogo.getByRole('heading', { name: seleccion.permisos_de.replace(':modulo', 'Planillas') })).toBeInTheDocument()
    expect(casillaModulo(dialogo)).toBeInTheDocument()
    irAModulo(dialogo, 'Contabilidad')
    expect(dialogo.getByRole('heading', { name: seleccion.permisos_de.replace(':modulo', 'Contabilidad') })).toBeInTheDocument()
  })

  it('no quedan botones de marcado rápido', () => {
    const dialogo = abrirPasoDos()
    for (const etiqueta of ['Todos', 'Lectura', 'Crear y editar', 'Sin acceso']) expect(dialogo.queryByRole('button', { name: etiqueta })).toBeNull()
    expect(dialogo.queryByRole('radio')).toBeNull()
  })

  it('«Seleccionar todos» marca todas las operaciones disponibles de todos los recursos y nada no disponible; al desmarcar las quita', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(casillaModulo(dialogo))
    expect(estadoDe(casillaModulo(dialogo))).toBe('todos')
    for (const recurso of recursos) {
      expect(estadoDe(casillaRecurso(dialogo, recurso.nombre))).toBe('todos')
      expandir(recurso.nombre)
      for (const columna of OPERACIONES) {
        const disponible = recurso.operaciones.includes(columna.clave as never)
        expect(hayCasilla(dialogo, columna.etiqueta_fila, recurso.nombre)).toBe(disponible)
        if (disponible) expect(casilla(dialogo, columna.etiqueta_fila, recurso.nombre).checked).toBe(true)
      }
    }
    fireEvent.click(casillaModulo(dialogo))
    expect(estadoDe(casillaModulo(dialogo))).toBe('ninguno')
    for (const recurso of recursos) {
      expect(estadoDe(casillaRecurso(dialogo, recurso.nombre))).toBe('ninguno')
      for (const columna of disponibles(recurso)) expect(casilla(dialogo, columna.etiqueta_fila, recurso.nombre).checked).toBe(false)
    }
  })

  it('el estado del módulo es parcial con un rol que concede algunos permisos, y no altera otros módulos', () => {
    const dialogo = abrirPasoDos()
    expect(estadoDe(casillaModulo(dialogo))).toBe('parcial')
    expect(casillaModulo(dialogo)).toHaveAttribute('aria-checked', 'mixed')
    fireEvent.click(casillaModulo(dialogo))
    irAModulo(dialogo, 'Contabilidad')
    expect(estadoDe(casillaModulo(dialogo))).toBe('parcial')
    expandir('Asientos contables')
    expect(casilla(dialogo, 'Eliminar', 'Asientos contables').checked).toBe(false)
  })

  it('un módulo sin permisos aparece desmarcado y con todos aparece marcado', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(casillaModulo(dialogo))
    fireEvent.click(casillaModulo(dialogo))
    expect(estadoDe(casillaModulo(dialogo))).toBe('ninguno')
    expect(casillaModulo(dialogo)).not.toHaveAttribute('aria-checked')
    fireEvent.click(casillaModulo(dialogo))
    expect(estadoDe(casillaModulo(dialogo))).toBe('todos')
  })

  it('el checkbox del recurso marca y desmarca solo sus operaciones disponibles, sin tocar otros recursos', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(casillaModulo(dialogo))
    fireEvent.click(casillaModulo(dialogo))
    expandir('Empleados')
    expandir('Reportes')
    fireEvent.click(casillaRecurso(dialogo, 'Empleados'))
    for (const columna of disponibles(recursos[0])) expect(casilla(dialogo, columna.etiqueta_fila, 'Empleados').checked).toBe(true)
    expect(estadoDe(casillaRecurso(dialogo, 'Reportes'))).toBe('ninguno')
    expect(casilla(dialogo, 'Ver', 'Reportes').checked).toBe(false)
    expect(estadoDe(casillaModulo(dialogo))).toBe('parcial')
    fireEvent.click(casillaRecurso(dialogo, 'Empleados'))
    for (const columna of disponibles(recursos[0])) expect(casilla(dialogo, columna.etiqueta_fila, 'Empleados').checked).toBe(false)
  })

  it('un recurso con selección parcial muestra el estado intermedio y al pulsarlo se completa; al pulsar de nuevo se vacía', () => {
    const dialogo = abrirPasoDos()
    expandir('Empleados')
    expect(casilla(dialogo, 'Ver', 'Empleados').checked).toBe(true)
    const recurso = casillaRecurso(dialogo, 'Empleados')
    expect(estadoDe(recurso)).toBe('parcial')
    expect(recurso).toHaveAttribute('aria-checked', 'mixed')
    fireEvent.click(recurso)
    expect(estadoDe(recurso)).toBe('todos')
    for (const columna of disponibles(recursos[0])) expect(casilla(dialogo, columna.etiqueta_fila, 'Empleados').checked).toBe(true)
    fireEvent.click(recurso)
    expect(estadoDe(recurso)).toBe('ninguno')
  })

  it('expandir o contraer un recurso no modifica sus permisos y el checkbox es independiente de la cabecera', () => {
    const dialogo = abrirPasoDos()
    const recurso = casillaRecurso(dialogo, 'Empleados')
    const antes = estadoDe(recurso)
    const cabecera = expandir('Empleados')
    expect(estadoDe(recurso)).toBe(antes)
    expect(cabecera.contains(recurso)).toBe(false)
    fireEvent.click(cabecera)
    expect(cabecera).toHaveAttribute('aria-expanded', 'false')
    expect(estadoDe(recurso)).toBe(antes)
    expect(document.getElementById(idCabecera(catalogoColaboradores.ids_permisos.asignacion, 'Empleados'))).toBe(cabecera)
  })

  it('cada operación individual actualiza el estado del recurso y del módulo', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(casillaModulo(dialogo))
    fireEvent.click(casillaModulo(dialogo))
    expandir('Reportes')
    const reportes = disponibles(recursos.find((r) => r.nombre === 'Reportes')!)
    fireEvent.click(casilla(dialogo, reportes[0].etiqueta_fila, 'Reportes'))
    expect(estadoDe(casillaRecurso(dialogo, 'Reportes'))).toBe('parcial')
    expect(estadoDe(casillaModulo(dialogo))).toBe('parcial')
    for (const columna of reportes.slice(1)) fireEvent.click(casilla(dialogo, columna.etiqueta_fila, 'Reportes'))
    expect(estadoDe(casillaRecurso(dialogo, 'Reportes'))).toBe('todos')
    for (const columna of reportes) fireEvent.click(casilla(dialogo, columna.etiqueta_fila, 'Reportes'))
    expect(estadoDe(casillaRecurso(dialogo, 'Reportes'))).toBe('ninguno')
    expect(estadoDe(casillaModulo(dialogo))).toBe('ninguno')
  })

  it('las operaciones no disponibles no aparecen ni cuentan para el estado: un recurso con todas sus operaciones disponibles marcadas está completo', () => {
    const dialogo = abrirPasoDos()
    const configuracion = recursos.find((r) => r.nombre === 'Configuración del módulo')!
    expandir(configuracion.nombre)
    fireEvent.click(casillaRecurso(dialogo, configuracion.nombre))
    expect(estadoDe(casillaRecurso(dialogo, configuracion.nombre))).toBe('todos')
    for (const columna of OPERACIONES.filter((c) => !configuracion.operaciones.includes(c.clave as never))) {
      expect(hayCasilla(dialogo, columna.etiqueta_fila, configuracion.nombre)).toBe(false)
    }
    expect(dialogo.getAllByRole('checkbox').filter((caja) => caja.getAttribute('aria-label')?.endsWith(configuracion.nombre))).toHaveLength(disponibles(configuracion).length + 1)
  })

  it('los permisos específicos agregados forman parte de la selección del recurso y del módulo', () => {
    const dialogo = abrirPasoDos()
    fireEvent.click(casillaModulo(dialogo))
    fireEvent.click(casillaModulo(dialogo))
    expandir('Planillas')
    agregarPermiso(dialogo, 'Planillas', 'Ver costo de planillas')
    expect(estadoDe(casillaRecurso(dialogo, 'Planillas'))).toBe('parcial')
    fireEvent.click(casillaRecurso(dialogo, 'Planillas'))
    expect((dialogo.getByRole('checkbox', { name: textosPermisos.casilla_etiqueta.replace(':permiso', 'Ver costo de planillas').replace(':recurso', 'Planillas') }) as HTMLInputElement).checked).toBe(true)
    fireEvent.click(casillaRecurso(dialogo, 'Planillas'))
    expect((dialogo.getByRole('checkbox', { name: textosPermisos.casilla_etiqueta.replace(':permiso', 'Ver costo de planillas').replace(':recurso', 'Planillas') }) as HTMLInputElement).checked).toBe(false)
  })
})
