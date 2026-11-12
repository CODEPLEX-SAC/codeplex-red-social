import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { CONTEXTO_DESTINOS_COMPARTIR } from './contexto_destinos_compartir'
import { agregarCompartida } from './logica_almacen_publicaciones'
import { borradorInicial, conHistoria, conTexto, historiaDesdeBorrador, recortarTexto } from './logica_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ProveedorDestinosCompartirProps } from '@/tipos/inicio/contrato_compartir_publicacion'
import type { OrigenCompartido } from '@/tipos/inicio/modelo_inicio'

export function ProveedorDestinosCompartir({ grupos, amigos, almacenDeGrupo, almacenHistorias, children }: ProveedorDestinosCompartirProps) {
  const { usuario } = usarSesionDemostracion()

  function compartirEnGrupo(idGrupo: string, origen: OrigenCompartido, comentario: string) {
    if (!usuario) return
    almacenDeGrupo(idGrupo).modificar((actual) => agregarCompartida(actual, { autor: { id: usuario.id, usuario: usuario.usuario }, origen, comentario, tiempo: catalogoInicio.publicacion.tiempo_ahora }))
  }

  function compartirEnHistoria(origen: OrigenCompartido, comentario: string): boolean {
    if (!usuario || !almacenHistorias) return false
    const texto = [origen.nombre, origen.texto, comentario].filter(Boolean).join(catalogoInicio.publicacion.compartir.separador_parrafo)
    const borrador = conTexto(borradorInicial('texto'), recortarTexto(texto))
    almacenHistorias.modificar((actual) => conHistoria(actual, historiaDesdeBorrador(actual, borrador, { id: usuario.id, nombre: usuario.usuario }, catalogoInicio.publicacion.tiempo_ahora)))
    return true
  }

  return <CONTEXTO_DESTINOS_COMPARTIR.Provider value={{ grupos, amigos, compartirEnGrupo, compartirEnHistoria }}>{children}</CONTEXTO_DESTINOS_COMPARTIR.Provider>
}
