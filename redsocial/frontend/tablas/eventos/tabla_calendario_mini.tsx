import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { DiaCalendarioMini } from '@/tipos/eventos/modelo_calendario_mini'

const DIAS_SEMANA = catalogoEventos.dias_semana

export function TablaCalendarioMini({ semanas }: { semanas: DiaCalendarioMini[][] }) {
  return (
    <table className="w-full border-collapse text-center">
      <thead>
        <tr>
          {DIAS_SEMANA.map((d) => (
            <th key={d} className="py-1 text-encabezado-tabla font-semibold uppercase text-texto-suave">{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {semanas.map((semana) => (
          <tr key={[semana[0].numero, Number(Boolean(semana[0].otroMes))].join('')}>
            {semana.map((dia) => (
              <td key={[dia.numero, Number(Boolean(dia.otroMes))].join('')} className={'relative py-1 text-cuerpo ' + (dia.otroMes ? 'text-t-d0cdd9' : 'text-texto')}>
                <span className={'inline-flex h-6 w-6 items-center justify-center rounded-full ' + (dia.hoy ? 'bg-primario font-bold text-white' : '')}>
                  {dia.numero}
                </span>
                {dia.conPunto && <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primario" />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
