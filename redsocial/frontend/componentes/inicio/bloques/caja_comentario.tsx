import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { MiniaturasMediosComentario } from './miniaturas_medios_comentario'
import { PanelEmojisComentario } from './panel_emojis_comentario'
import { usarCajaComentario } from './usar_caja_comentario'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CajaComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios
const clases = textos.clases
const editor = catalogoCompartido.controles.campo_texto_editor
const tiposAceptados = catalogoInicio.modal_crear_publicacion.medios.tipos_aceptados

export function CajaComentario(props: CajaComentarioProps) {
  const { marcador, etiqueta, etiquetaEnviar, autoFoco = false, mencion } = props
  const caja = usarCajaComentario(props)

  return (
    <form onSubmit={caja.enviar} onKeyDown={caja.alTeclear} onPaste={caja.alPegar} className={clases.caja}>
      <div className={clases.fila_texto}>
        {mencion && <strong className={clases.mencion_caja}>{mencion}</strong>}
        <div className="min-w-0 flex-1">
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
        </div>
      </div>
      <MiniaturasMediosComentario medios={caja.medios} onQuitar={caja.quitarMedio} />
      <div className={clases.pie_caja}>
        <div className={clases.acciones_caja}>
          <BotonIcono icono="sentimiento" type="button" aria-label={textos.etiqueta_emojis} aria-expanded={caja.emojis} onClick={caja.alternarEmojis} variant="discreto" size="default" />
          <BotonIcono icono="imagen" type="button" aria-label={textos.etiqueta_adjuntar} title={textos.etiqueta_adjuntar} onClick={caja.abrirSelector} variant="discreto" size="default" />
          <input ref={caja.selector} type="file" multiple hidden tabIndex={-1} accept={tiposAceptados} aria-label={textos.etiqueta_adjuntar} onChange={caja.alElegirArchivos} />
        </div>
        <BotonIcono icono="enviar" type="submit" aria-label={etiquetaEnviar} disabled={caja.vacio} variant="primario" size="default" />
      </div>
      {caja.emojis && <PanelEmojisComentario onElegir={caja.agregarEmoji} />}
    </form>
  )
}
