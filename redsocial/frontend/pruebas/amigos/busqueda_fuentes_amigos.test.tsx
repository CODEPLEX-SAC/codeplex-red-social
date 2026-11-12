import { act, fireEvent, render, screen } from '@testing-library/react'
import { SeccionSolicitudes, SeccionTusAmigos } from '@/componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import { AMIGOS, ENVIADAS, RECIBIDAS } from '../../rutas/amigos/rutas_amigos'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { FiltrosSolicitudes, ItemSolicitud } from '@/tipos/amigos/contrato_solicitudes'
import type { Amigo, FiltrosAmigos } from '@/tipos/amigos/modelo_amigos_todos'

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })
const buscadorAmigos = () => screen.getByPlaceholderText(catalogoAmigos.placeholders.buscar_amigos)
function elegirEstado(etiqueta: string) {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: catalogoAmigos.botones.filtrar_amigos }))
  fireEvent.click(screen.getByRole('option', { name: etiqueta }))
}
const tarjetasDeAmigo = () => screen.queryAllByRole('article')
const botonesAceptar = () => screen.queryAllByRole('button', { name: catalogoAmigos.botones.aceptar })
const pestanaEnviadas = () => screen.getByRole('button', { name: new RegExp(catalogoAmigos.pestanas_solicitudes.enviadas) })

const expandirAmigos = () => {
  const boton = screen.queryByRole('button', { name: catalogoAmigos.botones.ver_mas_amigos })
  if (boton) fireEvent.click(boton)
}
const LIMITE = catalogoAmigos.limite_solicitudes_visibles
const ITEMS_RECIBIDAS: readonly ItemSolicitud[] = RECIBIDAS.map((solicitud): ItemSolicitud => ({ categoria: 'recibidas', solicitud }))

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  const promesa = new Promise<T>((alResolver) => {
    resolver = alResolver
  })
  return { promesa, resolver }
}

describe('AMI-02: tus amigos con fuente local', { timeout: 30000 }, () => {
  it('busca por el nombre visible del amigo sin distinguir tildes ni mayúsculas', () => {
    render(<SeccionTusAmigos RESUMEN={[]} AMIGOS={AMIGOS} />)
    expandirAmigos()
    expect(tarjetasDeAmigo()).toHaveLength(AMIGOS.length)
    escribir(buscadorAmigos(), AMIGOS[0].nombre.toUpperCase())
    expect(tarjetasDeAmigo().length).toBeGreaterThan(0)
    escribir(buscadorAmigos(), AMIGOS[0].comunes)
    expect(tarjetasDeAmigo()).toHaveLength(0)
  })

  it('el estado de conexión es un filtro independiente que se combina con el texto', () => {
    render(<SeccionTusAmigos RESUMEN={[]} AMIGOS={AMIGOS} />)
    const enLinea = AMIGOS.filter((amigo) => amigo.enLinea === true)
    elegirEstado(catalogoAmigos.botones.amigos_en_linea)
    expect(tarjetasDeAmigo()).toHaveLength(enLinea.length)
    const desconectado = AMIGOS.find((amigo) => amigo.enLinea !== true)
    if (!desconectado) throw new Error('el conjunto de datos debe incluir un amigo desconectado')
    escribir(buscadorAmigos(), desconectado.nombre)
    expect(tarjetasDeAmigo()).toHaveLength(0)
    elegirEstado(catalogoAmigos.botones.todos_los_amigos)
    expect(tarjetasDeAmigo().length).toBeGreaterThan(0)
  })
})

describe('AMI-01: solicitudes de amistad con fuente local', { timeout: 30000 }, () => {
  it('no tiene buscador y conserva Recibidas y Enviadas como filtro independiente', () => {
    render(<SeccionSolicitudes recibidas={RECIBIDAS} enviadas={ENVIADAS} />)
    expect(screen.queryByRole('searchbox')).toBeNull()
    expect(botonesAceptar()).toHaveLength(LIMITE)
    fireEvent.click(pestanaEnviadas())
    expect(botonesAceptar()).toHaveLength(0)
    expect(screen.getByText(ENVIADAS[0].nombre)).toBeInTheDocument()
  })
})

describe('AMI-01 y AMI-02: fuente inyectada sin cambiar la interfaz', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('AMI-02 envía el estado como filtro, muestra carga y presenta el resultado', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<Amigo>>()
    const fuente = vi.fn<FuenteBusqueda<Amigo, FiltrosAmigos>>(() => respuesta.promesa)
    render(<SeccionTusAmigos RESUMEN={[]} AMIGOS={[]} fuente={fuente} />)
    expect(fuente).toHaveBeenCalledWith('', undefined, { estado: 'todos' })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: AMIGOS, total: AMIGOS.length }))
    expandirAmigos()
    expect(tarjetasDeAmigo()).toHaveLength(AMIGOS.length)

    fuente.mockClear()
    elegirEstado(catalogoAmigos.botones.amigos_en_linea)
    act(() => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('', undefined, { estado: 'en_linea' })
  })

  it('AMI-02 muestra el error de la fuente sin confundirlo con la falta de coincidencias', async () => {
    const fuente: FuenteBusqueda<Amigo, FiltrosAmigos> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: AMIGOS, total: AMIGOS.length }) : Promise.reject({ codigo: 'no_disponible' }))
    render(<SeccionTusAmigos RESUMEN={[]} AMIGOS={[]} fuente={fuente} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(buscadorAmigos(), 'ana')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })

  it('AMI-01 envía la categoría como filtro a la fuente', async () => {
    const fuente = vi.fn<FuenteBusqueda<ItemSolicitud, FiltrosSolicitudes>>(() => Promise.resolve({ elementos: ITEMS_RECIBIDAS, total: ITEMS_RECIBIDAS.length }))
    render(<SeccionSolicitudes recibidas={[]} enviadas={[]} fuente={fuente} />)
    expect(fuente).toHaveBeenCalledWith('', undefined, { categoria: 'recibidas' })
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(botonesAceptar()).toHaveLength(LIMITE)

    fuente.mockClear()
    fireEvent.click(pestanaEnviadas())
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('', undefined, { categoria: 'enviadas' })
  })
})
