import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaAcceso } from '@/paginas/acceso/pagina_acceso'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'

const textos = catalogoAcceso
const confirmacionContrasena = textos.campos_contrasena.confirmacion
const nuevaContrasena = textos.campos_contrasena.nueva

function pestana(clave: 'iniciar_sesion' | 'crear_cuenta') {
  const opcion = textos.modos.find((modo) => modo.clave === clave)
  return screen.getByRole('tab', { name: opcion?.etiqueta })
}

function abrirCrearCuenta() {
  render(<PaginaAcceso />)
  fireEvent.click(pestana('crear_cuenta'))
}

function campo(etiqueta: string) {
  return screen.getByLabelText(etiqueta) as HTMLInputElement
}

function escribir(etiqueta: string, valor: string) {
  fireEvent.change(campo(etiqueta), { target: { value: valor } })
}

function enviar() {
  fireEvent.submit(screen.getByRole('button', { name: new RegExp(textos.botones.crear_cuenta) }).closest('form') as HTMLFormElement)
}

function completarValido() {
  escribir(textos.campos.nombre, 'Ana Torres')
  escribir(textos.campos.correo, 'ana@ejemplo.com')
  escribir(nuevaContrasena.etiqueta, 'secreta1')
  escribir(confirmacionContrasena.etiqueta, 'secreta1')
}

describe('Selector de modo de acceso', () => {
  it('cambia a Crear cuenta y regresa a Iniciar sesion', () => {
    render(<PaginaAcceso />)
    expect(pestana('crear_cuenta')).toBeEnabled()
    fireEvent.click(pestana('crear_cuenta'))
    expect(pestana('crear_cuenta')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByLabelText(textos.campos.nombre)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: textos.botones.continuar_con_google })).toBeNull()
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', textos.modos[1].id)

    fireEvent.click(pestana('iniciar_sesion'))
    expect(pestana('iniciar_sesion')).toHaveAttribute('aria-selected', 'true')
    expect(screen.queryByLabelText(textos.campos.nombre)).toBeNull()
    expect(screen.getByRole('button', { name: new RegExp(textos.botones.iniciar_sesion) })).toBeInTheDocument()
  })

  it('se mueve con las flechas, Inicio y Fin como un control de pestanas', () => {
    render(<PaginaAcceso />)
    fireEvent.keyDown(pestana('iniciar_sesion'), { key: textos.teclas.siguiente })
    expect(pestana('crear_cuenta')).toHaveAttribute('aria-selected', 'true')
    expect(pestana('crear_cuenta')).toHaveFocus()
    expect(pestana('crear_cuenta')).toHaveAttribute('tabindex', '0')
    expect(pestana('iniciar_sesion')).toHaveAttribute('tabindex', '-1')

    fireEvent.keyDown(pestana('crear_cuenta'), { key: textos.teclas.siguiente })
    expect(pestana('iniciar_sesion')).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(pestana('iniciar_sesion'), { key: textos.teclas.anterior })
    expect(pestana('crear_cuenta')).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(pestana('crear_cuenta'), { key: textos.teclas.primera })
    expect(pestana('iniciar_sesion')).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(pestana('iniciar_sesion'), { key: textos.teclas.ultima })
    expect(pestana('crear_cuenta')).toHaveAttribute('aria-selected', 'true')
  })
})

describe('Validaciones de Crear cuenta', () => {
  it('exige todos los campos y marca cada uno como invalido', () => {
    abrirCrearCuenta()
    enviar()
    expect(screen.getByText(textos.errores.nombre_obligatorio)).toBeInTheDocument()
    expect(screen.getByText(textos.errores.correo_obligatorio)).toBeInTheDocument()
    expect(screen.getByText(textos.errores.contrasena_obligatoria)).toBeInTheDocument()
    expect(screen.getByText(textos.errores.confirmacion_obligatoria)).toBeInTheDocument()
    for (const etiqueta of [textos.campos.nombre, textos.campos.correo, nuevaContrasena.etiqueta, confirmacionContrasena.etiqueta]) {
      expect(campo(etiqueta)).toHaveAttribute('aria-invalid', 'true')
    }
  })

  it('asocia el mensaje de error con su campo', () => {
    abrirCrearCuenta()
    enviar()
    const identificador = campo(textos.campos.nombre).getAttribute('aria-describedby')
    expect(identificador).toBeTruthy()
    expect(document.getElementById(identificador as string)).toHaveTextContent(textos.errores.nombre_obligatorio)
  })

  it('rechaza un correo con formato invalido', () => {
    abrirCrearCuenta()
    completarValido()
    escribir(textos.campos.correo, 'sin-arroba')
    enviar()
    expect(screen.getByText(textos.errores.correo_invalido)).toBeInTheDocument()
  })

  it('exige el minimo de caracteres en la contrasena', () => {
    abrirCrearCuenta()
    completarValido()
    escribir(nuevaContrasena.etiqueta, 'a'.repeat(textos.contrasena_longitud_minima - 1))
    escribir(confirmacionContrasena.etiqueta, 'a'.repeat(textos.contrasena_longitud_minima - 1))
    enviar()
    const mensaje = textos.errores.contrasena_corta.replace(':minimo', String(textos.contrasena_longitud_minima))
    expect(screen.getByText(mensaje)).toBeInTheDocument()
    escribir(nuevaContrasena.etiqueta, 'a'.repeat(textos.contrasena_longitud_minima))
    expect(screen.queryByText(mensaje)).toBeNull()
  })

  it('exige que la confirmacion coincida exactamente', () => {
    abrirCrearCuenta()
    completarValido()
    escribir(confirmacionContrasena.etiqueta, 'Secreta1')
    enviar()
    expect(screen.getByText(textos.errores.contrasenas_distintas)).toBeInTheDocument()
    escribir(confirmacionContrasena.etiqueta, 'secreta1')
    expect(screen.queryByText(textos.errores.contrasenas_distintas)).toBeNull()
  })
})

describe('Contrasenas visibles', () => {
  it('muestra y oculta la contrasena y la confirmacion por separado', () => {
    abrirCrearCuenta()
    expect(campo(nuevaContrasena.etiqueta)).toHaveAttribute('type', 'password')
    expect(campo(confirmacionContrasena.etiqueta)).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: nuevaContrasena.mostrar }))
    expect(campo(nuevaContrasena.etiqueta)).toHaveAttribute('type', 'text')
    expect(campo(confirmacionContrasena.etiqueta)).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: confirmacionContrasena.mostrar }))
    expect(campo(confirmacionContrasena.etiqueta)).toHaveAttribute('type', 'text')
    fireEvent.click(screen.getByRole('button', { name: confirmacionContrasena.ocultar }))
    expect(campo(confirmacionContrasena.etiqueta)).toHaveAttribute('type', 'password')
    fireEvent.click(screen.getByRole('button', { name: nuevaContrasena.ocultar }))
    expect(campo(nuevaContrasena.etiqueta)).toHaveAttribute('type', 'password')
  })
})

describe('Flujo completo de Crear cuenta', () => {
  afterEach(() => {
    vi.useRealTimers()
    window.history.pushState({}, '', '/')
  })

  it('no ofrece enlaces legales que no existen', () => {
    abrirCrearCuenta()
    expect(screen.getByText(textos.mensajes.terminos)).toBeInTheDocument()
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('recorre carga, exito y la pantalla Revisa tu correo sin salir de acceso', () => {
    vi.useFakeTimers()
    abrirCrearCuenta()
    completarValido()
    enviar()

    expect(screen.getByRole('button', { name: new RegExp(textos.mensajes.creando_cuenta) })).toBeDisabled()
    expect(screen.getByText(textos.mensajes.creando_cuenta)).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(textos.tiempos.carga_ms)
    })
    expect(screen.getByRole('button', { name: textos.mensajes.cuenta_creada })).toBeDisabled()
    expect(screen.queryByText(textos.mensajes.revisa_correo_titulo)).toBeNull()

    act(() => {
      vi.advanceTimersByTime(textos.tiempos.exito_ms)
    })
    const estado = screen.getByRole('status')
    expect(within(estado).getByRole('heading', { name: textos.mensajes.revisa_correo_titulo })).toBeInTheDocument()
    expect(within(estado).getByText(textos.mensajes.revisa_correo_descripcion)).toBeInTheDocument()
    expect(within(estado).getByText('ana@ejemplo.com')).toBeInTheDocument()
    expect(estado).toHaveFocus()
    expect(screen.queryByLabelText(textos.campos.nombre)).toBeNull()
    expect(window.location.pathname).toBe('/')
  })

  it('vuelve a Iniciar sesion y limpia el formulario anterior', () => {
    vi.useFakeTimers()
    abrirCrearCuenta()
    completarValido()
    enviar()
    act(() => {
      vi.advanceTimersByTime(textos.tiempos.carga_ms + textos.tiempos.exito_ms)
    })

    fireEvent.click(screen.getByRole('button', { name: new RegExp(textos.botones.volver_a_iniciar_sesion) }))
    expect(pestana('iniciar_sesion')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: new RegExp(textos.botones.iniciar_sesion) })).toBeInTheDocument()
    expect(screen.queryByRole('status')).toBeNull()

    fireEvent.click(pestana('crear_cuenta'))
    expect(campo(textos.campos.nombre)).toHaveValue('')
    expect(campo(textos.campos.correo)).toHaveValue('')
    expect(campo(nuevaContrasena.etiqueta)).toHaveValue('')
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.queryByText(textos.errores.nombre_obligatorio)).toBeNull()
  })
})
