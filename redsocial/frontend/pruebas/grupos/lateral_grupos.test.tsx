import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDescubrir } from '@/paginas/grupos/pagina_grupos_descubrir'
import { PaginaGruposInvitaciones } from '@/paginas/grupos/pagina_grupos_invitaciones'
import { PaginaGruposMisGrupos } from '@/paginas/grupos/pagina_grupos_mis_grupos'
import { IMAGEN_VISTA_PREVIA_CREAR_GRUPO } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'

vi.setConfig({ testTimeout: 40000 })

const lateral = catalogoGrupos.lateral

describe('Grupos: columna lateral en cada pestana', () => {
  it('Tus grupos muestra informacion, actividad reciente y descubrir, y ya no tiene el enlace Ordenar', () => {
    render(<PaginaGruposMisGrupos />)
    expect(screen.getByRole('region', { name: lateral.tus_grupos.informacion.titulo })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: lateral.tus_grupos.actividad.titulo })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: lateral.tus_grupos.descubrir.boton })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ordenar' })).toBeNull()
  })

  it('Sugerencias muestra categorias que filtran, el motivo y Crear grupo', () => {
    render(<PaginaGruposInvitaciones />)
    expect(screen.getByRole('region', { name: lateral.sugerencias.motivo.titulo })).toBeInTheDocument()
    const categorias = within(screen.getByRole('region', { name: lateral.sugerencias.categorias.titulo }))
    const negocios = categorias.getByRole('button', { name: lateral.sugerencias.categorias.etiqueta.replace(':categoria', 'Negocios') })
    fireEvent.click(negocios)
    expect(negocios).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('Programación en Python')).toBeNull()
    const crear = within(screen.getByRole('region', { name: lateral.sugerencias.crear.titulo }))
    fireEvent.click(crear.getByRole('button', { name: catalogoGrupos.botones.crear_grupo }))
    expect(screen.getByRole('dialog', { name: catalogoGrupos.crear.titulo })).toBeInTheDocument()
  })

  it('Grupos que administras muestra el resumen, los pendientes y la gestion', () => {
    render(<PaginaGruposDescubrir />)
    expect(screen.getByRole('region', { name: lateral.administrados.resumen.titulo })).toBeInTheDocument()
    const pendientes = within(screen.getByRole('region', { name: lateral.administrados.pendientes.titulo }))
    for (const fila of lateral.administrados.pendientes.filas) expect(pendientes.getByText(new RegExp(fila.etiqueta))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: lateral.administrados.gestion.boton })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ordenar' })).toBeNull()
  })
})

describe('Crear grupo: ilustracion y campos', () => {
  it('usa la vista previa como ilustracion y los campos no llevan texto de ejemplo', () => {
    render(<PaginaGruposMisGrupos />)
    fireEvent.click(screen.getAllByRole('button', { name: catalogoGrupos.botones.crear_grupo })[0])
    const dialogo = within(screen.getByRole('dialog', { name: catalogoGrupos.crear.titulo }))
    expect(document.querySelector(`img[src="${IMAGEN_VISTA_PREVIA_CREAR_GRUPO}"]`)).not.toBeNull()
    expect(dialogo.getByRole('textbox', { name: catalogoGrupos.crear.nombre })).not.toHaveAttribute('placeholder')
    expect(dialogo.getByRole('textbox', { name: catalogoGrupos.crear.descripcion })).not.toHaveAttribute('placeholder')
  })
})
