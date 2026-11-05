import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { SegmentoDona } from '@/tipos/compartido/contrato_dona_progreso'

const dona = catalogoCompartido.dona_progreso

export function AnilloDona({ segmentos, tamano, grosor, className }: { segmentos: SegmentoDona[]; tamano: number; grosor: number; className: string }) {
  const radio = (tamano - grosor) / 2
  const circunferencia = 2 * Math.PI * radio
  let acumulado = 0

  return (
    <svg viewBox={`0 0 ${tamano} ${tamano}`} width={tamano} height={tamano} className={className}>
      <g transform={`rotate(${dona.inicio_grados} ${tamano / 2} ${tamano / 2})`}>
        {segmentos.map((segmento) => {
          const largo = (segmento.porcentaje / 100) * circunferencia
          const desplazamiento = -((acumulado / 100) * circunferencia)
          acumulado += segmento.porcentaje
          return (
            <circle
              key={[segmento.color, segmento.porcentaje].join('')}
              cx={tamano / 2}
              cy={tamano / 2}
              r={radio}
              fill={dona.relleno_segmento}
              stroke={segmento.color}
              strokeWidth={grosor}
              strokeDasharray={`${largo} ${circunferencia - largo}`}
              strokeDashoffset={desplazamiento}
            />
          )
        })}
      </g>
    </svg>
  )
}
