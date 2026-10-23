import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MediosPublicacionProps } from '@/tipos/inicio/contrato_feed_inicio'

const textos = catalogoInicio.medios
const clases = textos.clases

export function BloqueMediosPublicacion({ medios }: MediosPublicacionProps) {
  const unico = medios.length === 1
  const claseMedio = unico ? clases.medio_unico : clases.medio

  return (
    <div className={unico ? clases.uno : clases.varios}>
      {medios.map((medio, indice) => {
        const etiqueta = textos.texto_alternativo.replace(':numero', String(indice + 1))
        return medio.esVideo ? (
          <video key={medio.id} src={medio.url} controls aria-label={etiqueta} className={claseMedio} />
        ) : (
          <img key={medio.id} src={medio.url} alt={etiqueta} className={claseMedio} />
        )
      })}
    </div>
  )
}
