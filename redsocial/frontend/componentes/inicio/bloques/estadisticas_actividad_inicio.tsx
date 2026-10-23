import { Icono } from '../../compartido/icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { EstadisticasActividadInicioProps } from '@/tipos/inicio/contrato_feed_inicio'
import type { EstadisticasActividad } from '@/tipos/inicio/modelo_inicio'

const textos = catalogoInicio.estadisticas
const clases = textos.clases
const TONOS_ICONO: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color

export function EstadisticasActividadInicio({ estadisticas }: EstadisticasActividadInicioProps) {
  return (
    <section aria-label={textos.etiqueta} className={clases.rejilla}>
      {textos.tarjetas.map((tarjeta) => (
        <div key={tarjeta.clave} className={clases.tarjeta}>
          <span className={`${clases.icono_caja} ${TONOS_ICONO[tarjeta.tono]}`}>
            <Icono name={tarjeta.icono as IconName} className={clases.icono} />
          </span>
          <div className={clases.cuerpo}>
            <span className={clases.etiqueta}>{tarjeta.titulo}</span>
            <strong className={clases.valor}>{estadisticas[tarjeta.clave as keyof EstadisticasActividad]}</strong>
          </div>
        </div>
      ))}
    </section>
  )
}
