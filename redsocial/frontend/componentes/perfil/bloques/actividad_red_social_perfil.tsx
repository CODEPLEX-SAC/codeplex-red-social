import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { CompositorInicio, ElementoFeedInicio, ModalCrearPublicacion } from '../../inicio'
import { PanelMisPreguntasPerfil } from './panel_mis_preguntas_perfil'
import { preguntasDe, primerNombre } from './logica_red_social_perfil'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { ActividadRedSocialPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { SubpestanaRedSocial } from '@/tipos/perfil/modelo_perfil'

const textos = catalogoPerfil.red_social
const clases = catalogoPerfil.clases.red_social

export function ActividadRedSocialPerfil({ perfil, publicaciones, acciones, propio, onPublicar }: ActividadRedSocialPerfilProps) {
  const [subpestana, setSubpestana] = useState<SubpestanaRedSocial>('actividad')
  const [apertura, setApertura] = useState<TipoPublicacion | null>(null)
  const visibles = subpestana === 'preguntas' ? preguntasDe(publicaciones) : publicaciones
  const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', primerNombre(perfil.nombre))

  return (
    <div className={clases.columna}>
      <div role="group" aria-label={textos.etiqueta_subpestanas} className={clases.subpestanas}>
        {textos.subpestanas.map((opcion) => (
          <Boton key={opcion.clave} type="button" variant="filtro" size="filtro" activo={subpestana === opcion.clave} aria-pressed={subpestana === opcion.clave} onClick={() => setSubpestana(opcion.clave as SubpestanaRedSocial)}>
            {opcion.clave === 'preguntas' && propio ? textos.mis_preguntas : opcion.etiqueta}
          </Boton>
        ))}
      </div>
      {propio && <CompositorInicio placeholderPublicar={marcador} onAbrir={setApertura} />}
      {apertura && <ModalCrearPublicacion tipoInicial={apertura} onPublicar={onPublicar} onCerrar={() => setApertura(null)} />}
      {subpestana === 'preguntas' && <PanelMisPreguntasPerfil preguntas={visibles} acciones={acciones} propio={propio} />}
      {subpestana === 'actividad' && visibles.length === 0 && (
        <div className={catalogoPerfil.clases.vacio}>
          <MensajeVacio texto={catalogoPerfil.mensajes.sin_publicaciones} />
        </div>
      )}
      {subpestana === 'actividad' && visibles.map((elemento) => <ElementoFeedInicio key={elemento.id} elemento={elemento} acciones={acciones} />)}
    </div>
  )
}
