import { render, screen } from '@testing-library/react'
import { PaginaAmigosSolicitudes } from '@/paginas/amigos/pagina_amigos_solicitudes'
import { PaginaAmigosSugerencias } from '@/paginas/amigos/pagina_amigos_sugerencias'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'
import { PaginaGruposMisGrupos } from '@/paginas/grupos/pagina_grupos_mis_grupos'
import { PaginaGruposInvitaciones } from '@/paginas/grupos/pagina_grupos_invitaciones'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import { AMIGOS, RECIBIDAS, SUGERENCIAS } from '../../rutas/amigos/rutas_amigos'
import { MIS_GRUPOS, PENDIENTES } from '../../rutas/grupos/rutas_grupos'
import { COMPRAS } from '../../rutas/marketplace/rutas_marketplace'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

function vaciar(lista: unknown[]) {
  const copia = lista.splice(0)
  return () => lista.push(...copia)
}

const CASOS = [
  ['Amigos: sin amigos', AMIGOS, PaginaAmigosTodos, catalogoAmigos.mensajes.sin_amigos],
  ['Amigos: sin solicitudes', RECIBIDAS, PaginaAmigosSolicitudes, catalogoAmigos.mensajes.sin_solicitudes],
  ['Amigos: sin sugerencias', SUGERENCIAS, PaginaAmigosSugerencias, catalogoAmigos.mensajes.sin_sugerencias],
  ['Grupos: sin grupos', MIS_GRUPOS, PaginaGruposMisGrupos, catalogoGrupos.mensajes.sin_grupos],
  ['Grupos: sin invitaciones pendientes', PENDIENTES, PaginaGruposInvitaciones, catalogoGrupos.mensajes.sin_invitaciones_grupo],
  ['Marketplace: sin compras', COMPRAS, PaginaMarketplace, catalogoMarketplace.mensajes.sin_compras],
] as const

describe('Estados vacios de Amigos, Grupos y Marketplace usan el MensajeVacio global', { timeout: 30000 }, () => {
  it.each(CASOS)('%s', (_nombre, lista, Pagina, texto) => {
    const restaurar = vaciar(lista as unknown[])
    try {
      render(<Pagina />)
      const mensaje = screen.getByText(texto)
      expect(mensaje.tagName).toBe('P')
      expect(mensaje.className).toBe(catalogoCompartido.mensaje_vacio.texto)
      expect(mensaje.parentElement?.className).toContain(catalogoCompartido.mensaje_vacio.contenedor)
    } finally {
      restaurar()
    }
  })

  it.each(CASOS)('%s: con datos no aparece el mensaje vacio', (_nombre, _lista, Pagina, texto) => {
    render(<Pagina />)
    expect(screen.queryByText(texto)).toBeNull()
  })
})
