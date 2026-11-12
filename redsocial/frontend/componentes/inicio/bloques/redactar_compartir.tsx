import { useState } from 'react'
import { imagenPerfilPedroRedSocial } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { EditorPublicacion } from './editor_publicacion'
import { PanelEmojisComentario } from './panel_emojis_comentario'
import { usarDestinosCompartir } from './usar_destinos_compartir'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { RedactarCompartirProps } from '@/tipos/inicio/contrato_compartir_publicacion'

const textos = catalogoInicio.publicacion.compartir
const redactar = textos.redactar

function marcadorDe(destino: RedactarCompartirProps['destino']): string {
  if (destino.tipo === 'grupo') return redactar.marcador_grupo
  return redactar.marcador_amigo.replace(':nombre', destino.nombre.split(' ')[0])
}

export function RedactarCompartir({ destino, comentario, etiquetados, alCambiarComentario, alAlternarEtiqueta, alPublicar }: RedactarCompartirProps) {
  const { usuario } = usarSesionDemostracion()
  const destinos = usarDestinosCompartir()
  const [panel, setPanel] = useState<'emoji' | 'etiquetas' | null>(null)
  const esGrupo = destino.tipo === 'grupo'
  const marcador = marcadorDe(destino)
  const marcados = new Set(etiquetados)
  const alternar = (que: 'emoji' | 'etiquetas') => setPanel((actual) => (actual === que ? null : que))

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
        <div className="flex items-center gap-3">
          <AvatarUsuario tamano="md" imagen={imagenPerfilPedroRedSocial} />
          <strong className="text-nombre-entidad text-texto">{usuario?.usuario}</strong>
        </div>
        <EditorPublicacion valor={comentario} marcador={marcador} etiqueta={redactar.etiqueta_campo} filasMinimas={3} onCambiar={alCambiarComentario} />
        {etiquetados.length > 0 && <p className="m-0 text-auxiliar text-texto-suave">{redactar.etiquetados.replace(':nombres', etiquetados.join(', '))}</p>}
        <div className="flex items-center justify-between gap-3 rounded-control border border-borde px-4 py-3">
          <span className="text-titulo-subseccion text-texto">{redactar.agregar}</span>
          <div className="flex items-center gap-1">
            <BotonIcono icono="nuevo-usuario" type="button" aria-label={redactar.etiquetar} aria-expanded={panel === 'etiquetas'} variant="suave" size="default" onClick={() => alternar('etiquetas')} />
            <BotonIcono icono="sentimiento" type="button" aria-label={redactar.emoji} aria-expanded={panel === 'emoji'} variant="suave" size="default" onClick={() => alternar('emoji')} />
          </div>
        </div>
        {panel === 'emoji' && <PanelEmojisComentario onElegir={(emoji) => alCambiarComentario(`${comentario}${emoji}`)} />}
        {panel === 'etiquetas' && (
          <ul aria-label={redactar.personas} className="m-0 grid max-h-40 list-none gap-1 overflow-y-auto p-0">
            {destinos.amigos.map((amigo) => (
              <li key={amigo.id}>
                <Boton type="button" variant="fantasma" size="default" aria-pressed={marcados.has(amigo.nombre)} className="w-full justify-start gap-3 text-left" onClick={() => alAlternarEtiqueta(amigo.nombre)}>
                  <AvatarUsuario tamano="sm" imagen={amigo.imagen} />
                  <span className="flex-1 text-subtitulo text-texto">{amigo.nombre}</span>
                  {marcados.has(amigo.nombre) && <Icono name="marcar-leido" className="h-4 w-4 text-exito-texto" />}
                </Boton>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-borde px-5 py-4">
        <Boton type="button" variant="primario" size="md" className="w-full justify-center" onClick={alPublicar}>
          {esGrupo ? redactar.publicar : redactar.compartir}
        </Boton>
      </div>
    </>
  )
}
