import { act, renderHook } from '@testing-library/react'
import { crearFuenteLocal } from '@/componentes/compartido/interfaz/fuente_busqueda_local'
import { usarBusqueda } from '@/componentes/compartido/interfaz/usar_busqueda'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { PersonaConIdentificador } from './modelo_persona_busqueda'
import { coincidentes, diferida, fuenteLocal, PERSONAS } from './ayudas_busqueda'

const RETARDO = catalogoCompartido.busqueda.retardo_remoto_ms

describe('Contrato y hook compartido de búsqueda', () => {
  describe('modo local', () => {
    it('empieza en estado inicial con el listado completo y no espera para filtrar', () => {
      const { result } = renderHook(() => usarBusqueda(fuenteLocal))
      expect(result.current.estado).toBe('inicial')
      expect(result.current.resultado.elementos).toHaveLength(PERSONAS.length)

      act(() => result.current.cambiarTexto('ana'))
      expect(result.current.estado).toBe('con_resultados')
      expect(result.current.resultado.elementos.map((persona) => persona.id)).toEqual(['p1', 'p3'])
      expect(result.current.resultado.total).toBe(2)
    })

    it('distingue sin coincidencias, vuelve a inicial al limpiar y trata los espacios como consulta vacía', () => {
      const { result } = renderHook(() => usarBusqueda(fuenteLocal))
      act(() => result.current.cambiarTexto('zzz'))
      expect(result.current.estado).toBe('sin_coincidencias')
      expect(result.current.resultado.elementos).toHaveLength(0)

      act(() => result.current.limpiar())
      expect(result.current.texto).toBe('')
      expect(result.current.estado).toBe('inicial')

      act(() => result.current.cambiarTexto('   '))
      expect(result.current.estado).toBe('inicial')
    })

    it('entrega a la fuente la consulta sin espacios sobrantes y el límite indicado', () => {
      const fuente = vi.fn<FuenteBusqueda<PersonaConIdentificador>>(() => ({ elementos: [], total: 0 }))
      const { result } = renderHook(() => usarBusqueda(fuente, { limite: 5 }))
      act(() => result.current.cambiarTexto('  luis  '))
      expect(fuente).toHaveBeenLastCalledWith('luis', 5)
    })

    it('un error lanzado por la fuente produce el estado de error sin romper la pantalla', () => {
      const fuente: FuenteBusqueda<PersonaConIdentificador> = (consulta) => {
        if (consulta === 'x') throw new Error('fallo')
        return coincidentes(consulta)
      }
      const { result } = renderHook(() => usarBusqueda(fuente))
      act(() => result.current.cambiarTexto('x'))
      expect(result.current.estado).toBe('error')
      expect(result.current.error).toEqual({ codigo: 'no_disponible' })
      act(() => result.current.cambiarTexto('luis'))
      expect(result.current.estado).toBe('con_resultados')
      expect(result.current.error).toBeNull()
    })
  })

  describe('fuentes asíncronas', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('en modo local una promesa no espera: pasa por cargando y asienta el resultado', async () => {
      const pendiente = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      const fuente = vi.fn<FuenteBusqueda<PersonaConIdentificador>>(() => pendiente.promesa)
      const { result } = renderHook(() => usarBusqueda(fuente))
      act(() => result.current.cambiarTexto('ana'))
      expect(fuente).toHaveBeenLastCalledWith('ana', undefined)
      expect(result.current.estado).toBe('cargando')

      await act(async () => pendiente.resolver(coincidentes('ana')))
      expect(result.current.estado).toBe('con_resultados')
      expect(result.current.resultado.total).toBe(2)
    })

    it('en modo remota espera el retardo del catálogo y consulta una sola vez con el último texto', () => {
      const fuente = vi.fn<FuenteBusqueda<PersonaConIdentificador>>((consulta) => coincidentes(consulta))
      const { result } = renderHook(() => usarBusqueda(fuente, { modo: 'remota' }))
      expect(RETARDO).toBe(300)
      fuente.mockClear()

      act(() => result.current.cambiarTexto('a'))
      act(() => vi.advanceTimersByTime(RETARDO - 100))
      act(() => result.current.cambiarTexto('an'))
      expect(result.current.estado).toBe('escribiendo')
      expect(fuente).not.toHaveBeenCalled()

      act(() => vi.advanceTimersByTime(RETARDO))
      expect(fuente).toHaveBeenCalledTimes(1)
      expect(fuente).toHaveBeenLastCalledWith('an', undefined)
      expect(result.current.estado).toBe('con_resultados')
    })

    it('descarta una respuesta obsoleta que llega después de otra más reciente', async () => {
      const primera = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      const segunda = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      const fuente: FuenteBusqueda<PersonaConIdentificador> = (consulta) => (consulta === 'an' ? primera.promesa : segunda.promesa)
      const { result } = renderHook(() => usarBusqueda(fuente))

      act(() => result.current.cambiarTexto('an'))
      act(() => result.current.cambiarTexto('luis'))
      await act(async () => segunda.resolver(coincidentes('luis')))
      expect(result.current.resultado.elementos.map((persona) => persona.id)).toEqual(['p2'])

      await act(async () => primera.resolver(coincidentes('an')))
      expect(result.current.estado).toBe('con_resultados')
      expect(result.current.resultado.elementos.map((persona) => persona.id)).toEqual(['p2'])
    })

    it('una promesa rechazada produce error con el código del contrato, o no_disponible si no es uno conocido', async () => {
      const primera = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      const { result, rerender } = renderHook(({ fuente }) => usarBusqueda(fuente), { initialProps: { fuente: ((): ReturnType<FuenteBusqueda<PersonaConIdentificador>> => primera.promesa) as FuenteBusqueda<PersonaConIdentificador> } })
      act(() => result.current.cambiarTexto('ana'))
      await act(async () => primera.rechazar({ codigo: 'sin_permiso', mensaje: 'Sin acceso' }))
      expect(result.current.estado).toBe('error')
      expect(result.current.error).toEqual({ codigo: 'sin_permiso', mensaje: 'Sin acceso' })

      const segunda = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      rerender({ fuente: () => segunda.promesa })
      await act(async () => segunda.rechazar(new Error('red')))
      expect(result.current.error).toEqual({ codigo: 'no_disponible' })
    })
  })

  describe('filtros independientes', () => {
    interface FiltrosPersona {
      inicial: string
    }
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    const fuenteConFiltros = crearFuenteLocal<PersonaConIdentificador, FiltrosPersona>(
      PERSONAS,
      (persona, consulta) => persona.nombre.toLowerCase().includes(consulta.toLowerCase()),
      (persona, filtros) => persona.nombre.startsWith(filtros.inicial),
    )

    const buscarLocal = (consulta: string, filtros?: FiltrosPersona): ResultadoBusquedaLista<PersonaConIdentificador> => {
      const respuesta = fuenteConFiltros(consulta, undefined, filtros)
      if (respuesta instanceof Promise) throw new Error('la fuente local es sincrona')
      return respuesta
    }

    it('la fuente local aplica los filtros como parametro distinto de la consulta', () => {
      expect(buscarLocal('', { inicial: 'A' })).toEqual({ elementos: [PERSONAS[0], PERSONAS[2]], total: 2 })
      expect(buscarLocal('bel', { inicial: 'A' }).elementos).toEqual([PERSONAS[2]])
      expect(buscarLocal('ana').elementos).toHaveLength(2)
    })

    it('sin filtros la fuente se invoca solo con consulta y limite, igual que antes', () => {
      const fuente = vi.fn<FuenteBusqueda<PersonaConIdentificador>>(() => coincidentes(''))
      renderHook(() => usarBusqueda(fuente))
      expect(fuente).toHaveBeenCalledWith('', undefined)
    })

    it('en modo local un cambio de filtros se refleja de inmediato sin tocar el texto', () => {
      const { result, rerender } = renderHook(({ filtros }) => usarBusqueda(fuenteConFiltros, { filtros }), { initialProps: { filtros: { inicial: 'A' } } })
      expect(result.current.resultado.elementos).toHaveLength(2)
      rerender({ filtros: { inicial: 'L' } })
      expect(result.current.texto).toBe('')
      expect(result.current.resultado.elementos).toEqual([PERSONAS[1]])
    })

    it('en modo remoto los filtros viajan como tercer parametro y esperan el mismo retardo que el texto', () => {
      const fuente = vi.fn<FuenteBusqueda<PersonaConIdentificador, FiltrosPersona>>(() => coincidentes(''))
      const inicial = { inicial: 'A' }
      const otro = { inicial: 'L' }
      const { rerender } = renderHook(({ filtros }) => usarBusqueda(fuente, { modo: 'remota', filtros }), { initialProps: { filtros: inicial } })
      expect(fuente).toHaveBeenLastCalledWith('', undefined, inicial)
      fuente.mockClear()
      rerender({ filtros: otro })
      act(() => vi.advanceTimersByTime(RETARDO - 1))
      expect(fuente).not.toHaveBeenCalled()
      act(() => vi.advanceTimersByTime(1))
      expect(fuente).toHaveBeenCalledTimes(1)
      expect(fuente).toHaveBeenCalledWith('', undefined, otro)
    })

    it('una respuesta obsoleta de otros filtros no sustituye a la vigente', async () => {
      const lenta = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      const rapida = diferida<ResultadoBusquedaLista<PersonaConIdentificador>>()
      const primero = { inicial: 'A' }
      const segundo = { inicial: 'L' }
      const fuente: FuenteBusqueda<PersonaConIdentificador, FiltrosPersona> = (_consulta, _limite, filtros) => (filtros === primero ? lenta.promesa : rapida.promesa)
      const { result, rerender } = renderHook(({ filtros }) => usarBusqueda(fuente, { modo: 'remota', filtros }), { initialProps: { filtros: primero } })
      rerender({ filtros: segundo })
      act(() => vi.advanceTimersByTime(RETARDO))
      await act(async () => rapida.resolver({ elementos: [PERSONAS[1]], total: 1 }))
      await act(async () => lenta.resolver({ elementos: PERSONAS, total: PERSONAS.length }))
      expect(result.current.resultado.elementos).toEqual([PERSONAS[1]])
    })
  })

  describe('contrato', () => {
    it('los códigos de error del catálogo coinciden con los del contrato', () => {
      expect(catalogoCompartido.busqueda.codigos_error).toEqual(['consulta_invalida', 'no_disponible', 'sin_permiso'])
    })
  })
})
