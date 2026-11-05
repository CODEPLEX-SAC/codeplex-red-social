import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PanelConversacion, conversacionesConEtiqueta, etiquetaDeConversacion } from '@/componentes/mensajeria'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'
import { sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'
import type { Conversacion, EstadoMensajeria, Mensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textos = catalogoMensajeria.conversacion
const clases = catalogoMensajeria.clases.chat
const PEDRO = 'usuario-pedro-lozano'
const T0 = new Date(2026, 9, 26, 15, 5, 0)
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panelEl = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement
const panel = () => within(panelEl())
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))
const idsDelHilo = () => Array.from(panelEl().querySelectorAll('[data-mensaje]')).map((nodo) => nodo.getAttribute('data-mensaje') as string)
const mensajeEl = (id: string) => document.querySelector(`[data-mensaje="${id}"]`) as HTMLElement
const botonOpciones = (id: string) => within(mensajeEl(id)).getByRole('button', { name: textos.opciones_mensaje })
const hilo = (id: string) => ALMACEN_MENSAJERIA.leer().hilos[id] ?? []
const etiqueta = (id: string) => conversacionesConEtiqueta(ALMACEN_MENSAJERIA.leer().conversaciones, ALMACEN_MENSAJERIA.leer(), T0).find((conversacion) => conversacion.id === id)?.etiquetaTiempo
const fila = (id: string) => ALMACEN_MENSAJERIA.leer().conversaciones.find((conversacion) => conversacion.id === id) as Conversacion

function transcurrir(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

function etiquetas(id: string): string[] {
  fireEvent.click(botonOpciones(id))
  const items = screen.queryAllByRole('menuitem').map((item) => item.textContent ?? '')
  fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
  transcurrir(1000)
  return [textos.acciones.editar, textos.acciones.reenviar, textos.acciones.fijar, textos.acciones.desfijar, textos.acciones.eliminar].filter((etiqueta) => items.some((item) => item.endsWith(etiqueta)))
}

function elegir(id: string, accion: string) {
  fireEvent.click(botonOpciones(id))
  fireEvent.click(screen.getAllByRole('menuitem').find((item) => item.textContent?.endsWith(accion)) as HTMLElement)
  transcurrir(1000)
}

function enviar(texto: string) {
  const campo = panel().getByRole('textbox', { name: textos.mensaje })
  fireEvent.change(campo, { target: { value: texto } })
  fireEvent.keyDown(campo, { key: 'Enter' })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(T0)
  sustituirRelojMensajeria(() => new Date())
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Menu de acciones de cada mensaje', () => {
  it('mensajes propios fuera de plazo: Reenviar, Fijar y Eliminar; ajenos: solo Reenviar y Fijar', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    expect(etiquetas('mensaje-002-1')).toEqual([textos.acciones.reenviar, textos.acciones.fijar, textos.acciones.eliminar])
    expect(etiquetas('mensaje-002-2')).toEqual([textos.acciones.reenviar, textos.acciones.fijar])
  })

  it('un mensaje propio recien enviado añade Editar y su menu respeta el plazo de 15 minutos', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    enviar('Hola')
    const id = idsDelHilo().at(-1) as string
    expect(etiquetas(id)).toEqual([textos.acciones.editar, textos.acciones.reenviar, textos.acciones.fijar, textos.acciones.eliminar])
    transcurrir(textos.edicion.limite_minutos * 60000)
    expect(etiquetas(id)).toEqual([textos.acciones.reenviar, textos.acciones.fijar, textos.acciones.eliminar])
  })

  it('el control es un boton real, presente en el DOM y alcanzable por teclado (se revela con hover, foco o toque, sin ocupar espacio), con semantica de menu y cierre con Escape', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    for (const id of idsDelHilo()) {
      const boton = botonOpciones(id)
      expect(boton.tagName).toBe('BUTTON')
      expect(boton).toHaveAttribute('aria-haspopup', 'menu')
      expect(boton.className).not.toMatch(/hidden|invisible/)
      expect(boton.className).toContain('focus-visible:opacity-100')
      expect(boton.className).toContain('pointer-coarse:opacity-100')
    }
    const boton = botonOpciones('mensaje-002-2')
    expect(boton).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(boton)
    expect(boton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    transcurrir(1000)
    expect(screen.queryByRole('menu')).toBeNull()
    expect(boton).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Reenviar', () => {
  it('abre un selector sin la conversacion actual, exige elegir destino y añade el mensaje al hilo de destino', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const original = hilo('conversacion-002')[1]
    const antes = ALMACEN_MENSAJERIA.leer()
    elegir(original.id, textos.acciones.reenviar)
    const dialogo = within(screen.getByRole('dialog', { name: textos.reenviar_modal.titulo }))
    expect(dialogo.queryByRole('button', { name: /Luis Rodríguez/ })).toBeNull()
    fireEvent.click(dialogo.getByRole('button', { name: textos.reenviar_modal.enviar_a.replace(':nombre', 'Carmen López') }))
    expect(dialogo.getByRole('button', { name: textos.reenviar_modal.enviar_a.replace(':nombre', 'Carmen López') })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: textos.reenviar_modal.cerrar }))
    expect(screen.queryByRole('dialog')).toBeNull()

    const destino = hilo('conversacion-004')
    const nuevo = destino[destino.length - 1]
    expect(destino).toHaveLength(antes.hilos['conversacion-004'].length + 1)
    expect(nuevo).toMatchObject({ autorId: PEDRO, contenido: original.contenido, reenviado: true })
    expect(fila('conversacion-004').extracto).toBe(`Tú: ${original.contenido}`)
    expect(etiqueta('conversacion-004')).toBe('03:05 PM')
    expect(fila('conversacion-004').noLeidos).toBe(antes.conversaciones[3].noLeidos)
    expect(hilo('conversacion-002')).toEqual(antes.hilos['conversacion-002'])
    expect(ALMACEN_MENSAJERIA.leer().conversaciones.map((conversacion) => conversacion.id)).toEqual(antes.conversaciones.map((conversacion) => conversacion.id))
    abrir('Carmen López')
    expect(panel().getByText(textos.reenviado)).toBeInTheDocument()
  })

  it('cancelar el selector no reenvia nada', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const antes = ALMACEN_MENSAJERIA.leer()
    elegir('mensaje-002-2', textos.acciones.reenviar)
    fireEvent.click(screen.getByRole('button', { name: textos.reenviar_modal.cerrar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(ALMACEN_MENSAJERIA.leer()).toBe(antes)
  })
})

describe('Fijar, desfijar y cerrar la franja', () => {
  const franja = () => panelEl().querySelector(`.${clases.fijado.split(' ').join('.')}`)

  it('la franja de María sale del estado de la conversacion y muestra el mensaje fijado real', () => {
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    const fijadoId = fila('conversacion-001').mensajeFijadoId as string
    const mensaje = hilo('conversacion-001').find((candidato) => candidato.id === fijadoId) as Mensaje
    expect(franja()?.textContent).toContain(mensaje.contenido)
    expect(etiquetas(fijadoId)).toContain(textos.acciones.desfijar)
  })

  it('fijar muestra el mensaje en la franja, cerrar solo la oculta y desfijar cambia el estado', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    expect(franja()).toBeNull()
    const original = hilo('conversacion-002')[1]
    elegir(original.id, textos.acciones.fijar)
    expect(fila('conversacion-002').mensajeFijadoId).toBe(original.id)
    expect(franja()?.textContent).toContain(original.contenido)

    fireEvent.click(panel().getByRole('button', { name: textos.cerrar_fijado }))
    expect(franja()).toBeNull()
    expect(fila('conversacion-002').mensajeFijadoId).toBe(original.id)
    expect(hilo('conversacion-002')).toContain(original)
    expect(etiquetas(original.id)).toContain(textos.acciones.desfijar)

    elegir(original.id, textos.acciones.desfijar)
    expect(fila('conversacion-002').mensajeFijadoId).toBeUndefined()
    elegir(original.id, textos.acciones.fijar)
    expect(franja()?.textContent).toContain(original.contenido)
  })

  it('fijar otro mensaje sustituye al anterior', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('mensaje-002-2', textos.acciones.fijar)
    elegir('mensaje-002-3', textos.acciones.fijar)
    expect(fila('conversacion-002').mensajeFijadoId).toBe('mensaje-002-3')
    expect(etiquetas('mensaje-002-2')).toContain(textos.acciones.fijar)
  })
})

describe('Eliminar con confirmacion', () => {
  it('cancelar la confirmacion conserva el mensaje', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('mensaje-002-1', textos.acciones.eliminar)
    expect(screen.getByRole('dialog', { name: textos.eliminar_modal.titulo })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: textos.eliminar_modal.cancelar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(idsDelHilo()).toContain('mensaje-002-1')
  })

  it('confirmar elimina un mensaje intermedio sin tocar extracto ni hora', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const antes = fila('conversacion-002')
    const etiquetaAntes = etiqueta('conversacion-002')
    elegir('mensaje-002-1', textos.acciones.eliminar)
    fireEvent.click(screen.getByRole('button', { name: textos.eliminar_modal.confirmar }))
    expect(idsDelHilo()).not.toContain('mensaje-002-1')
    expect(panel().queryByText('Buen día Luis, ¿ya tienes el informe de costos?')).toBeNull()
    expect(fila('conversacion-002')).toMatchObject({ extracto: antes.extracto })
    expect(etiqueta('conversacion-002')).toBe(etiquetaAntes)
  })

  it('eliminar el ultimo mensaje propio deja extracto y hora coherentes con el nuevo ultimo', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    enviar('Mensaje temporal')
    expect(fila('conversacion-002').extracto).toBe('Tú: Mensaje temporal')
    const id = idsDelHilo().at(-1) as string
    elegir(id, textos.acciones.eliminar)
    fireEvent.click(screen.getByRole('button', { name: textos.eliminar_modal.confirmar }))
    const ultimo = hilo('conversacion-002').at(-1) as Mensaje
    expect(fila('conversacion-002').extracto).toBe(ultimo.contenido)
    expect(etiqueta('conversacion-002')).toBe(etiquetaDeConversacion(ultimo.creadoEn, T0))
  })

  it('eliminar el mensaje fijado retira la franja', () => {
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    const fijadoId = fila('conversacion-001').mensajeFijadoId as string
    elegir(fijadoId, textos.acciones.eliminar)
    fireEvent.click(screen.getByRole('button', { name: textos.eliminar_modal.confirmar }))
    expect(fila('conversacion-001').mensajeFijadoId).toBeUndefined()
    expect(panelEl().querySelector(`.${clases.fijado.split(' ').join('.')}`)).toBeNull()
  })

  it('un identificador nuevo nunca repite el de un mensaje eliminado', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    elegir('mensaje-002-1', textos.acciones.eliminar)
    fireEvent.click(screen.getByRole('button', { name: textos.eliminar_modal.confirmar }))
    enviar('Uno')
    enviar('Dos')
    const ids = idsDelHilo()
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('Agrupacion de mensajes consecutivos y presencia', () => {
  const base: EstadoMensajeria = {
    participantes: [
      { id: 'participante-020', nombre: 'Rosa Quispe' },
      { id: 'maria-fernandez', nombre: 'María Fernández' },
    ],
    conversaciones: [
      { id: 'conversacion-101', nombre: 'Grupo de prueba', extracto: '', noLeidos: 0, favorita: false, enLinea: false, participantes: ['participante-020', 'maria-fernandez'], esGrupo: true },
      { id: 'conversacion-102', nombre: 'María Fernández', extracto: '', noLeidos: 0, favorita: false, enLinea: true, participantes: ['maria-fernandez'] },
    ],
    hilos: {},
  }
  const mensaje = (n: number, autorId: string, creadoEn: string): Mensaje => ({ id: `mensaje-101-${n}`, autorId, creadoEn, contenido: `Texto ${n}`, hora: '10:00 AM' })
  const hiloDePrueba = [
    mensaje(1, 'participante-020', '2026-10-26T10:00:00'),
    mensaje(2, 'participante-020', '2026-10-26T10:01:00'),
    mensaje(3, 'participante-020', '2026-10-26T10:02:00'),
    mensaje(4, PEDRO, '2026-10-26T10:03:00'),
    mensaje(5, 'maria-fernandez', '2026-10-26T10:04:00'),
    mensaje(6, 'maria-fernandez', '2026-10-27T09:00:00'),
  ]

  function montar() {
    const noop = () => undefined
    return render(
      <PanelConversacion
        conversacion={base.conversaciones[0]}
        mensajes={hiloDePrueba}
        participantes={base.participantes}
        usuarioId={PEDRO}
        ahora={T0}
        conversaciones={base.conversaciones}
        onEnviar={noop}
        onEditar={() => false}
        onEliminar={noop}
        onReenviar={noop}
        onFijar={noop}
        onVolver={noop}
        oculta={false}
      />,
    )
  }
  const burbuja = (n: number) => mensajeEl(`mensaje-101-${n}`).querySelector(`.${clases.burbuja.split(' ')[0]}`) as HTMLElement

  it('ajusta las esquinas segun la posicion en el grupo y rompe el grupo al cambiar de remitente o de dia', () => {
    montar()
    expect(burbuja(1).className).toContain(clases.esquinas_ajena.primera)
    expect(burbuja(2).className).toContain(clases.esquinas_ajena.media)
    expect(burbuja(3).className).toContain(clases.esquinas_ajena.ultima)
    expect(burbuja(4).className).toContain(clases.esquinas_propia.sola)
    expect(burbuja(5).className).toContain(clases.esquinas_ajena.sola)
    expect(burbuja(6).className).toContain(clases.esquinas_ajena.sola)
  })

  it('muestra el nombre al inicio del grupo y el avatar solo en el ultimo mensaje consecutivo', () => {
    montar()
    const nombre = (n: number) => within(mensajeEl(`mensaje-101-${n}`)).queryByText('Rosa Quispe')
    expect(nombre(1)).toBeInTheDocument()
    expect(nombre(2)).toBeNull()
    expect(nombre(3)).toBeNull()
    const huecos = (n: number) => mensajeEl(`mensaje-101-${n}`).querySelectorAll(`.${clases.avatar_hueco.split(' ')[0]}`).length
    expect([huecos(1), huecos(2), huecos(3)]).toEqual([1, 1, 0])
    expect(huecos(4)).toBe(0)
  })

  it('mantiene los separadores de dia y la diferencia entre propios y ajenos', () => {
    montar()
    expect(within(mensajeEl('mensaje-101-1')).getByText('Lunes, 26 de octubre')).toBeInTheDocument()
    expect(within(mensajeEl('mensaje-101-6')).getByText('Martes, 27 de octubre')).toBeInTheDocument()
    expect(mensajeEl('mensaje-101-4').querySelector(`.${clases.mensaje_propio.split(' ')[0]}`)).not.toBeNull()
    expect(mensajeEl('mensaje-101-1').querySelector(`.${clases.mensaje_ajeno}`)).not.toBeNull()
  })

  it('la presencia del remitente de un grupo solo aparece cuando su estado esta definido', () => {
    montar()
    const presencia = (n: number) => mensajeEl(`mensaje-101-${n}`).querySelectorAll('[data-estado]').length
    expect(presencia(3)).toBe(0)
    expect(presencia(5)).toBe(1)
    expect(presencia(6)).toBe(1)
  })

  it('la lista de conversaciones muestra la presencia solo de los contactos individuales en linea', () => {
    render(<PaginaMensajesTodos />)
    const enLinea = INICIAL.conversaciones.filter((conversacion) => conversacion.enLinea && !conversacion.esGrupo)
    expect(lista().querySelectorAll('[data-estado="conectado"]')).toHaveLength(enLinea.length)
    for (const conversacion of INICIAL.conversaciones) {
      const filaEl = within(lista()).getByRole('button', { name: new RegExp(`^${conversacion.nombre}`) })
      expect((filaEl.closest('[data-fila-conversacion]') as HTMLElement).querySelectorAll('[data-estado]').length).toBe(conversacion.enLinea && !conversacion.esGrupo ? 1 : 0)
    }
  })
})
