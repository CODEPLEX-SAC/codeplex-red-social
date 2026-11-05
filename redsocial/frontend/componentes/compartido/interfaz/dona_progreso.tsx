import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { DonaProgresoProps } from '@/tipos/compartido/contrato_dona_progreso'
import { AnilloDona } from './anillo_dona'
import { usarTextoCentralDona } from './usar_texto_central_dona'

const dona = catalogoCompartido.dona_progreso

export function DonaProgreso({ segmentos, tamano = 130, grosor = 16, valorCentral, etiquetaCentral, className = '' }: DonaProgresoProps) {
  const { valorRef, compacto, recortado, textoCompacto } = usarTextoCentralDona(valorCentral, tamano - 2 * grosor - dona.margen_texto)

  if (valorCentral === undefined) return <AnilloDona segmentos={segmentos} tamano={tamano} grosor={grosor} className={className} />

  return (
    <div className={[dona.contenedor, className].join(' ')}>
      <AnilloDona segmentos={segmentos} tamano={tamano} grosor={grosor} className={dona.anillo} />
      <span className={dona.texto}>
        <strong ref={valorRef} title={compacto || recortado ? valorCentral : undefined} className={dona.valor}>
          {textoCompacto === null ? valorCentral : <><span aria-hidden="true">{textoCompacto}</span><span className={dona.solo_lectores}>{valorCentral}</span></>}
        </strong>
        {etiquetaCentral !== undefined && <span className={dona.etiqueta}>{etiquetaCentral}</span>}
      </span>
    </div>
  )
}
