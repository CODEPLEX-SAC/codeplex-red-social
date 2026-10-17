import { render, screen } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import { CLASES_TABLA, claseEncabezadoTabla } from '@/componentes/compartido/clases_tabla'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'
import catalogoEmpresas from '@/catalogos/capacidades/redsocial/empresas.json'

const tokens = (clases: string) => clases.split(/\s+/).filter(Boolean)
const encabezadoBase = tokens(catalogoCompartido.tabla_datos.encabezado)

function verificarTabla(relleno: string) {
  const tabla = screen.getAllByRole('table')[0]
  expect(tabla.className).toBe(CLASES_TABLA.tabla)
  expect((tabla.parentElement as HTMLElement).className).toBe(CLASES_TABLA.contenedor)
  const cabeceras = screen.getAllByRole('columnheader')
  for (const cabecera of cabeceras) expect(tokens(cabecera.className)).toEqual(expect.arrayContaining([...encabezadoBase, ...tokens(relleno)]))
  const fila = screen.getAllByRole('row')[1]
  expect(fila.className).toBe(CLASES_TABLA.fila)
}

describe('Presentacion compartida de las tablas de datos', { timeout: 30000 }, () => {
  it('Colaboradores usa el contenedor, la tabla, los encabezados y las filas del catalogo comun', () => {
    render(<PaginaColaboradores />)
    verificarTabla(catalogoColaboradores.clases_tabla.relleno_encabezado)
  })

  it('Empresas usa las mismas clases comunes y conserva su relleno propio', () => {
    render(<PaginaEmpresas />)
    verificarTabla(catalogoEmpresas.clases.relleno_encabezado)
  })

  it('los encabezados se componen con el relleno indicado sin perder las clases comunes', () => {
    expect(claseEncabezadoTabla('px-2')).toBe(`${catalogoCompartido.tabla_datos.encabezado} px-2`)
  })

  it('el separador de fila es el mismo en ambas tablas y la ultima fila no duplica el borde del contenedor', () => {
    expect(tokens(CLASES_TABLA.fila)).toEqual(expect.arrayContaining(['border-b', 'border-borde-suave', 'last:border-b-0']))
    expect(tokens(catalogoEmpresas.clases.celda)).not.toContain('border-b')
  })
})
