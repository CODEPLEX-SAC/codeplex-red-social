import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SeccionHistoriasInicio, usarHistoriasInicio } from '@/componentes/inicio'
import { ALMACEN_HISTORIAS, HISTORIAS, HISTORIAS_CONTACTOS } from '../../rutas/inicio/rutas_inicio'
import { reiniciarHistoriasDemostracion } from '../../servicios/inicio/almacen_historias'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

const flujo = catalogoInicio.historias.flujo
const editor = flujo.editor
const lienzo = catalogoInicio.historias.etiqueta_lienzo

function elegirTipo(etiqueta: string) {
  fireEvent.click(screen.getByRole('button', { name: etiqueta }))
  fireEvent.click(screen.getByRole('button', { name: flujo.crear.continuar }))
}

function SeccionConectada() {
  const { publicadas, deContactos, publicar, acciones } = usarHistoriasInicio(ALMACEN_HISTORIAS, HISTORIAS_CONTACTOS)
  return <SeccionHistoriasInicio historias={HISTORIAS} publicadas={publicadas} deContactos={deContactos} acciones={acciones} onPublicar={publicar} />
}

describe('Historias: contactos, respuestas y menu', () => {
  it('cada historia del carrusel abre su propio contenido (texto y multimedia) y el avatar solo identifica al autor', async () => {
    URL.createObjectURL = vi.fn(() => 'blob:historia-visor')
    URL.revokeObjectURL = vi.fn()
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Historia de texto' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))

    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[0].etiqueta)
    fireEvent.change(document.querySelector('input[type="file"]') as HTMLInputElement, { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })
    await waitFor(() => expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    const previa = within(screen.getByRole('group', { name: lienzo }))
    expect(previa.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toHaveAttribute('src', 'blob:historia-visor')
    expect(previa.queryByRole('img', { name: flujo.etiqueta_propia })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))

    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    const visor = within(screen.getByRole('dialog'))
    expect(visor.getByText('Historia de texto')).toBeInTheDocument()
    fireEvent.click(visor.getByRole('button', { name: flujo.visor.siguiente }))
    expect(visor.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toHaveAttribute('src', 'blob:historia-visor')
  })

  it('el mensaje escrito en el lienzo llega intacto al visor con su fondo', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Hola, hola, ¿cómo están todos?' } })
    fireEvent.click(screen.getByRole('tab', { name: editor.herramientas_texto[1].etiqueta }))
    fireEvent.click(screen.getByRole('tab', { name: catalogoInicio.historias.tipos_fondo[1].etiqueta }))
    fireEvent.click(screen.getByRole('button', { name: editor.muestra_fondo.replace(':nombre', 'Nocturno') }))
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    expect(within(screen.getByRole('group', { name: lienzo })).getByText('Hola, hola, ¿cómo están todos?')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))

    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    const historia = screen.getByRole('group', { name: lienzo })
    expect(within(historia).getByText('Hola, hola, ¿cómo están todos?')).toBeInTheDocument()
    expect(historia).toHaveClass('degradado-nocturno')
    expect(screen.queryByRole('form')).toBeNull()
  })

  it('las historias de los contactos con contenido se abren y se navegan; los que no tienen no son botones', () => {
    render(<SeccionConectada />)
    const maria = HISTORIAS_CONTACTOS.filter((historia) => historia.autorId === 'maria-fernandez')
    expect(maria).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const visor = within(screen.getByRole('dialog'))
    expect(visor.getByText(maria[0].borrador.texto)).toBeInTheDocument()
    expect(visor.getByRole('list', { name: flujo.visor.etiqueta_progreso }).children).toHaveLength(2)
    fireEvent.click(visor.getByRole('button', { name: flujo.visor.siguiente }))
    expect(visor.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument()
    expect(visor.getByText('Av. Central')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Grupo Ing.' })).toBeNull()
  })

  it('responder y reaccionar a la historia de un contacto queda asociado a esa historia y a su autor', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Luis R.' }))
    const visor = within(screen.getByRole('dialog'))
    expect(visor.getByRole('button', { name: flujo.visor.enviar })).toBeDisabled()
    fireEvent.change(visor.getByRole('textbox', { name: flujo.visor.responder_etiqueta.replace(':nombre', 'Luis Rodríguez') }), { target: { value: 'Excelente día' } })
    fireEvent.click(visor.getByRole('button', { name: flujo.visor.enviar }))
    expect(visor.getByRole('status')).toHaveTextContent(flujo.visor.respuesta_enviada.replace(':nombre', 'Luis Rodríguez'))
    expect(ALMACEN_HISTORIAS.leer().respuestas).toEqual([expect.objectContaining({ historiaId: 'contacto-luis-1', destinatarioId: 'luis-rodriguez', texto: 'Excelente día' })])

    const reaccion = visor.getByRole('button', { name: flujo.visor.reaccionar.replace(':reaccion', catalogoInicio.reacciones.opciones[1].etiqueta) })
    fireEvent.click(reaccion)
    expect(reaccion).toHaveAttribute('aria-pressed', 'true')
    expect(ALMACEN_HISTORIAS.leer().reacciones).toEqual({ 'contacto-luis-1': 'me_encanta' })
  })

  it('en el visor de una historia propia no se ofrece responder', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Mia' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    expect(within(screen.getByRole('dialog')).queryByRole('button', { name: flujo.visor.enviar })).toBeNull()
  })

  it('la historia propia tiene un menu de tres puntos con Copiar enlace y Eliminar, con confirmacion', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[1].etiqueta)
    fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: 'Para borrar' } })
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: flujo.visor.opciones }))
    const opciones = screen.getAllByRole('menuitem')
    expect(opciones).toHaveLength(2)
    expect(opciones[0]).toHaveTextContent(flujo.visor.menu[0].etiqueta)
    expect(opciones[1]).toHaveTextContent(flujo.visor.menu[1].etiqueta)
    fireEvent.click(opciones[1])
    fireEvent.click(within(screen.getByRole('dialog', { name: flujo.eliminar.titulo })).getByRole('button', { name: flujo.eliminar.confirmar }))
    expect(ALMACEN_HISTORIAS.leer().historias).toEqual([])
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByRole('button', { name: flujo.etiqueta_propia })).toBeNull()
  })

  it('en la historia de un contacto no aparece el menu de eliminar', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    expect(within(screen.getByRole('dialog')).queryByRole('button', { name: flujo.visor.opciones })).toBeNull()
  })

  it('copiar el enlace usa el portapapeles y la historia con foto ofrece Eliminar foto', async () => {
    URL.createObjectURL = vi.fn(() => 'blob:historia-menu')
    URL.revokeObjectURL = vi.fn()
    const escribir = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: escribir }, configurable: true })
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
    elegirTipo(flujo.crear.tipos[0].etiqueta)
    fireEvent.change(document.querySelector('input[type="file"]') as HTMLInputElement, { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })
    await waitFor(() => expect(screen.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
    fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: flujo.visor.opciones }))
    expect(screen.getByRole('menuitem', { name: flujo.visor.eliminar_foto })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: flujo.visor.menu[0].etiqueta }))
    await waitFor(() => expect(escribir).toHaveBeenCalledWith(expect.stringContaining('?historia=historia-1')))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(flujo.visor.enlace_copiado))
  })

  it('los contactos muestran en el carrusel la miniatura de su historia y no su foto de perfil', () => {
    render(<SeccionConectada />)
    const maria = screen.getByRole('button', { name: 'Maria F.' })
    expect(within(maria).getByText(HISTORIAS_CONTACTOS[0].borrador.texto)).toBeInTheDocument()
    expect(maria.querySelector('img')).toBeNull()
    for (const autor of ['maria-fernandez', 'luis-rodriguez', 'carmen-lopez', 'diego-mendoza', 'ana-garcia']) {
      const suyas = HISTORIAS_CONTACTOS.filter((historia) => historia.autorId === autor)
      expect(suyas.map((historia) => historia.borrador.tipo).sort()).toEqual(['media', 'texto'])
    }
  })

  it('Pedro tiene por defecto una historia de texto y otra con foto y texto, tambien al recargar', () => {
    ALMACEN_HISTORIAS.modificar(() => ({ historias: [], respuestas: [], reacciones: {}, secuencia: 0 }))
    reiniciarHistoriasDemostracion()
    render(<SeccionConectada />)
    expect(screen.getAllByRole('button', { name: flujo.etiqueta_propia })).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    const visor = within(screen.getByRole('dialog'))
    expect(visor.getByRole('list', { name: flujo.visor.etiqueta_progreso }).children).toHaveLength(2)
    expect(visor.getByText('Buenos días, equipo. Hoy cerramos el trimestre con buenos resultados.')).toBeInTheDocument()
    fireEvent.click(visor.getByRole('button', { name: flujo.visor.siguiente }))
    expect(visor.getByAltText(catalogoInicio.historias.texto_alternativo_medio)).toBeInTheDocument()
    expect(visor.getByText('Visita de obra')).toBeInTheDocument()
  })
})
