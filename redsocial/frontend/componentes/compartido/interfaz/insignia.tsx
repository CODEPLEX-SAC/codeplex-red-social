import type { InsigniaProps } from '@/tipos/compartido/contrato_insignia'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const mapaPrivacidad: Record<'publico' | 'privado', string> = catalogoCompartido.insignia_privacidad

export function Insignia(props: InsigniaProps) {
  switch (props.variant) {
    case 'counter':
      return (
        <span className="inline-grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primario px-1.25 text-contador font-bold text-white">
          {props.children}
        </span>
      )

    case 'status':
      return (
        <span className={`inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-etiqueta-estado font-bold ${props.className}`}>
          {props.children}
        </span>
      )

    case 'privacy':
      return (
        <span className={`inline-block rounded px-2 py-0.5 text-etiqueta-estado font-semibold ${mapaPrivacidad[props.tone]}`}>
          {props.children}
        </span>
      )

    case 'privado':
      return (
        <span className="inline-block rounded-3 bg-t-ede9fe px-1.5 py-px text-etiqueta-estado font-semibold text-morado-categoria">
          {props.children}
        </span>
      )
  }
}
