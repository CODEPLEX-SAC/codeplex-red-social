import dayjs from 'dayjs'
import {
  aplicarFiltrosAvanzadosColaboradores,
  contarFiltrosAvanzadosColaboradores,
  crearFiltrosAvanzadosColaboradores,
} from '@/componentes/colaboradores/bloques/logica_filtros_avanzados_colaboradores'
import { fechaDeTexto } from '@/componentes/colaboradores/bloques/logica_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const textos = catalogoColaboradores.panel_filtros_avanzados
const HOY = fechaDeTexto('14/10/2026')
const nombres = (filtros: Partial<ReturnType<typeof crearFiltrosAvanzadosColaboradores>>) =>
  aplicarFiltrosAvanzadosColaboradores(COLABORADORES, { ...crearFiltrosAvanzadosColaboradores(), ...filtros }, HOY).map((c) => c.nombre)
const [carlos, maria, jorge, ana, luis, rosa] = COLABORADORES.map((c) => c.nombre)

describe('filtros avanzados de colaboradores', () => {
  it('sin filtros devuelve a todos y cuenta cero filtros activos', () => {
    expect(nombres({})).toEqual(COLABORADORES.map((c) => c.nombre))
    expect(contarFiltrosAvanzadosColaboradores(crearFiltrosAvanzadosColaboradores())).toBe(0)
  })

  it('cuenta cada filtro modificado', () => {
    const filtros = { ...crearFiltrosAvanzadosColaboradores(), cuentaCreada: true, aplicaciones: textos.aplicaciones_asignadas.opciones[1] }
    expect(contarFiltrosAvanzadosColaboradores(filtros)).toBe(2)
  })

  it('filtra por aplicacion asignada', () => {
    expect(nombres({ aplicaciones: 'Configuración' })).toEqual([carlos])
    expect(nombres({ aplicaciones: 'Ventas' })).toEqual([carlos, maria, jorge, rosa])
    expect(nombres({ aplicaciones: 'Proyectos' })).toEqual([carlos, luis, rosa])
  })

  it('filtra por tipo de cuenta, y con ambas casillas muestra la union', () => {
    expect(nombres({ cuentaInvitada: true })).toEqual([ana])
    expect(nombres({ cuentaCreada: true })).toEqual([carlos, maria, jorge, luis, rosa])
    expect(nombres({ cuentaCreada: true, cuentaInvitada: true })).toHaveLength(COLABORADORES.length)
  })

  it('filtra por acceso vigente o vencido segun la fecha de hoy', () => {
    expect(nombres({ accesoVigente: true })).toEqual([carlos, maria, jorge])
    expect(nombres({ accesoVencido: true })).toEqual([luis, rosa])
    expect(nombres({ accesoVigente: true, accesoVencido: true })).toEqual([carlos, maria, jorge, luis, rosa])
  })

  it('un acceso activo cuyo periodo ya termino cuenta como vencido', () => {
    const despues = fechaDeTexto('02/06/2027')
    const resultado = aplicarFiltrosAvanzadosColaboradores(COLABORADORES, { ...crearFiltrosAvanzadosColaboradores(), accesoVencido: true }, despues)
    expect(resultado.map((c) => c.nombre)).toContain(carlos)
  })

  it('filtra por ultimo acceso', () => {
    expect(nombres({ ultimoAcceso: textos.ultimo_acceso.opciones[1] })).toEqual([carlos])
    expect(nombres({ ultimoAcceso: textos.ultimo_acceso.opciones[4] })).toEqual([maria, jorge, ana, luis, rosa])
  })

  it('filtra por periodo de vigencia con solapamiento', () => {
    expect(nombres({ fechaInicio: dayjs('2027-03-01') })).toEqual([carlos, maria, jorge, luis])
    expect(nombres({ fechaFin: dayjs('2026-04-30') })).toEqual([jorge, luis])
    expect(nombres({ fechaInicio: dayjs('2026-05-01'), fechaFin: dayjs('2026-05-31') })).toEqual([maria, jorge, ana, luis, rosa])
  })

  it('filtra por fecha de invitacion y excluye a quien no tiene fecha', () => {
    expect(nombres({ invitacionDesde: dayjs('2026-05-01') })).toEqual([carlos, ana])
    expect(nombres({ invitacionDesde: dayjs('2026-05-21') })).toEqual([carlos])
    expect(nombres({ invitacionHasta: dayjs('2026-05-20') })).toEqual([ana])
  })

  it('combina varios filtros', () => {
    expect(nombres({ aplicaciones: 'Ventas', cuentaCreada: true, accesoVigente: true })).toEqual([carlos, maria, jorge])
  })
})
