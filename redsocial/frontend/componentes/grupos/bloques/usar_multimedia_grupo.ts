import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { AlbumGrupo, DetalleGrupo, EstadoMultimediaGrupo, MedioGrupo } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.multimedia

export function usarMultimediaGrupo(grupo: DetalleGrupo): EstadoMultimediaGrupo {
  const selector = useRef<HTMLInputElement>(null)
  const [fotosNuevas, setFotosNuevas] = useState<MedioGrupo[]>([])
  const [videos, setVideos] = useState<MedioGrupo[]>([])
  const [albumesNuevos, setAlbumesNuevos] = useState<AlbumGrupo[]>([])
  const [creandoAlbum, setCreandoAlbum] = useState(false)
  const [aviso, setAviso] = useState(String())
  const fotos = [...fotosNuevas, ...grupo.galeria.map((url, indice) => ({ id: `galeria-${indice}`, url }))]
  const iniciales = textos.albumes_iniciales.map((nombre, indice) => ({ id: `inicial-${indice}`, nombre, portada: grupo.galeria[indice] ?? String() }))

  function elegir(evento: ChangeEvent<HTMLInputElement>) {
    const elegidos = Array.from(evento.target.files ?? []).map((archivo) => ({ id: `${archivo.name}-${archivo.size}-${archivo.lastModified}`, url: URL.createObjectURL(archivo), esVideo: archivo.type.startsWith('video/') }))
    setFotosNuevas((actuales) => [...elegidos.filter((medio) => !medio.esVideo), ...actuales])
    setVideos((actuales) => [...elegidos.filter((medio) => medio.esVideo), ...actuales])
    if (elegidos.length > 0) setAviso(textos.aviso_anadido)
    evento.target.value = String()
  }

  function crearAlbum(nombre: string) {
    setAlbumesNuevos((actuales) => [...actuales, { id: `nuevo-${actuales.length}`, nombre, portada: fotos[0]?.url ?? String() }])
    setCreandoAlbum(false)
  }

  return {
    fotos,
    videos,
    albumes: [...iniciales, ...albumesNuevos],
    creandoAlbum,
    aviso,
    selector,
    abrirSelector: () => selector.current?.click(),
    elegir,
    abrirCrearAlbum: () => setCreandoAlbum(true),
    cerrarCrearAlbum: () => setCreandoAlbum(false),
    crearAlbum,
  }
}
