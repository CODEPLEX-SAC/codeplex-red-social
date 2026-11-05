import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { PaginaMensajesNoLeidos } from '@/paginas/mensajeria/pagina_mensajes_no_leidos'
import { ProveedorInsigniasNavegacion } from '@/rutas/compartido/proveedor_insignias_navegacion'
import { marcarConversacionLeida } from '@/componentes/mensajeria'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { reiniciarMensajeriaDemostracion } from '../../servicios/mensajeria/almacen_mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'

const conversacionesConNoLeidos = INICIAL.conversaciones.filter((conversacion) => conversacion.noLeidos > 0)
const mensajesSinLeer = INICIAL.conversaciones.reduce((suma, conversacion) => suma + conversacion.noLeidos, 0)
const enlaceMensajes = () => Array.from(document.querySelectorAll('nav p')).find((nodo) => /^Mensajes\d*$/.test(nodo.textContent ?? ''))?.closest('[role="button"]') as HTMLElement
const insigniaMenu = () => (enlaceMensajes().textContent ?? '').replace(/\D/g, '')
const marcarLeida = (id: string) => act(() => ALMACEN_MENSAJERIA.modificar((estado) => marcarConversacionLeida(estado, id)))

beforeEach(() => {
  reiniciarMensajeriaDemostracion()
})

describe('Insignia «Mensajes» del menu lateral', () => {
  it('cuenta conversaciones con mensajes sin leer, no mensajes individuales', () => {
    expect(mensajesSinLeer).toBeGreaterThan(conversacionesConNoLeidos.length)
    render(
      <ProveedorInsigniasNavegacion>
        <PaginaMensajesNoLeidos />
      </ProveedorInsigniasNavegacion>,
    )
    expect(insigniaMenu()).toBe(String(conversacionesConNoLeidos.length))
  })

  it('coincide con el chip «No leidos» de la propia pagina', () => {
    render(
      <ProveedorInsigniasNavegacion>
        <PaginaMensajesNoLeidos />
      </ProveedorInsigniasNavegacion>,
    )
    const chip = screen.getAllByRole('tab', { name: new RegExp(catalogoMensajeria.titulos_pestanas.no_leidos) })[0]
    expect(chip.textContent?.replace(/\D/g, '')).toBe(insigniaMenu())
  })

  it('se actualiza sin recargar al leer una conversacion y baja de uno en uno aunque tenga varios mensajes', () => {
    render(
      <ProveedorInsigniasNavegacion>
        <PaginaMensajesNoLeidos />
      </ProveedorInsigniasNavegacion>,
    )
    const conVarios = INICIAL.conversaciones.find((conversacion) => conversacion.noLeidos > 1) as (typeof INICIAL.conversaciones)[number]
    marcarLeida(conVarios.id)
    expect(insigniaMenu()).toBe(String(conversacionesConNoLeidos.length - 1))
  })

  it('desaparece cuando no queda ninguna conversacion sin leer', () => {
    render(
      <ProveedorInsigniasNavegacion>
        <PaginaMensajesNoLeidos />
      </ProveedorInsigniasNavegacion>,
    )
    conversacionesConNoLeidos.forEach((conversacion) => marcarLeida(conversacion.id))
    expect(insigniaMenu()).toBe('')
  })

  it('sin proveedor no inventa ninguna cifra', () => {
    render(<PaginaMensajesNoLeidos />)
    expect(insigniaMenu()).toBe('')
  })

  it('en Inicio el menu cuenta conversaciones y el boton flotante cuenta mensajes', () => {
    render(
      <ProveedorInsigniasNavegacion>
        <PaginaInicio />
      </ProveedorInsigniasNavegacion>,
    )
    const flotante = (screen.getByRole('button', { name: catalogoInicio.mensajes_flotantes.boton }).parentElement) as HTMLElement
    expect(insigniaMenu()).toBe(String(conversacionesConNoLeidos.length))
    expect(within(flotante).getByText(String(mensajesSinLeer))).toBeInTheDocument()
    marcarLeida(conversacionesConNoLeidos[0].id)
    expect(insigniaMenu()).toBe(String(conversacionesConNoLeidos.length - 1))
    expect(within(flotante).getByText(String(mensajesSinLeer - conversacionesConNoLeidos[0].noLeidos))).toBeInTheDocument()
  })

  it('abrir una conversacion en la ventana flotante actualiza la insignia del menu', () => {
    render(
      <ProveedorInsigniasNavegacion>
        <PaginaInicio />
      </ProveedorInsigniasNavegacion>,
    )
    fireEvent.click(screen.getByRole('button', { name: catalogoInicio.mensajes_flotantes.boton }))
    const ventana = within(screen.getByRole('region', { name: catalogoInicio.mensajes_flotantes.titulo }))
    fireEvent.click(ventana.getByText(conversacionesConNoLeidos[0].nombre, { selector: 'strong' }).closest('button') as HTMLElement)
    expect(insigniaMenu()).toBe(String(conversacionesConNoLeidos.length - 1))
  })
})
