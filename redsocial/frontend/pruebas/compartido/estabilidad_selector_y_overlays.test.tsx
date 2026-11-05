import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { Modal } from '@/componentes/compartido/interfaz/modal'
import { Selector } from '@/componentes/compartido/interfaz/selector'
import { leerCssGlobal } from './leer_css'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'

const OPCIONES = ['Todos los amigos', 'En linea', 'Desconectados']
const VARIANTES_CON_ANCHO_ESTABLE = ['default', 'mini', 'integrado'] as const
const VARIANTES_A_ANCHO_COMPLETO = ['colaboradores', 'compacto'] as const

function Selectores({ variante }: { variante: 'default' | 'mini' | 'integrado' | 'colaboradores' | 'compacto' }) {
  const [valor, setValor] = useState(OPCIONES[0])
  return (
    <Selector variant={variante} aria-label="filtro" value={valor} onChange={(evento) => setValor(evento.target.value)}>
      {OPCIONES.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </Selector>
  )
}

function ModalSimple({ alCerrar, titulo }: { alCerrar: () => void; titulo: string }) {
  return (
    <Modal titulo={titulo} etiquetaCerrar="Cerrar" onCerrar={alCerrar}>
      <p>contenido</p>
    </Modal>
  )
}

describe('Selector: ancho estable por variante', () => {
  it.each(VARIANTES_CON_ANCHO_ESTABLE)('la variante %s reserva el ancho de la opcion mas larga con un elemento por opcion', (variante) => {
    expect(catalogoCompartido.selector_libreria[variante]).toHaveProperty('anchoEstable', true)
    expect(catalogoCompartido.selector_envoltorio[variante]).toContain('inline-grid')
    const { container } = render(<Selectores variante={variante} />)
    const reservas = Array.from(container.querySelectorAll('span[data-etiqueta]'))
    expect(reservas.map((nodo) => nodo.getAttribute('data-etiqueta'))).toEqual(OPCIONES)
    reservas.forEach((nodo) => {
      expect(nodo).toHaveAttribute('aria-hidden', 'true')
      expect(nodo.textContent).toBe('')
    })
  })

  it.each(VARIANTES_A_ANCHO_COMPLETO)('la variante %s ocupa todo el ancho de su contenedor y no necesita reserva', (variante) => {
    expect(catalogoCompartido.selector_libreria[variante].anchoCompleto).toBe(true)
    expect(catalogoCompartido.selector_envoltorio[variante]).toContain('w-full')
    const { container } = render(<Selectores variante={variante} />)
    expect(container.querySelectorAll('span[data-etiqueta]')).toHaveLength(0)
  })

  it('la reserva no duplica el texto de las opciones para los lectores de pantalla ni para las consultas por texto', () => {
    render(<Selectores variante="mini" />)
    expect(screen.getAllByText(OPCIONES[0])).toHaveLength(1)
    expect(screen.getByRole('combobox', { name: 'filtro' })).toHaveTextContent(OPCIONES[0])
  })

  it('cambiar de opcion conserva las reservas y el valor visible', () => {
    const { container } = render(<Selectores variante="mini" />)
    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'filtro' }))
    fireEvent.click(screen.getByRole('option', { name: OPCIONES[1] }))
    expect(screen.getByRole('combobox', { name: 'filtro' })).toHaveTextContent(OPCIONES[1])
    expect(container.querySelectorAll('span[data-etiqueta]')).toHaveLength(OPCIONES.length)
  })
})

describe('Selector: teclado', () => {
  it('al abrirse el foco pasa a la opcion seleccionada y las flechas y Enter permiten elegir', async () => {
    render(<Selectores variante="mini" />)
    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'filtro' }))
    const seleccionada = screen.getByRole('option', { name: OPCIONES[0] })
    await waitFor(() => expect(seleccionada).toHaveFocus())
    fireEvent.keyDown(seleccionada, { key: 'ArrowDown' })
    const siguiente = screen.getByRole('option', { name: OPCIONES[1] })
    expect(siguiente).toHaveFocus()
    fireEvent.keyDown(siguiente, { key: 'Enter' })
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'filtro' })).toHaveTextContent(OPCIONES[1]))
  })
})

describe('Bloqueo de scroll compartido', () => {
  afterEach(() => {
    document.body.removeAttribute('style')
  })

  it('el hueco de la barra se reserva una sola vez: scrollbar-gutter global y sin padding compensatorio de MUI', async () => {
    const css = await leerCssGlobal()
    expect(css).toMatch(/html\s*\{\s*scrollbar-gutter:\s*stable;?\s*\}/)
    expect(css).toMatch(/body\[style\*="padding-right"\]\s*\{\s*padding-right:\s*0\s*!important;?\s*\}/)
  })

  it('un modal bloquea el scroll del fondo y lo restablece al cerrar, conservando el valor previo', () => {
    document.body.style.overflow = 'scroll'
    const { unmount } = render(<ModalSimple alCerrar={() => undefined} titulo="uno" />)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('scroll')
  })

  it('con modales anidados el fondo sigue bloqueado hasta cerrar el ultimo, en cualquier orden de cierre', () => {
    const exterior = render(<ModalSimple alCerrar={() => undefined} titulo="exterior" />)
    const interior = render(<ModalSimple alCerrar={() => undefined} titulo="interior" />)
    expect(document.body.style.overflow).toBe('hidden')
    exterior.unmount()
    expect(document.body.style.overflow).toBe('hidden')
    interior.unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('Escape cierra solo el modal superior de la pila', () => {
    const cierres: string[] = []
    function Pila() {
      return (
        <>
          <button type="button">abrir</button>
          <ModalSimple titulo="inferior" alCerrar={() => cierres.push('inferior')} />
          <ModalSimple titulo="superior" alCerrar={() => cierres.push('superior')} />
        </>
      )
    }
    render(<Pila />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(cierres).toEqual(['superior'])
  })
})
