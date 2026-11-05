import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SeccionHistoriasInicio, ModalCrearHistoria, usarHistoriasInicio } from '@/componentes/inicio'
import { ALMACEN_HISTORIAS, HISTORIAS, HISTORIAS_CONTACTOS } from '../../rutas/inicio/rutas_inicio'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

const flujo = catalogoInicio.historias.flujo
const editor = flujo.editor
const lienzo = catalogoInicio.historias.etiqueta_lienzo

function montarModal() {
  const alPublicar = vi.fn()
  const alCerrar = vi.fn()
  render(<ModalCrearHistoria onPublicar={alPublicar} onCerrar={alCerrar} />)
  return { alPublicar, alCerrar }
}

function elegirTipo(etiqueta: string) {
  fireEvent.click(screen.getByRole('button', { name: etiqueta }))
  fireEvent.click(screen.getByRole('button', { name: flujo.crear.continuar }))
}

function usuarioNombre() {
  return 'Pedro Lozano'
}

function SeccionConectada() {
  const { publicadas, deContactos, publicar, acciones } = usarHistoriasInicio(ALMACEN_HISTORIAS, HISTORIAS_CONTACTOS)
  return <SeccionHistoriasInicio historias={HISTORIAS} publicadas={publicadas} deContactos={deContactos} acciones={acciones} onPublicar={publicar} />
}

describe('Flujo de creacion de historias', () => {
  it('empieza con las dos opciones, sin lienzo ni vista previa, y Continuar deshabilitado', () => {
    montarModal()
    expect(screen.getByRole('dialog', { name: flujo.crear.titulo })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: flujo.crear.continuar })).toBeDisabled()
    expect(screen.queryByRole('group', { name: lienzo })).toBeNull()
    expect(screen.getByRole('button', { name: flujo.crear.tipos[0].etiqueta })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: flujo.crear.tipos[1].etiqueta })).toBeInTheDocument()
  })

  it('texto: edita mensaje, estilo y fondo en el lienzo compartido y publica el borrador', () => {
    const { alPublicar, alCerrar } = montarModal()
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    expect(screen.getByRole('button', { name: editor.vista_previa })).toBeDisabled()

    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Buen dia' } })
    expect(within(screen.getByRole('group', { name: lienzo })).getByRole('textbox', { name: editor.mensaje_etiqueta })).toHaveValue('Buen dia')
    expect(screen.queryByRole('tab', { name: 'Superpuesto' })).toBeNull()
    expect(screen.getAllByRole('tab', { name: new RegExp(`^(${editor.herramientas_texto.map((x) => x.etiqueta).join('|')})$`) })).toHaveLength(2)

    fireEvent.click(screen.getByRole('button', { name: catalogoInicio.historias.estilos_texto[1].etiqueta }))
    fireEvent.click(screen.getByRole('tab', { name: editor.herramientas_texto[1].etiqueta }))
    fireEvent.click(screen.getByRole('tab', { name: catalogoInicio.historias.tipos_fondo[0].etiqueta }))
    fireEvent.click(screen.getByRole('button', { name: editor.muestra_fondo.replace(':nombre', 'Azul') }))
    expect(screen.getByRole('button', { name: editor.muestra_fondo.replace(':nombre', 'Azul') })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('group', { name: lienzo })).toHaveClass('bg-azul-categoria')

    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    expect(screen.getByRole('dialog', { name: flujo.vista_previa.titulo })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.volver_a_editar }))
    expect(screen.getByRole('textbox', { name: editor.mensaje_etiqueta })).toHaveValue('Buen dia')
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))

    expect(alPublicar).toHaveBeenCalledWith(expect.objectContaining({ tipo: 'texto', texto: 'Buen dia', fondoId: 'solido-azul', estiloTextoId: 'titular' }))
    expect(alCerrar).toHaveBeenCalled()
  })

  it('multimedia: agrega, modifica y mueve un texto superpuesto desde la herramienta Texto', async () => {
    URL.createObjectURL = vi.fn(() => 'blob:historia-elementos')
    URL.revokeObjectURL = vi.fn()
    const { alPublicar } = montarModal()
    elegirTipo(flujo.crear.tipos[0].etiqueta)
    fireEvent.change(document.querySelector('input[type="file"]') as HTMLInputElement, { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })
    await waitFor(() => expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument())
    fireEvent.click(screen.getByRole('tab', { name: editor.herramientas_media[1].etiqueta }))
    fireEvent.change(screen.getByRole('textbox', { name: editor.elemento_etiqueta }), { target: { value: 'Etiqueta' } })
    fireEvent.click(screen.getByRole('button', { name: editor.elemento_agregar }))
    fireEvent.change(screen.getByRole('textbox', { name: editor.elemento_modificar.replace(':numero', '1') }), { target: { value: 'Etiqueta nueva' } })
    fireEvent.click(screen.getByRole('button', { name: `${editor.etiqueta_posiciones.replace(':contenido', 'Etiqueta nueva')} ${editor.posiciones[2].etiqueta}` }))
    expect(within(screen.getByRole('group', { name: lienzo })).getByText('Etiqueta nueva')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    expect(alPublicar).toHaveBeenCalledWith(expect.objectContaining({ elementos: [expect.objectContaining({ contenido: 'Etiqueta nueva', posicionId: 'inferior' })] }))
  })

  it('volver al selector conserva el contenido y descartar pide confirmacion', () => {
    const { alCerrar } = montarModal()
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Borrador' } })
    fireEvent.click(screen.getByRole('button', { name: editor.volver }))
    fireEvent.click(screen.getByRole('button', { name: flujo.crear.continuar }))
    expect(screen.getByRole('textbox', { name: editor.mensaje_etiqueta })).toHaveValue('Borrador')

    fireEvent.click(screen.getByRole('button', { name: editor.descartar }))
    expect(alCerrar).not.toHaveBeenCalled()
    const confirmacion = () => within(screen.getByRole('dialog', { name: flujo.descartar.titulo }))
    fireEvent.click(confirmacion().getByRole('button', { name: flujo.descartar.cancelar }))
    expect(alCerrar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: editor.descartar }))
    fireEvent.click(confirmacion().getByRole('button', { name: flujo.descartar.confirmar }))
    expect(alCerrar).toHaveBeenCalled()
  })

  it('cancelar sin contenido cierra directamente', () => {
    const { alCerrar } = montarModal()
    fireEvent.click(screen.getByRole('button', { name: flujo.crear.cancelar }))
    expect(alCerrar).toHaveBeenCalled()
  })

  it('foto o video: no muestra lienzo hasta elegir un archivo y despues permite superponer texto', async () => {
    URL.createObjectURL = vi.fn(() => 'blob:historia-prueba')
    URL.revokeObjectURL = vi.fn()
    const { alPublicar } = montarModal()
    elegirTipo(flujo.crear.tipos[0].etiqueta)
    expect(screen.queryByRole('group', { name: lienzo })).toBeNull()
    expect(screen.getByRole('button', { name: flujo.crear.continuar })).toBeInTheDocument()

    const entrada = document.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(entrada, { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })
    await waitFor(() => expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toHaveAttribute('src', 'blob:historia-prueba'))

    fireEvent.click(screen.getByRole('tab', { name: editor.herramientas_media[1].etiqueta }))
    fireEvent.change(screen.getByRole('textbox', { name: editor.elemento_etiqueta }), { target: { value: 'Hola' } })
    fireEvent.click(screen.getByRole('button', { name: editor.elemento_agregar }))
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    expect(alPublicar).toHaveBeenCalledWith(expect.objectContaining({ tipo: 'media', medio: expect.objectContaining({ url: 'blob:historia-prueba', esVideo: false }) }))
  })

  it('el acceso Tu historia abre el flujo y la historia publicada aparece en Inicio y se abre en el visor', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Mi primera historia' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    const visor = within(screen.getByRole('dialog', { name: flujo.visor.titulo.replace(':nombre', 'Pedro Lozano') }))
    expect(visor.getByText('Mi primera historia')).toBeInTheDocument()
  })

  it('la historia propia publicada se ve en el carrusel como miniatura de su contenido', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Contenido en miniatura' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    expect(screen.getByText(usuarioNombre())).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    const boton = screen.getByRole('button', { name: flujo.etiqueta_propia })
    expect(within(boton).getByText('Contenido en miniatura')).toBeInTheDocument()
    expect(boton.querySelector('img')).toBeNull()
  })

  it('el editor limita el texto a 150 caracteres y muestra el contador', () => {
    montarModal()
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    const campo = screen.getByRole('textbox', { name: editor.mensaje_etiqueta })
    expect(campo).toHaveAttribute('maxlength', '150')
    fireEvent.change(campo, { target: { value: 'x'.repeat(200) } })
    expect(campo).toHaveValue('x'.repeat(150))
    expect(screen.getByText('150/150')).toBeInTheDocument()
  })

  it('la miniatura del carrusel muestra el comienzo del texto con puntos suspensivos mediante recorte de lineas', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Hola, me llamo Andy y este es un texto largo que continua' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    const texto = within(screen.getByRole('button', { name: flujo.etiqueta_propia })).getByText(/^Hola, me llamo Andy/)
    expect(texto).toHaveClass('line-clamp-5')
  })

  it('el acceso del carrusel dice Crear historia y la historia publicada dice Tu historia', () => {
    render(<SeccionConectada />)
    expect(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) })).toBeInTheDocument()
    expect(HISTORIAS[0].nombre).toBe(flujo.crear.titulo)
    expect(screen.queryByRole('button', { name: flujo.etiqueta_propia })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Mi dia' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    expect(screen.getByRole('button', { name: flujo.etiqueta_propia })).toBeInTheDocument()
  })

  it('foto o video abre directamente el selector de archivos del sistema, sin zona de arrastre', () => {
    montarModal()
    const entrada = document.querySelector('input[type="file"]') as HTMLInputElement
    const abrir = vi.spyOn(entrada, 'click')
    fireEvent.click(screen.getByRole('button', { name: flujo.crear.tipos[0].etiqueta }))
    fireEvent.click(screen.getByRole('button', { name: flujo.crear.continuar }))
    expect(abrir).toHaveBeenCalledTimes(1)
    expect(screen.queryByText(/arrastra/i)).toBeNull()
    fireEvent.change(entrada, { target: { files: [new File(['x'], 'doc.pdf', { type: 'application/pdf' })] } })
    expect(screen.getByRole('alert')).toHaveTextContent(flujo.cargador.error)
    expect(screen.queryByRole('group', { name: lienzo })).toBeNull()
  })

  it('en foto o video hay un regulador de tamano bajo el lienzo que ajusta la foto antes de publicar', async () => {
    URL.createObjectURL = vi.fn(() => 'blob:historia-ajuste')
    URL.revokeObjectURL = vi.fn()
    const { alPublicar } = montarModal()
    elegirTipo(flujo.crear.tipos[0].etiqueta)
    fireEvent.change(document.querySelector('input[type="file"]') as HTMLInputElement, { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })
    await waitFor(() => expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument())
    const imagen = screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)
    expect(imagen).toHaveClass('object-contain', 'scale-100')
    const regulador = screen.getByRole('slider')
    fireEvent.change(regulador, { target: { value: '4' } })
    expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toHaveClass('scale-200')
    expect(screen.getByText('200 %')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    expect(within(screen.getByRole('group', { name: lienzo })).getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toHaveClass('scale-200')
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    expect(alPublicar).toHaveBeenCalledWith(expect.objectContaining({ tipo: 'media', ajusteMedio: 4 }))
  })
})
