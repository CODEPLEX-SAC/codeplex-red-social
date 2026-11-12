import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { SalaVideollamada } from '@/componentes/mensajeria'
import { crearSalaNavegador } from '../../servicios/mensajeria/sala_navegador'
import { ampliarParticipantes, participantesDemostracion } from '../../servicios/mensajeria/sala_demostracion'
import { PARTICIPANTES, resolverReunionEnSala } from '../../servicios/mensajeria/videollamadas'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ParticipanteSala, PuertoSala } from '@/tipos/mensajeria/contrato_integracion_llamada'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMensajeria.videollamada.textos
const REUNION = resolverReunionEnSala(null)
const BASE = ampliarParticipantes(REUNION?.participantes ?? [], PARTICIPANTES)
const CONTACTOS = [{ id: 'contacto-1', nombre: 'Contacto Uno', detalle: 'Detalle' }]
const ENLACE = new URL(catalogoMensajeria.rutas.videollamada_en_curso, window.location.origin).toString()
const EXITO = async () => ({ exito: true as const })

function puertoConExito(): PuertoSala {
  return { ...crearSalaNavegador(), silenciarParticipante: vi.fn(EXITO), quitarParticipante: vi.fn(EXITO), finalizarParaTodos: vi.fn(EXITO), informarProblema: vi.fn(EXITO) }
}

function generarComo(transformar: (participante: ParticipanteSala) => ParticipanteSala) {
  return (cantidad: number) => participantesDemostracion(BASE, cantidad, () => 'foto.jpg').map(transformar)
}

function montar(puerto: PuertoSala = crearSalaNavegador(), transformar: (participante: ParticipanteSala) => ParticipanteSala = (participante) => participante) {
  if (REUNION === undefined) throw new Error('Reunion no disponible')
  return render(<SalaVideollamada reunion={REUNION} puerto={puerto} generar={generarComo(transformar)} contactos={CONTACTOS} enlaceReunion={ENLACE} imagenPresentacion={undefined} maximoParticipantes={BASE.length} />)
}

const barra = () => within(screen.getByRole('toolbar', { name: textos.sala.controles }))
const abrirMas = () => fireEvent.click(barra().getByRole('button', { name: textos.sala.mas_opciones }))
const panel = () => within(screen.getByRole('complementary', { name: textos.panel.titulo }))
const ENCABEZADO_SECCION = new RegExp(`^(${Object.values(textos.panel.secciones).join('|')})`)

function abrirPersonas() {
  fireEvent.click(barra().getByRole('button', { name: textos.sala.participantes }))
  panel()
    .queryAllByRole('button', { expanded: false, name: ENCABEZADO_SECCION })
    .forEach((encabezado) => fireEvent.click(encabezado))
}
const abrirMenuDe = (nombre: string) => fireEvent.click(panel().getByRole('button', { name: textos.panel.gestion.replace(':nombre', nombre) }))
const esperar = () => act(async () => undefined)

function comprobarMenu(esperadas: string[]) {
  const menu = within(screen.getByRole('menu'))
  expect(menu.getAllByRole('menuitem')).toHaveLength(esperadas.length)
  esperadas.forEach((nombre) => expect(menu.getByRole('menuitem', { name: nombre })).toBeInTheDocument())
}

describe('Barra de controles', () => {
  it('conserva los ocho controles accesibles', () => {
    montar()
    const nombres = barra().getAllByRole('button').map((boton) => boton.getAttribute('aria-label'))
    expect(nombres).toEqual([textos.sala.microfono_silenciar, textos.sala.camara_apagar, textos.sala.compartir, textos.sala.participantes, textos.sala.chat, textos.sala.reacciones, textos.sala.mas_opciones, textos.sala.finalizar])
  })

  it('el menu Mas muestra exclusivamente las tres opciones acordadas', () => {
    montar()
    abrirMas()
    comprobarMenu([textos.sala.levantar_mano, textos.sala.mensajes_llamada, textos.sala.informar_problema])
    expect(within(screen.getByRole('menu')).queryByRole('menuitem', { name: new RegExp(textos.sala.compartir) })).toBeNull()
  })

  it('Mensajes en la llamada abre y cierra el chat existente', () => {
    montar()
    abrirMas()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.sala.mensajes_llamada }))
    expect(screen.getByRole('complementary', { name: textos.chat.titulo })).toBeInTheDocument()
    abrirMas()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.sala.mensajes_llamada }))
    expect(screen.queryByRole('complementary', { name: textos.chat.titulo })).toBeNull()
  })
})

describe('Levantar la mano', () => {
  it('levanta y baja la mano, con indicador junto al participante, contador y estado en Personas', () => {
    montar()
    abrirMas()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.sala.levantar_mano }))
    const local = within(screen.getByRole('article', { name: PARTICIPANTES[0].nombre }))
    expect(local.getByRole('img', { name: textos.sala.mano_levantada })).toBeInTheDocument()
    abrirPersonas()
    expect(panel().getByText(textos.panel.manos.replace(':n', '1'))).toBeInTheDocument()
    expect(panel().getAllByRole('img', { name: textos.sala.mano_levantada })).toHaveLength(1)
    abrirMas()
    expect(screen.getByRole('menuitem', { name: textos.sala.bajar_mano })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.sala.bajar_mano }))
    expect(screen.queryByRole('img', { name: textos.sala.mano_levantada })).toBeNull()
    expect(panel().queryByText(textos.panel.manos.replace(':n', '1'))).toBeNull()
  })
})

describe('Fijar participantes', () => {
  it('el menu ofrece Fijar en mi pantalla y, una vez fijado, Dejar de fijar', () => {
    montar()
    abrirPersonas()
    abrirMenuDe(PARTICIPANTES[2].nombre)
    expect(screen.getByRole('menuitem', { name: 'Fijar en mi pantalla' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: 'Fijar en mi pantalla' }))
    abrirMenuDe(PARTICIPANTES[2].nombre)
    expect(screen.getByRole('menuitem', { name: 'Dejar de fijar' })).toBeInTheDocument()
    expect(screen.queryByRole('menuitem', { name: 'Fijar en mi pantalla' })).toBeNull()
  })

  it('con una persona fijada se ven tambien todas las demas, sin dejar espacios vacios', () => {
    montar()
    abrirPersonas()
    abrirMenuDe(PARTICIPANTES[2].nombre)
    fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.fijar }))
    const tarjetas = screen.getAllByRole('article').filter((tarjeta) => tarjeta.getAttribute('aria-label') !== null)
    expect(tarjetas).toHaveLength(BASE.length)
  })

  it('fija y quita la fijacion desde el menu de tres puntos', () => {
    montar()
    abrirPersonas()
    abrirMenuDe(PARTICIPANTES[2].nombre)
    fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.fijar }))
    expect(panel().getByRole('img', { name: textos.sala.fijado })).toBeInTheDocument()
    abrirMenuDe(PARTICIPANTES[2].nombre)
    expect(screen.getByRole('menuitem', { name: textos.panel.quitar_fijacion })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.quitar_fijacion }))
    expect(panel().queryByRole('img', { name: textos.sala.fijado })).toBeNull()
  })

  it('la fijacion es individual: no afecta a otra vista de la misma reunion', () => {
    const primera = montar()
    const segunda = montar()
    const vistaPrimera = within(primera.container)
    const vistaSegunda = within(segunda.container)
    fireEvent.click(vistaPrimera.getByRole('button', { name: textos.sala.participantes }))
    fireEvent.click(vistaPrimera.getByRole('button', { name: new RegExp(`^${textos.panel.secciones.colaboradores}`), expanded: false }))
    fireEvent.click(vistaPrimera.getByRole('button', { name: textos.panel.gestion.replace(':nombre', PARTICIPANTES[2].nombre) }))
    fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.fijar }))
    expect(vistaPrimera.getByRole('img', { name: textos.sala.fijado })).toBeInTheDocument()
    fireEvent.click(vistaSegunda.getByRole('button', { name: textos.sala.participantes }))
    expect(vistaSegunda.queryByRole('img', { name: textos.sala.fijado })).toBeNull()
  })
})

describe('Permisos de moderacion', () => {
  it('el organizador ve silenciar y quitar para otros, y solo fijar para si mismo', () => {
    montar()
    abrirPersonas()
    abrirMenuDe(PARTICIPANTES[1].nombre)
    comprobarMenu([textos.panel.fijar, textos.panel.silenciar, textos.panel.quitar])
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
  })

  it('sin permisos de moderacion solo aparece fijar', () => {
    montar(crearSalaNavegador(), (participante) => ({ ...participante, organizador: false }))
    abrirPersonas()
    abrirMenuDe(PARTICIPANTES[1].nombre)
    comprobarMenu([textos.panel.fijar])
    expect(screen.queryByRole('menuitem', { name: textos.panel.silenciar })).toBeNull()
  })

  it('sin servicio de la sala, silenciar y quitar no se simulan: se informa y el estado no cambia', async () => {
    montar()
    abrirPersonas()
    const antes = panel().getAllByRole('img', { name: textos.invitaciones.microfono_activo }).length
    abrirMenuDe(PARTICIPANTES[1].nombre)
    await act(async () => fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.silenciar })))
    expect(panel().getByText(textos.panel.aviso_gestion)).toBeInTheDocument()
    expect(panel().getAllByRole('img', { name: textos.invitaciones.microfono_activo })).toHaveLength(antes)
    abrirMenuDe(PARTICIPANTES[1].nombre)
    await act(async () => fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.quitar })))
    expect(panel().getByText(new RegExp(`${textos.panel.titulo} \\(${BASE.length}\\)`))).toBeInTheDocument()
  })

  it('con el servicio disponible, silenciar afecta solo al participante elegido', async () => {
    const puerto = puertoConExito()
    montar(puerto)
    abrirPersonas()
    const antes = panel().getAllByRole('img', { name: textos.invitaciones.microfono_activo }).length
    abrirMenuDe(PARTICIPANTES[1].nombre)
    await act(async () => fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.silenciar })))
    expect(puerto.silenciarParticipante).toHaveBeenCalledWith(expect.stringContaining(PARTICIPANTES[1].nombre.split(' ')[0].toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, String())))
    expect(panel().getAllByRole('img', { name: textos.invitaciones.microfono_activo })).toHaveLength(antes - 1)
    expect(panel().getByText(textos.panel.silenciado)).toBeInTheDocument()
  })

  it('con el servicio disponible, quitar retira solo al participante elegido', async () => {
    montar(puertoConExito())
    abrirPersonas()
    abrirMenuDe(PARTICIPANTES[1].nombre)
    await act(async () => fireEvent.click(screen.getByRole('menuitem', { name: textos.panel.quitar })))
    expect(panel().queryByText(PARTICIPANTES[1].nombre)).toBeNull()
    expect(panel().getByText(new RegExp(`${textos.panel.titulo} \\(${BASE.length - 1}\\)`))).toBeInTheDocument()
    expect(panel().getByText(PARTICIPANTES[2].nombre)).toBeInTheDocument()
  })
})

describe('Finalizar la llamada', () => {
  const dialogo = () => within(screen.getByRole('dialog', { name: textos.salida.titulo }))

  it('al salir, el organizador debe elegir entre abandonar y finalizar para todos, desde ambos botones', () => {
    montar()
    fireEvent.click(barra().getByRole('button', { name: textos.sala.finalizar }))
    expect(dialogo().getByText(textos.salida.descripcion)).toBeInTheDocument()
    expect(dialogo().getByRole('button', { name: textos.salida.abandonar })).toBeInTheDocument()
    expect(dialogo().getByRole('button', { name: textos.salida.finalizar_todos })).toBeInTheDocument()
    fireEvent.click(dialogo().getByRole('button', { name: textos.salida.cerrar }))
    expect(screen.queryByRole('dialog', { name: textos.salida.titulo })).toBeNull()
    fireEvent.click(screen.getAllByRole('button', { name: textos.sala.salir })[0])
    expect(dialogo().getByRole('button', { name: textos.salida.abandonar })).toBeInTheDocument()
  })

  it('en demostracion finalizar para todos cierra la sala local sin afirmar que se ejecuto una operacion remota', async () => {
    const puerto = crearSalaNavegador()
    const finalizar = vi.spyOn(puerto, 'finalizarParaTodos')
    montar(puerto)
    fireEvent.click(barra().getByRole('button', { name: textos.sala.finalizar }))
    await act(async () => fireEvent.click(dialogo().getByRole('button', { name: textos.salida.finalizar_todos })))
    expect(finalizar).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog', { name: textos.salida.titulo })).toBeNull()
  })

  it('con el servicio disponible, finalizar para todos llama al puerto', async () => {
    const puerto = puertoConExito()
    montar(puerto)
    fireEvent.click(barra().getByRole('button', { name: textos.sala.finalizar }))
    await act(async () => fireEvent.click(dialogo().getByRole('button', { name: textos.salida.finalizar_todos })))
    expect(puerto.finalizarParaTodos).toHaveBeenCalledTimes(1)
  })

  it('quien no es organizador no ve la ventana: solo puede abandonar', () => {
    montar(crearSalaNavegador(), (participante) => ({ ...participante, organizador: false }))
    fireEvent.click(barra().getByRole('button', { name: textos.sala.finalizar }))
    expect(screen.queryByRole('dialog', { name: textos.salida.titulo })).toBeNull()
  })
})

describe('Informar un problema', () => {
  it('abre el flujo, deja el informe preparado sin afirmar que se envio', async () => {
    montar()
    abrirMas()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.sala.informar_problema }))
    const dialogo = within(screen.getByRole('dialog', { name: textos.informe.titulo }))
    fireEvent.change(dialogo.getByRole('textbox', { name: textos.informe.etiqueta_campo }), { target: { value: 'No se oye el audio' } })
    await act(async () => fireEvent.click(dialogo.getByRole('button', { name: textos.informe.enviar })))
    expect(dialogo.getByText(textos.informe.preparado)).toBeInTheDocument()
    expect(dialogo.queryByText(textos.informe.enviado)).toBeNull()
  })

  it('con el servicio disponible confirma el envio', async () => {
    montar(puertoConExito())
    abrirMas()
    fireEvent.click(screen.getByRole('menuitem', { name: textos.sala.informar_problema }))
    const dialogo = within(screen.getByRole('dialog', { name: textos.informe.titulo }))
    fireEvent.change(dialogo.getByRole('textbox', { name: textos.informe.etiqueta_campo }), { target: { value: 'Falla' } })
    await act(async () => fireEvent.click(dialogo.getByRole('button', { name: textos.informe.enviar })))
    expect(dialogo.getByText(textos.informe.enviado)).toBeInTheDocument()
  })
})

describe('Contador con presentacion', () => {
  afterEach(() => Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: undefined }))

  it('el participante que presenta no se duplica en el contador', async () => {
    const pista = { stop: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn() }
    const flujo = { getTracks: () => [pista], getVideoTracks: () => [pista] }
    Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getDisplayMedia: vi.fn(async () => flujo) } })
    montar()
    const contador = () => screen.getByRole('button', { name: textos.sala.participantes_boton })
    expect(contador()).toHaveTextContent(String(BASE.length))
    await esperar()
    await act(async () => fireEvent.click(barra().getByRole('button', { name: textos.sala.compartir })))
    expect(screen.getByText(textos.sala.compartiendo_tu_pantalla)).toBeInTheDocument()
    expect(contador()).toHaveTextContent(String(BASE.length))
    if (!screen.queryByRole('complementary', { name: textos.panel.titulo })) abrirPersonas()
    expect(panel().getByRole('heading', { level: 2 })).toHaveTextContent(`${textos.panel.titulo} (${BASE.length})`)
  })
})
