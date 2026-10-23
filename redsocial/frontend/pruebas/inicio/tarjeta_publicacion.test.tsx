import { fireEvent, render, screen, within } from '@testing-library/react'
import { TarjetaPublicacion } from '@/componentes/inicio'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import type { ComentarioPublicacion, InteraccionPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { ReaccionesPorTipo } from '@/tipos/inicio/contrato_reacciones'
import type { PublicacionTextoInicio } from '@/tipos/inicio/modelo_inicio'

const modal = catalogoInicio.modal_crear_publicacion
const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro')

const base: PublicacionTextoInicio = {
  id: '1',
  autorId: catalogoCompartido.sesion_actual.id,
  nombre: 'Pedro Lozano',
  tiempo: catalogoInicio.publicacion.tiempo_ahora,
  texto: 'Primera linea\nSegunda linea',
  tipo: 'publicacion',
  medios: [],
  opciones: [],
  miVoto: null,
  reaccionesBase: { me_gusta: 0, me_encanta: 0, asombroso: 0 },
  comentariosBase: [],
  enInicio: true,
  comentarioUtil: null,
}

function interaccion(reaccionesPorTipo: ReaccionesPorTipo = { me_gusta: 0, me_encanta: 0, asombroso: 0 }, comentarios: ComentarioPublicacion[] = []): InteraccionPublicacion {
  return { reaccion: null, reaccionesPorTipo, comentarios, onReaccionarPublicacion: vi.fn(), onComentar: vi.fn(), onResponder: vi.fn(), onEditar: vi.fn(), onEliminar: vi.fn(), onReaccionar: vi.fn(), utilidad: { habilitada: false, utilId: null, onMarcar: vi.fn() } }
}


const propiedades = { compartidos: 0, interaccion: interaccion(), onEditar: vi.fn(), onEliminar: vi.fn(), onCompartir: vi.fn(), onVotar: vi.fn() }

function publicarDesdeModal(texto: string, tipo?: string) {
  fireEvent.click(screen.getByRole('button', { name: marcador }))
  const dialogo = within(screen.getByRole('dialog'))
  if (tipo) fireEvent.click(dialogo.getByRole('button', { name: tipo }))
  fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: texto } })
  fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))
}

describe('TarjetaPublicacion', () => {
  it('muestra autor, tiempo, texto, contadores y acciones', () => {
    render(<TarjetaPublicacion publicacion={base} {...propiedades} />)
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
    render(<TarjetaPublicacion publicacion={base} {...propiedades} interaccion={interaccion({ me_gusta: 1, me_encanta: 0, asombroso: 0 }, [{ id: 'x', autorId: 'ana-garcia', autor: 'Ana García', texto: 'Hola', tiempo: 'Ahora', reaccion: null, editado: false, respuestas: [] }])} />)
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

  it('crea tarjetas tambien para Encuesta y para Pregunta', () => {
    render(<PaginaInicio />)
    const antes = screen.getAllByRole('article').length
    publicarDesdeModal('Pregunta de prueba', modal.tipos[2].etiqueta)
    expect(screen.getAllByRole('article')).toHaveLength(antes + 1)
    expect(screen.getByText('Pregunta de prueba')).toBeInTheDocument()
  })
})
