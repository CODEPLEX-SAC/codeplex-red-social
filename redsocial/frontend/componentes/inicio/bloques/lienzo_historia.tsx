import type { ChangeEvent } from 'react'
import { LIMITE_TEXTO_HISTORIA, vistaDeBorrador } from './logica_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { LienzoHistoriaProps } from '@/tipos/inicio/contrato_historia'

const catalogoHistorias = catalogoInicio.historias

const clases = catalogoHistorias.lienzo

export function LienzoHistoria({ borrador, compacto = false, inmersivo = false, miniatura = false, soloFondo = false, onEscribir }: LienzoHistoriaProps) {
  const vista = vistaDeBorrador(borrador)

  function alEscribir(evento: ChangeEvent<HTMLTextAreaElement>) {
    onEscribir?.(evento.target.value)
  }

  return (
    <div role={miniatura ? undefined : 'group'} aria-label={miniatura ? undefined : catalogoHistorias.etiqueta_lienzo} aria-hidden={miniatura || undefined} className={`${clases.marco} ${inmersivo ? clases.inmersivo : compacto ? clases.compacto : clases.completo} ${vista.claseFondo}`}>
      {vista.imagenFondo && <img src={vista.imagenFondo} alt={miniatura ? String() : catalogoHistorias.texto_alternativo_medio} className={clases.capa_imagen} />}
      {vista.medio &&
        (vista.medio.esVideo ? (
          <video src={vista.medio.url} muted loop playsInline aria-label={miniatura ? undefined : catalogoHistorias.texto_alternativo_medio} className={`${clases.capa_medio} ${vista.claseAjusteMedio}`} />
        ) : (
          <img src={vista.medio.url} alt={miniatura ? String() : catalogoHistorias.texto_alternativo_medio} className={`${clases.capa_medio} ${vista.claseAjusteMedio}`} />
        ))}
      {vista.superponer && <span aria-hidden="true" className={clases.superposicion_imagen} />}
      {soloFondo ? null : onEscribir ? (
        <textarea data-escritura-historia rows={1} maxLength={LIMITE_TEXTO_HISTORIA} value={borrador.texto} placeholder={catalogoHistorias.flujo.editor.mensaje_marcador} aria-label={catalogoHistorias.flujo.editor.mensaje_etiqueta} onChange={alEscribir} className={`${clases.editor_texto} ${vista.claseTexto}`} />
      ) : (
        vista.texto && <p className={`${clases.texto} ${miniatura ? clases.texto_miniatura : String()} ${vista.claseTexto}`}>{vista.texto}</p>
      )}
      {(soloFondo ? [] : vista.elementos).map((elemento) => (
        <p key={elemento.id} className={`${clases.elemento} ${elemento.clases}`}>
          {elemento.contenido}
        </p>
      ))}
    </div>
  )
}
