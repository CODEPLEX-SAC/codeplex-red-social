import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function DonaProgreso({
  segmentos,
  tamano = 130,
  grosor = 16,
  className = '',
}: {
  segmentos: { color: string; porcentaje: number }[]
  tamano?: number
  grosor?: number
  className?: string
}) {
  const radio = (tamano - grosor) / 2
  const circunferencia = 2 * Math.PI * radio
  let acumulado = 0

  return (
    <svg viewBox={`0 0 ${tamano} ${tamano}`} width={tamano} height={tamano} className={className}>
      <g transform={`rotate(-90 ${tamano / 2} ${tamano / 2})`}>
        {segmentos.map((segmento, indice) => {
          const largo = (segmento.porcentaje / 100) * circunferencia
          const desplazamiento = -((acumulado / 100) * circunferencia)
          acumulado += segmento.porcentaje
          return (
            <circle
              key={indice}
              cx={tamano / 2}
              cy={tamano / 2}
              r={radio}
              fill="none"
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
