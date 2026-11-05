import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { duracionLegible, tipoDeArchivo } from '@/componentes/mensajeria'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

const textos = catalogoMensajeria.conversacion
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))
const ultimo = (id: string) => ALMACEN_MENSAJERIA.leer().hilos[id]?.at(-1)
const elegir = (selector: string, archivo: File) => fireEvent.change(panel().querySelector(selector) as HTMLInputElement, { target: { files: [archivo] } })
const archivo = (nombre: string, tipo: string) => new File([new Uint8Array(10)], nombre, { type: tipo })

describe('Tipos de adjunto', () => {
  beforeEach(() => {
    URL.createObjectURL = () => 'blob:demo'
  })

  it('clasifica por tipo MIME y da el reloj del audio', () => {
    expect(tipoDeArchivo({ type: 'image/png' })).toBe('imagen')
    expect(tipoDeArchivo({ type: 'audio/webm' })).toBe('audio')
    expect(tipoDeArchivo({ type: 'application/pdf' })).toBe('documento')
    expect(duracionLegible(0)).toBe('0:00')
    expect(duracionLegible(65)).toBe('1:05')
  })

  it('una imagen se envía como miniatura que se amplía y no como tarjeta de documento', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('[data-entrada-archivos]', archivo('foto.png', 'image/png'))
    expect(ultimo('conversacion-002')?.adjunto).toMatchObject({ tipo: 'imagen', url: 'blob:demo' })
    const miniatura = within(panel()).getByRole('button', { name: /Ver imagen: foto\.png/ })
    expect(within(miniatura).getByRole('img')).toHaveAttribute('src', 'blob:demo')
    fireEvent.click(miniatura)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('un archivo de audio se envía con reproductor y un documento con tarjeta', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('[data-entrada-documentos]', archivo('nota.mp3', 'audio/mpeg'))
    expect(within(panel()).getByRole('button', { name: textos.adjuntos.etiquetas.reproducir })).toBeInTheDocument()
    elegir('[data-entrada-documentos]', archivo('contrato.pdf', 'application/pdf'))
    expect(within(panel()).getByText('contrato.pdf')).toBeInTheDocument()
  })

  it('reenviar una imagen conserva su tipo y su miniatura en la otra conversación', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('[data-entrada-archivos]', archivo('foto.png', 'image/png'))
    fireEvent.click(within(panel()).getAllByRole('button', { name: textos.opciones_mensaje }).at(-1) as HTMLElement)
    fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(textos.acciones.reenviar) }))
    const dialogo = within(screen.getByRole('dialog'))
    fireEvent.click(dialogo.getByRole('button', { name: textos.reenviar_modal.enviar_a.replace(':nombre', 'Carmen López') }))
    const reenviado = ALMACEN_MENSAJERIA.leer().hilos['conversacion-004']?.at(-1)
    expect(reenviado?.reenviado).toBe(true)
    expect(reenviado?.adjunto).toMatchObject({ tipo: 'imagen', url: 'blob:demo' })
  })
})

describe('Grabación de mensaje de voz', () => {
  const pista = { stop: vi.fn() }
  beforeEach(() => {
    URL.createObjectURL = () => 'blob:voz'
    vi.useFakeTimers({ shouldAdvanceTime: true })
    class GrabadorFalso {
      stream = { getTracks: () => [pista] }
      ondataavailable: ((evento: { data: Blob }) => void) | null = null
      onstop: (() => void) | null = null
      start() {}
      stop() {
        this.ondataavailable?.({ data: new Blob([new Uint8Array(1024)]) })
        this.onstop?.()
      }
    }
    vi.stubGlobal('MediaRecorder', GrabadorFalso)
    Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: async () => ({}) } })
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  const grabar = async () => {
    await act(async () => {
      fireEvent.click(within(panel()).getByRole('button', { name: textos.grabar_audio }))
    })
  }

  it('al activar el micrófono aparece la barra de grabación con temporizador y se puede cancelar', async () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    await grabar()
    expect(within(panel()).getByRole('status', { name: textos.grabacion.grabando })).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(within(panel()).getByRole('status')).toHaveTextContent('0:03')
    fireEvent.click(within(panel()).getByRole('button', { name: textos.grabacion.cancelar }))
    expect(within(panel()).queryByRole('status')).toBeNull()
    expect(pista.stop).toHaveBeenCalled()
    expect(ultimo('conversacion-002')?.adjunto).toBeUndefined()
  })

  it('al enviar se agrega un mensaje de voz con su duración y reproductor', async () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    await grabar()
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    await act(async () => {
      fireEvent.click(within(panel()).getByRole('button', { name: textos.grabacion.detener }))
    })
    expect(ultimo('conversacion-002')?.adjunto).toBeUndefined()
    expect(within(panel()).queryByRole('status')).toBeNull()
    expect(within(panel()).getByRole('group', { name: textos.grabacion.vista_previa })).toBeInTheDocument()
    expect(within(panel()).getByText('0:05')).toBeInTheDocument()
    fireEvent.click(within(panel()).getByRole('button', { name: textos.grabacion.enviar }))
    expect(ultimo('conversacion-002')?.adjunto).toMatchObject({ tipo: 'audio', url: 'blob:voz', duracion: 5 })
    expect(within(panel()).queryByRole('group', { name: textos.grabacion.vista_previa })).toBeNull()
  })

  it('detener no envía: la vista previa se puede descartar y libera el recurso', async () => {
    const revocar = vi.fn()
    URL.revokeObjectURL = revocar
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    await grabar()
    await act(async () => {
      fireEvent.click(within(panel()).getByRole('button', { name: textos.grabacion.detener }))
    })
    fireEvent.click(within(panel()).getByRole('button', { name: textos.grabacion.descartar }))
    expect(within(panel()).queryByRole('group', { name: textos.grabacion.vista_previa })).toBeNull()
    expect(revocar).toHaveBeenCalledWith('blob:voz')
    expect(ultimo('conversacion-002')?.adjunto).toBeUndefined()
  })

  it('enviar durante la grabación detiene y envía de una vez, con la barra de ondas completa', async () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    await grabar()
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    await act(async () => {
      fireEvent.click(within(panel()).getByRole('button', { name: textos.grabacion.enviar }))
    })
    expect(ultimo('conversacion-002')?.adjunto).toMatchObject({ tipo: 'audio', duracion: 2 })
    expect(within(panel()).queryByRole('status')).toBeNull()
    expect(within(panel()).queryByRole('group', { name: textos.grabacion.vista_previa })).toBeNull()
  })

  it('sin permiso muestra un aviso y no graba', async () => {
    Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: async () => Promise.reject(new Error('denegado')) } })
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    await grabar()
    expect(within(panel()).getByRole('alert')).toHaveTextContent(textos.grabacion.sin_permiso)
    expect(within(panel()).queryByRole('status')).toBeNull()
  })
})
