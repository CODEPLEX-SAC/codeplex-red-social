import { fireEvent, render, screen, within } from '@testing-library/react'
import { ModalCrearGrupo } from '@/componentes/mensajeria/bloques/modal_crear_grupo'
import { ModalReenviarMensaje } from '@/componentes/mensajeria/bloques/modal_reenviar_mensaje'
import { PanelFiltroCategoria } from '@/componentes/eventos/bloques/panel_filtro_categoria'
import { contieneTexto, crearFuenteLocal } from '@/componentes/compartido/interfaz/fuente_busqueda_local'
import { crearFiltrosAvanzados, filtrarEmpresas } from '@/componentes/empresas/bloques/logica_listado_empresas'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import { PaginaMensajesVideollamadas } from '@/paginas/mensajeria/pagina_mensajes_videollamadas'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import type { Conversacion } from '@/tipos/mensajeria/contrato_mensajes'

const placeholders = catalogoMensajeria.placeholders
const lista = () => within(document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement)
const filasDeConversacion = () => document.querySelectorAll('[data-fila-conversacion]')
const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })

function empresasPorBusqueda(busqueda: string) {
  return filtrarEmpresas(EMPRESAS, { ...crearFiltrosAvanzados(), busqueda, estado: catalogoEmpresas.selectores.estado.opciones[0] }).map((empresa) => empresa.nombre)
}

function conversacion(id: string, nombre: string, esGrupo = false): Conversacion {
  return { id, nombre, extracto: '', noLeidos: 0, favorita: false, enLinea: false, participantes: [], esGrupo }
}

describe('Búsqueda compartida: comparación sin mayúsculas ni tildes', () => {
  it('compara sin distinguir mayúsculas ni tildes y no altera los textos', () => {
    expect(contieneTexto('María Fernández', 'maria')).toBe(true)
    expect(contieneTexto('María Fernández', 'FERNANDEZ')).toBe(true)
    expect(contieneTexto('20501234567', '2050')).toBe(true)
    expect(contieneTexto('María', 'luis')).toBe(false)
    const elementos = [{ nombre: 'María' }, { nombre: 'Luis' }]
    const fuente = crearFuenteLocal(elementos, (elemento, consulta) => contieneTexto(elemento.nombre, consulta))
    expect(fuente('maria')).toEqual({ elementos: [{ nombre: 'María' }], total: 1 })
    expect(fuente('')).toEqual({ elementos, total: 2 })
    expect(elementos[0].nombre).toBe('María')
  })
})

describe('MSJ-01: conversaciones', { timeout: 30000 }, () => {
  it('busca por nombre sin tildes, no por el contenido del último mensaje y anuncia solo el nombre', () => {
    render(<PaginaMensajesTodos />)
    const buscador = screen.getByPlaceholderText(placeholders.buscar_mensajes)
    expect(placeholders.buscar_mensajes).toBe('Buscar contacto...')

    escribir(buscador, 'luis rodriguez')
    expect(filasDeConversacion()).toHaveLength(1)

    escribir(buscador, 'informe')
    expect(filasDeConversacion()).toHaveLength(0)
    expect(lista().getByText(catalogoMensajeria.acciones_conversacion.sin_resultados_busqueda)).toBeInTheDocument()
  })
})

describe('MSJ-02: videollamadas recientes', { timeout: 30000 }, () => {
  it('busca por nombre del contacto o grupo sin tildes y no por la dirección de la llamada', () => {
    render(<PaginaMensajesVideollamadas />)
    const buscador = screen.getByPlaceholderText(placeholders.buscar_videollamadas)
    expect(placeholders.buscar_videollamadas).toBe('Buscar contacto o grupo...')

    escribir(buscador, 'maria fernandez')
    const filas = screen.getAllByRole('button', { name: /^Videollamar a / })
    expect(filas.length).toBeGreaterThan(0)
    filas.forEach((fila) => expect(fila).toHaveAccessibleName(/María Fernández/))

    escribir(buscador, 'entrante')
    expect(screen.getByText(catalogoMensajeria.leyendas.sin_llamadas)).toBeInTheDocument()
  })
})

describe('MSJ-03 y MSJ-04: participantes y destinos de reenvío', { timeout: 30000 }, () => {
  it('el modal de grupo encuentra a la persona sin distinguir tildes', () => {
    render(<ModalCrearGrupo participantes={[{ id: 'p1', nombre: 'María Fernández' }, { id: 'p2', nombre: 'Luis Rodríguez' }]} nombresExistentes={[]} onCrear={vi.fn()} onCerrar={vi.fn()} />)
    escribir(screen.getByRole('searchbox'), 'maria')
    expect(screen.getByRole('button', { name: catalogoMensajeria.grupos.modal.agregar.replace(':nombre', 'María Fernández') })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Luis/ })).toBeNull()
    expect(catalogoMensajeria.grupos.modal.buscar).toBe('Buscar amigo o colaborador por nombre...')
  })

  it('el reenvío filtra personas y grupos por nombre sin distinguir tildes', () => {
    render(<ModalReenviarMensaje destinos={[conversacion('c1', 'María Fernández'), conversacion('c2', 'Luis Rodríguez'), conversacion('c3', 'Equipo Ágil', true)]} onConfirmar={vi.fn()} onCancelar={vi.fn()} />)
    const textos = catalogoMensajeria.conversacion.reenviar_modal
    escribir(screen.getByRole('searchbox', { name: textos.buscar }), 'agil')
    expect(screen.getByRole('button', { name: textos.enviar_a.replace(':nombre', 'Equipo Ágil') })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: new RegExp('María') })).toBeNull()
    escribir(screen.getByRole('searchbox', { name: textos.buscar }), 'zzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    expect(textos.buscar).toBe('Buscar persona o grupo por nombre...')
  })
})

describe('COL-01: colaboradores', { timeout: 30000 }, () => {
  it('busca por nombre o correo sin tildes, ya no por teléfono, y el texto no anuncia el teléfono', () => {
    render(<PaginaColaboradores />)
    const buscador = screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador)
    expect(catalogoColaboradores.placeholders.buscar_colaborador).toBe('Buscar colaborador por nombre o correo electrónico...')
    expect(buscador).toHaveAccessibleName(catalogoColaboradores.placeholders.buscar_colaborador)

    escribir(buscador, 'rosa.jimenez@gmail')
    expect(screen.getByText('Rosa Jiménez', { selector: 'span.truncate' })).toBeInTheDocument()
    escribir(buscador, 'jimenez')
    expect(screen.getByText('Rosa Jiménez', { selector: 'span.truncate' })).toBeInTheDocument()

    escribir(buscador, '987 111 222')
    expect(screen.getByText(catalogoColaboradores.mensajes.sin_colaboradores)).toBeInTheDocument()
  })
})

describe('EMP-01: empresas', () => {
  it('busca por nombre y RUC sin tildes ni mayúsculas, y ya no por código ni correo', () => {
    expect(catalogoEmpresas.placeholders.buscar_empresa).toBe('Buscar empresa por nombre o RUC...')
    expect(empresasPorBusqueda('CONSTRUCTORA del norte')).toEqual(['Constructora del Norte SAC'])
    expect(empresasPorBusqueda('2050123')).toEqual(['Constructora del Norte SAC'])
    expect(empresasPorBusqueda('transportes rapidos')).toEqual(['Transportes Rápidos SRL'])
    expect(empresasPorBusqueda('TEN-000154')).toEqual([])
    expect(empresasPorBusqueda('contacto@constructoranorte')).toEqual([])
  })
})

describe('EVT-01: categorías de eventos', () => {
  it('filtra por el nombre de la categoría sin distinguir tildes', () => {
    render(
      <PanelFiltroCategoria
        categorias={[
          { icono: 'calendario', color: 'morado', nombre: 'Música', conteo: '3' },
          { icono: 'calendario', color: 'azul', nombre: 'Tecnología', conteo: '5' },
        ]}
        seleccionadas={[]}
        alCambiarSeleccion={vi.fn()}
        onCerrar={vi.fn()}
      />,
    )
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_categorias), 'musica')
    expect(screen.getByText('Música')).toBeInTheDocument()
    expect(screen.queryByText('Tecnología')).toBeNull()
  })
})
