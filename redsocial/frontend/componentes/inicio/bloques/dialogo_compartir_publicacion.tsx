import { useState } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { EditorPublicacion } from './editor_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { DialogoCompartirPublicacionProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.compartir

export function DialogoCompartirPublicacion({ nombre, texto, onCompartir, onCerrar }: DialogoCompartirPublicacionProps) {
  const { usuario } = usarSesionDemostracion()
  const [compartida, setCompartida] = useState(false)
  const [comentario, setComentario] = useState('')

  function confirmar() {
    onCompartir()
    setCompartida(true)
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-140 rounded-2xl max-600:h-full max-600:rounded-none">
      {compartida ? (
        <div role="status" className="flex flex-col items-center gap-3 px-6 py-10 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primario-suave text-primario">
            <Icono name="verificado" className="h-7 w-7" />
          </div>
          <strong className="text-nombre-entidad text-texto">{textos.exito_titulo}</strong>
          <p className="m-0 text-subtitulo text-texto-suave">{textos.exito_mensaje}</p>
          <Boton type="button" variant="primario" size="md" autoFocus onClick={onCerrar}>
            {textos.listo}
          </Boton>
        </div>
      ) : (
        <>
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-5">
            <div className="flex items-center gap-3">
              <AvatarImagen src={imagenUsuarioPredeterminada} className="h-11 w-11 flex-none rounded-full bg-primario-suave" />
              <div className="min-w-0">
                <strong className="block truncate text-nombre-entidad text-texto">{usuario?.usuario}</strong>
                <span className="block text-auxiliar text-texto-suave">{textos.contexto}</span>
              </div>
            </div>
            <div className="shrink-0">
              <EditorPublicacion valor={comentario} marcador={textos.marcador} etiqueta={textos.etiqueta_campo} filasMinimas={4} onCambiar={setComentario} />
            </div>
            <blockquote aria-label={textos.etiqueta_vista_previa} className="m-0 flex shrink-0 flex-col gap-3 rounded-xl border border-borde bg-fondo p-4">
              <div className="flex items-center gap-3">
                <AvatarImagen src={imagenUsuarioPredeterminada} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
                <strong className="min-w-0 truncate text-nombre-entidad text-texto">{nombre}</strong>
              </div>
              <p className="m-0 line-clamp-6 whitespace-pre-wrap break-words text-subtitulo leading-texto text-texto">{texto}</p>
            </blockquote>
          </div>
          <div className="flex justify-end border-t border-borde px-6 py-4 max-600:flex-col">
            <Boton type="button" variant="primario" size="md" onClick={confirmar}>
              {textos.confirmar}
            </Boton>
          </div>
        </>
      )}
    </Modal>
  )
}
