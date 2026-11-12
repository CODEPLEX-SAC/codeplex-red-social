import { render, screen } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { renderEmpresas } from './entorno_empresas'
import { CLASES_TABLA, claseEncabezadoTabla } from '@/componentes/compartido/clases_tabla'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'

const tokens = (clases: string) => clases.split(/\s+/).filter(Boolean)
const encabezadoBase = tokens(catalogoCompartido.tabla_datos.encabezado)

const encabezadoEsperado = [...encabezadoBase, ...tokens(catalogoCompartido.tabla_datos.relleno_encabezado)]
const CLASES_ESPERADAS = { tabla: CLASES_TABLA.tabla, contenedor: CLASES_TABLA.contenedor, fila: CLASES_TABLA.fila, encabezadosCompletos: true }

function clasesDeLaTabla() {
  const tabla = screen.getAllByRole('table')[0]
  const cabeceras = screen.getAllByRole('columnheader')
  return {
    tabla: tabla.className,
    contenedor: tabla.parentElement?.className,
    fila: screen.getAllByRole('row')[1].className,
    encabezadosCompletos: cabeceras.every((cabecera) => encabezadoEsperado.every((clase) => tokens(cabecera.className).includes(clase))),
  }
}

describe('Presentacion compartida de las tablas de datos', { timeout: 30000 }, () => {
  it('Colaboradores usa el contenedor, la tabla, los encabezados y las filas del catalogo comun', () => {
    render(<PaginaColaboradores />)
    expect(clasesDeLaTabla()).toEqual(CLASES_ESPERADAS)
  })

  it('Empresas usa las mismas clases comunes sin variante de encabezado', () => {
    renderEmpresas()
    expect(clasesDeLaTabla()).toEqual(CLASES_ESPERADAS)
  })

  it('el encabezado se compone con el relleno comun y es el mismo en ambas tablas', () => {
    expect(claseEncabezadoTabla()).toBe(`${catalogoCompartido.tabla_datos.encabezado} ${catalogoCompartido.tabla_datos.relleno_encabezado}`)
  })

  it('el separador de fila es el mismo en ambas tablas y la ultima fila no duplica el borde del contenedor', () => {
    expect(tokens(CLASES_TABLA.fila)).toEqual(expect.arrayContaining(['border-b', 'border-borde-suave', 'last:border-b-0']))
    expect(tokens(CLASES_TABLA.celda)).not.toContain('border-b')
  })
})
