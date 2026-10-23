import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import { sembrarTarjetas } from './ayudas_pago'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '@/mensajes/capacidades/redsocial/textos.json'
import { PLANES_APLICACIONES } from '@/rutas/marketplace/rutas_marketplace'

const TIEMPO_FLUJOS_COMPRA = 30000

vi.setConfig({ testTimeout: TIEMPO_FLUJOS_COMPRA })

const textos = catalogoMarketplace.planes
const pago = catalogoMarketplace.pago
const carrito = catalogoMarketplace.carrito
const misCompras = catalogoMarketplace.mis_compras
const contaplex = PLANES_APLICACIONES['conta-plex']

function botonesVerPlanes() {
  return screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) }) as HTMLButtonElement[]
}

function abrirPlanes(montar = true) {
  if (montar) render(<PaginaMarketplace />)
  fireEvent.click(botonesVerPlanes()[0])
  return screen.getByRole('dialog', { name: textos.titulo })
}

function etiquetaMenu(accion: string) {
  return misCompras.menu.find((o) => o.accion === accion)?.etiqueta ?? ''
}

function abrirMenuCompra(seccion: HTMLElement) {
  fireEvent.click(within(seccion).getByRole('button', { name: textosRedSocial.MAS_OPCIONES }))
}

function botonMisCompras() {
  return screen.getByRole('button', { name: new RegExp(catalogoMarketplace.botones.mis_compras) })
}

function comprarPrimerPlan() {
  const pantalla = irAlPago(0)
  fireEvent.click(within(pantalla).getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
  fireEvent.click(within(pantalla).getByRole('button', { name: pago.resumen.activar }))
  fireEvent.click(within(pantalla).getByRole('button', { name: pago.exito.volver }))
}

function irAlPago(indicePlan: number, montar = true) {
  const dialogo = abrirPlanes(montar)
  fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.elegir })[indicePlan])
  fireEvent.click(within(dialogo).getByRole('button', { name: new RegExp(textos.continuar) }))
  fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: new RegExp(carrito.proceder) }))
  return screen.getByRole('dialog', { name: pago.titulo })
}

vi.mock('@/catalogos/capacidades/redsocial/marketplace.json', async (original) => {
  const real = await original<{ default: Record<string, unknown> }>()
  return { default: { ...real.default, super_vip: { habilitado: true } } }
})

describe('Super VIP de Marketplace cuando el servicio esta habilitado', () => {
  beforeEach(() => {
    sembrarTarjetas()
  })

  it('en la pantalla de pago solo se activa tras aceptar los terminos y el Super VIP suma al total', () => {
    const pantalla = irAlPago(1)
    const activar = within(pantalla).getByRole('button', { name: pago.resumen.activar })
    expect(activar).toBeDisabled()
    expect(within(pantalla).getAllByText('S/50').length).toBeGreaterThan(0)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar }))
    expect(within(pantalla).getAllByText('S/550').length).toBeGreaterThan(0)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    expect(activar).toBeEnabled()
  })

  it('el Super VIP llega cerrado, se despliega con sus ocho beneficios y la casilla siempre esta disponible', () => {
    const pantalla = irAlPago(0)
    const alternar = within(pantalla).getByRole('button', { name: pago.vip.mostrar })
    expect(alternar).toHaveAttribute('aria-expanded', 'false')
    expect(within(pantalla).queryByText(pago.vip.actualizaciones)).toBeNull()
    expect(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar })).toBeInTheDocument()
    fireEvent.click(alternar)
    const cerrar = within(pantalla).getByRole('button', { name: pago.vip.ocultar })
    expect(cerrar).toHaveAttribute('aria-expanded', 'true')
    expect(within(pantalla).getByText(pago.vip.actualizaciones)).toBeInTheDocument()
    expect(within(pantalla).getAllByText(/^0[1-8]$/)).toHaveLength(8)
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar }))
    fireEvent.click(cerrar)
    expect(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar })).toBeChecked()
  })

  it('Contratar Super VIP desde el menu lo registra en Servicios adicionales y deja de ofrecerse', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('contratarVip') }))
    fireEvent.click(within(seccion).getByRole('tab', { name: misCompras.pestanas[1].etiqueta.replace(':n', '1') }))
    expect(within(seccion).getByText(misCompras.servicio.titulo)).toBeInTheDocument()
    expect(within(seccion).getByText(misCompras.servicio.para.replace(':nombre', contaplex.nombre))).toBeInTheDocument()
    fireEvent.click(within(seccion).getByRole('tab', { name: misCompras.pestanas[0].etiqueta.replace(':n', '1') }))
    abrirMenuCompra(seccion)
    expect(screen.queryByRole('menuitem', { name: etiquetaMenu('contratarVip') })).toBeNull()
  })

  it('desinstalar con Super VIP lo advierte, quita ambos y no promete borrar datos', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('contratarVip') }))
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('desinstalar') }))
    const confirmar = screen.getByRole('dialog', { name: misCompras.confirmar_titulo.replace(':nombre', contaplex.nombre) })
    expect(within(confirmar).getByText(new RegExp(misCompras.confirmar_vip))).toBeInTheDocument()
    expect(within(confirmar).queryByText(/datos/i)).toBeNull()
    fireEvent.click(within(confirmar).getByRole('button', { name: misCompras.confirmar_si }))
    expect(within(seccion).getByRole('tab', { name: misCompras.pestanas[1].etiqueta.replace(':n', '0') })).toBeInTheDocument()
  })

  it('Super VIP en el pago no hereda el mes gratis: hoy se cobra solo el servicio adicional', () => {
    const pantalla = irAlPago(0)
    expect(within(pantalla).getByText(pago.resumen.cobro_hoy_valor)).toBeInTheDocument()
    fireEvent.click(within(pantalla).getByRole('checkbox', { name: pago.vip.agregar }))
    expect(within(pantalla).queryByText(pago.resumen.cobro_hoy_valor)).toBeNull()
    expect(within(pantalla).getAllByText('S/500').length).toBeGreaterThan(1)
    expect(within(pantalla).getByText(pago.resumen.seguro_vip)).toBeInTheDocument()
  })

  it('si la aplicacion ya tiene Super VIP, el pago de un nuevo plan no lo vuelve a ofrecer', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('contratarVip') }))
    fireEvent.click(within(seccion).getByRole('button', { name: misCompras.mejorar }))
    const planes = screen.getByRole('dialog', { name: textos.titulo })
    fireEvent.click(within(planes).getAllByRole('button', { name: textos.elegir })[1])
    fireEvent.click(within(planes).getByRole('button', { name: new RegExp(textos.continuar) }))
    fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: new RegExp(carrito.proceder) }))
    const pantalla = screen.getByRole('dialog', { name: pago.titulo })
    expect(within(pantalla).queryByRole('checkbox', { name: pago.vip.agregar })).toBeNull()
  })

  it('el menu de la aplicacion ofrece Super VIP, Abrir y Desinstalar', () => {
    comprarPrimerPlan()
    fireEvent.click(botonMisCompras())
    const seccion = screen.getByRole('region', { name: misCompras.titulo })
    abrirMenuCompra(seccion)
    expect(screen.getAllByRole('menuitem').map((i) => i.textContent)).toEqual(misCompras.menu.map((o) => o.etiqueta))
  })
})
