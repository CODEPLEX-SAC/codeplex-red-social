import { render, screen } from '@testing-library/react'
import { Insignia } from '@/componentes/compartido/interfaz/insignia'
import { BotonCarritoTopbar } from '@/componentes/compartido/navegacion/boton_carrito_topbar'
import { EstadoEmpresa } from '@/componentes/empresas/bloques/estado_empresa'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { ContextoAccesoCarrito } from '@/componentes/compartido/carrito/contexto_acceso_carrito'
import { leerFuentesFrontend } from './leer_fuentes'

describe('Insignias y estados sobre los componentes oficiales', () => {
  const estado = catalogoCompartido.insignia_estado

  it('el contador usa CodeplexEstadoBadge sin punto y con las clases del catálogo', () => {
    const { container } = render(<Insignia variant="counter" tamano="sm" tono="neutro">12</Insignia>)
    const raiz = container.firstElementChild as HTMLElement
    expect(raiz).toHaveTextContent('12')
    for (const clase of [estado.contador.tamanos.sm, estado.contador.tonos.neutro].join(' ').split(' ')) expect(raiz).toHaveClass(clase)
    expect(raiz.querySelector('span:not(.MuiTypography-root)')).toBeNull()
  })

  it('el contador acepta los tres tonos y los dos tamaños del catálogo', () => {
    for (const tono of Object.keys(estado.contador.tonos) as (keyof typeof estado.contador.tonos)[]) {
      const { container, unmount } = render(<Insignia variant="counter" tono={tono}>3</Insignia>)
      expect(container.firstElementChild).toHaveClass(estado.contador.tonos[tono].split(' ')[0])
      unmount()
    }
  })

  it('la píldora de estado conserva las clases de CodePlex que recibe y el texto en el badge oficial', () => {
    render(<Insignia variant="status" className="bg-primario-suave text-primario">Activo</Insignia>)
    const raiz = screen.getByText('Activo').parentElement as HTMLElement
    expect(raiz).toHaveClass('bg-primario-suave', 'text-primario', 'rounded-xl')
  })

  it('el estado con punto dibuja el punto oficial con la clase de color del catálogo', () => {
    const { container } = render(<Insignia variant="status" className="inline-flex" punto="bg-verde-categoria">Activa</Insignia>)
    const raiz = container.firstElementChild as HTMLElement
    expect(raiz).toHaveClass(estado.puntos['bg-verde-categoria'])
    expect(raiz.querySelector('span:not(.MuiTypography-root)')).not.toBeNull()
  })

  it('las insignias de privacidad y privado usan el mismo badge oficial', () => {
    const { container } = render(<><Insignia variant="privacy" tone="publico">Público</Insignia><Insignia variant="privado">Privado</Insignia></>)
    expect(container.querySelectorAll('span.MuiBox-root')).toHaveLength(2)
  })

  it('el estado de la empresa pasa por la insignia compartida con punto', () => {
    const { container } = render(<EstadoEmpresa estado="activa" />)
    expect(container.firstElementChild?.querySelector('span:not(.MuiTypography-root)')).not.toBeNull()
  })

  it('el carrito de la barra superior usa la insignia superpuesta oficial', () => {
    const acceso = { cantidad: 2, etiqueta: 'Carrito', abrir: () => undefined }
    const { container } = render(<ContextoAccesoCarrito.Provider value={acceso}><BotonCarritoTopbar /></ContextoAccesoCarrito.Provider>)
    expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('2')
  })

  it('no quedan contadores ni puntos de estado dibujados a mano', async () => {
    const fuentes = (await leerFuentesFrontend()).filter((f) => f.ruta.endsWith('.tsx'))
    const contadores = fuentes.filter((f) => f.texto.includes('clasesConteoChip') || /h-4\.5 min-w-4\.5[^"']*bg-primario/.test(f.texto)).map((f) => f.ruta)
    const puntos = fuentes.filter((f) => /<i className=\{`h-1\.5 w-1\.5 rounded-full/.test(f.texto)).map((f) => f.ruta)
    expect(contadores).toEqual([])
    expect(puntos).toEqual([])
  })
})
