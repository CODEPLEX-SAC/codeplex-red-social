import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { SelectorBuscable } from '../../componentes/compartido/interfaz/selector_buscable'
import { buscarOpcionesLocales } from '../../componentes/compartido/interfaz/buscar_opciones_locales'
import { SelectorEmpresaTopbar } from '../../componentes/compartido/navegacion/selector_empresa_topbar'
import { ProveedorEmpresaActiva } from '../../componentes/compartido/sesion/proveedor_empresa_activa'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { OpcionBuscable } from '@/tipos/compartido/contrato_selector_buscable'

const configuracion = catalogoCompartido.selector_empresa
const textos = configuracion.textos
const ULTIMA = EMPRESAS[EMPRESAS.length - 1]
const ACTIVA = EMPRESAS.find((empresa) => catalogoCompartido.sesion_actual.ruc.includes(empresa.ruc))!

function montar() {
  return render(
    <ProveedorEmpresaActiva empresas={EMPRESAS}>
      <SelectorEmpresaTopbar />
    </ProveedorEmpresaActiva>,
  )
}

function disparador() {
  return screen.getByRole('button', { name: new RegExp(ACTIVA.nombre) })
}

function abrir() {
  disparador().focus()
  fireEvent.click(disparador())
  return screen.getByRole('dialog', { name: textos.panel })
}

function buscar(texto: string) {
  fireEvent.change(screen.getByRole('searchbox', { name: textos.buscar }), { target: { value: texto } })
}

function opciones() {
  return within(screen.getByRole('list', { name: textos.lista })).getAllByRole('button')
}

describe('Selector de empresa de la barra superior', () => {
  it('cerrado muestra el nombre y el RUC de la empresa activa en el nombre accesible del botón', () => {
    montar()
    expect(screen.getByText(ACTIVA.nombre)).toBeInTheDocument()
    expect(screen.getByText(configuracion.ruc.replace(':ruc', ACTIVA.ruc))).toBeInTheDocument()
    expect(screen.getByRole('button', { name: new RegExp(`${ACTIVA.nombre}.*${ACTIVA.ruc}`) })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  describe('tooltip del nombre', () => {
    const esperar = () => new Promise((resolver) => setTimeout(resolver, 250))

    function simularTruncado(truncado: boolean) {
      const titulo = screen.getByText(ACTIVA.nombre)
      Object.defineProperty(titulo, 'scrollWidth', { configurable: true, value: truncado ? 300 : 100 })
      Object.defineProperty(titulo, 'clientWidth', { configurable: true, value: 100 })
    }

    it('no aparece cuando el nombre cabe completo', async () => {
      montar()
      simularTruncado(false)
      fireEvent.mouseOver(disparador())
      await esperar()
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('con el nombre truncado aparece al pasar el ratón, solo con el nombre y sin cambiar el nombre accesible', async () => {
      montar()
      simularTruncado(true)
      fireEvent.mouseOver(disparador())
      const tooltip = await screen.findByRole('tooltip')
      expect(tooltip).toHaveTextContent(ACTIVA.nombre)
      expect(tooltip).not.toHaveTextContent(ACTIVA.ruc)
      expect(disparador()).toHaveAccessibleName(new RegExp(ACTIVA.ruc))
      expect(disparador()).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('con el nombre truncado aparece al enfocar con teclado y se cierra con Escape', async () => {
      montar()
      simularTruncado(true)
      fireEvent.keyDown(document.body, { key: 'Tab' })
      disparador().focus()
      expect(await screen.findByRole('tooltip')).toHaveTextContent(ACTIVA.nombre)
      fireEvent.keyDown(disparador(), { key: 'Escape' })
      await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
    })

    it('se oculta al abrir el menú y no se muestra mientras está abierto', async () => {
      montar()
      simularTruncado(true)
      const boton = disparador()
      fireEvent.mouseOver(boton)
      await screen.findByRole('tooltip')
      abrir()
      await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
      fireEvent.mouseOver(boton)
      await esperar()
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('al abrirse ofrece todas las empresas en una lista con scroll interno y el RUC en cada opcion', () => {
    montar()
    abrir()
    expect(screen.getByRole('searchbox', { name: textos.buscar })).toBeInTheDocument()
    expect(opciones()).toHaveLength(EMPRESAS.length)
    expect(screen.getByRole('list', { name: textos.lista })).toHaveClass('overflow-y-auto')
    expect(screen.getByText(configuracion.ruc.replace(':ruc', ULTIMA.ruc))).toBeInTheDocument()
  })

  it('encuentra por nombre, sin distinguir mayusculas ni tildes', () => {
    montar()
    abrir()
    buscar('inmobiliaria los alamos')
    expect(opciones()).toHaveLength(1)
    expect(opciones()[0]).toHaveTextContent('Inmobiliaria Los Álamos SAC')
  })

  it('encuentra por RUC y selecciona la ultima empresa de la lista, actualizando el selector superior', () => {
    montar()
    abrir()
    buscar(ULTIMA.ruc)
    expect(opciones()).toHaveLength(1)
    fireEvent.click(opciones()[0])
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    const nuevo = screen.getByRole('button', { name: new RegExp(ULTIMA.nombre) })
    expect(nuevo).toHaveTextContent(ULTIMA.nombre)
    expect(nuevo).toHaveTextContent(ULTIMA.ruc)
  })

  it('muestra un mensaje sin coincidencias y vuelve a los resultados iniciales al limpiar', () => {
    montar()
    abrir()
    buscar('zzzz sin empresa')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: textos.limpiar }))
    expect(opciones()).toHaveLength(EMPRESAS.length)
    expect(screen.queryByText(textos.sin_resultados)).not.toBeInTheDocument()
  })

  it('Escape cierra, devuelve el foco al disparador y al reabrir la busqueda esta vacia', () => {
    montar()
    abrir()
    buscar('lima')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(disparador()).toHaveFocus()
    abrir()
    expect(screen.getByRole('searchbox', { name: textos.buscar })).toHaveValue('')
    expect(opciones()).toHaveLength(EMPRESAS.length)
  })

  it('las flechas mueven el foco entre el buscador y las opciones', () => {
    montar()
    const panel = abrir()
    const campo = screen.getByRole('searchbox', { name: textos.buscar })
    campo.focus()
    fireEvent.keyDown(campo, { key: 'ArrowDown' })
    expect(opciones()[0]).toHaveFocus()
    fireEvent.keyDown(opciones()[0], { key: 'ArrowDown' })
    expect(opciones()[1]).toHaveFocus()
    fireEvent.keyDown(opciones()[1], { key: 'ArrowUp' })
    fireEvent.keyDown(opciones()[0], { key: 'ArrowUp' })
    expect(campo).toHaveFocus()
    expect(panel).toBeInTheDocument()
  })

  it('marca como actual solo la empresa seleccionada', () => {
    montar()
    abrir()
    buscar(ACTIVA.ruc)
    expect(opciones()[0]).toHaveAttribute('aria-current', 'true')
  })
})

describe('SelectorBuscable con una fuente asincrona', () => {
  const lista: OpcionBuscable[] = [
    { id: 'a', titulo: 'Alfa', subtitulo: 'RUC 1', terminos: 'alfa 1' },
    { id: 'b', titulo: 'Beta', subtitulo: 'RUC 2', terminos: 'beta 2' },
  ]
  const local = buscarOpcionesLocales(lista)

  it('muestra los resultados cuando la promesa se resuelve', async () => {
    const fuente = (texto: string, limite: number) => Promise.resolve(local(texto, limite))
    render(<SelectorBuscable seleccionada={lista[0]} fuente={fuente} limite={5} textos={textos} icono="empresa" alSeleccionar={() => undefined} />)
    fireEvent.click(screen.getByRole('button', { name: /Alfa/ }))
    await waitFor(() => expect(opciones()).toHaveLength(2))
  })
})
