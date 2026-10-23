import { render, screen } from '@testing-library/react'
import { PaginaAvisosSistema } from '@/paginas/avisos/pagina_avisos_sistema'
import { RUTAS } from '@/rutas/compartido/rutas'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'

describe('Notificaciones: pestanas y ruta de Sistema', () => {
  it('ninguna pestana usa un destino ficticio y cada ruta de pestana esta registrada', () => {
    const registradas = new Set(RUTAS.map((ruta) => ruta.path))
    for (const pestana of catalogoAvisos.pestanas) {
      expect(pestana.ruta).not.toBe('#')
      expect(registradas.has(pestana.ruta)).toBe(true)
    }
  })

  it('la pagina de Sistema renderiza su estado vacio con la pestana activa', () => {
    render(<PaginaAvisosSistema />)
    expect(screen.getByText(catalogoAvisos.mensajes.sin_notificaciones)).not.toBeNull()
    expect(screen.getByRole('tab', { name: /Sistema/, selected: true })).not.toBeNull()
  })
})
