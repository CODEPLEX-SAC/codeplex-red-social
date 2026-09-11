import type { PestanaMensajeItem } from '@/tipos/mensajeria/pestanas_mensajes'

export function PestanasMensajes({ tabs, activa }: { tabs: readonly PestanaMensajeItem[]; activa: string }) {
  return (
    <div className="mb-3 flex gap-1" role="tablist">
      {tabs.map((p) => (
        <a
          key={p.archivo}
          href={p.archivo}
          role="tab"
          aria-selected={p.archivo === activa}
          className={
            'inline-flex h-[30px] items-center gap-1 whitespace-nowrap rounded-[20px] border px-3 text-[11px] font-medium no-underline transition-colors ' +
            (p.archivo === activa ? 'border-primario bg-primario text-white' : 'border-borde bg-white text-texto-suave hover:bg-[#f7f6fa]')
          }
        >
          {p.etiqueta}
          {p.insignia !== undefined && (
            <span
              className={
                'inline-grid h-4 min-w-4 place-items-center rounded-lg px-1 text-[9px] font-bold leading-none ' +
                (p.archivo === activa ? 'bg-white/25' : 'bg-[#efedf7] text-texto-suave')
              }
            >
              {p.insignia}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
