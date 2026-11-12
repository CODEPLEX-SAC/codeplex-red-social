import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { imagenRedSocialDe } from '@/componentes/compartido'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import { PaginaMensajesVideollamadaIniciar } from '@/paginas/mensajeria/pagina_mensajes_videollamada_iniciar'
import { agruparParticipantes, buscarParticipantes, columnasPara, formatearDuracion, totalPaginasDe } from '@/componentes/mensajeria/bloques/logica_sala_llamada'
import { ampliarParticipantes, participantesDemostracion } from '../../servicios/mensajeria/sala_demostracion'
import { PARTICIPANTES } from '../../servicios/mensajeria/videollamadas'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMensajeria.videollamada.textos
const catalogo = catalogoMensajeria.videollamada
const SESION = catalogoCompartido.sesion_actual

function crearCaptura() {
  const escuchas: Array<() => void> = []
  const pistas = [{ stop: vi.fn(), addEventListener: vi.fn((_: string, escucha: () => void) => escuchas.push(escucha)), removeEventListener: vi.fn() }]
  const flujo = { getTracks: () => pistas, getVideoTracks: () => pistas }
  return { flujo, pistas, terminarDesdeNavegador: () => escuchas.forEach((escucha) => escucha()) }
}

function simularNavegador(comportamiento: (() => Promise<unknown>) | null) {
  Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: comportamiento ? { getDisplayMedia: vi.fn(comportamiento) } : undefined })
}

const barra = () => within(screen.getByRole('toolbar', { name: textos.sala.controles }))
const compartir = () => act(async () => fireEvent.click(barra().getByRole('button', { name: textos.sala.compartir })))

describe('Distribucion de la sala', () => {
  it('elige columnas segun la cantidad de participantes', () => {
    expect([1, 2, 3, 4, 5, 9].map(columnasPara)).toEqual(['1', '2', '2', '2', '3', '3'])
  })

  it('pagina cuando hay mas participantes que el tamano de pagina', () => {
    expect(totalPaginasDe(9, catalogo.tamano_pagina)).toBe(1)
    expect(totalPaginasDe(15, catalogo.tamano_pagina)).toBe(2)
  })

  it('formatea la duracion y arma participantes solo con las personas existentes y su fotografia', () => {
    expect(formatearDuracion(2142)).toBe('00:35:42')
    const participantes = participantesDemostracion(PARTICIPANTES, 40, (nombre) => `foto-de-${nombre}`)
    expect(participantes).toHaveLength(PARTICIPANTES.length)
    expect(participantes.filter((participante) => participante.local)).toHaveLength(1)
    expect(new Set(participantes.map((participante) => participante.id)).size).toBe(PARTICIPANTES.length)
    expect(participantes[1].fotografia).toBe(`foto-de-${PARTICIPANTES[1].nombre}`)
  })

  it('amplia la reunion con personas existentes sin repetirlas', () => {
    const ampliados = ampliarParticipantes(PARTICIPANTES.slice(0, 2), PARTICIPANTES)
    expect(ampliados.map((participante) => participante.nombre)).toEqual(PARTICIPANTES.map((participante) => participante.nombre))
  })

  it('agrupa a las personas como Meet (mano levantada, colaboradores e invitados) y busca sin distinguir tildes', () => {
    const participantes = participantesDemostracion(PARTICIPANTES, 15, () => String())
    const grupos = agruparParticipantes(participantes.map((participante, indice) => ({ ...participante, manoLevantada: indice === 1 })))
    expect(grupos.manos).toHaveLength(1)
    expect(grupos.invitados).toHaveLength(2)
    expect(grupos.manos.length + grupos.colaboradores.length + grupos.invitados.length).toBe(15)
    expect(buscarParticipantes(participantes, 'MARIA').length).toBeGreaterThan(0)
  })
})

describe('Sala de videollamada activa', () => {
  afterEach(() => simularNavegador(null))

  it('muestra los participantes en la cuadricula con paginacion para mas de nueve', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    expect(screen.getByRole('button', { name: textos.sala.participantes_boton })).toHaveTextContent(String(catalogo.cantidad_predeterminada))
    expect(screen.getAllByRole('article')).toHaveLength(catalogo.tamano_pagina)
    fireEvent.click(screen.getByRole('button', { name: textos.sala.pagina_siguiente }))
    fireEvent.click(screen.getByRole('button', { name: textos.sala.pagina_siguiente }))
    expect(screen.getAllByRole('article')).toHaveLength(catalogo.cantidad_predeterminada - 2 * catalogo.tamano_pagina)
  })

  it('cada participante usa la fotografia de su perfil: Pedro la suya y el resto el avatar predeterminado', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    expect(screen.getByRole('img', { name: PARTICIPANTES[0].nombre })).toHaveAttribute('src', imagenRedSocialDe(SESION.id))
    expect(screen.getByRole('img', { name: PARTICIPANTES[1].nombre })).toHaveAttribute('src', imagenRedSocialDe(undefined))
  })

  it('el selector de demostracion cambia la cantidad de participantes visibles', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    fireEvent.mouseDown(screen.getByRole('combobox', { name: textos.demostracion_selector }))
    fireEvent.click(screen.getByRole('option', { name: '3' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.queryByRole('navigation', { name: new RegExp(textos.sala.pagina.split(':')[0]) })).toBeNull()
  })

  it('los controles de microfono y camara muestran su estado y se invierten', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    const microfono = barra().getByRole('button', { name: textos.sala.microfono_silenciar })
    expect(microfono).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(microfono)
    expect(barra().getByRole('button', { name: textos.sala.microfono_activar })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(barra().getByRole('button', { name: textos.sala.camara_apagar }))
    expect(barra().getByRole('button', { name: textos.sala.camara_activar })).toHaveAttribute('aria-pressed', 'true')
  })

  it('el panel Personas muestra secciones plegables como Meet y se cierra', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    fireEvent.click(barra().getByRole('button', { name: textos.sala.participantes }))
    const panel = within(screen.getByRole('complementary', { name: textos.panel.titulo }))
    expect(panel.getByRole('heading', { level: 2 })).toHaveTextContent(`${textos.panel.titulo} (${catalogo.cantidad_predeterminada})`)
    expect(panel.getByText(textos.panel.en_la_reunion)).toBeInTheDocument()
    expect(panel.getByRole('searchbox', { name: textos.panel.etiqueta_busqueda })).toBeInTheDocument()
    expect(panel.queryAllByRole('article')).toHaveLength(0)
    fireEvent.click(panel.getByRole('button', { name: new RegExp(`^${textos.panel.secciones.invitados}`) }))
    expect(panel.getAllByRole('article')).toHaveLength(2)
    fireEvent.click(panel.getByRole('button', { name: textos.panel.cerrar }))
    expect(screen.queryByRole('complementary', { name: textos.panel.titulo })).toBeNull()
  })

  it('compartir pantalla usa la captura real del navegador, muestra el aviso y Dejar de compartir libera las pistas', async () => {
    const captura = crearCaptura()
    simularNavegador(async () => captura.flujo)
    render(<PaginaMensajesVideollamadaEnCurso />)
    await compartir()
    expect(screen.getByText(textos.sala.compartiendo_tu_pantalla)).toBeInTheDocument()
    expect(barra().getByRole('button', { name: textos.sala.dejar_de_compartir })).toHaveAttribute('aria-pressed', 'true')
    if (!screen.queryByRole('complementary', { name: textos.panel.titulo })) fireEvent.click(barra().getByRole('button', { name: textos.sala.participantes }))
    expect(screen.getByRole('complementary', { name: textos.panel.titulo })).toBeInTheDocument()
    expect(screen.getByText(textos.sala.compartiendo_tu_pantalla)).toBeInTheDocument()
    await act(async () => fireEvent.click(screen.getAllByRole('button', { name: textos.sala.dejar_de_compartir })[0]))
    expect(captura.pistas[0].stop).toHaveBeenCalled()
    expect(screen.queryByText(textos.sala.compartiendo_tu_pantalla)).toBeNull()
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0)
  })

  it('si el usuario detiene la captura desde los controles del navegador, la sala vuelve a la cuadricula', async () => {
    const captura = crearCaptura()
    simularNavegador(async () => captura.flujo)
    render(<PaginaMensajesVideollamadaEnCurso />)
    await compartir()
    expect(screen.getByText(textos.sala.compartiendo_tu_pantalla)).toBeInTheDocument()
    act(() => captura.terminarDesdeNavegador())
    expect(screen.queryByText(textos.sala.compartiendo_tu_pantalla)).toBeNull()
    expect(captura.pistas[0].stop).toHaveBeenCalled()
  })

  it('cancelar el selector nativo no inicia la presentacion y lo informa', async () => {
    simularNavegador(async () => Promise.reject(new DOMException('cancelado', 'NotAllowedError')))
    render(<PaginaMensajesVideollamadaEnCurso />)
    await compartir()
    expect(screen.getByText(textos.sala.errores_captura.cancelado)).toBeInTheDocument()
    expect(screen.queryByText(textos.sala.compartiendo_tu_pantalla)).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: textos.sala.cerrar_aviso }))
    expect(screen.queryByText(textos.sala.errores_captura.cancelado)).toBeNull()
  })

  it('si no hay contenido disponible muestra el error correspondiente', async () => {
    simularNavegador(async () => Promise.reject(new DOMException('nada', 'NotFoundError')))
    render(<PaginaMensajesVideollamadaEnCurso />)
    await compartir()
    expect(screen.getByText(textos.sala.errores_captura.no_disponible)).toBeInTheDocument()
  })

  it('en un navegador sin captura, el modo demostracion muestra una presentacion marcada como simulada', async () => {
    simularNavegador(null)
    render(<PaginaMensajesVideollamadaEnCurso />)
    await compartir()
    expect(screen.getByText(textos.sala.presentacion_demostracion)).toBeInTheDocument()
  })

  it('el chat local no simula el envio a otros participantes', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    fireEvent.click(barra().getByRole('button', { name: textos.sala.chat }))
    const panel = within(screen.getByRole('complementary', { name: textos.chat.titulo }))
    expect(panel.getByText(textos.chat.nota)).toBeInTheDocument()
    fireEvent.change(panel.getByRole('textbox', { name: textos.chat.etiqueta_campo }), { target: { value: 'hola' } })
    fireEvent.click(panel.getByRole('button', { name: textos.chat.enviar }))
    expect(panel.getByText('hola')).toBeInTheDocument()
  })
})

describe('Preparacion de la videollamada', () => {
  it('la camara inicia desactivada con su estado y el microfono se puede silenciar', () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    expect(screen.getAllByText(textos.preparacion.camara_desactivada).length).toBeGreaterThan(0)
    const microfono = screen.getByRole('button', { name: textos.preparacion.silenciar_microfono })
    fireEvent.click(microfono)
    expect(screen.getByRole('button', { name: textos.preparacion.activar_microfono })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('img', { name: textos.preparacion.microfono_desactivado })).toBeInTheDocument()
  })

  it('sin soporte del navegador informa el estado en vez de simular la camara', async () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: textos.preparacion.activar_camara }))
    })
    expect(screen.getByText(textos.preparacion.camara_mensajes.no_soportado)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: textos.preparacion.activar_camara })).toHaveAttribute('aria-pressed', 'true')
  })

  it('invitar deja la invitacion como preparada y lo comunica, sin afirmar que se envio', async () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    const boton = screen.getAllByRole('button', { name: new RegExp(`^${textos.invitaciones.invitar} `) })[0]
    await act(async () => {
      fireEvent.click(boton)
    })
    expect(screen.getAllByText(textos.invitaciones.preparada).length).toBeGreaterThan(0)
    expect(screen.getByText(textos.invitaciones.preparada_nota)).toBeInTheDocument()
    expect(screen.queryByText(textos.invitaciones.enviada)).toBeNull()
  })

  it('el buscador de contactos filtra las personas de la red', () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    fireEvent.change(screen.getByRole('searchbox', { name: textos.invitaciones.etiqueta_busqueda }), { target: { value: 'zzz-no-existe' } })
    expect(screen.getByText(textos.invitaciones.sin_resultados)).toBeInTheDocument()
  })

  it('probar dispositivos informa la prueba pendiente del microfono', async () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: new RegExp(textos.dispositivos.probar) }))
    })
    expect(screen.getByText(new RegExp(textos.dispositivos.estado.pendiente_integracion))).toBeInTheDocument()
  })
})

describe('Estado inicial de microfono y camara', () => {
  it('la sala respeta el microfono y la camara desactivados desde la preparacion', () => {
    window.history.pushState({}, '', `${catalogoMensajeria.rutas.videollamada_en_curso}?${catalogoMensajeria.parametros_ruta.microfono}=${catalogo.estado_inactivo}&${catalogoMensajeria.parametros_ruta.camara}=${catalogo.estado_inactivo}`)
    render(<PaginaMensajesVideollamadaEnCurso />)
    expect(barra().getByRole('button', { name: textos.sala.microfono_activar })).toHaveAttribute('aria-pressed', 'true')
    expect(barra().getByRole('button', { name: textos.sala.camara_activar })).toHaveAttribute('aria-pressed', 'true')
    window.history.pushState({}, '', '/')
  })

  it('sin parametros la sala inicia con ambos activos', () => {
    window.history.pushState({}, '', catalogoMensajeria.rutas.videollamada_en_curso)
    render(<PaginaMensajesVideollamadaEnCurso />)
    expect(barra().getByRole('button', { name: textos.sala.microfono_silenciar })).toHaveAttribute('aria-pressed', 'false')
    expect(barra().getByRole('button', { name: textos.sala.camara_apagar })).toHaveAttribute('aria-pressed', 'false')
    window.history.pushState({}, '', '/')
  })

  it('la preparacion enlaza a la sala con el estado actual del microfono y la camara', () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    fireEvent.click(screen.getByRole('button', { name: textos.preparacion.silenciar_microfono }))
    const enlace = new URL(screen.getByRole('link', { name: catalogoMensajeria.botones.iniciar_videollamada }).getAttribute('href') ?? String(), window.location.origin)
    expect(enlace.searchParams.get(catalogoMensajeria.parametros_ruta.microfono)).toBe(catalogo.estado_inactivo)
    expect(enlace.searchParams.get(catalogoMensajeria.parametros_ruta.camara)).toBe(catalogo.estado_inactivo)
  })
})
