import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaAcceso } from '@/paginas/acceso/pagina_acceso'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

const textos = catalogoAcceso
const carrusel = textos.carrusel

function contador(actual: number) {
  return carrusel.contador.replace(':actual', String(actual)).replace(':total', String(carrusel.imagenes.length))
}

function campoCorreo() {
  return screen.getByLabelText(textos.campos.correo) as HTMLInputElement
}

function campoContrasena() {
  return screen.getByLabelText(textos.campos_contrasena.acceso.etiqueta) as HTMLInputElement
}

function botonEntrar() {
  return screen.getByRole('button', { name: new RegExp(textos.botones.iniciar_sesion) })
}

function enviar() {
  fireEvent.submit(botonEntrar().closest('form') as HTMLFormElement)
}

describe('PaginaAcceso', () => {
  afterEach(() => {
    vi.useRealTimers()
    window.history.pushState({}, '', '/')
  })

  it('muestra el selector de modo con ambas opciones disponibles', () => {
    render(<PaginaAcceso />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
    const pestanas = within(screen.getByRole('tablist', { name: textos.etiqueta_modos }))
    expect(pestanas.getByRole('tab', { name: textos.modos[0].etiqueta })).toHaveAttribute('aria-selected', 'true')
    const crear = pestanas.getByRole('tab', { name: textos.modos[1].etiqueta })
    expect(crear).toBeEnabled()
    expect(crear).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', textos.modos[0].id)
  })

  it('no ofrece acciones sociales que no funcionan', () => {
    render(<PaginaAcceso />)
    expect(screen.getByRole('button', { name: textos.botones.continuar_con_google })).toBeDisabled()
    expect(screen.queryByText(/Facebook|Instagram|TikTok/)).toBeNull()
  })

  it('llega con las credenciales de demostracion precargadas y la contrasena oculta', () => {
    render(<PaginaAcceso />)
    expect(campoCorreo()).toHaveValue(textos.demostracion.correo)
    expect(campoContrasena()).toHaveValue(textos.demostracion.contrasena)
    expect(campoContrasena()).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: textos.campos_contrasena.acceso.mostrar })).toBeInTheDocument()
    expect(screen.queryByText(textos.errores.correo_obligatorio)).toBeNull()
    expect(screen.queryByText(textos.errores.contrasena_obligatoria)).toBeNull()
    expect(campoCorreo()).not.toHaveAttribute('aria-invalid', 'true')
    expect(campoContrasena()).not.toHaveAttribute('aria-invalid', 'true')
  })

  it('valida correo y contrasena antes de iniciar', () => {
    render(<PaginaAcceso />)
    fireEvent.change(campoCorreo(), { target: { value: '' } })
    fireEvent.change(campoContrasena(), { target: { value: '' } })
    enviar()
    expect(screen.getByText(textos.errores.correo_obligatorio)).toBeInTheDocument()
    expect(screen.getByText(textos.errores.contrasena_obligatoria)).toBeInTheDocument()

    fireEvent.change(campoCorreo(), { target: { value: 'sin-arroba' } })
    expect(screen.queryByText(textos.errores.correo_obligatorio)).toBeNull()
    enviar()
    expect(screen.getByText(textos.errores.correo_invalido)).toBeInTheDocument()
  })

  it('muestra y oculta la contrasena', () => {
    render(<PaginaAcceso />)
    expect(campoContrasena()).toHaveAttribute('type', 'password')
    fireEvent.click(screen.getByRole('button', { name: textos.campos_contrasena.acceso.mostrar }))
    expect(campoContrasena()).toHaveAttribute('type', 'text')
    expect(campoContrasena()).toHaveValue(textos.demostracion.contrasena)
    expect(screen.getByRole('button', { name: textos.campos_contrasena.acceso.ocultar })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: textos.campos_contrasena.acceso.ocultar }))
    expect(campoContrasena()).toHaveAttribute('type', 'password')
  })

  it('recorre carga y exito y luego entra a Inicio sin autenticar', () => {
    vi.useFakeTimers()
    render(<PaginaAcceso />)
    fireEvent.change(campoCorreo(), { target: { value: 'persona@ejemplo.com' } })
    fireEvent.change(campoContrasena(), { target: { value: 'cualquiera' } })
    enviar()

    expect(screen.getByText(textos.mensajes.validando_acceso)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: new RegExp(textos.mensajes.validando_acceso) })).toBeDisabled()

    act(() => {
      vi.advanceTimersByTime(textos.tiempos.carga_ms)
    })
    expect(screen.getByRole('button', { name: textos.mensajes.acceso_concedido })).toBeDisabled()
    expect(window.location.pathname).not.toBe(catalogoInicio.rutas.principal)

    act(() => {
      vi.advanceTimersByTime(textos.tiempos.exito_ms)
    })
    expect(window.location.pathname).toBe(catalogoInicio.rutas.principal)
  })

  it('deja Volver al demo visible pero deshabilitado y sin efecto', () => {
    window.history.pushState({}, '', textos.rutas.principal)
    render(<PaginaAcceso />)
    const volver = screen.getByRole('button', { name: new RegExp(textos.botones.volver_al_demo) })
    expect(volver).toBeDisabled()
    expect(volver).toHaveAttribute('title', textos.mensajes.demo_proximamente)
    fireEvent.click(volver)
    expect(window.location.pathname).toBe(textos.rutas.principal)
    expect(screen.queryByText(textos.mensajes.acceso_concedido)).toBeNull()
  })

  it('inicia sesion con las credenciales precargadas sin escribir nada', () => {
    vi.useFakeTimers()
    render(<PaginaAcceso />)
    enviar()
    expect(screen.getByRole('button', { name: new RegExp(textos.mensajes.validando_acceso) })).toBeDisabled()
    act(() => {
      vi.advanceTimersByTime(textos.tiempos.carga_ms)
    })
    expect(screen.getByRole('button', { name: textos.mensajes.acceso_concedido })).toBeDisabled()
    act(() => {
      vi.advanceTimersByTime(textos.tiempos.exito_ms)
    })
    expect(window.location.pathname).toBe(catalogoInicio.rutas.principal)
  })
})

describe('Carrusel del panel visual de acceso', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('arranca en la primera imagen y navega con flechas e indicadores', () => {
    render(<PaginaAcceso />)
    expect(screen.getByText(contador(1))).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: carrusel.siguiente }))
    expect(screen.getByText(contador(2))).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: carrusel.anterior }))
    fireEvent.click(screen.getByRole('button', { name: carrusel.anterior }))
    expect(screen.getByText(contador(carrusel.imagenes.length))).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: carrusel.ir_a_imagen.replace(':numero', '2') }))
    expect(screen.getByText(contador(2))).toBeInTheDocument()
    expect(screen.getByRole('button', { name: carrusel.ir_a_imagen.replace(':numero', '2') })).toHaveAttribute('aria-current', 'true')
  })

  it('oculta a los lectores las imagenes que no estan activas', () => {
    render(<PaginaAcceso />)
    const activas = carrusel.imagenes.filter((imagen) => screen.getByAltText(imagen.descripcion).getAttribute('aria-hidden') === 'false')
    expect(activas).toHaveLength(1)
  })

  it('cambia sola, se pausa con el puntero y se reanuda al salir', () => {
    vi.useFakeTimers()
    render(<PaginaAcceso />)
    act(() => {
      vi.advanceTimersByTime(carrusel.intervalo_ms)
    })
    expect(screen.getByText(contador(2))).toBeInTheDocument()

    const panel = screen.getByRole('region', { name: carrusel.etiqueta })
    fireEvent.mouseEnter(panel)
    act(() => {
      vi.advanceTimersByTime(carrusel.intervalo_ms * 2)
    })
    expect(screen.getByText(contador(2))).toBeInTheDocument()

    fireEvent.mouseLeave(panel)
    act(() => {
      vi.advanceTimersByTime(carrusel.intervalo_ms)
    })
    expect(screen.getByText(contador(3))).toBeInTheDocument()
  })
})
