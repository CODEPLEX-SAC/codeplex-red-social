import dayjs from 'dayjs'
import {
  aplicarBorrador,
  borradorValido,
  crearBorrador,
  fechaDeTexto,
  fechaValida,
  formatearFecha,
  reemplazarColaborador,
} from '@/componentes/colaboradores/bloques/logica_colaboradores'
import { crearInvitado, existeCorreo, registrarBaja, reenviarInvitacion } from '@/componentes/colaboradores/bloques/reglas_estado_colaboradores'
import { ordenPorOpcion } from '@/componentes/colaboradores/bloques/colaboradores_tabla_config'
import { COLABORADORES, APLICACIONES_DISPONIBLES } from '@/servicios/colaboradores/colaboradores'
import { DATOS_ASISTENTE_INVITACION } from '@/servicios/colaboradores/asistente_invitacion'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const [carlos, maria, , ana, , rosa] = COLABORADORES
const DATOS_INVITADO = {
  nombres: 'Lucia',
  apellidos: 'Paredes',
  correo: 'lucia.paredes@correo.pe',
  telefono: '999 111 222',
  tipo_documento: 'DNI',
  documento_numero: '12345678',
  cargo: 'Analista',
  empresa: 'AI Robotics Peru SAC',
  area: 'Ventas',
}

describe('fechas de colaboradores', () => {
  it('interpreta DD/MM/AAAA con el dia primero', () => {
    const fecha = new Date(fechaDeTexto('13/08/2026'))
    expect([fecha.getFullYear(), fecha.getMonth(), fecha.getDate()]).toEqual([2026, 7, 13])
    expect(new Date(fechaDeTexto('01/06/2026')).getMonth()).toBe(5)
  })

  it('valida solo fechas completas y existentes', () => {
    expect(fechaValida('29/02/2028')).toBe(true)
    expect(fechaValida('29/02/2027')).toBe(false)
    expect(fechaValida('31/04/2026')).toBe(false)
    expect(fechaValida('1/6/2026')).toBe(false)
    expect(fechaValida('')).toBe(false)
  })

  it('formatea con el formato del catalogo', () => {
    expect(formatearFecha(fechaDeTexto('05/03/2026'))).toBe('05/03/2026')
  })

  it('ordena por vigencia con la fecha correcta: mas recientes primero', () => {
    const ordenado = [...COLABORADORES].sort((a, b) => {
      const inicio = (c: (typeof COLABORADORES)[number]) => fechaDeTexto(c.vigencia.tipo === 'rango' ? c.vigencia.desde : c.vigencia.fecha)
      return inicio(b) - inicio(a)
    })
    expect(ordenado[0].nombre).toBe(carlos.nombre)
    expect(ordenPorOpcion(catalogoColaboradores.selectores.ordenar_por.opciones[0])).toEqual([{ id: 'vigencia', desc: true }])
  })
})

describe('baja de un colaborador', () => {
  it('cambia el estado a baja y registra la fecha, sin tocar al resto', () => {
    const actualizado = registrarBaja(maria, '28/09/2026')
    expect(actualizado.estado).toBe('baja')
    expect(actualizado.acciones).toBe('menu')
    expect(actualizado.vigencia).toEqual({ tipo: 'simple', etiqueta: catalogoColaboradores.celda_vigencia.etiqueta_baja, fecha: '28/09/2026' })
    expect(actualizado.nombre).toBe(maria.nombre)
    expect(maria.estado).toBe('activo')
  })

  it('reemplaza solo al colaborador indicado por su correo', () => {
    const actualizado = registrarBaja(maria, '28/09/2026')
    const lista = reemplazarColaborador(COLABORADORES, maria, actualizado)
    expect(lista).toHaveLength(COLABORADORES.length)
    expect(lista.filter((c) => c.estado === 'baja').map((c) => c.nombre)).toEqual([maria.nombre, rosa.nombre])
  })
})

describe('edicion de un colaborador', () => {
  it('el borrador parte de los datos actuales', () => {
    expect(crearBorrador(carlos)).toEqual({
      nombre: carlos.nombre,
      correo: carlos.correo,
      telefono: carlos.telefono,
      rol: 'Administrador',
      fechaInicio: '01/06/2026',
      fechaFin: '01/06/2027',
      aplicaciones: ['Planillas', 'Contabilidad', 'Inventario', 'Ventas', 'Compras', 'Proyectos', 'Reportes', 'Configuración'],
      estado: 'activo',
    })
  })

  it('al cambiar datos, rol, aplicaciones y estado actualiza el registro completo', () => {
    const borrador = { ...crearBorrador(maria), nombre: ' Maria Lopez Diaz ', rol: 'Vendedor', aplicaciones: ['Reportes', 'Planillas'], estado: 'inactivo' as const, fechaFin: '15/05/2028' }
    const actualizado = aplicarBorrador(maria, borrador, COLABORADORES, APLICACIONES_DISPONIBLES)
    expect(actualizado.nombre).toBe('Maria Lopez Diaz')
    expect(actualizado.rol).toBe('Vendedor')
    expect(actualizado.rolClase).toBe('vendedor')
    expect(actualizado.descripcionRol).toBe('Ventas')
    expect(actualizado.aplicaciones.map((a) => a.nombre)).toEqual(['Planillas', 'Reportes'])
    expect(actualizado.estado).toBe('inactivo')
    expect(actualizado.vigencia).toEqual({ tipo: 'rango', desde: '15/05/2026', hasta: '15/05/2028' })
  })

  it('un rol que ya nadie usa recibe el estilo predeterminado y conserva la descripcion', () => {
    const actualizado = aplicarBorrador(maria, { ...crearBorrador(maria), rol: 'Gerente' }, COLABORADORES, APLICACIONES_DISPONIBLES)
    expect(actualizado.rolClase).toBe('predeterminado')
    expect(actualizado.descripcionRol).toBe(maria.descripcionRol)
  })

  it('si no cambian las aplicaciones conserva las originales', () => {
    const actualizado = aplicarBorrador(carlos, crearBorrador(carlos), COLABORADORES, APLICACIONES_DISPONIBLES)
    expect(actualizado.aplicaciones).toEqual(carlos.aplicaciones)
  })

  it('pasar a invitado habilita Reenviar y salir de invitado vuelve al menu', () => {
    expect(aplicarBorrador(maria, { ...crearBorrador(maria), estado: 'invitado' }, COLABORADORES, APLICACIONES_DISPONIBLES).acciones).toBe('reenviar')
    expect(aplicarBorrador(ana, { ...crearBorrador(ana), estado: 'activo' }, COLABORADORES, APLICACIONES_DISPONIBLES).acciones).toBe('menu')
  })

  it('una vigencia simple se mantiene simple mientras no se indique fecha de fin', () => {
    const actualizado = aplicarBorrador(rosa, { ...crearBorrador(rosa), fechaInicio: '10/05/2026' }, COLABORADORES, APLICACIONES_DISPONIBLES)
    expect(actualizado.vigencia).toEqual({ tipo: 'simple', etiqueta: catalogoColaboradores.celda_vigencia.etiqueta_baja, fecha: '10/05/2026' })
  })

  it('valida nombre, correo, fechas y correo repetido', () => {
    const base = crearBorrador(maria)
    expect(borradorValido(maria, base, COLABORADORES)).toBe(true)
    expect(borradorValido(maria, { ...base, nombre: '  ' }, COLABORADORES)).toBe(false)
    expect(borradorValido(maria, { ...base, correo: '' }, COLABORADORES)).toBe(false)
    expect(borradorValido(maria, { ...base, correo: carlos.correo.toUpperCase() }, COLABORADORES)).toBe(false)
    expect(borradorValido(maria, { ...base, fechaInicio: '31/02/2026' }, COLABORADORES)).toBe(false)
    expect(borradorValido(maria, { ...base, fechaFin: '01/01/2026' }, COLABORADORES)).toBe(false)
    expect(borradorValido(maria, { ...base, fechaFin: '' }, COLABORADORES)).toBe(false)
    expect(borradorValido(rosa, { ...crearBorrador(rosa), fechaFin: '' }, COLABORADORES)).toBe(true)
  })
})

describe('invitaciones', () => {
  const hoy = fechaDeTexto('14/10/2026')

  it('reenviar actualiza la fecha de invitacion y conserva la etiqueta', () => {
    const reenviado = reenviarInvitacion(ana, hoy)
    expect(reenviado.fechaInvitacion).toBe('14/10/2026')
    expect(reenviado.vigencia).toEqual({ tipo: 'simple', etiqueta: catalogoColaboradores.celda_vigencia.etiqueta_invitacion, fecha: '14/10/2026' })
    expect(reenviado.estado).toBe('invitado')
    expect(ana.vigencia).toMatchObject({ fecha: '20/05/2026' })
  })

  it('crea el colaborador invitado con los datos del asistente', () => {
    const invitado = crearInvitado(DATOS_INVITADO, DATOS_ASISTENTE_INVITACION, hoy)
    expect(invitado).toMatchObject({
      nombre: 'Lucia Paredes',
      correo: 'lucia.paredes@correo.pe',
      telefono: '999 111 222',
      rol: DATOS_ASISTENTE_INVITACION.resumenRol.rolAsignado,
      estado: 'invitado',
      acciones: 'reenviar',
      fechaInvitacion: '14/10/2026',
    })
    expect(invitado.vigencia).toEqual({ tipo: 'simple', etiqueta: catalogoColaboradores.celda_vigencia.etiqueta_invitacion, fecha: '14/10/2026' })
  })

  it('detecta correos ya registrados sin distinguir mayusculas', () => {
    expect(existeCorreo(COLABORADORES, ` ${carlos.correo.toUpperCase()} `)).toBe(true)
    expect(existeCorreo(COLABORADORES, DATOS_INVITADO.correo)).toBe(false)
  })

  it('formatea con dayjs la misma fecha que usa el catalogo', () => {
    expect(formatearFecha(hoy)).toBe(dayjs(hoy).format('DD/MM/YYYY'))
  })
})
