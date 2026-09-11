import { Icono } from '../icono'
import type { TarjetaIndicadorColor, TarjetaIndicadorProps } from '@/tipos/compartido/tarjeta_indicador'

const CLASES_ICONO_COLOR: Record<TarjetaIndicadorColor, string> = {
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
}

export function TarjetaIndicador({ icono, color, etiqueta, valor, variacion }: TarjetaIndicadorProps) {
  return (
    <article className="min-w-0 rounded-xl border border-gris-borde bg-white p-md">
      <div className="mb-[10px] flex items-center gap-sm text-xs font-semibold text-texto-suave">
        <span className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-lg ${CLASES_ICONO_COLOR[color]}`}>
          <Icono name={icono} className="w-[15px] h-[15px]" />
        </span>
        <span>{etiqueta}</span>
      </div>
      <strong className="text-xl">{valor}</strong>
      {variacion && (
        <div className="mt-2">
          <small
            className={
              'inline-flex items-center gap-1 text-xs font-semibold ' +
              (variacion.direccion === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')
            }
          >
            <Icono name={variacion.direccion === 'positiva' ? 'flecha-arriba' : 'flecha-abajo'} />
            {variacion.texto}
          </small>
        </div>
      )}
    </article>
  )
}
