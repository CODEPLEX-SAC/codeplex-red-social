import { useState } from 'react'
import type { FormEvent } from 'react'
import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { SeccionComentariosPublicacionProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function SeccionComentariosPublicacion({ id, comentarios, total, onComentar }: SeccionComentariosPublicacionProps) {
  const [borrador, setBorrador] = useState('')
  const vacio = borrador.trim().length === 0

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (vacio) return
    onComentar(borrador.trim())
    setBorrador('')
  }

  return (
    <section id={id} aria-label={textos.etiqueta_seccion} className="border-t border-borde-suave px-4 py-3">
      {total === 0 && <MensajeVacio texto={textos.vacio} className="mb-3" />}
      {comentarios.length > 0 && (
        <ul aria-label={textos.etiqueta_lista} className="m-0 mb-3 flex list-none flex-col gap-3 p-0">
          {comentarios.map((comentario) => (
            <li key={comentario.id} className="flex gap-2.5">
              <AvatarImagen src={imagenUsuarioPredeterminada} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
              <div className="min-w-0 flex-1 rounded-xl bg-fondo px-3 py-2">
                <strong className="block text-auxiliar text-texto">{comentario.autor}</strong>
                <p className="m-0 whitespace-pre-wrap break-words text-subtitulo text-texto">{comentario.texto}</p>
                <span className="text-fecha-abreviada text-texto-suave">{comentario.tiempo}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={enviar} className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <CampoTexto
            valor={borrador}
            alCambiar={setBorrador}
            marcador={textos.marcador}
            inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.etiqueta_campo }}
          />
        </div>
        <Boton type="submit" variant="primario" size="md" disabled={vacio} className="flex-none">
          {textos.publicar}
        </Boton>
      </form>
    </section>
  )
}
