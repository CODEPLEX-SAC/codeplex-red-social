import { Boton } from '../../compartido/interfaz/boton'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { LienzoHistoria } from './lienzo_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { BotonHistoriaPropiaProps } from '@/tipos/inicio/contrato_historia'

const clases = catalogoInicio.historias.flujo.clases

export function BotonHistoriaPropia({ historia, onVer }: BotonHistoriaPropiaProps) {
  const ver = () => onVer(historia)

  return (
    <Boton type="button" variant="fantasma" size="enlace" onClick={ver} className={clases.boton_historia}>
      <SuperficieColor as="span" degradado="primario" className={clases.miniatura_anillo}>
        <span className={clases.miniatura_circulo}>
          <span className={clases.miniatura_lienzo}>
            <LienzoHistoria borrador={historia.borrador} inmersivo miniatura />
          </span>
        </span>
      </SuperficieColor>
      <span className={`${clases.etiqueta_historia} text-texto-suave`}>{catalogoInicio.historias.flujo.etiqueta_propia}</span>
    </Boton>
  )
}
