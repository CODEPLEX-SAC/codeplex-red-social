import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LienzoHistoria, borradorInicial, conElemento, conFondo, conMedio, conTexto } from '@/componentes/inicio'
import catalogoInicio from '@/catalogos/capacidades/redsocial/inicio.json'

const catalogoHistorias = catalogoInicio.historias

describe('LienzoHistoria', () => {
  it('renderiza el fondo y el texto del borrador', () => {
    render(<LienzoHistoria borrador={conTexto(conFondo(borradorInicial(), 'degradado-nocturno'), 'Buen dia')} />)
    const lienzo = screen.getByRole('group', { name: catalogoHistorias.etiqueta_lienzo })
    expect(lienzo).toHaveClass('degradado-nocturno')
    expect(screen.getByText('Buen dia')).toBeInTheDocument()
  })

  it('muestra el medio y los elementos superpuestos con la misma representacion', () => {
    const borrador = conElemento(conMedio(borradorInicial(), { id: 'm', url: 'blob:foto', esVideo: false }), { id: 'e', contenido: 'Etiqueta', estiloTextoId: 'etiqueta', posicionId: 'superior' })
    render(<LienzoHistoria borrador={borrador} />)
    expect(screen.getByAltText(catalogoHistorias.texto_alternativo_medio)).toHaveAttribute('src', 'blob:foto')
    expect(screen.getByText('Etiqueta')).toHaveClass('top-8')
  })

  it('usa el video como capa de medio', () => {
    render(<LienzoHistoria borrador={conMedio(borradorInicial(), { id: 'v', url: 'blob:video', esVideo: true })} />)
    expect(screen.getByLabelText(catalogoHistorias.texto_alternativo_medio).tagName).toBe('VIDEO')
  })
})
