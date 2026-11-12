import { act, fireEvent, render, screen } from '@testing-library/react'
import { SeccionInvitaciones } from '@/componentes/grupos'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { ACEPTADAS, CLASES_ICONO_INV, CONTEO_PESTANAS_INVITACIONES_GRUPO as CONTEO, PENDIENTES } from '../../rutas/grupos/rutas_grupos'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { ItemInvitacion } from '@/tipos/grupos/modelo_grupos_invitaciones'

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const buscador = () => screen.getByPlaceholderText(catalogoGrupos.placeholders.buscar_invitaciones)
const escribir = (texto: string) => fireEvent.change(buscador(), { target: { value: texto } })

describe('GRP-01: invitaciones con una sola consulta para pendientes y aceptadas', { timeout: 30000 }, () => {
  it('busca por nombre del grupo en las dos listas y no por quien invita', () => {
    render(<SeccionInvitaciones CONTEO={CONTEO} PENDIENTES={PENDIENTES} CLASES_ICONO_INV={CLASES_ICONO_INV} ACEPTADAS={ACEPTADAS} />)
    escribir(PENDIENTES[0].nombre)
    expect(screen.getAllByText(PENDIENTES[0].nombre).length).toBeGreaterThan(0)
    expect(screen.queryByText(ACEPTADAS[0].nombre)).toBeNull()
    escribir(ACEPTADAS[0].nombre)
    expect(screen.getAllByText(ACEPTADAS[0].nombre).length).toBeGreaterThan(0)
    escribir(PENDIENTES[0].invitadoPor)
    expect(screen.queryByText(PENDIENTES[0].nombre)).toBeNull()
  })

  it('sin coincidencias en ninguna lista muestra el aviso común', () => {
    render(<SeccionInvitaciones CONTEO={CONTEO} PENDIENTES={PENDIENTES} CLASES_ICONO_INV={CLASES_ICONO_INV} ACEPTADAS={ACEPTADAS} />)
    escribir('zzzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
  })
})

describe('GRP-01: fuente inyectada', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('reparte el resultado de una única consulta entre pendientes y aceptadas', async () => {
    const items: readonly ItemInvitacion[] = [
      { lista: 'pendientes', invitacion: PENDIENTES[0] },
      { lista: 'aceptadas', invitacion: ACEPTADAS[0] },
    ]
    const fuente = vi.fn<FuenteBusqueda<ItemInvitacion>>(() => Promise.resolve({ elementos: items, total: items.length }))
    render(<SeccionInvitaciones CONTEO={CONTEO} PENDIENTES={[]} CLASES_ICONO_INV={CLASES_ICONO_INV} ACEPTADAS={[]} fuente={fuente} />)
    expect(fuente).toHaveBeenCalledWith('', undefined)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getAllByText(PENDIENTES[0].nombre).length).toBeGreaterThan(0)
    expect(screen.getAllByText(ACEPTADAS[0].nombre).length).toBeGreaterThan(0)
    expect(screen.queryByRole('progressbar')).toBeNull()
  })

  it('un error de la fuente muestra el mensaje de error común', async () => {
    const fuente: FuenteBusqueda<ItemInvitacion> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: [], total: 0 }) : Promise.reject({ codigo: 'no_disponible' }))
    render(<SeccionInvitaciones CONTEO={CONTEO} PENDIENTES={[]} CLASES_ICONO_INV={CLASES_ICONO_INV} ACEPTADAS={[]} fuente={fuente} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir('ana')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })
})
