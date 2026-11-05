import { render, screen } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { interpolarPlantilla } from '@/componentes/colaboradores/bloques/colaboradores_tabla_config'

describe('Tabla de colaboradores: tamaño de página del catálogo', { timeout: 30000 }, () => {
  it('toma el tamaño de página de colaboradores.json y muestra los seis colaboradores en una sola página', () => {
    render(<PaginaColaboradores />)
    expect(catalogoColaboradores.paginacion.tamano).toBe(6)
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(6)
    expect(screen.getByText(interpolarPlantilla(catalogoColaboradores.paginacion.resumen, { desde: 1, hasta: 6, total: 6 }))).toBeInTheDocument()
  })
})
