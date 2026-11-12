import { fireEvent, render, screen, within } from '@testing-library/react'
import { BuscadorGlobal } from '@/componentes/compartido/navegacion/buscador_global'
import { ContextoDirectorioUsuarios } from '@/componentes/compartido/sesion/contexto_directorio_usuarios'
import { rutaPerfilUsuario } from '@/componentes/compartido/interfaz/ruta_perfil_usuario'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { PERFILES_USUARIO } from '../../rutas/perfil/rutas_perfil'

const textos = catalogoCompartido.buscador_global
const DIRECTORIO = PERFILES_USUARIO.map((perfil) => ({ id: perfil.id, nombre: perfil.nombre, titular: perfil.titular, avatar: perfil.avatar }))

function montar() {
  render(
    <ContextoDirectorioUsuarios.Provider value={DIRECTORIO}>
      <BuscadorGlobal />
    </ContextoDirectorioUsuarios.Provider>,
  )
  return screen.getByRole('searchbox', { name: textosRedSocial.BUSCAR })
}

function escribir(campo: HTMLElement, texto: string) {
  fireEvent.focus(campo)
  fireEvent.change(campo, { target: { value: texto } })
}

describe('Buscador global de personas', () => {
  it('no muestra resultados mientras no se escribe', () => {
    montar()
    expect(screen.queryByRole('list', { name: textos.etiqueta_resultados })).toBeNull()
  })

  it('encuentra a un amigo y a quien no es amigo, sin distinguir tildes ni mayusculas', () => {
    const campo = montar()
    const amigo = DIRECTORIO.find((usuario) => usuario.id === 'maria-fernandez')
    const ajeno = DIRECTORIO.find((usuario) => usuario.id !== 'usuario-pedro-lozano' && !PERFILES_USUARIO[0].amigos.includes(usuario.id))
    expect(amigo).toBeDefined()
    expect(ajeno).toBeDefined()

    escribir(campo, 'MARIA FERN')
    const lista = within(screen.getByRole('list', { name: textos.etiqueta_resultados }))
    expect(lista.getByRole('link', { name: new RegExp(amigo?.nombre ?? '') })).toHaveAttribute('href', rutaPerfilUsuario('maria-fernandez'))

    escribir(campo, (ajeno?.nombre ?? '').slice(0, 5).toLowerCase())
    const filtrada = within(screen.getByRole('list', { name: textos.etiqueta_resultados }))
    expect(filtrada.getAllByRole('link').some((enlace) => enlace.getAttribute('href') === rutaPerfilUsuario(ajeno?.id ?? ''))).toBe(true)
  })

  it('sin coincidencias muestra el aviso y Escape cierra el panel', () => {
    const campo = montar()
    escribir(campo, 'zzz-no-existe')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    fireEvent.keyDown(campo, { key: textos.tecla_cerrar })
    expect(screen.queryByRole('list', { name: textos.etiqueta_resultados })).toBeNull()
  })

  it('limita la cantidad de resultados mostrados', () => {
    const campo = montar()
    escribir(campo, 'a')
    expect(within(screen.getByRole('list', { name: textos.etiqueta_resultados })).getAllByRole('link').length).toBeLessThanOrEqual(textos.maximo_resultados)
  })
})
