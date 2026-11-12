import { Icono } from '../../compartido/icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { TarjetaLateralGruposProps } from '@/tipos/grupos/contrato_lateral_grupos'

const clases = catalogoGrupos.clases.pagina_lateral

export function TarjetaLateralGrupos({ titulo, texto, icono, variante = 'normal', children }: TarjetaLateralGruposProps) {
  return (
    <section aria-label={titulo} className={clases.variantes[variante]}>
      <div className={clases.cabecera}>
        {icono && (
          <span className={clases.icono_caja}>
            <Icono name={icono as IconName} className={clases.icono} />
          </span>
        )}
        <div className={clases.textos}>
          <h2 className={clases.titulo}>{titulo}</h2>
          {texto && <p className={clases.texto}>{texto}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}
