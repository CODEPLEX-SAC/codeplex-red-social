import { act, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { PestanaHistorialEmpresa } from '@/componentes/empresas/bloques/pestana_historial_empresa'
import { PestanaUsuariosEmpresa } from '@/componentes/empresas/bloques/pestana_usuarios_empresa'
import { TAMANO_PAGINA, TODAS, TODOS } from '@/componentes/empresas/bloques/logica_listado_empresas'
import { armarUsuarios, TODOS_LOS_ESTADOS, TODOS_LOS_ROLES } from '@/componentes/empresas/bloques/logica_usuarios_empresa'
import { TODOS_LOS_TIPOS } from '@/componentes/empresas/bloques/logica_historial_empresa'
import { usarListadoEmpresas } from '@/componentes/empresas/bloques/usar_listado_empresas'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import { HISTORIAL_BASE_EMPRESA } from '../../servicios/empresas/historial_empresa'
import { USUARIOS_BASE_EMPRESA } from '../../servicios/empresas/usuarios_empresa'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { FiltrosBusquedaEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { FiltrosBusquedaHistorialEmpresa } from '@/tipos/empresas/contrato_historial_empresa'
import type { FiltrosBusquedaUsuariosEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { RegistroHistorialBase } from '@/tipos/empresas/modelo_historial_empresa'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const textosUsuarios = catalogoEmpresas.usuarios_empresa
const textosHistorial = catalogoEmpresas.historial_empresa
const empresa = EMPRESAS[0]
const usuarios = armarUsuarios(empresa, USUARIOS_BASE_EMPRESA)
const registros = HISTORIAL_BASE_EMPRESA.slice(0, empresa.usuarios * textosHistorial.registros_por_usuario)
const evento = (valor: string) => ({ target: { value: valor } })
const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })
const filasDeTabla = () => screen.getAllByRole('row').slice(1)

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  const promesa = new Promise<T>((alResolver) => {
    resolver = alResolver
  })
  return { promesa, resolver }
}

describe('EMP-01: listado de empresas con la búsqueda desacoplada de los datos', () => {
  it('busca por nombre y RUC con la fuente local y conserva orden y paginación', () => {
    const { result } = renderHook(() => usarListadoEmpresas(EMPRESAS))
    expect(result.current.filas.length).toBeLessThanOrEqual(TAMANO_PAGINA)
    act(() => result.current.cambiarBusqueda(evento(empresa.ruc)))
    expect(result.current.filas.map((fila) => fila.nombre)).toContain(empresa.nombre)
    act(() => result.current.cambiarBusqueda(evento(empresa.nombre.toUpperCase())))
    expect(result.current.filas.map((fila) => fila.nombre)).toContain(empresa.nombre)
    act(() => result.current.cambiarBusqueda(evento(empresa.web)))
    expect(result.current.filas).toHaveLength(0)
    act(() => result.current.limpiarTodo())
    expect(result.current.busqueda).toBe('')
    expect(result.current.pagina).toBe(1)
  })

  it('el estado es un filtro independiente del texto', () => {
    const { result } = renderHook(() => usarListadoEmpresas(EMPRESAS))
    const etiquetaEstado = catalogoEmpresas.selectores.estado.opciones[1]
    act(() => result.current.cambiarEstado(evento(etiquetaEstado)))
    expect(result.current.estado).toBe(etiquetaEstado)
    expect(result.current.busqueda).toBe('')
    act(() => result.current.cambiarBusqueda(evento('zzzz')))
    expect(result.current.filas).toHaveLength(0)
    expect(result.current.estado).toBe(etiquetaEstado)
  })
})

describe('EMP-01, EMP-02 y EMP-03: fuentes inyectadas sin cambiar la interfaz', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('EMP-01 consulta con retardo, envía el estado como filtro y presenta el error común', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<Empresa>>()
    const fuente = vi.fn<FuenteBusqueda<Empresa, FiltrosBusquedaEmpresas>>(() => respuesta.promesa)
    const { result } = renderHook(() => usarListadoEmpresas([], undefined, fuente))
    expect(result.current.estadoBusqueda).toBe('cargando')
    await act(async () => respuesta.resolver({ elementos: EMPRESAS, total: EMPRESAS.length }))
    expect(result.current.filas.length).toBeGreaterThan(0)

    fuente.mockClear()
    act(() => result.current.cambiarEstado(evento(catalogoEmpresas.selectores.estado.opciones[1])))
    act(() => vi.advanceTimersByTime(RETARDO))
    expect(fuente.mock.calls[0][0]).toBe('')
    expect(fuente.mock.calls[0][2]).toMatchObject({ estado: catalogoEmpresas.selectores.estado.opciones[1], rubro: TODOS, plan: TODOS, modulo: TODOS, desde: null, hasta: null })

    fuente.mockImplementation(() => Promise.reject({ codigo: 'no_disponible' }))
    act(() => result.current.cambiarBusqueda(evento('ana')))
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(result.current.estadoBusqueda).toBe('error')
    expect(TODAS).toBe(catalogoEmpresas.selectores.estado.opciones[0])
  })

  it('EMP-03 envía rol y estado como filtros y muestra carga, resultado y error', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<UsuarioEmpresa>>()
    const fuente = vi.fn<FuenteBusqueda<UsuarioEmpresa, FiltrosBusquedaUsuariosEmpresa>>(() => respuesta.promesa)
    render(<PestanaUsuariosEmpresa empresa={empresa} usuariosBase={[]} fuente={fuente} />)
    expect(fuente).toHaveBeenCalledWith('', undefined, { rol: TODOS_LOS_ROLES, estado: TODOS_LOS_ESTADOS })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: usuarios, total: usuarios.length }))
    expect(filasDeTabla().length).toBeGreaterThan(0)

    fuente.mockClear()
    escribir(screen.getByRole('searchbox', { name: textosUsuarios.etiquetas.busqueda }), 'maria')
    act(() => vi.advanceTimersByTime(RETARDO - 1))
    expect(fuente).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(fuente).toHaveBeenCalledWith('maria', undefined, { rol: TODOS_LOS_ROLES, estado: TODOS_LOS_ESTADOS })

    fuente.mockImplementation(() => Promise.reject({ codigo: 'no_disponible' }))
    escribir(screen.getByRole('searchbox', { name: textosUsuarios.etiquetas.busqueda }), 'luis')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })

  it('EMP-02 envía tipo y fechas como filtros y descarta la respuesta obsoleta', async () => {
    const lenta = diferida<ResultadoBusquedaLista<RegistroHistorialBase>>()
    const rapida = diferida<ResultadoBusquedaLista<RegistroHistorialBase>>()
    const fuente = vi.fn<FuenteBusqueda<RegistroHistorialBase, FiltrosBusquedaHistorialEmpresa>>((consulta) => (consulta === '' ? Promise.resolve({ elementos: registros, total: registros.length }) : consulta === 'a' ? lenta.promesa : rapida.promesa))
    render(<PestanaHistorialEmpresa empresa={empresa} historialBase={[]} fuente={fuente} />)
    expect(fuente).toHaveBeenCalledWith('', undefined, { desde: null, hasta: null, tipo: TODOS_LOS_TIPOS })
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(filasDeTabla().length).toBeGreaterThan(0)

    const buscador = screen.getByRole('searchbox', { name: textosHistorial.etiquetas.busqueda })
    escribir(buscador, 'a')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(buscador, 'ab')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    await act(async () => rapida.resolver({ elementos: [registros[0]], total: 1 }))
    await act(async () => lenta.resolver({ elementos: registros, total: registros.length }))
    expect(filasDeTabla()).toHaveLength(1)
  })
})

describe('EMP-02 y EMP-03: interfaz con la fuente local', { timeout: 30000 }, () => {
  it('EMP-02 muestra el texto del campo «Buscar por usuario…» y su nombre accesible', () => {
    render(<PestanaHistorialEmpresa empresa={empresa} historialBase={HISTORIAL_BASE_EMPRESA} />)
    const campo = screen.getByPlaceholderText('Buscar por usuario…')
    expect(campo).toHaveAccessibleName('Buscar por usuario en el historial')
    escribir(campo, registros[0].accion)
    expect(screen.getByText(textosHistorial.sin_resultados)).toBeInTheDocument()
    escribir(campo, registros[0].usuario)
    expect(filasDeTabla().length).toBeGreaterThan(0)
  })

  it('EMP-03 muestra el texto del campo «Buscar por nombre o correo…» y no busca por rol', () => {
    render(<PestanaUsuariosEmpresa empresa={empresa} usuariosBase={USUARIOS_BASE_EMPRESA} />)
    const campo = screen.getByPlaceholderText('Buscar por nombre o correo…')
    const etiquetaRol = Object.values(textosUsuarios.roles).find((etiqueta) => !usuarios.some((usuario) => [usuario.nombre, usuario.correo].some((texto) => texto.toLowerCase().includes(etiqueta.toLowerCase()))))
    if (!etiquetaRol) throw new Error('debe existir una etiqueta de rol que no coincida con ningún nombre o correo')
    escribir(campo, etiquetaRol)
    expect(screen.getByText(textosUsuarios.sin_resultados)).toBeInTheDocument()
    escribir(campo, usuarios[0].correo)
    expect(filasDeTabla().length).toBeGreaterThan(0)
  })
})
