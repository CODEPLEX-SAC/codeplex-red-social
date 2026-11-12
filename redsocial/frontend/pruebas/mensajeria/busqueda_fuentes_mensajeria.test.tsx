import { act, fireEvent, render, screen } from '@testing-library/react'
import { BloqueRecientes } from '@/componentes/mensajeria/bloques/bloque_recientes'
import { ListaConversaciones } from '@/componentes/mensajeria/bloques/lista_conversaciones'
import { ModalCrearGrupo } from '@/componentes/mensajeria/bloques/modal_crear_grupo'
import { ModalReenviarMensaje } from '@/componentes/mensajeria/bloques/modal_reenviar_mensaje'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { Conversacion, ConversacionConEtiqueta, ParticipanteMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import type { FiltrosConversaciones, FiltrosParticipantes } from '@/tipos/mensajeria/contrato_lista_conversaciones'
import type { LlamadaReciente } from '@/tipos/mensajeria/contrato_videollamadas'

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })

function conversacion(id: string, nombre: string, vistaPrevia: string, extra: Partial<ConversacionConEtiqueta> = {}): ConversacionConEtiqueta {
  return {
    id,
    nombre,
    extracto: vistaPrevia,
    noLeidos: 0,
    favorita: false,
    enLinea: false,
    participantes: [],
    etiquetaTiempo: '10:30',
    etiquetaCompleta: 'Lunes, 26 de octubre de 2026 10:30 AM',
    fechaActividad: '2026-10-26T10:30:00',
    vistaPrevia,
    origenActividad: 'mensaje',
    tipo: 'individual',
    identificadores: { conversationId: id, participantId: null, groupId: null },
    estadoNotificaciones: 'activas',
    ...extra,
  }
}

const CONVERSACIONES = [conversacion('c1', 'María Fernández', 'Te envío el informe'), conversacion('c2', 'Luis Rodríguez', 'Nos vemos', { noLeidos: 2 }), conversacion('c3', 'Equipo Ágil', 'Reunión mañana', { esGrupo: true, tipo: 'grupal' })]
const ACCIONES = { onMarcarLeido: vi.fn(), onMarcarNoLeido: vi.fn(), onAlternarSilencio: vi.fn(), onAlternarFavorita: vi.fn(), onEliminar: vi.fn(), onAbandonar: vi.fn() }
const filasDeConversacion = () => document.querySelectorAll('[data-fila-conversacion]')

function renderLista(fuente?: FuenteBusqueda<ConversacionConEtiqueta, FiltrosConversaciones>, conversaciones: readonly ConversacionConEtiqueta[] = CONVERSACIONES) {
  return render(<ListaConversaciones conversaciones={conversaciones} fuente={fuente} activa={null} onSeleccionar={vi.fn()} oculta={false} contadorNoLeidos={0} acciones={ACCIONES} participantes={[]} onCrearGrupo={vi.fn()} />)
}

const PARTICIPANTES: readonly ParticipanteMensajeria[] = [
  { id: 'p1', nombre: 'María Fernández' },
  { id: 'p2', nombre: 'Luis Rodríguez' },
]

const LLAMADAS: readonly LlamadaReciente[] = [
  { id: 'l1', nombre: 'María Fernández', direccion: 'entrante', hora: '10:00' },
  { id: 'l2', nombre: 'Equipo Ágil', esGrupo: true, hora: '11:00' },
]

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  const promesa = new Promise<T>((alResolver) => {
    resolver = alResolver
  })
  return { promesa, resolver }
}

describe('MSJ-01 a MSJ-04: criterio de búsqueda con fuente local', { timeout: 30000 }, () => {
  it('MSJ-01 busca solo por nombre y nunca por la vista previa o el último mensaje', () => {
    renderLista()
    const buscador = screen.getByPlaceholderText(catalogoMensajeria.placeholders.buscar_mensajes)
    escribir(buscador, 'maria')
    expect(filasDeConversacion()).toHaveLength(1)
    escribir(buscador, 'informe')
    expect(filasDeConversacion()).toHaveLength(0)
  })

  it('MSJ-01 conserva la vista como filtro independiente del texto', () => {
    renderLista()
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.titulos_pestanas.no_leidos }))
    expect(filasDeConversacion()).toHaveLength(1)
    escribir(screen.getByPlaceholderText(catalogoMensajeria.placeholders.buscar_mensajes), 'maria')
    expect(filasDeConversacion()).toHaveLength(0)
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.titulos_pestanas.todos }))
    expect(filasDeConversacion()).toHaveLength(1)
  })

  it('MSJ-02 conserva Contactos y Grupos como filtros y busca solo por nombre', () => {
    render(<BloqueRecientes LLAMADAS_RECIENTES={LLAMADAS} REUNIONES_PROGRAMADAS={[]} />)
    const buscador = screen.getByPlaceholderText(catalogoMensajeria.placeholders.buscar_videollamadas)
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.filtros.grupos }))
    expect(screen.getAllByRole('button', { name: /^Videollamar a / })).toHaveLength(1)
    escribir(buscador, 'maria')
    expect(screen.getByText(catalogoMensajeria.leyendas.sin_llamadas)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.filtros.contactos }))
    expect(screen.getAllByRole('button', { name: /^Videollamar a / })).toHaveLength(1)
    escribir(buscador, 'entrante')
    expect(screen.getByText(catalogoMensajeria.leyendas.sin_llamadas)).toBeInTheDocument()
  })

  it('MSJ-03 excluye a los participantes ya elegidos sin dejar de buscar por nombre', () => {
    render(<ModalCrearGrupo participantes={PARTICIPANTES} nombresExistentes={[]} onCrear={vi.fn()} onCerrar={vi.fn()} />)
    escribir(screen.getByRole('searchbox'), 'maria')
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.grupos.modal.agregar.replace(':nombre', 'María Fernández') }))
    escribir(screen.getByRole('searchbox'), 'maria')
    expect(screen.queryByRole('button', { name: catalogoMensajeria.grupos.modal.agregar.replace(':nombre', 'María Fernández') })).toBeNull()
  })

  it('MSJ-04 busca destinos solo por nombre de persona o grupo', () => {
    const destinos: readonly Conversacion[] = CONVERSACIONES
    render(<ModalReenviarMensaje destinos={destinos} onConfirmar={vi.fn()} onCancelar={vi.fn()} />)
    const reenviar = catalogoMensajeria.conversacion.reenviar_modal
    escribir(screen.getByRole('searchbox', { name: reenviar.buscar }), 'informe')
    expect(screen.getByText(reenviar.sin_resultados)).toBeInTheDocument()
  })
})

describe('MSJ-01 a MSJ-04: fuente inyectada sin cambiar la interfaz', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('MSJ-01 pide a la fuente el texto y la vista como parámetros distintos y muestra carga, resultado y error', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<ConversacionConEtiqueta>>()
    const fuente = vi.fn<FuenteBusqueda<ConversacionConEtiqueta, FiltrosConversaciones>>(() => respuesta.promesa)
    renderLista(fuente, [])
    expect(fuente).toHaveBeenCalledWith('', undefined, { soloGrupos: false, filtro: 'todos' })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: CONVERSACIONES, total: CONVERSACIONES.length }))
    expect(filasDeConversacion()).toHaveLength(CONVERSACIONES.length)

    fuente.mockClear()
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.titulos_pestanas.no_leidos }))
    act(() => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('', undefined, { soloGrupos: false, filtro: 'no_leidos' })

    fuente.mockImplementation(() => Promise.reject({ codigo: 'no_disponible' }))
    escribir(screen.getByPlaceholderText(catalogoMensajeria.placeholders.buscar_mensajes), 'ana')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('ana', undefined, { soloGrupos: false, filtro: 'no_leidos' })
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })

  it('MSJ-01 descarta una respuesta obsoleta que llega después de la vigente', async () => {
    const lenta = diferida<ResultadoBusquedaLista<ConversacionConEtiqueta>>()
    const rapida = diferida<ResultadoBusquedaLista<ConversacionConEtiqueta>>()
    const fuente: FuenteBusqueda<ConversacionConEtiqueta, FiltrosConversaciones> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: CONVERSACIONES, total: 3 }) : consulta === 'a' ? lenta.promesa : rapida.promesa)
    renderLista(fuente, [])
    await act(async () => vi.advanceTimersByTime(RETARDO))
    const buscador = screen.getByPlaceholderText(catalogoMensajeria.placeholders.buscar_mensajes)
    escribir(buscador, 'a')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(buscador, 'ab')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    await act(async () => rapida.resolver({ elementos: [CONVERSACIONES[0]], total: 1 }))
    await act(async () => lenta.resolver({ elementos: CONVERSACIONES, total: 3 }))
    expect(filasDeConversacion()).toHaveLength(1)
  })

  it('MSJ-02 acepta una fuente y le envía el tipo como filtro', async () => {
    const fuente = vi.fn<FuenteBusqueda<LlamadaReciente, { tipo: 'recientes' | 'contactos' | 'grupos' }>>(() => Promise.resolve({ elementos: LLAMADAS, total: LLAMADAS.length }))
    render(<BloqueRecientes LLAMADAS_RECIENTES={[]} REUNIONES_PROGRAMADAS={[]} fuente={fuente} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getAllByRole('button', { name: /^Videollamar a / })).toHaveLength(2)
    fuente.mockClear()
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.filtros.grupos }))
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('', undefined, { tipo: 'grupos' })
  })

  it('MSJ-03 acepta una fuente y le envía los ya elegidos como filtro de exclusión', async () => {
    const fuente = vi.fn<FuenteBusqueda<ParticipanteMensajeria, FiltrosParticipantes>>(() => Promise.resolve({ elementos: PARTICIPANTES, total: 2 }))
    render(<ModalCrearGrupo participantes={[]} fuente={fuente} nombresExistentes={[]} onCrear={vi.fn()} onCerrar={vi.fn()} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(screen.getByRole('searchbox'), 'maria')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('maria', undefined, { excluir: [] })
    fireEvent.click(screen.getByRole('button', { name: catalogoMensajeria.grupos.modal.agregar.replace(':nombre', 'María Fernández') }))
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(fuente).toHaveBeenLastCalledWith('', undefined, { excluir: ['p1'] })
  })

  it('MSJ-04 acepta una fuente y muestra el error sin confundirlo con la falta de coincidencias', async () => {
    const destinos: readonly Conversacion[] = CONVERSACIONES
    const fuente: FuenteBusqueda<Conversacion> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: destinos, total: destinos.length }) : Promise.reject({ codigo: 'no_disponible' }))
    render(<ModalReenviarMensaje destinos={[]} fuente={fuente} onConfirmar={vi.fn()} onCancelar={vi.fn()} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    const reenviar = catalogoMensajeria.conversacion.reenviar_modal
    escribir(screen.getByRole('searchbox', { name: reenviar.buscar }), 'ana')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
    expect(screen.queryByText(reenviar.sin_resultados)).toBeNull()
  })
})
