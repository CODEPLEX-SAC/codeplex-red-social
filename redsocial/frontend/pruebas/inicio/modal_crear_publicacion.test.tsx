import { fireEvent, render, screen, within } from '@testing-library/react'
import { BloqueFotoVideo } from '@/componentes/inicio'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import { PUBLICACION_INICIO, PUBLICACION_COMPARTIDA_INICIO } from '../../rutas/inicio/rutas_inicio'

const textos = catalogoInicio.modal_crear_publicacion
const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro')

function Historias() {
  return <div />
}

const alPublicar = vi.fn()

function montar() {
  return render(
    <BloqueFotoVideo
      placeholderPublicar={marcador}
      Historias={Historias}
      PUBLICACION_INICIO={PUBLICACION_INICIO}
      PUBLICACION_COMPARTIDA_INICIO={PUBLICACION_COMPARTIDA_INICIO}
      publicaciones={[]}
      onPublicar={alPublicar}
    />,
  )
}

function abrirModal() {
  const disparador = screen.getByRole('button', { name: marcador })
  disparador.focus()
  fireEvent.click(disparador)
  return disparador
}

function botonPublicar() {
  return screen.getByRole('button', { name: textos.publicar })
}

function editor() {
  return screen.getByRole('textbox', { name: textos.etiqueta_editor })
}

describe('ModalCrearPublicacion', () => {
  beforeEach(() => {
    alPublicar.mockClear()
    let contador = 0
    URL.createObjectURL = vi.fn(() => `blob:prueba-${(contador += 1)}`)
    URL.revokeObjectURL = vi.fn()
  })

  it('no muestra el modal hasta pulsar la barra', () => {
    montar()
    expect(screen.queryByRole('dialog')).toBeNull()
    abrirModal()
    const dialogo = screen.getByRole('dialog', { name: textos.titulo })
    expect(dialogo).toHaveAttribute('aria-modal', 'true')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('enfoca el editor al abrir y devuelve el foco al disparador al cerrar', () => {
    montar()
    const disparador = abrirModal()
    expect(editor()).toHaveFocus()
    fireEvent.keyDown(document, { key: catalogoCompartido.modal.tecla_cerrar })
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(disparador).toHaveFocus()
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('cierra con la X y al pulsar fuera del modal', () => {
    montar()
    abrirModal()
    fireEvent.click(screen.getByRole('button', { name: textos.cerrar }))
    expect(screen.queryByRole('dialog')).toBeNull()

    abrirModal()
    const dialogo = screen.getByRole('dialog')
    fireEvent.click(dialogo)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(dialogo.parentElement as HTMLElement)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('habilita Publicar solo cuando hay contenido valido', () => {
    montar()
    abrirModal()
    expect(botonPublicar()).toBeDisabled()
    fireEvent.change(editor(), { target: { value: 'Hola' } })
    expect(botonPublicar()).toBeEnabled()
    fireEvent.change(editor(), { target: { value: '   ' } })
    expect(botonPublicar()).toBeDisabled()
  })

  it('en Encuesta exige dos opciones y respeta el minimo y el maximo', () => {
    montar()
    abrirModal()
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: textos.tipos[1].etiqueta }))
    fireEvent.change(editor(), { target: { value: 'Pregunta' } })
    expect(screen.getAllByRole('textbox', { name: /Opción \d de la encuesta/ })).toHaveLength(textos.encuesta.opciones_iniciales)
    expect(botonPublicar()).toBeDisabled()

    fireEvent.change(screen.getByRole('textbox', { name: 'Opción 1 de la encuesta' }), { target: { value: 'Si' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Opción 2 de la encuesta' }), { target: { value: 'No' } })
    expect(botonPublicar()).toBeEnabled()

    expect(screen.getByRole('button', { name: 'Quitar opción 1' })).toBeDisabled()

    const agregar = textos.encuesta.agregar_opcion
    for (let i = textos.encuesta.opciones_iniciales; i < textos.encuesta.opciones_maximas; i += 1) {
      fireEvent.click(screen.getByRole('button', { name: agregar }))
    }
    expect(screen.getAllByRole('textbox', { name: /Opción \d de la encuesta/ })).toHaveLength(textos.encuesta.opciones_maximas)
    expect(screen.queryByRole('button', { name: agregar })).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Quitar opción 6' }))
    expect(screen.getAllByRole('textbox', { name: /Opción \d de la encuesta/ })).toHaveLength(textos.encuesta.opciones_maximas - 1)
  })

  it('en Pregunta permite elegir la prioridad', () => {
    montar()
    abrirModal()
    fireEvent.click(screen.getByRole('button', { name: textos.tipos[2].etiqueta }))
    const grupo = screen.getByRole('group', { name: textos.prioridad.titulo })
    const urgente = within(grupo).getByRole('button', { name: textos.prioridad.opciones[0].etiqueta })
    const normal = within(grupo).getByRole('button', { name: textos.prioridad.opciones[1].etiqueta })
    expect(normal).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(urgente)
    expect(urgente).toHaveAttribute('aria-pressed', 'true')
    expect(normal).toHaveAttribute('aria-pressed', 'false')
  })

  it('previsualiza archivos locales, permite quitarlos y libera la URL', async () => {
    montar()
    abrirModal()
    expect(screen.queryByText(/Arrastra/)).toBeNull()
    const entrada = within(screen.getByRole('dialog')).getByLabelText(textos.medios.etiqueta_selector) as HTMLInputElement
    const clicSelector = vi.spyOn(entrada, 'click')
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: textos.foto_video }))
    expect(clicSelector).toHaveBeenCalledTimes(1)
    const imagen = new File(['a'], 'foto.png', { type: 'image/png' })
    const video = new File(['b'], 'clip.mp4', { type: 'video/mp4' })
    fireEvent.change(entrada, { target: { files: [imagen, video] } })

    const lista = await screen.findByRole('list', { name: textos.medios.vista_previa })
    expect(within(lista).getAllByRole('listitem')).toHaveLength(2)
    expect(botonPublicar()).toBeEnabled()

    fireEvent.click(screen.getByRole('button', { name: 'Quitar archivo 1' }))
    expect(within(lista).getAllByRole('listitem')).toHaveLength(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:prueba-1')

    fireEvent.click(screen.getByRole('button', { name: 'Quitar archivo 1' }))
    expect(screen.queryByRole('list', { name: textos.medios.vista_previa })).toBeNull()
    expect(botonPublicar()).toBeDisabled()
  })

  it('abre directamente en Encuesta desde el boton de la barra', () => {
    montar()
    fireEvent.click(screen.getByRole('button', { name: catalogoInicio.botones.encuesta }))
    expect(within(screen.getByRole('dialog')).getByRole('button', { name: textos.tipos[1].etiqueta })).toHaveAttribute('aria-pressed', 'true')
  })

  it('rechaza archivos que no son imagen ni video, o que superan el tamano y la cantidad maximos', () => {
    montar()
    abrirModal()
    const dialogo = within(screen.getByRole('dialog'))
    const entrada = dialogo.getByLabelText(textos.medios.etiqueta_selector) as HTMLInputElement
    const pdf = new File(['x'], 'doc.pdf', { type: 'application/pdf' })
    const sinTipo = new File(['x'], 'raro', { type: '' })
    const pesado = new File(['x'], 'grande.png', { type: 'image/png' })
    Object.defineProperty(pesado, 'size', { value: textos.medios.tamano_maximo + 1 })
    fireEvent.change(entrada, { target: { files: [pdf, sinTipo, pesado] } })
    expect(screen.queryByRole('list', { name: textos.medios.vista_previa })).toBeNull()
    expect(URL.createObjectURL).not.toHaveBeenCalled()

    const validos = Array.from({ length: textos.medios.maximo_archivos + 2 }, (_, i) => new File(['x'], `f${i}.png`, { type: 'image/png' }))
    fireEvent.change(entrada, { target: { files: [pdf, ...validos] } })
    const lista = screen.getByRole('list', { name: textos.medios.vista_previa })
    expect(within(lista).getAllByRole('listitem')).toHaveLength(textos.medios.maximo_archivos)
    expect(dialogo.getByRole('button', { name: textos.foto_video })).toBeDisabled()
  })

  it('libera las URL de los medios al cerrar el modal', () => {
    montar()
    abrirModal()
    const entrada = within(screen.getByRole('dialog')).getByLabelText(textos.medios.etiqueta_selector) as HTMLInputElement
    fireEvent.change(entrada, { target: { files: [new File(['a'], 'a.png', { type: 'image/png' }), new File(['b'], 'b.mp4', { type: 'video/mp4' })] } })
    fireEvent.click(screen.getByRole('button', { name: textos.cerrar }))
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:prueba-1')
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:prueba-2')
  })

  it('entrega el tipo y el texto recortado al publicar y cierra el modal', () => {
    montar()
    abrirModal()
    fireEvent.change(editor(), { target: { value: '  Hola equipo  ' } })
    fireEvent.click(botonPublicar())
    expect(alPublicar).toHaveBeenCalledWith({ tipo: 'publicacion', texto: 'Hola equipo' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
