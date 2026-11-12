import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { MensajeEstadoBusqueda } from '@/componentes/compartido/interfaz/mensaje_estado_busqueda'
import { crearFuenteLocal, coincideNombre } from '@/componentes/compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '@/componentes/compartido/interfaz/usar_busqueda'
import { PanelFiltroCategoria } from '@/componentes/eventos/bloques/panel_filtro_categoria'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'
import { PaginaEventosParaTi } from '@/paginas/eventos/pagina_eventos_para_ti'
import { PaginaGuardados } from '@/paginas/guardados/pagina_guardados'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import catalogoGuardados from '../../catalogos/capacidades/redsocial/guardados.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { PersonaBusqueda } from './modelo_persona_busqueda'

vi.mock('@codeplex-sac/mapas', () => ({
  CodeplexMapa: ({ marcadores }: { marcadores: { id: string; titulo: string }[] }) => (
    <ul aria-label="marcadores del mapa">
      {marcadores.map((marcador) => (
        <li key={marcador.id}>{marcador.titulo}</li>
      ))}
    </ul>
  ),
}))

const textos = catalogoCompartido.busqueda
const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })
const sinCarga = () => expect(screen.queryByRole('progressbar')).toBeNull()

const PERSONAS: readonly PersonaBusqueda[] = [{ nombre: 'Ana' }, { nombre: 'Luis' }]

function Prueba({ fuente }: { fuente: FuenteBusqueda<PersonaBusqueda> }) {
  const busqueda = usarBusqueda(fuente)
  return (
    <div>
      <input aria-label="consulta" value={busqueda.texto} onChange={(evento) => busqueda.cambiarTexto(evento.target.value)} />
      <MensajeEstadoBusqueda estado={busqueda.estado} error={busqueda.error} />
      <ul>
        {busqueda.resultado.elementos.map((persona) => (
          <li key={persona.nombre}>{persona.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

describe('MensajeEstadoBusqueda: estados comunes', () => {
  it('muestra el mensaje de sin coincidencias, la carga y el error con los textos del catálogo', () => {
    const { rerender } = render(<MensajeEstadoBusqueda estado="sin_coincidencias" />)
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()

    rerender(<MensajeEstadoBusqueda estado="cargando" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByText(textos.sin_resultados)).toBeNull()

    rerender(<MensajeEstadoBusqueda estado="error" error={{ codigo: 'no_disponible' }} />)
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
    sinCarga()
  })

  it('no muestra nada en inicial, escribiendo ni con resultados, y respeta sinCoincidencias=false', () => {
    const { container, rerender } = render(<MensajeEstadoBusqueda estado="inicial" />)
    expect(container).toBeEmptyDOMElement()
    for (const estado of ['escribiendo', 'con_resultados'] as const) {
      rerender(<MensajeEstadoBusqueda estado={estado} />)
      expect(container).toBeEmptyDOMElement()
    }
    rerender(<MensajeEstadoBusqueda estado="sin_coincidencias" sinCoincidencias={false} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('Estados con la fuente real del buscador', () => {
  it('una fuente local nunca muestra carga y distingue sin coincidencias de un error', () => {
    render(<Prueba fuente={crearFuenteLocal(PERSONAS, coincideNombre)} />)
    escribir(screen.getByLabelText('consulta'), 'ana')
    sinCarga()
    expect(screen.getByText('Ana')).toBeInTheDocument()

    escribir(screen.getByLabelText('consulta'), 'zzz')
    sinCarga()
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('una fuente asíncrona muestra la carga mientras responde y luego los resultados', async () => {
    let resolver: (resultado: ResultadoBusquedaLista<PersonaBusqueda>) => void = () => undefined
    const fuente: FuenteBusqueda<PersonaBusqueda> = () => new Promise((alResolver) => {
      resolver = alResolver
    })
    render(<Prueba fuente={fuente} />)
    escribir(screen.getByLabelText('consulta'), 'ana')
    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await act(async () => resolver({ elementos: [PERSONAS[0]], total: 1 }))
    sinCarga()
    expect(screen.getByText('Ana')).toBeInTheDocument()
  })

  it('una fuente asíncrona que falla muestra el error, no el mensaje de sin coincidencias', async () => {
    const fuente: FuenteBusqueda<PersonaBusqueda> = () => Promise.reject({ codigo: 'sin_permiso' })
    render(<Prueba fuente={fuente} />)
    await act(async () => escribir(screen.getByLabelText('consulta'), 'ana'))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
    expect(screen.queryByText(textos.sin_resultados)).toBeNull()
    sinCarga()
  })
})

describe('Sin coincidencias frente a lista vacía en los buscadores', { timeout: 30000 }, () => {
  it('AMI-02: la búsqueda sin coincidencias usa el mensaje de búsqueda y no el de «sin amigos»', () => {
    render(<PaginaAmigosTodos />)
    escribir(screen.getByPlaceholderText(catalogoAmigos.placeholders.buscar_amigos), 'zzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    expect(screen.queryByText(catalogoAmigos.mensajes.sin_amigos)).toBeNull()
    sinCarga()

    escribir(screen.getByPlaceholderText(catalogoAmigos.placeholders.buscar_amigos), '')
    expect(screen.queryByText(textos.sin_resultados)).toBeNull()
  })

  it('GRD-01: muestran el mensaje al no haber coincidencias y desaparece al haberlas', () => {
    const guardados = render(<PaginaGuardados />)
    escribir(screen.getByPlaceholderText(catalogoGuardados.placeholders.buscar_guardados), 'zzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    escribir(screen.getByPlaceholderText(catalogoGuardados.placeholders.buscar_guardados), 'diseno')
    expect(screen.queryByText(textos.sin_resultados)).toBeNull()
    guardados.unmount()
    sinCarga()
  })

  it('EVT-01: el panel de categorías muestra el mensaje cuando ninguna categoría coincide', () => {
    render(
      <PanelFiltroCategoria categorias={[{ icono: 'calendario', color: 'morado', nombre: 'Música', conteo: '3' }]} seleccionadas={[]} alCambiarSeleccion={vi.fn()} onCerrar={vi.fn()} />,
    )
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_categorias), 'zzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_categorias), 'musica')
    expect(screen.queryByText(textos.sin_resultados)).toBeNull()
  })

  it('EVT-04 y EVT-05: «Para ti» avisa cuando ningún destacado coincide y «Próximos» permanece', () => {
    render(<PaginaEventosParaTi />)
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_eventos), 'zzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    expect(screen.getAllByText('Codeplex Tech Summit').length).toBeGreaterThan(0)

    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_eventos), '')
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.ubicacion), 'zzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    sinCarga()
  })

  it('EVT-02 y EVT-03: el panel de ubicación avisa por separado en la lista de ciudades y en el mapa', () => {
    render(<PaginaEventosParaTi />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(catalogoEventos.filtros.ubicacion) }))
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_ubicacion), 'zzz')
    expect(screen.getAllByText(textos.sin_resultados)).toHaveLength(1)
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_ubicacion), '')

    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_lugar_mapa), 'zzz')
    expect(screen.getAllByText(textos.sin_resultados)).toHaveLength(1)
    expect(within(screen.getByRole('list', { name: 'marcadores del mapa' })).queryAllByRole('listitem')).toHaveLength(0)
    sinCarga()
  })

  it('MSJ-01 conserva su mensaje propio sin duplicarlo con el compartido', () => {
    render(<PaginaMensajesTodos />)
    escribir(screen.getByPlaceholderText(catalogoMensajeria.placeholders.buscar_mensajes), 'zzz')
    expect(screen.getByText(catalogoMensajeria.acciones_conversacion.sin_resultados_busqueda)).toBeInTheDocument()
    expect(screen.queryByText(textos.sin_resultados)).toBeNull()
    sinCarga()
  })
})
