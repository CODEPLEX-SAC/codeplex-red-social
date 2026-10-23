import { render, screen } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { renderEmpresas } from './entorno_empresas'
import { CLASES_TABLA, claseEncabezadoTabla } from '@/componentes/compartido/clases_tabla'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'

const tokens = (clases: string) => clases.split(/\s+/).filter(Boolean)
const encabezadoBase = tokens(catalogoCompartido.tabla_datos.encabezado)

function verificarTabla() {
  const tabla = screen.getAllByRole('table')[0]
  expect(tabla.className).toBe(CLASES_TABLA.tabla)
  expect((tabla.parentElement as HTMLElement).className).toBe(CLASES_TABLA.contenedor)
  const cabeceras = screen.getAllByRole('columnheader')
  for (const cabecera of cabeceras) expect(tokens(cabecera.className)).toEqual(expect.arrayContaining([...encabezadoBase, ...tokens(catalogoCompartido.tabla_datos.relleno_encabezado)]))
  const fila = screen.getAllByRole('row')[1]
  expect(fila.className).toBe(CLASES_TABLA.fila)
}

describe('Presentacion compartida de las tablas de datos', { timeout: 30000 }, () => {
  it('Colaboradores usa el contenedor, la tabla, los encabezados y las filas del catalogo comun', () => {
    render(<PaginaColaboradores />)
    verificarTabla()
  })

  it('Empresas usa las mismas clases comunes sin variante de encabezado', () => {
    renderEmpresas()
    verificarTabla()
  })

  it('el encabezado se compone con el relleno comun y es el mismo en ambas tablas', () => {
    expect(claseEncabezadoTabla()).toBe(`${catalogoCompartido.tabla_datos.encabezado} ${catalogoCompartido.tabla_datos.relleno_encabezado}`)
  })

  it('el separador de fila es el mismo en ambas tablas y la ultima fila no duplica el borde del contenedor', () => {
    expect(tokens(CLASES_TABLA.fila)).toEqual(expect.arrayContaining(['border-b', 'border-borde-suave', 'last:border-b-0']))
    expect(tokens(CLASES_TABLA.celda)).not.toContain('border-b')
  })
})
