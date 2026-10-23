import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { PanelEmojisComentario } from './panel_emojis_comentario'
import { usarCajaComentario } from './usar_caja_comentario'
import { VistaPreviaMediosPublicacion } from './vista_previa_medios_publicacion'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CajaComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios
const clases = textos.clases
const editor = catalogoCompartido.controles.campo_texto_editor

export function CajaComentario({ marcador, etiqueta, etiquetaEnviar, textoInicial, conMedios = true, autoFoco = false, pista, mencion, onEnviar, onCancelar }: CajaComentarioProps) {
  const caja = usarCajaComentario({ textoInicial, onEnviar, onCancelar, marcador, etiqueta, etiquetaEnviar })

  return (
    <form onSubmit={caja.enviar} onKeyDown={caja.alTeclear} onPaste={caja.alPegar} className={clases.caja}>
      {mencion && <strong className={clases.mencion}>{mencion}</strong>}
      <CampoTexto
        multilinea
        filasMinimas={1}
        valor={caja.texto}
        alCambiar={caja.setTexto}
        marcador={marcador}
        className={editor.className}
        sx={editor.sx}
        inputProps={{ [catalogoCompartido.controles.atributo_accesible]: etiqueta, autoFocus: autoFoco }}
      />
      <VistaPreviaMediosPublicacion medios={caja.medios} onQuitar={caja.quitarMedio} />
      <div className={clases.pie_caja}>
        <div className={clases.acciones_caja}>
          <BotonIcono icono="sentimiento" type="button" aria-label={textos.etiqueta_emojis} aria-expanded={caja.emojis} onClick={caja.alternarEmojis} variant="discreto" size="default" />
          {conMedios && (
            <>
              <BotonIcono icono="imagen" type="button" aria-label={textos.etiqueta_adjuntar} title={textos.etiqueta_adjuntar} onClick={caja.abrirSelectorImagen} variant="discreto" size="default" />
              <input ref={caja.selectorImagen} type="file" multiple hidden tabIndex={-1} accept={textos.aceptar_imagen} aria-label={textos.etiqueta_adjuntar} onChange={caja.alElegirArchivos} />
              <BotonIcono icono="video" type="button" aria-label={textos.etiqueta_adjuntar_video} title={textos.etiqueta_adjuntar_video} onClick={caja.abrirSelectorVideo} variant="discreto" size="default" />
              <input ref={caja.selectorVideo} type="file" multiple hidden tabIndex={-1} accept={textos.aceptar_video} aria-label={textos.etiqueta_adjuntar_video} onChange={caja.alElegirArchivos} />
            </>
          )}
          {pista && <span className={clases.pista}>{pista}</span>}
          {onCancelar && (
            <Boton type="button" variant="fantasma" size="enlace_accion" onClick={onCancelar}>
              {textos.cancelar}
            </Boton>
          )}
        </div>
        <BotonIcono icono="enviar" type="submit" aria-label={etiquetaEnviar} disabled={caja.vacio} variant="primario" size="default" />
      </div>
      {caja.emojis && <PanelEmojisComentario onElegir={caja.agregarEmoji} />}
    </form>
  )
}
