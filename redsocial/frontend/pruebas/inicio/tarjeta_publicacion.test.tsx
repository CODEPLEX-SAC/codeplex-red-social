import { fireEvent, render, screen, within } from '@testing-library/react'
import { TarjetaPublicacion } from '@/componentes/inicio'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import type { PublicacionTextoInicio } from '@/tipos/inicio/modelo_inicio'

const modal = catalogoInicio.modal_crear_publicacion
const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro')

const base: PublicacionTextoInicio = {
  id: '1',
  nombre: 'Pedro Lozano',
  tiempo: catalogoInicio.publicacion.tiempo_ahora,
  texto: 'Primera linea\nSegunda linea',
  reacciones: 0,
  comentarios: 0,
}

function publicarDesdeModal(texto: string, tipo?: string) {
  fireEvent.click(screen.getByRole('button', { name: marcador }))
  const dialogo = within(screen.getByRole('dialog'))
  if (tipo) fireEvent.click(dialogo.getByRole('button', { name: tipo }))
  fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: texto } })
  fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))
}

describe('TarjetaPublicacion', () => {
  it('muestra autor, tiempo, texto, contadores y acciones', () => {
    render(<TarjetaPublicacion publicacion={base} />)
    expect(screen.getByText('Pedro Lozano')).toBeInTheDocument()
    expect(screen.getByText(catalogoInicio.publicacion.tiempo_ahora)).toBeInTheDocument()
    expect(screen.getByText(/Primera linea/)).toBeInTheDocument()
    expect(screen.getByText('0 reacciones')).toBeInTheDocument()
    expect(screen.getByText('0 comentarios')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: catalogoInicio.botones.mas_opciones })).toBeInTheDocument()
    for (const nombre of [catalogoInicio.botones.me_gusta, catalogoInicio.botones.comentar, catalogoInicio.botones.compartir]) {
      expect(screen.getByRole('button', { name: new RegExp(nombre) })).toBeInTheDocument()
    }
  })

  it('usa el singular cuando hay una sola reaccion o un solo comentario', () => {
    render(<TarjetaPublicacion publicacion={{ ...base, reacciones: 1, comentarios: 1 }} />)
    expect(screen.getByText('1 reacción')).toBeInTheDocument()
    expect(screen.getByText('1 comentario')).toBeInTheDocument()
  })
})

describe('Publicar desde Crear publicacion en Inicio', () => {
  it('agrega una tarjeta de texto al principio del feed', () => {
    render(<PaginaInicio />)
    publicarDesdeModal('Mi primera publicacion')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText('Mi primera publicacion')).toBeInTheDocument()
    publicarDesdeModal('Segunda')
    const articulos = screen.getAllByRole('article')
    expect(within(articulos[1]).getByText('Segunda')).toBeInTheDocument()
    expect(within(articulos[2]).getByText('Mi primera publicacion')).toBeInTheDocument()
  })

  it('no crea tarjetas para Encuesta ni para Pregunta', () => {
    render(<PaginaInicio />)
    const antes = screen.getAllByRole('article').length
    publicarDesdeModal('Pregunta de prueba', modal.tipos[2].etiqueta)
    expect(screen.getAllByRole('article')).toHaveLength(antes)
    expect(screen.queryByText('Pregunta de prueba')).toBeNull()
  })
})
