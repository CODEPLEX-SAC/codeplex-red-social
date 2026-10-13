import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

const pasos = catalogoColaboradores.pasos_invitar
const informacion = catalogoColaboradores.campos_informacion
const resumen = catalogoColaboradores.campos_resumen

function botonInvitar() {
  return screen.getByRole('button', { name: catalogoColaboradores.botones.invitar_colaborador })
}

function abrir() {
  const boton = botonInvitar()
  boton.focus()
  fireEvent.click(boton)
  return within(screen.getByRole('dialog', { name: catalogoColaboradores.titulos.invitar }))
}

function pulsar(dialogo: ReturnType<typeof abrir>, nombre: string) {
  fireEvent.click(dialogo.getByRole('button', { name: nombre }))
}

function siguiente(dialogo: ReturnType<typeof abrir>) {
  pulsar(dialogo, textosRedSocial.SIGUIENTE)
}

function escribir(dialogo: ReturnType<typeof abrir>, etiqueta: string, valor: string) {
  fireEvent.change(dialogo.getByRole('textbox', { name: etiqueta }), { target: { value: valor } })
}

function irAlResumen(dialogo: ReturnType<typeof abrir>) {
  siguiente(dialogo)
  siguiente(dialogo)
  siguiente(dialogo)
}

describe('Modal Invitar colaborador', { timeout: 30000 }, () => {
  it('abre un unico modal sobre el listado sin navegar a otra ruta', () => {
    const ruta = window.location.pathname
    render(<PaginaColaboradores />)
    const dialogo = abrir()

    expect(window.location.pathname).toBe(ruta)
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(screen.getByRole('navigation', { name: catalogoColaboradores.asistente_invitacion.etiqueta_pasos })).toBeInTheDocument()
    expect(dialogo.getByRole('heading', { name: pasos.informacion.titulo })).toBeInTheDocument()
    expect(dialogo.queryByRole('button', { name: catalogoColaboradores.campos_rol_permisos.anterior })).toBeNull()
    expect(dialogo.queryByText(/borrador/i)).toBeNull()
  })

  it('lleva el foco al modal y lo devuelve al boton Invitar al cerrar con la x', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)

    pulsar(dialogo, textosRedSocial.CERRAR)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(botonInvitar()).toHaveFocus()
  })

  it('cierra con Cancelar y con Escape devolviendo el foco', () => {
    render(<PaginaColaboradores />)
    pulsar(abrir(), textosRedSocial.CANCELAR)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(botonInvitar()).toHaveFocus()

    abrir()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(botonInvitar()).toHaveFocus()
  })

  it('avanza por los cuatro pasos y retrocede sin desmontar el modal', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    const modal = screen.getByRole('dialog')

    siguiente(dialogo)
    expect(dialogo.getByRole('heading', { name: pasos.rol_permisos.titulo })).toBeInTheDocument()
    expect(dialogo.getByRole('button', { name: catalogoColaboradores.campos_rol_permisos.anterior })).toBeInTheDocument()
    siguiente(dialogo)
    expect(dialogo.getByRole('heading', { name: pasos.vigencia.titulo })).toBeInTheDocument()
    siguiente(dialogo)
    expect(dialogo.getByRole('heading', { name: pasos.resumen.titulo })).toBeInTheDocument()
    expect(dialogo.queryByRole('button', { name: textosRedSocial.SIGUIENTE })).toBeNull()
    expect(dialogo.getByRole('button', { name: resumen.enviar_invitacion })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBe(modal)

    pulsar(dialogo, catalogoColaboradores.campos_rol_permisos.anterior)
    expect(dialogo.getByRole('heading', { name: pasos.vigencia.titulo })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBe(modal)
  })

  it('conserva los datos escritos al avanzar y retroceder', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    escribir(dialogo, informacion.nombres, 'Ana')
    escribir(dialogo, informacion.cargo_puesto, 'Contadora')

    siguiente(dialogo)
    pulsar(dialogo, catalogoColaboradores.campos_rol_permisos.anterior)

    expect(dialogo.getByRole('textbox', { name: informacion.nombres })).toHaveValue('Ana')
    expect(dialogo.getByRole('textbox', { name: informacion.cargo_puesto })).toHaveValue('Contadora')
  })

  it('muestra en el resumen los datos que escribio el usuario', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    escribir(dialogo, informacion.nombres, 'Ana')
    escribir(dialogo, informacion.apellidos, 'Quispe')
    escribir(dialogo, informacion.correo_electronico, 'ana.quispe@correo.pe')
    irAlResumen(dialogo)

    expect(dialogo.getByText('Ana Quispe')).toBeInTheDocument()
    expect(dialogo.getByText('AQ')).toBeInTheDocument()
    expect(dialogo.getByText('ana.quispe@correo.pe')).toBeInTheDocument()
    expect(dialogo.queryByText('Juan Pérez Martínez')).toBeNull()
  })

  it('los botones Editar del resumen llevan al paso correspondiente', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    irAlResumen(dialogo)

    pulsar(dialogo, catalogoColaboradores.botones.editar_colaborador)
    expect(dialogo.getByRole('heading', { name: pasos.informacion.titulo })).toBeInTheDocument()

    irAlResumen(dialogo)
    pulsar(dialogo, resumen.editar_rol)
    expect(dialogo.getByRole('heading', { name: pasos.rol_permisos.titulo })).toBeInTheDocument()

    siguiente(dialogo)
    siguiente(dialogo)
    pulsar(dialogo, resumen.editar_vigencia)
    expect(dialogo.getByRole('heading', { name: pasos.vigencia.titulo })).toBeInTheDocument()
  })

  it('enviar cierra el modal, muestra la confirmacion local y permite descartarla', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    irAlResumen(dialogo)
    pulsar(dialogo, resumen.enviar_invitacion)

    expect(screen.queryByRole('dialog')).toBeNull()
    const aviso = within(screen.getByRole('status'))
    expect(aviso.getByText(catalogoColaboradores.mensajes.invitacion_completada_demostracion)).toBeInTheDocument()
    expect(botonInvitar()).toHaveFocus()

    fireEvent.click(aviso.getByRole('button', { name: textosRedSocial.CERRAR }))
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('mantiene el cuerpo con scroll interno y el pie fuera de el', () => {
    render(<PaginaColaboradores />)
    const dialogo = abrir()
    const cuerpo = screen.getByRole('dialog').querySelector('.overflow-y-auto') as HTMLElement

    expect(cuerpo).toHaveClass('min-h-0', 'flex-1')
    expect(cuerpo).toContainElement(dialogo.getByRole('heading', { name: pasos.informacion.titulo }))
    expect(cuerpo).not.toContainElement(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
    expect(cuerpo).not.toContainElement(dialogo.getByRole('button', { name: textosRedSocial.CANCELAR }))
  })
})
