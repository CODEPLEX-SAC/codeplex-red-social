import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { AplicacionRedSocial } from '@/rutas/compartido/aplicacion_red_social'
import { navegar } from '@/rutas/compartido/navegacion'
import { SESION_ACTUAL } from '@/rutas/compartido/rutas_compartido'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

const textos = catalogoAcceso
const panel = textos.panel_usuario
const rutaAcceso = textos.rutas.principal
const rutaInicio = catalogoInicio.rutas.principal
const nombreBoton = panel.abrir.replace(':nombre', SESION_ACTUAL.usuario)

function botonUsuario() {
  return screen.getByRole('button', { name: nombreBoton })
}

function abrirPanel() {
  fireEvent.click(botonUsuario())
  return within(screen.getByRole('dialog', { name: panel.titulo }))
}

function cerrarSesion() {
  fireEvent.click(abrirPanel().getByRole('button', { name: panel.cerrar_sesion }))
}

function iniciarSesionValida() {
  fireEvent.change(screen.getByLabelText(textos.campos.correo), { target: { value: 'persona@ejemplo.com' } })
  fireEvent.change(screen.getByLabelText(textos.campos_contrasena.acceso.etiqueta), { target: { value: 'cualquiera' } })
  fireEvent.submit(screen.getByRole('button', { name: new RegExp(textos.botones.iniciar_sesion) }).closest('form') as HTMLFormElement)
  act(() => {
    vi.advanceTimersByTime(textos.tiempos.carga_ms)
  })
  act(() => {
    vi.advanceTimersByTime(textos.tiempos.exito_ms)
  })
}

describe('Sesion de demostracion', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.history.pushState({}, '', rutaInicio)
  })

  afterEach(() => {
    vi.useRealTimers()
    window.history.pushState({}, '', '/')
  })

  it('usa un unico usuario de demostracion', () => {
    expect(SESION_ACTUAL).toBe(catalogoCompartido.sesion_actual)
  })

  it('muestra al usuario autenticado en la barra superior', () => {
    render(<AplicacionRedSocial />)
    expect(botonUsuario()).toHaveAttribute('aria-expanded', 'false')
    expect(within(botonUsuario()).getByText(SESION_ACTUAL.usuario)).toBeInTheDocument()
    expect(window.location.pathname).toBe(rutaInicio)
  })

  it('abre el panel con avatar, nombre y cerrar sesion', () => {
    render(<AplicacionRedSocial />)
    const dialogo = abrirPanel()
    expect(botonUsuario()).toHaveAttribute('aria-expanded', 'true')
    expect(botonUsuario()).toHaveAttribute('aria-controls', panel.id)
    expect(dialogo.getByText(SESION_ACTUAL.usuario)).toBeInTheDocument()
    expect(dialogo.getByText(SESION_ACTUAL.empresa)).toBeInTheDocument()
    expect(screen.getByRole('dialog').querySelector('img')).not.toBeNull()
    expect(dialogo.getByRole('button', { name: panel.cerrar_sesion })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveFocus()
  })

  it('muestra rol, avatar por defecto y las opciones de cuenta aun no disponibles', () => {
    render(<AplicacionRedSocial />)
    const dialogo = abrirPanel()
    expect(dialogo.getByText(SESION_ACTUAL.rol)).toBeInTheDocument()
    expect(screen.getByRole('dialog').querySelector('img')?.getAttribute('src')).toContain('usuario')
    const opciones = within(dialogo.getByRole('list', { name: panel.etiqueta_opciones })).getAllByRole('button')
    expect(opciones.map((opcion) => opcion.textContent)).toEqual(expect.arrayContaining(panel.opciones.map((o) => expect.stringContaining(o.etiqueta))))
    expect(opciones).toHaveLength(panel.opciones.length)
    for (const opcion of opciones) {
      expect(opcion).toHaveAttribute('aria-disabled', 'true')
      expect(opcion).toHaveAttribute('title', panel.proximamente)
      fireEvent.click(opcion)
    }
    expect(screen.getByRole('dialog', { name: panel.titulo })).toBeInTheDocument()
    expect(window.location.pathname).toBe(rutaInicio)
  })

  it('cierra el panel con el boton, con Escape y devuelve el foco al boton de usuario', () => {
    render(<AplicacionRedSocial />)
    fireEvent.click(abrirPanel().getByRole('button', { name: panel.cerrar }))
    expect(screen.queryByRole('dialog', { name: panel.titulo })).toBeNull()
    expect(botonUsuario()).toHaveFocus()
    expect(botonUsuario()).toHaveAttribute('aria-expanded', 'false')

    abrirPanel()
    fireEvent.keyDown(document, { key: catalogoCompartido.modal.tecla_cerrar })
    expect(screen.queryByRole('dialog', { name: panel.titulo })).toBeNull()
    expect(botonUsuario()).toHaveFocus()
    expect(window.location.pathname).toBe(rutaInicio)
  })

  it('cerrar sesion lleva a acceso y deja de mostrar al usuario', () => {
    render(<AplicacionRedSocial />)
    cerrarSesion()
    expect(window.location.pathname).toBe(rutaAcceso)
    expect(screen.queryByRole('button', { name: nombreBoton })).toBeNull()
    expect(screen.queryByRole('dialog', { name: panel.titulo })).toBeNull()
    expect(screen.getByRole('tab', { name: textos.modos[0].etiqueta })).toHaveAttribute('aria-selected', 'true')
  })

  it('no permite entrar a otras pantallas sin sesion', () => {
    render(<AplicacionRedSocial />)
    cerrarSesion()
    act(() => navegar(rutaInicio))
    expect(window.location.pathname).toBe(rutaAcceso)
    expect(screen.queryByRole('button', { name: nombreBoton })).toBeNull()
  })

  it('volver al demo esta deshabilitado: no navega ni inicia sesion', () => {
    render(<AplicacionRedSocial />)
    cerrarSesion()
    const volver = screen.getByRole('button', { name: new RegExp(textos.botones.volver_al_demo) })
    expect(volver).toBeDisabled()
    fireEvent.click(volver)
    expect(window.location.pathname).toBe(rutaAcceso)
    expect(screen.queryByRole('button', { name: nombreBoton })).toBeNull()
  })

  it('entra con las credenciales precargadas tras cerrar sesion, sin escribir nada', () => {
    render(<AplicacionRedSocial />)
    cerrarSesion()
    expect(screen.getByLabelText(textos.campos.correo)).toHaveValue(textos.demostracion.correo)
    fireEvent.submit(screen.getByRole('button', { name: new RegExp(textos.botones.iniciar_sesion) }).closest('form') as HTMLFormElement)
    act(() => {
      vi.advanceTimersByTime(textos.tiempos.carga_ms + textos.tiempos.exito_ms)
    })
    expect(window.location.pathname).toBe(rutaInicio)
    expect(botonUsuario()).toBeInTheDocument()
  })

  it('recorre el ciclo completo: inicio, panel, cerrar sesion, acceso e iniciar sesion mas de una vez', () => {
    render(<AplicacionRedSocial />)
    expect(botonUsuario()).toBeInTheDocument()

    for (let vuelta = 0; vuelta < 2; vuelta += 1) {
      cerrarSesion()
      expect(window.location.pathname).toBe(rutaAcceso)
      expect(screen.queryByRole('button', { name: nombreBoton })).toBeNull()

      iniciarSesionValida()
      expect(window.location.pathname).toBe(rutaInicio)
      expect(botonUsuario()).toBeInTheDocument()
      expect(within(botonUsuario()).getByText(SESION_ACTUAL.usuario)).toBeInTheDocument()
    }
  }, 30000)
})
