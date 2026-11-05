import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sembrarTarjetas } from './ayudas_pago'
import { ProveedorEmpresaActiva } from '@/componentes/compartido/sesion/proveedor_empresa_activa'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import { EMPRESAS } from '@/servicios/empresas/empresas'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMarketplace.planes
const pago = catalogoMarketplace.pago
const carrito = catalogoMarketplace.carrito
const flujo = catalogoCompartido.flujo_pago.textos
const perfiles = flujo.perfiles
const ACTIVA = EMPRESAS.find((empresa) => catalogoCompartido.sesion_actual.ruc.includes(empresa.ruc))!
const VALIDAS = EMPRESAS.filter((empresa) => empresa.estado === 'activa' && /^\d{11}$/.test(empresa.ruc))

function irAlPago() {
  render(
    <ProveedorEmpresaActiva empresas={EMPRESAS}>
      <PaginaMarketplace />
    </ProveedorEmpresaActiva>,
  )
  fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[0])
  const planes = screen.getByRole('dialog', { name: textos.titulo })
  fireEvent.click(within(planes).getAllByRole('button', { name: textos.elegir })[0])
  fireEvent.click(within(planes).getByRole('button', { name: new RegExp(textos.continuar) }))
  fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: new RegExp(carrito.proceder) }))
  return within(screen.getByRole('dialog', { name: pago.titulo }))
}

describe('Marketplace como consumidor de la facturación compartida', () => {
  beforeEach(() => sembrarTarjetas())

  it('muestra por defecto la empresa activa de la sesión con sus datos reales', () => {
    const pantalla = irAlPago()
    expect(pantalla.getByText(ACTIVA.nombre)).toBeInTheDocument()
    for (const dato of [ACTIVA.ruc, ACTIVA.direccion, ACTIVA.correo, ACTIVA.telefono]) {
      expect(pantalla.getByText(dato, { exact: false })).toBeInTheDocument()
    }
    expect(pantalla.queryByRole('textbox', { name: flujo.campos.documento })).toBeNull()
  })

  it('ofrece solo las empresas activas con RUC válido como perfiles', () => {
    const pantalla = irAlPago()
    expect(VALIDAS.length).toBeGreaterThan(1)
    expect(pantalla.getByRole('button', { name: new RegExp(`[(]${VALIDAS.length}[)]`) })).toBeInTheDocument()
  })

  it('editar abre el formulario precargado y cancelar conserva los datos', () => {
    const pantalla = irAlPago()
    fireEvent.click(pantalla.getByRole('button', { name: perfiles.editar_etiqueta }))
    expect(pantalla.getByRole('textbox', { name: flujo.campos.documento })).toHaveValue(ACTIVA.ruc)
    expect(pantalla.getByRole('textbox', { name: flujo.campos.direccion })).toHaveValue(ACTIVA.direccion)
    fireEvent.change(pantalla.getByRole('textbox', { name: flujo.campos.direccion }), { target: { value: 'Otra calle 1' } })
    fireEvent.click(pantalla.getByRole('button', { name: perfiles.cancelar }))
    expect(pantalla.getByText(ACTIVA.direccion, { exact: false })).toBeInTheDocument()
    expect(pantalla.queryByText('Otra calle 1', { exact: false })).toBeNull()
  })

  it('guardar actualiza el mismo perfil y no cambia la cantidad de perfiles', async () => {
    const pantalla = irAlPago()
    fireEvent.click(pantalla.getByRole('button', { name: perfiles.editar_etiqueta }))
    fireEvent.change(pantalla.getByRole('textbox', { name: flujo.campos.direccion }), { target: { value: 'Av. Nueva 500' } })
    fireEvent.click(pantalla.getByRole('button', { name: perfiles.guardar_cambios }))
    expect(await pantalla.findByText('Av. Nueva 500', { exact: false })).toBeInTheDocument()
    expect(pantalla.getByRole('button', { name: new RegExp(`[(]${VALIDAS.length}[)]`) })).toBeInTheDocument()
  })

  it('agregar un perfil nuevo suma uno y no sobrescribe la empresa activa', async () => {
    const pantalla = irAlPago()
    fireEvent.click(pantalla.getByRole('button', { name: perfiles.agregar }))
    fireEvent.change(pantalla.getByRole('textbox', { name: flujo.campos.documento }), { target: { value: '20999999999' } })
    fireEvent.change(pantalla.getByRole('textbox', { name: flujo.campos.razon }), { target: { value: 'Cliente Nuevo SAC' } })
    fireEvent.click(pantalla.getByRole('button', { name: perfiles.guardar }))
    expect(await pantalla.findByText('Cliente Nuevo SAC')).toBeInTheDocument()
    await waitFor(() => expect(pantalla.getByRole('button', { name: new RegExp(`[(]${VALIDAS.length + 1}[)]`) })).toBeInTheDocument())
  })

  it('permite elegir otra empresa como perfil de facturación', async () => {
    const pantalla = irAlPago()
    const otra = VALIDAS.find((empresa) => empresa.codigo !== ACTIVA.codigo)!
    fireEvent.click(pantalla.getByRole('button', { name: new RegExp(`[(]${VALIDAS.length}[)]`) }))
    const selector = within(screen.getAllByRole('dialog').at(-1) as HTMLElement)
    fireEvent.click(selector.getByRole('button', { name: new RegExp(otra.nombre) }))
    expect(await pantalla.findByText(otra.ruc, { exact: false })).toBeInTheDocument()
  })
})
