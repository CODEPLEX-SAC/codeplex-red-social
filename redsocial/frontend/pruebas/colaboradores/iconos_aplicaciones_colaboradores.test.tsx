import { APLICACIONES_DISPONIBLES, COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import { MODULOS } from '@/servicios/colaboradores/permisos'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const alias = catalogoCompartido.iconos as Record<string, string>
const glifos = catalogoCompartido.iconos_libreria as Record<string, string>
const GLIFO_ESPERADO: Record<string, string | undefined> = {
  Planillas: 'table_chart',
  Contabilidad: 'calculate',
  Inventario: undefined,
  Ventas: 'trending_up',
  Compras: 'shopping_bag',
  Proyectos: 'work',
  Reportes: 'description',
  Configuración: 'settings',
}

function glifoDe(clave: string) {
  return glifos[alias[clave] ?? clave]
}

describe('Aplicaciones asignables y sus iconos en Colaboradores', () => {
  it('las aplicaciones asignables son los modulos del asistente de invitacion y no hay otras', () => {
    expect(APLICACIONES_DISPONIBLES.map((app) => app.nombre)).toEqual(MODULOS.map((modulo) => modulo.nombre))
    expect(APLICACIONES_DISPONIBLES.map((app) => app.icono)).toEqual(MODULOS.map((modulo) => modulo.icono))
  })

  it('ninguna aplicacion es una seccion de la plataforma que no sea un modulo asignable', () => {
    const nombres = APLICACIONES_DISPONIBLES.map((app) => app.nombre)
    for (const ajena of ['Calendario', 'Mensajes', 'Actividad', 'Marketplace', 'Estadísticas']) expect(nombres).not.toContain(ajena)
  })

  it('siete aplicaciones resuelven a un glifo oficial de la libreria y Inventario conserva su SVG propio por decision registrada', () => {
    expect(Object.fromEntries(APLICACIONES_DISPONIBLES.map((app) => [app.nombre, glifoDe(app.icono)]))).toEqual(GLIFO_ESPERADO)
    expect(catalogoCompartido.nombres_iconos).toContain(APLICACIONES_DISPONIBLES.find((app) => app.nombre === 'Inventario')?.icono)
  })

  it('cada aplicacion tiene un color propio y distinto', () => {
    const colores = APLICACIONES_DISPONIBLES.map((app) => app.clase)
    expect(new Set(colores).size).toBe(colores.length)
  })

  it('las aplicaciones asignadas a cada colaborador existen en el catalogo y coinciden en icono y color', () => {
    const asignadas = COLABORADORES.flatMap((colaborador) => colaborador.aplicaciones)
    expect(asignadas.map((app) => APLICACIONES_DISPONIBLES.find((disponible) => disponible.nombre === app.nombre))).toEqual(asignadas)
  })

  it('ningun colaborador tiene una aplicacion repetida', () => {
    for (const colaborador of COLABORADORES) {
      const nombres = colaborador.aplicaciones.map((app) => app.nombre)
      expect(new Set(nombres).size).toBe(nombres.length)
    }
  })

  it('los filtros de aplicaciones ofrecen exactamente las aplicaciones asignables', () => {
    const nombres = APLICACIONES_DISPONIBLES.map((app) => app.nombre)
    expect(catalogoColaboradores.selectores.aplicaciones.opciones.slice(1)).toEqual(nombres)
    expect(catalogoColaboradores.panel_filtros_avanzados.aplicaciones_asignadas.opciones.slice(1)).toEqual(nombres)
  })
})
