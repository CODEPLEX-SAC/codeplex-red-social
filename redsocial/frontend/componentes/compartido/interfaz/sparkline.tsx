import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.sparkline
const atributosTrazo = { strokeLinecap: configuracion.extremos, strokeLinejoin: configuracion.uniones } as React.SVGProps<SVGPolylineElement>

export function Sparkline({
  puntos,
  color,
  ancho = configuracion.ancho,
  alto,
  grosor,
  radioPunto = configuracion.radio_punto,
  conPuntos = false,
  className,
}: {
  puntos: string
  color: string
  ancho?: number
  alto: number
  grosor: number
  radioPunto?: number
  conPuntos?: boolean
  className: string
}) {
  return (
    <svg viewBox={[0, 0, ancho, alto].join(' ')} preserveAspectRatio={configuracion.aspecto} className={className}>
      <polyline
        points={puntos}
        fill={configuracion.relleno}
        stroke={color}
        strokeWidth={grosor}
        {...atributosTrazo}
      />
      {conPuntos &&
        puntos.split(configuracion.separador).map((punto) => {
          const [cx, cy] = punto.split(configuracion.separador_coordenadas)
          return <circle key={punto} cx={cx} cy={cy} r={radioPunto} fill={color} />
        })}
    </svg>
  )
}
