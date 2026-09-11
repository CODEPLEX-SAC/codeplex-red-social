import type { PestanaGrupo } from '@/tipos/grupos/pestanas_grupos'

const TABS = [
  { etiqueta: 'Mis grupos', href: '19-06-grupos-01-web-misgrupos.html' },
  { etiqueta: 'Descubrir', href: '20-06-grupos-02-web-descubrir.html' },
  { etiqueta: 'Invitaciones', href: '21-06-grupos-03-web-invitaciones.html', insignia: 2 },
] as const

export function PestanasGrupos({ activa }: { activa: PestanaGrupo }) {
  return (
    <div className="mb-4 flex gap-0 overflow-x-auto border-b-2 border-borde [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map((t) => (
        <a
          key={t.href}
          href={`../paginas/${t.href}`}
          role="tab"
          aria-selected={t.href === activa}
          className={
            '-mb-0.5 inline-flex h-[38px] flex-none items-center gap-1.5 whitespace-nowrap border-b-2 px-4 text-[13px] no-underline ' +
            (t.href === activa ? 'border-primario font-semibold text-primario' : 'border-transparent text-texto-suave hover:text-texto')
          }
        >
          {t.etiqueta}
          {'insignia' in t && (
            <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primario px-1 text-[10px] font-bold leading-none text-white">{t.insignia}</span>
          )}
        </a>
      ))}
    </div>
  )
}
