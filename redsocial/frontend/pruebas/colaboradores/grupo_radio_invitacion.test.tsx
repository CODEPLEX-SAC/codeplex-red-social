import { fireEvent, render, screen } from '@testing-library/react'
import { BloqueRenovacion } from '@/componentes/colaboradores/bloques/bloque_renovacion'
import { abrirInvitacion } from './ayudas_permisos'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'

vi.setConfig({ testTimeout: 30000 })

const radio = (nombre: string) => screen.getByRole('radio', { name: new RegExp(nombre) }) as HTMLInputElement

describe('Invitar colaborador: radios en grupo de la libreria', () => {
  it('el metodo de invitacion tiene una sola opcion marcada, por defecto correo, y no se puede quedar sin ninguna', () => {
    render(<PaginaColaboradores />)
    abrirInvitacion()
    const correo = radio(catalogoColaboradores.campos_informacion.enviar_correo)
    const whatsapp = radio(catalogoColaboradores.campos_informacion.enviar_whatsapp)
    expect(correo.checked).toBe(true)
    expect(whatsapp.checked).toBe(false)
    fireEvent.click(whatsapp)
    expect(whatsapp.checked).toBe(true)
    expect(correo.checked).toBe(false)
    fireEvent.click(whatsapp)
    expect(whatsapp.checked).toBe(true)
    expect(screen.getAllByRole('radio').filter((opcion) => (opcion as HTMLInputElement).checked)).toHaveLength(1)
  })

  it('la renovacion marca solo una opcion y al elegir la otra se desmarca la anterior', () => {
    render(<BloqueRenovacion OPCIONES_RECORDATORIO={['7 dias']} OPCIONES_ZONA_HORARIA={['Lima']} />)
    const permitir = radio(catalogoColaboradores.campos_vigencia.permitir_renovacion)
    const noPermitir = radio(catalogoColaboradores.campos_vigencia.no_permitir_renovacion)
    expect(permitir.checked).toBe(true)
    fireEvent.click(noPermitir)
    expect(noPermitir.checked).toBe(true)
    expect(permitir.checked).toBe(false)
    fireEvent.click(permitir)
    expect(permitir.checked).toBe(true)
    expect(noPermitir.checked).toBe(false)
  })
})
