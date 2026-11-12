import { render, screen } from '@testing-library/react'
import { PaginaAmigosSolicitudes } from '@/paginas/amigos/pagina_amigos_solicitudes'
import { PaginaAmigosSugerencias } from '@/paginas/amigos/pagina_amigos_sugerencias'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'
import { PaginaGruposMisGrupos } from '@/paginas/grupos/pagina_grupos_mis_grupos'
import { AMIGOS, RECIBIDAS, SUGERENCIAS } from '../../rutas/amigos/rutas_amigos'
import { GRUPOS_ADMIN, MIS_GRUPOS } from '../../rutas/grupos/rutas_grupos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

function vaciar(...listas: unknown[][]) {
  const copias = listas.map((lista) => lista.splice(0))
  return () => listas.forEach((lista, indice) => lista.push(...copias[indice]))
}

const CASOS = {
  sinAmigos: { lista: AMIGOS, Pagina: PaginaAmigosTodos, texto: catalogoAmigos.mensajes.sin_amigos },
  sinSolicitudes: { lista: RECIBIDAS, Pagina: PaginaAmigosSolicitudes, texto: catalogoAmigos.mensajes.sin_solicitudes },
  sinSugerencias: { lista: SUGERENCIAS, Pagina: PaginaAmigosSugerencias, texto: catalogoAmigos.mensajes.sin_sugerencias },
  sinGrupos: { lista: MIS_GRUPOS, Pagina: PaginaGruposMisGrupos, texto: catalogoGrupos.mensajes.sin_grupos },
}

const MENSAJE_VACIO_GLOBAL = { etiqueta: 'P', clase: catalogoCompartido.mensaje_vacio.texto, contenedorGlobal: true }

function mensajeConLaListaVacia({ lista, Pagina, texto }: (typeof CASOS)[keyof typeof CASOS]) {
  const restaurar = vaciar(lista as unknown[], ...(lista === MIS_GRUPOS ? [GRUPOS_ADMIN as unknown[]] : []))
  try {
    render(<Pagina />)
    const mensaje = screen.getByText(texto)
    return { etiqueta: mensaje.tagName, clase: mensaje.className, contenedorGlobal: Boolean(mensaje.parentElement?.className.includes(catalogoCompartido.mensaje_vacio.contenedor)) }
  } finally {
    restaurar()
  }
}

function aparecaMensajeConDatos({ Pagina, texto }: (typeof CASOS)[keyof typeof CASOS]) {
  render(<Pagina />)
  return screen.queryByText(texto) !== null
}

describe('Estados vacios de Amigos y Grupos usan el MensajeVacio global', { timeout: 30000 }, () => {
  it('Amigos: sin amigos', () => {
    expect(mensajeConLaListaVacia(CASOS.sinAmigos)).toEqual(MENSAJE_VACIO_GLOBAL)
  })

  it('Amigos: sin solicitudes', () => {
    expect(mensajeConLaListaVacia(CASOS.sinSolicitudes)).toEqual(MENSAJE_VACIO_GLOBAL)
  })

  it('Amigos: sin sugerencias', () => {
    expect(mensajeConLaListaVacia(CASOS.sinSugerencias)).toEqual(MENSAJE_VACIO_GLOBAL)
  })

  it('Grupos: sin grupos', () => {
    expect(mensajeConLaListaVacia(CASOS.sinGrupos)).toEqual(MENSAJE_VACIO_GLOBAL)
  })

  it('Amigos: con datos no aparece el mensaje vacio de amigos', () => {
    expect(aparecaMensajeConDatos(CASOS.sinAmigos)).toBe(false)
  })

  it('Amigos: con datos no aparece el mensaje vacio de solicitudes', () => {
    expect(aparecaMensajeConDatos(CASOS.sinSolicitudes)).toBe(false)
  })

  it('Amigos: con datos no aparece el mensaje vacio de sugerencias', () => {
    expect(aparecaMensajeConDatos(CASOS.sinSugerencias)).toBe(false)
  })

  it('Grupos: con datos no aparece el mensaje vacio de grupos', () => {
    expect(aparecaMensajeConDatos(CASOS.sinGrupos)).toBe(false)
  })

})
