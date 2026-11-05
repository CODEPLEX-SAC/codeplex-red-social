import { render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { renderEmpresas } from './entorno_empresas'
import { CLASES_TABLA } from '@/componentes/compartido/clases_tabla'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '@/catalogos/capacidades/redsocial/empresas.json'

const tokens = (clases: string) => clases.split(/\s+/).filter(Boolean)
const objetivo = tokens(catalogoEmpresas.clases.objetivo_tactil)

describe('Responsividad de las tablas de datos', { timeout: 30000 }, () => {
  it('el contenedor con desplazamiento es el bloque contenedor de los elementos absolutos de las celdas', () => {
    const clases = tokens(catalogoCompartido.tabla_datos.contenedor)
    expect(clases).toEqual(expect.arrayContaining(['relative', 'overflow-x-auto']))
    expect(CLASES_TABLA.contenedor).toBe(catalogoCompartido.tabla_datos.contenedor)
  })

  it('Empresas y Colaboradores envuelven su tabla con ese mismo contenedor posicionado', () => {
    const empresas = renderEmpresas()
    expect(tokens((screen.getAllByRole('table')[0].parentElement as HTMLElement).className)).toContain('relative')
    empresas.unmount()
    render(<PaginaColaboradores />)
    expect(tokens((screen.getAllByRole('table')[0].parentElement as HTMLElement).className)).toContain('relative')
  })

  it('las acciones de cada fila de Empresas amplian su area tactil sin cambiar el tamano visible ni las acciones', () => {
    renderEmpresas()
    const fila = screen.getAllByRole('row')[1]
    const botones = within(fila).getAllByRole('button').filter((boton) => /^(Ver detalle|Editar|Desactivar|Activar) /.test(boton.getAttribute('aria-label') ?? ''))
    expect(botones).toHaveLength(3)
    botones.forEach((boton) => {
      expect(tokens(boton.className)).toEqual(expect.arrayContaining(objetivo))
      expect(tokens(boton.className)).toEqual(expect.arrayContaining(tokens(catalogoCompartido.boton_icono_tamanos.default.boton)))
    })
    expect(tokens(botones[0].parentElement?.className ?? '')).toContain('gap-3.5')
  })
})
