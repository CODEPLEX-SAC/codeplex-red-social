import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { useContext } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DATOS_TARJETA_VALIDA, sembrarTarjetas, tarjetasAlmacenadas, TARJETA_DEMOSTRACION, textoAlmacenado } from './ayudas_pago'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import { ContextoMejoraPlan } from '@/componentes/compartido/carrito/contexto_mejora_plan'
import { ErrorMetodosPago, leerEstadoInicial, registrarMetodoPago, reiniciarMetodosPagoDemostracion } from '@/servicios/marketplace/metodos_pago'
import demostracion from '@/servicios/marketplace/metodos_pago_demostracion.json'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { PLANES_APLICACIONES, SUSCRIPCIONES_DEMOSTRACION } from '@/rutas/marketplace/rutas_marketplace'

vi.mock('@/servicios/marketplace/metodos_pago', async (importarOriginal) => {
  const original = await importarOriginal<typeof import('@/servicios/marketplace/metodos_pago')>()
  return { ...original, registrarMetodoPago: vi.fn(original.registrarMetodoPago), leerEstadoInicial: vi.fn(original.leerEstadoInicial) }
})

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMarketplace.planes
const pago = catalogoMarketplace.pago
const guardado = pago.metodo_guardado
const modal = guardado.modal
const carrito = catalogoMarketplace.carrito
const contaplex = PLANES_APLICACIONES['conta-plex']
const VENCIDA = { id: 't-vencida', marca: 'Visa', ultimos4: '0001', vencimiento: '01/20', predeterminada: true }
const SEGUNDA = { id: 't-segunda', marca: 'Mastercard', ultimos4: '5555', vencimiento: '11/98', predeterminada: false }
const MARCAS: Record<string, string> = { '4242': 'Visa', '5555': 'Mastercard', '0001': 'Visa', '4444': 'Mastercard' }
const tarjeta = (ultimos: string) => guardado.titulo_tarjeta.replace(':marca', MARCAS[ultimos]).replace(':ultimos', ultimos)

function irAlPago() {
  render(<PaginaMarketplace />)
  fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[0])
  const planes = screen.getByRole('dialog', { name: textos.titulo })
  fireEvent.click(within(planes).getAllByRole('button', { name: textos.elegir })[0])
  fireEvent.click(within(planes).getByRole('button', { name: new RegExp(textos.continuar) }))
  fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: new RegExp(carrito.proceder) }))
  return within(screen.getByRole('dialog', { name: pago.titulo }))
}

function aceptarTerminos(pantalla: ReturnType<typeof within>) {
  fireEvent.click(pantalla.getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
}

function escribirTarjeta(pantalla: ReturnType<typeof within>, datos = DATOS_TARJETA_VALIDA) {
  fireEvent.change(pantalla.getByRole('textbox', { name: pago.campos.numero }), { target: { value: datos.numero } })
  fireEvent.change(pantalla.getByRole('textbox', { name: pago.campos.vencimiento }), { target: { value: datos.vencimiento } })
  fireEvent.change(pantalla.getByRole('textbox', { name: pago.campos.cvv }), { target: { value: datos.cvv } })
  fireEvent.change(pantalla.getByRole('textbox', { name: pago.campos.propietario }), { target: { value: datos.titular } })
}

function abrirSelector(pantalla: ReturnType<typeof within>) {
  fireEvent.click(pantalla.getByRole('button', { name: guardado.editar_etiqueta }))
  return within(screen.getByRole('dialog', { name: modal.titulo }))
}

function opcion(selector: ReturnType<typeof within>, ultimos: string) {
  return selector.getByRole('radio', { name: new RegExp(tarjeta(ultimos)) })
}

describe('Compra con una tarjeta guardada', () => {
  beforeEach(() => sembrarTarjetas())

  it('muestra la tarjeta compacta con un unico lapiz, sin formulario ni botones de texto adicionales', () => {
    const pantalla = irAlPago()
    expect(pantalla.getByText(tarjeta('4242'))).toBeInTheDocument()
    expect(pantalla.getByText(pago.guardados.vence.replace(':fecha', '12/99'))).toBeInTheDocument()
    expect(pantalla.getByText(guardado.predeterminada)).toBeInTheDocument()
    expect(pantalla.getAllByRole('button', { name: guardado.editar_etiqueta })).toHaveLength(1)
    expect(pantalla.queryByRole('button', { name: /^(Editar|Cambiar)$/ })).toBeNull()
    expect(pantalla.queryByRole('textbox', { name: pago.campos.numero })).toBeNull()
    expect(pantalla.queryByRole('textbox', { name: pago.campos.cvv })).toBeNull()
  })

  it('permite pagar solo con aceptar los terminos y no cambia ni duplica lo guardado', () => {
    const antes = textoAlmacenado()
    const pantalla = irAlPago()
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    expect(pantalla.getByText(pago.exito.titulo)).toBeInTheDocument()
    expect(tarjetasAlmacenadas()).toHaveLength(1)
    expect(textoAlmacenado()).toBe(antes)
  })

  it('al registrar una tarjeta solo se conservan marca, ultimos cuatro, vencimiento y titular, sin CVV ni numero completo', async () => {
    sembrarTarjetas([])
    const pantalla = irAlPago()
    escribirTarjeta(pantalla)
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    await pantalla.findByText(pago.exito.titulo)
    const [registro] = tarjetasAlmacenadas()
    expect(Object.keys(registro).sort()).toEqual(['id', 'marca', 'predeterminada', 'titular', 'ultimos4', 'vencimiento'])
    expect(registro).toMatchObject({ marca: 'Visa', ultimos4: '4242', vencimiento: '12/99', predeterminada: true })
    expect(textoAlmacenado()).not.toMatch(/4242424242424242|"cvv"/)
  })
})

describe('Pedro Lozano: tarjeta de demostracion guardada', () => {
  const pedro = demostracion.tarjetas[0]
  beforeEach(() => reiniciarMetodosPagoDemostracion())

  it('el pago se abre con la tarjeta de Pedro visible, la seccion Tarjeta expandida y las billeteras contraidas', () => {
    const pantalla = irAlPago()
    expect(demostracion.usuario).toBe('Pedro Lozano')
    expect(pantalla.getByText(guardado.titulo_tarjeta.replace(':marca', pedro.marca).replace(':ultimos', pedro.ultimos4))).toBeVisible()
    expect(pantalla.getByText([pago.guardados.vence.replace(':fecha', pedro.vencimiento), pedro.titular].join(pago.guardados.separador))).toBeVisible()
    expect(pantalla.getByText(guardado.predeterminada)).toBeVisible()
    expect(pantalla.getByRole('button', { name: guardado.editar_etiqueta })).toBeVisible()
    expect(pantalla.queryByRole('textbox', { name: pago.campos.numero })).toBeNull()
    expect(pantalla.getByText(pago.metodos.billetera.titulo)).not.toBeVisible()
  })

  it('permite comprar sin escribir ningun dato de tarjeta y deja el metodo intacto', () => {
    const antes = textoAlmacenado()
    const pantalla = irAlPago()
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    expect(pantalla.getByText(pago.exito.titulo)).toBeInTheDocument()
    expect(textoAlmacenado()).toBe(antes)
  })

  it('abrir el selector y cancelar no cambia la tarjeta de Pedro', () => {
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    fireEvent.click(selector.getByRole('button', { name: modal.cancelar }))
    expect(screen.queryByRole('dialog', { name: modal.titulo })).toBeNull()
    expect(pantalla.getByText(guardado.titulo_tarjeta.replace(':marca', pedro.marca).replace(':ultimos', pedro.ultimos4))).toBeVisible()
  })
})

describe('Mejora de plan con una tarjeta guardada', () => {
  beforeEach(() => sembrarTarjetas())

  function Disparador() {
    const mejora = useContext(ContextoMejoraPlan)
    const superior = contaplex.tipos[0].planes[contaplex.tipos[0].planes.length - 1].id
    return <button type="button" onClick={() => mejora?.contratar({ aplicacion: 'conta-plex', tipo: 'independiente', plan: superior, periodo: 'mensual' })}>disparar</button>
  }

  it('reutiliza el mismo componente y la misma tarjeta, ya visible y sin pedir datos', () => {
    render(
      <ProveedorCarritoMarketplace suscripcionesIniciales={SUSCRIPCIONES_DEMOSTRACION}>
        <Disparador />
      </ProveedorCarritoMarketplace>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'disparar' }))
    const pantalla = within(screen.getByRole('dialog', { name: pago.titulo }))
    expect(pantalla.getByText(tarjeta('4242'))).toBeVisible()
    expect(pantalla.queryByRole('textbox', { name: pago.campos.numero })).toBeNull()
    expect(pantalla.getByRole('button', { name: guardado.editar_etiqueta })).toBeVisible()
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.mejora.activar }))
    expect(pantalla.getByText(pago.mejora.exito.titulo)).toBeInTheDocument()
  })
})

describe('Primera tarjeta', () => {
  it('sin tarjetas muestra el formulario, valida los datos y no avanza con datos invalidos', () => {
    const pantalla = irAlPago()
    expect(pantalla.getByRole('textbox', { name: pago.campos.numero })).toBeInTheDocument()
    expect(pantalla.getByRole('checkbox', { name: guardado.guardar_futuras })).toBeChecked()
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    expect(pantalla.getByText(pago.errores.numero)).toBeInTheDocument()
    expect(pantalla.getByText(pago.errores.cvv)).toBeInTheDocument()
    expect(pantalla.queryByText(pago.exito.titulo)).toBeNull()
    expect(tarjetasAlmacenadas()).toHaveLength(0)
  })

  it('una tarjeta vencida o con numero invalido se rechaza', () => {
    const pantalla = irAlPago()
    escribirTarjeta(pantalla, { ...DATOS_TARJETA_VALIDA, vencimiento: '0120' })
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    expect(pantalla.getByText(pago.errores.vencida)).toBeInTheDocument()
    fireEvent.change(pantalla.getByRole('textbox', { name: pago.campos.numero }), { target: { value: '4242424242424241' } })
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    expect(pantalla.getByText(pago.errores.numero)).toBeInTheDocument()
  })

  it('la primera tarjeta queda predeterminada', async () => {
    const pantalla = irAlPago()
    escribirTarjeta(pantalla)
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    await pantalla.findByText(pago.exito.titulo)
    expect(tarjetasAlmacenadas()).toHaveLength(1)
    expect(tarjetasAlmacenadas()[0].predeterminada).toBe(true)
  })

  it('no guarda la tarjeta si el usuario desmarca la opcion', async () => {
    const pantalla = irAlPago()
    escribirTarjeta(pantalla)
    fireEvent.click(pantalla.getByRole('checkbox', { name: guardado.guardar_futuras }))
    aceptarTerminos(pantalla)
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    await pantalla.findByText(pago.exito.titulo)
    expect(tarjetasAlmacenadas()).toHaveLength(0)
  })

  it('evita envios duplicados: dos pulsaciones seguidas registran una sola tarjeta', async () => {
    const pantalla = irAlPago()
    escribirTarjeta(pantalla)
    aceptarTerminos(pantalla)
    const activar = pantalla.getByRole('button', { name: pago.resumen.activar })
    fireEvent.click(activar)
    fireEvent.click(activar)
    await pantalla.findByText(pago.exito.titulo)
    expect(tarjetasAlmacenadas()).toHaveLength(1)
    expect(vi.mocked(registrarMetodoPago)).toHaveBeenCalledTimes(1)
  })
})

describe('Selector «Método de pago»', () => {
  beforeEach(() => sembrarTarjetas([TARJETA_DEMOSTRACION, SEGUNDA]))

  it('lista las tarjetas con indicador de seleccion, Predeterminada, Agregar otra tarjeta, Cancelar y Usar tarjeta, sin acciones de administracion', () => {
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    expect(selector.getByRole('radiogroup', { name: modal.lista_etiqueta })).toBeInTheDocument()
    expect(opcion(selector, '4242')).toHaveAttribute('aria-checked', 'true')
    expect(opcion(selector, '5555')).toHaveAttribute('aria-checked', 'false')
    expect(selector.getAllByText(guardado.predeterminada)).toHaveLength(1)
    expect(selector.getByRole('button', { name: modal.agregar })).toBeInTheDocument()
    expect(selector.getByRole('button', { name: modal.cancelar })).toBeInTheDocument()
    expect(selector.getByRole('button', { name: modal.usar_tarjeta })).toBeEnabled()
    expect(selector.queryByRole('button', { name: /quitar|actualizar|predeterminada|listo/i })).toBeNull()
  })

  it('elegir otra tarjeta y confirmar actualiza el pedido y cierra el selector', () => {
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    fireEvent.click(opcion(selector, '5555'))
    expect(opcion(selector, '5555')).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(selector.getByRole('button', { name: modal.usar_tarjeta }))
    expect(screen.queryByRole('dialog', { name: modal.titulo })).toBeNull()
    expect(pantalla.getByText(tarjeta('5555'))).toBeInTheDocument()
    expect(pantalla.queryByText(tarjeta('4242'))).toBeNull()
  })

  it('cancelar conserva el metodo que tenia el pedido y no guarda nada', () => {
    const antes = textoAlmacenado()
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    fireEvent.click(opcion(selector, '5555'))
    fireEvent.click(selector.getByRole('button', { name: modal.cancelar }))
    expect(screen.queryByRole('dialog', { name: modal.titulo })).toBeNull()
    expect(pantalla.getByText(tarjeta('4242'))).toBeInTheDocument()
    expect(textoAlmacenado()).toBe(antes)
  })

  it('agregar otra tarjeta usa el formulario compartido, la registra y la deja elegida para confirmar', async () => {
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    fireEvent.click(selector.getByRole('button', { name: modal.agregar }))
    escribirTarjeta(selector, { ...DATOS_TARJETA_VALIDA, numero: '5555555555554444' })
    fireEvent.click(selector.getByRole('button', { name: modal.guardar }))
    await waitFor(() => expect(tarjetasAlmacenadas()).toHaveLength(3))
    expect(await selector.findByRole('radio', { name: new RegExp(tarjeta('4444')) })).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(selector.getByRole('button', { name: modal.usar_tarjeta }))
    expect(pantalla.getByText(tarjeta('4444'))).toBeInTheDocument()
  })

  it('descartar el formulario de una tarjeta nueva no guarda nada', () => {
    const antes = textoAlmacenado()
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    fireEvent.click(selector.getByRole('button', { name: modal.agregar }))
    fireEvent.change(selector.getByRole('textbox', { name: pago.campos.numero }), { target: { value: '5555555555554444' } })
    fireEvent.click(selector.getByRole('button', { name: modal.descartar }))
    expect(selector.queryByRole('textbox', { name: pago.campos.numero })).toBeNull()
    expect(textoAlmacenado()).toBe(antes)
  })
})

describe('Errores y tarjetas vencidas', () => {
  it('un error al guardar una tarjeta muestra el aviso, no simula el guardado y conserva el metodo anterior', async () => {
    sembrarTarjetas()
    const pantalla = irAlPago()
    const selector = abrirSelector(pantalla)
    fireEvent.click(selector.getByRole('button', { name: modal.agregar }))
    escribirTarjeta(selector, { ...DATOS_TARJETA_VALIDA, numero: '5555555555554444' })
    const antes = textoAlmacenado()
    vi.mocked(registrarMetodoPago).mockRejectedValueOnce(new ErrorMetodosPago('escritura'))
    fireEvent.click(selector.getByRole('button', { name: modal.guardar }))
    expect(await selector.findByRole('alert')).toHaveTextContent(guardado.error_escritura)
    expect(textoAlmacenado()).toBe(antes)
    expect(opcion(selector, '4242')).toHaveAttribute('aria-checked', 'true')
    expect(selector.queryByRole('radio', { name: new RegExp(tarjeta('4444')) })).toBeNull()
    expect(selector.getByRole('textbox', { name: pago.campos.numero })).toBeInTheDocument()
  })

  it('un error al pagar con una tarjeta nueva no completa la compra ni inventa el guardado', async () => {
    const pantalla = irAlPago()
    escribirTarjeta(pantalla)
    aceptarTerminos(pantalla)
    vi.mocked(registrarMetodoPago).mockRejectedValueOnce(new ErrorMetodosPago('escritura'))
    fireEvent.click(pantalla.getByRole('button', { name: pago.resumen.activar }))
    expect(await pantalla.findByRole('alert')).toHaveTextContent(guardado.error_escritura)
    expect(pantalla.getByRole('button', { name: pago.resumen.activar })).toBeEnabled()
    expect(pantalla.queryByText(pago.exito.titulo)).toBeNull()
    expect(tarjetasAlmacenadas()).toHaveLength(0)
  })

  it('un error al recuperar los metodos muestra el aviso con Reintentar y se recupera al reintentar', async () => {
    sembrarTarjetas()
    vi.mocked(leerEstadoInicial).mockReturnValueOnce({ tarjetas: [], estado: 'error' })
    const pantalla = irAlPago()
    expect(pantalla.getByRole('alert')).toHaveTextContent(guardado.error_lectura)
    fireEvent.click(pantalla.getByRole('button', { name: guardado.reintentar }))
    expect(await pantalla.findByText(tarjeta('4242'))).toBeInTheDocument()
    expect(pantalla.queryByRole('alert')).toBeNull()
  })

  it('una tarjeta predeterminada vencida no se elige en silencio y aparece deshabilitada en el selector', () => {
    sembrarTarjetas([VENCIDA, SEGUNDA])
    const pantalla = irAlPago()
    expect(pantalla.getByText(guardado.predeterminada_vencida)).toBeInTheDocument()
    expect(pantalla.getByRole('textbox', { name: pago.campos.numero })).toBeInTheDocument()
    expect(pantalla.queryByText(tarjeta('0001'))).toBeNull()
    fireEvent.click(pantalla.getByRole('button', { name: pago.guardados.usar_guardada }))
    const selector = within(screen.getByRole('dialog', { name: modal.titulo }))
    expect(selector.getByText(guardado.vencida)).toBeInTheDocument()
    expect(opcion(selector, '0001')).toBeDisabled()
    expect(opcion(selector, '5555')).toBeEnabled()
    expect(selector.getByRole('button', { name: modal.usar_tarjeta })).toBeDisabled()
  })

  it('con tarjetas pero sin predeterminada se pide elegir una en lugar de seleccionar una al azar', () => {
    sembrarTarjetas([{ ...TARJETA_DEMOSTRACION, predeterminada: false }])
    const pantalla = irAlPago()
    expect(pantalla.getByText(guardado.elegir_valida)).toBeInTheDocument()
    expect(pantalla.queryByText(tarjeta('4242'))).toBeNull()
  })
})
