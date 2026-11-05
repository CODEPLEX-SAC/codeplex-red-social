import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SeccionHistoriasInicio, agruparPorAutor, conHistoria, ordenarHistorias, usarHistoriasInicio } from '@/componentes/inicio'
import { ALMACEN_HISTORIAS, HISTORIAS, HISTORIAS_CONTACTOS } from '../../rutas/inicio/rutas_inicio'
import type { EstadoHistorias } from '@/tipos/inicio/contrato_almacen_historias'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

const flujo = catalogoInicio.historias.flujo
const editor = flujo.editor
const reproduccion = catalogoInicio.historias.reproduccion

function elegirTipo(etiqueta: string) {
  fireEvent.click(screen.getByRole('button', { name: etiqueta }))
  fireEvent.click(screen.getByRole('button', { name: flujo.crear.continuar }))
}

function autorVisor() {
  return screen.getByRole('list', { name: flujo.visor.etiqueta_progreso }).parentElement?.querySelector('strong')?.textContent
}

function segmentoActual() {
  return Array.from(screen.getByRole('list', { name: flujo.visor.etiqueta_progreso }).children).findIndex((segmento) => segmento.getAttribute('aria-current') === 'step')
}

function SeccionConectada() {
  const { publicadas, deContactos, publicar, acciones } = usarHistoriasInicio(ALMACEN_HISTORIAS, HISTORIAS_CONTACTOS)
  return <SeccionHistoriasInicio historias={HISTORIAS} publicadas={publicadas} deContactos={deContactos} acciones={acciones} onPublicar={publicar} />
}

function publicarTexto(mensaje: string) {
  fireEvent.click(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) }))
  elegirTipo(flujo.crear.tipos[1].etiqueta)
  fireEvent.change(screen.getByRole('textbox', { name: editor.mensaje_etiqueta }), { target: { value: mensaje } })
  fireEvent.click(screen.getByRole('button', { name: editor.vista_previa }))
  fireEvent.click(screen.getByRole('button', { name: flujo.vista_previa.publicar }))
}

afterEach(() => {
  vi.useRealTimers()
})

describe('Agrupacion de historias por usuario', () => {
  it('seis usuarios con varias historias producen seis grupos, identificados por el autor', () => {
    const propias = [{ ...HISTORIAS_CONTACTOS[0], id: 'propia-1', autorId: 'usuario-pedro-lozano', nombre: 'Pedro Lozano' }, { ...HISTORIAS_CONTACTOS[1], id: 'propia-2', autorId: 'usuario-pedro-lozano', nombre: 'Pedro Lozano' }]
    const grupos = agruparPorAutor(ordenarHistorias(propias, HISTORIAS_CONTACTOS, HISTORIAS))
    expect(HISTORIAS_CONTACTOS).toHaveLength(10)
    expect(grupos).toHaveLength(6)
    expect(grupos.map((grupo) => grupo.id)).toEqual(['usuario-pedro-lozano', 'maria-fernandez', 'luis-rodriguez', 'carmen-lopez', 'diego-mendoza', 'ana-garcia'])
    expect(grupos.map((grupo) => grupo.historias.length)).toEqual([2, 2, 2, 2, 2, 2])
  })

  it('el limite de diez segmentos por usuario se respeta en la logica de publicacion', () => {
    const base: EstadoHistorias = { historias: [], respuestas: [], reacciones: {}, secuencia: 0 }
    const propia = (numero: number) => ({ ...HISTORIAS_CONTACTOS[0], id: `propia-${numero}`, autorId: 'usuario-pedro-lozano', nombre: 'Pedro Lozano' })
    const lleno = Array.from({ length: 11 }).reduce<EstadoHistorias>((estado, _, numero) => conHistoria(estado, propia(numero)), base)
    expect(lleno.historias).toHaveLength(10)
    expect(lleno.historias[9].id).toBe('propia-9')
    expect(conHistoria(lleno, { ...HISTORIAS_CONTACTOS[0], id: 'otra-persona' }).historias).toHaveLength(11)
  })

  it('con diez historias propias el acceso para crear se deshabilita', () => {
    ALMACEN_HISTORIAS.modificar(() => ({ historias: Array.from({ length: 10 }, (_, numero) => ({ ...HISTORIAS_CONTACTOS[0], id: `propia-${numero}`, autorId: 'usuario-pedro-lozano', nombre: 'Pedro Lozano' })), respuestas: [], reacciones: {}, secuencia: 10 }))
    render(<SeccionConectada />)
    expect(screen.getByRole('button', { name: new RegExp(HISTORIAS[0].nombre) })).toBeDisabled()
  })
})

describe('Visor: una tarjeta por usuario y varios segmentos', () => {
  it('avanzar dentro del mismo usuario no cambia la tarjeta central ni crea otro elemento', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const dialogo = screen.getByRole('dialog')
    const tarjetas = () => dialogo.querySelectorAll('[data-posicion]')
    const central = dialogo.querySelector('[data-posicion="0"]')
    const cantidad = tarjetas().length
    expect(autorVisor()).toBe('María Fernández')
    expect(segmentoActual()).toBe(0)
    fireEvent.click(within(dialogo).getByRole('button', { name: flujo.visor.siguiente }))
    expect(dialogo.querySelector('[data-posicion="0"]')).toBe(central)
    expect(tarjetas()).toHaveLength(cantidad)
    expect(autorVisor()).toBe('María Fernández')
    expect(segmentoActual()).toBe(1)
    expect(within(dialogo).getByText('Av. Central')).toBeInTheDocument()
    expect(within(dialogo).getByRole('list', { name: flujo.visor.etiqueta_progreso }).children).toHaveLength(2)
    expect(within(dialogo).getByText(flujo.visor.progreso.replace(':actual', '2').replace(':total', '2'))).toBeInTheDocument()
  })

  it('las tarjetas laterales son los usuarios vecinos, no otra historia del mismo usuario', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const dialogo = screen.getByRole('dialog')
    expect(within(dialogo.querySelector('[data-posicion="1"]') as HTMLElement).getByText('Luis Rodríguez')).toBeInTheDocument()
    expect(within(dialogo.querySelector('[data-posicion="2"]') as HTMLElement).getByText('Carmen López')).toBeInTheDocument()
    fireEvent.click(within(dialogo).getByRole('button', { name: flujo.visor.siguiente }))
    expect(within(dialogo.querySelector('[data-posicion="1"]') as HTMLElement).getByText('Luis Rodríguez')).toBeInTheDocument()
  })

  it('al terminar el ultimo segmento se pasa al siguiente usuario y al retroceder se vuelve a su ultimo segmento', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const dialogo = screen.getByRole('dialog')
    const siguiente = () => within(dialogo).getByRole('button', { name: flujo.visor.siguiente })
    const anterior = () => within(dialogo).getByRole('button', { name: flujo.visor.anterior })
    expect(anterior()).toBeDisabled()
    fireEvent.click(siguiente())
    fireEvent.click(siguiente())
    expect(autorVisor()).toBe('Luis Rodríguez')
    expect(segmentoActual()).toBe(0)
    expect(within(dialogo).getByText('Buenos días a todos')).toBeInTheDocument()
    fireEvent.click(anterior())
    expect(autorVisor()).toBe('María Fernández')
    expect(segmentoActual()).toBe(1)
    fireEvent.click(anterior())
    expect(segmentoActual()).toBe(0)
  })

  it('la navegacion repetida mantiene sincronizados usuario, segmento y tarjeta central', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const dialogo = screen.getByRole('dialog')
    Array.from({ length: 9 }).forEach(() => fireEvent.click(within(dialogo).getByRole('button', { name: flujo.visor.siguiente })))
    expect(autorVisor()).toBe('Ana García')
    expect(segmentoActual()).toBe(1)
    expect(within(dialogo).getByRole('button', { name: flujo.visor.siguiente })).toBeDisabled()
    expect(dialogo.querySelectorAll('[data-posicion="0"]')).toHaveLength(1)
    Array.from({ length: 9 }).forEach(() => fireEvent.click(within(dialogo).getByRole('button', { name: flujo.visor.anterior })))
    expect(autorVisor()).toBe('María Fernández')
    expect(segmentoActual()).toBe(0)
  })

  it('pulsar una tarjeta lateral activa a ese usuario con su primera historia', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const dialogo = screen.getByRole('dialog')
    fireEvent.click(within(dialogo).getAllByRole('button', { name: new RegExp(`^${flujo.visor.previa_siguiente}`) })[1])
    expect(autorVisor()).toBe('Carmen López')
    expect(segmentoActual()).toBe(0)
    expect(within(dialogo).getByText('Cierre de mes: todo en orden')).toBeInTheDocument()
  })

  it('publicar otro segmento lo agrega al grupo propio sin duplicar el elemento del carrusel', () => {
    render(<SeccionConectada />)
    publicarTexto('Primera')
    publicarTexto('Segunda')
    expect(screen.getAllByRole('button', { name: flujo.etiqueta_propia })).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: flujo.etiqueta_propia }))
    const dialogo = screen.getByRole('dialog')
    expect(within(dialogo).getByRole('list', { name: flujo.visor.etiqueta_progreso }).children).toHaveLength(2)
    expect(within(dialogo).getByText('Primera')).toBeInTheDocument()
    fireEvent.click(within(dialogo).getByRole('button', { name: flujo.visor.siguiente }))
    expect(autorVisor()).toBe('Pedro Lozano')
    expect(within(dialogo).getByText('Segunda')).toBeInTheDocument()
    expect(segmentoActual()).toBe(1)
  })
})

describe('Visor: reproduccion temporizada', () => {
  it('la duracion se configura en un solo lugar y coincide con la clase de la animacion', () => {
    expect(reproduccion.clase_duracion).toBe(`duration-${reproduccion.duracion_ms}`)
  })

  it('al cumplirse la duracion avanza al siguiente segmento y reinicia el progreso', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    expect(segmentoActual()).toBe(0)
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms - 1)
    })
    expect(segmentoActual()).toBe(0)
    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(segmentoActual()).toBe(1)
    expect(autorVisor()).toBe('María Fernández')
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms)
    })
    expect(autorVisor()).toBe('Luis Rodríguez')
    expect(segmentoActual()).toBe(0)
  })

  it('un clic manual reinicia la cuenta y cerrar el visor detiene el temporizador', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms - 100)
    })
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: flujo.visor.siguiente }))
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms - 100)
    })
    expect(segmentoActual()).toBe(1)
    fireEvent.click(within(screen.getByRole('dialog')).getAllByRole('button', { name: flujo.visor.cerrar })[0])
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms * 3)
    })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('al terminar la ultima historia de la ultima persona el visor se cierra', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Ana G.' }))
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms)
    })
    expect(segmentoActual()).toBe(1)
    act(() => {
      vi.advanceTimersByTime(reproduccion.duracion_ms)
    })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})

describe('Visor: tacto y ausencia de historias', () => {
  it('en movil se avanza y retrocede tocando los lados de la historia', () => {
    render(<SeccionConectada />)
    fireEvent.click(screen.getByRole('button', { name: 'Maria F.' }))
    const visor = within(screen.getByRole('dialog'))
    expect(visor.getByRole('button', { name: flujo.visor.zona_anterior })).toBeDisabled()
    fireEvent.click(visor.getByRole('button', { name: flujo.visor.zona_siguiente }))
    expect(visor.getByText('Av. Central')).toBeInTheDocument()
    fireEvent.click(visor.getByRole('button', { name: flujo.visor.zona_anterior }))
    expect(visor.getByText(HISTORIAS_CONTACTOS[0].borrador.texto)).toBeInTheDocument()
  })

  it('sin historias de nadie no hay visor roto: los contactos sin historias no son botones', () => {
    render(<SeccionConectada />)
    expect(screen.queryByRole('button', { name: 'Grupo Ing.' })).toBeNull()
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
