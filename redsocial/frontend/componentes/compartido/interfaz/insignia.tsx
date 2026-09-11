import type { InsigniaProps } from '@/tipos/compartido/insignia'

const CLASES_PRIVACY: Record<'publico' | 'privado', string> = {
  publico: 'bg-[#e3f2fd] text-[#1565c0]',
  privado: 'bg-[#fce4ec] text-[#c62828]',
}

export function Insignia(props: InsigniaProps) {
  switch (props.variant) {
    case 'counter':
      return (
        <span className="rounded-full bg-primario px-1.5 py-px text-[9px] font-extrabold text-white">
          {props.children}
        </span>
      )

    case 'status':
      return (
        <span
          className="inline-block whitespace-nowrap rounded-xl px-2 py-0.5 text-[10px] font-bold"
          style={{ color: props.color, backgroundColor: props.background }}
        >
          {props.children}
        </span>
      )

    case 'privacy':
      return (
        <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${CLASES_PRIVACY[props.tone]}`}>
          {props.children}
        </span>
      )

    case 'privateTag':
      return (
        <span className="inline-block rounded-[3px] bg-[#ede9fe] px-1.5 py-px text-[9px] text-morado-categoria">
          {props.children}
        </span>
      )
  }
}
