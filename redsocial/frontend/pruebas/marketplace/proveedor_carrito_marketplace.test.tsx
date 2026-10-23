import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import { BarraSuperior } from '@/componentes/compartido/navegacion/barra_superior'
import { RUTA_MARKETPLACE } from '@/componentes/marketplace/bloques/logica_carrito_planes'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '@/mensajes/capacidades/redsocial/textos.json'
import { PLANES_APLICACIONES } from '@/rutas/marketplace/rutas_marketplace'

const TIEMPO_FLUJOS_COMPRA = 30000

const textos = catalogoMarketplace.planes
const carrito = catalogoMarketplace.carrito
const contaplex = PLANES_APLICACIONES['conta-plex']

function abrirPlanes() {
  fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[0])
  return screen.getByRole('dialog', { name: textos.titulo })
}

function agregarPrimerPlan() {
  const planes = abrirPlanes()
  fireEvent.click(within(planes).getAllByRole('button', { name: textos.elegir })[0])
  fireEvent.click(within(planes).getByRole('button', { name: new RegExp(textos.continuar) }))
  return screen.getByRole('dialog', { name: carrito.titulo })
}

function botonCarritoSuperior() {
  return within(screen.getByRole('banner')).getByRole('button', { name: carrito.boton })
}

describe('Carrito en la barra superior', { timeout: TIEMPO_FLUJOS_COMPRA }, () => {
  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('el icono del carrito vive en la barra superior y ya no en el encabezado de Marketplace', () => {
    render(<PaginaMarketplace />)
    expect(botonCarritoSuperior()).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: carrito.boton })).toHaveLength(1)
  })

  it('muestra el contador de aplicaciones y abre el carrito al pulsarlo', () => {
    render(<PaginaMarketplace />)
    expect(within(botonCarritoSuperior().parentElement as HTMLElement).queryByText('1')).toBeNull()
    const modal = agregarPrimerPlan()
    fireEvent.click(within(modal).getByRole('button', { name: textosRedSocial.CERRAR }))
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
    expect(within(botonCarritoSuperior().parentElement as HTMLElement).getByText('1')).toBeInTheDocument()
    fireEvent.click(botonCarritoSuperior())
    expect(screen.getByRole('dialog', { name: carrito.titulo })).toBeInTheDocument()
  })

  it('el proveedor entrega el carrito a cualquier pagina y muestra el carrito vacio con la salida a explorar', () => {
    window.history.pushState({}, '', RUTA_MARKETPLACE)
    render(
      <ProveedorCarritoMarketplace>
        <BarraSuperior />
      </ProveedorCarritoMarketplace>,
    )
    fireEvent.click(botonCarritoSuperior())
    const modal = screen.getByRole('dialog', { name: carrito.titulo })
    expect(within(modal).getByText(carrito.vacio_titulo)).toBeInTheDocument()
    fireEvent.click(within(modal).getByRole('button', { name: carrito.explorar }))
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
  })

  it('la barra superior no muestra el carrito cuando no hay proveedor del carrito', () => {
    render(<BarraSuperior />)
    expect(screen.queryByRole('button', { name: carrito.boton })).toBeNull()
  })
})

function escucharNavegacion() {
  const navegaciones: string[] = []
  const escuchar = (evento: MouseEvent) => {
    const enlace = (evento.target as HTMLElement).closest('a')
    if (enlace) {
      navegaciones.push(new URL(enlace.href).pathname)
      evento.preventDefault()
    }
  }
  document.addEventListener('click', escuchar)
  return { navegaciones, detener: () => document.removeEventListener('click', escuchar) }
}

describe('Salidas del carrito', () => {
  it('el resumen conserva Proceder al pago y ya no ofrece Seguir comprando', () => {
    render(<PaginaMarketplace />)
    const modal = agregarPrimerPlan()
    expect(within(modal).getByRole('button', { name: new RegExp(carrito.proceder) })).toBeInTheDocument()
    expect(within(modal).queryByRole('button', { name: /seguir comprando/i })).toBeNull()
    expect(Object.keys(carrito)).not.toContain('seguir_comprando')
  })

  it('el carrito vacio conserva Explorar aplicaciones: cierra el carrito y fuera de Marketplace lleva a su catalogo', () => {
    const escucha = escucharNavegacion()
    render(<PaginaMarketplace />)
    fireEvent.click(botonCarritoSuperior())
    fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: carrito.explorar }))
    escucha.detener()
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
    expect(escucha.navegaciones).toEqual([RUTA_MARKETPLACE])
  })

  it('dentro de Marketplace, Explorar aplicaciones solo cierra el carrito', () => {
    window.history.pushState({}, '', RUTA_MARKETPLACE)
    const escucha = escucharNavegacion()
    render(<PaginaMarketplace />)
    fireEvent.click(botonCarritoSuperior())
    fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: carrito.explorar }))
    escucha.detener()
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
    expect(escucha.navegaciones).toEqual([])
  })

  it('la X y Escape siguen cerrando el carrito', () => {
    render(<PaginaMarketplace />)
    const modal = agregarPrimerPlan()
    fireEvent.click(within(modal).getByRole('button', { name: textosRedSocial.CERRAR }))
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
    fireEvent.click(botonCarritoSuperior())
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
  })
})

describe('Orden de las aplicaciones en el carrito', () => {
  function agregarSegundaAplicacion() {
    fireEvent.click(botonCarritoSuperior())
    const carro = screen.getByRole('dialog', { name: carrito.titulo })
    fireEvent.click(within(carro).getByRole('button', { name: textosRedSocial.CERRAR }))
    fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[1])
    const planes = screen.getByRole('dialog', { name: textos.titulo })
    fireEvent.click(within(planes).getAllByRole('button', { name: textos.elegir })[0])
    fireEvent.click(within(planes).getByRole('button', { name: new RegExp(textos.continuar) }))
    return screen.getByRole('dialog', { name: carrito.titulo })
  }

  it('cambiar el plan de la primera aplicacion la mantiene en su posicion, sin duplicarla ni afectar a las demas', () => {
    render(<PaginaMarketplace />)
    agregarPrimerPlan()
    const modal = agregarSegundaAplicacion()
    const nombres = () => within(modal).getAllByRole('article').map((a) => a.querySelector('h3')?.textContent)
    const antes = nombres()
    expect(antes).toHaveLength(2)
    expect(antes[0]).toBe(contaplex.nombre)
    fireEvent.click(within(within(modal).getAllByRole('article')[0]).getByRole('button', { name: carrito.cambiar_plan }))
    const selector = screen.getByRole('dialog', { name: textos.titulo })
    fireEvent.click(within(selector).getAllByRole('button', { name: textos.elegir })[2])
    fireEvent.click(within(selector).getByRole('button', { name: new RegExp(textos.continuar) }))
    expect(nombres()).toEqual(antes)
    const primera = within(modal).getAllByRole('article')[0]
    expect(within(primera).getByText(carrito.plan_periodo.replace(':plan', contaplex.tipos[0].planes[2].nombre).replace(':periodo', textos.periodo.mensual))).toBeInTheDocument()
    const segunda = within(modal).getAllByRole('article')[1]
    expect(within(segunda).getByText(new RegExp(carrito.plan_periodo.split(':plan')[0]))).toBeInTheDocument()
  })
})

describe('Modalidades de ContaPlex', () => {
  it('muestran solo Contadores y gestores y Empresas propias', () => {
    render(<PaginaMarketplace />)
    const dialogo = abrirPlanes()
    const grupo = within(dialogo).getByRole('group', { name: textos.modalidad })
    expect(contaplex.tipos.map((t) => t.detalle)).toEqual(['Contadores y gestores', 'Empresas propias'])
    contaplex.tipos.forEach((t) => expect(within(grupo).getByText(t.detalle)).toBeInTheDocument())
    expect(within(grupo).queryByText(/^Para /)).toBeNull()
  })
})

describe('Boton mas de Modulos disponibles', () => {
  it('lleva al apartado de Marketplace', () => {
    const navegaciones: string[] = []
    const escuchar = (evento: MouseEvent) => {
      const enlace = (evento.target as HTMLElement).closest('a')
      if (enlace) {
        navegaciones.push(new URL(enlace.href).pathname)
        evento.preventDefault()
      }
    }
    document.addEventListener('click', escuchar)
    render(<PaginaMarketplace />)
    fireEvent.click(screen.getAllByRole('button', { name: textosRedSocial.AGREGAR_MODULO })[0])
    document.removeEventListener('click', escuchar)
    expect(navegaciones).toContain(RUTA_MARKETPLACE)
  })
})
