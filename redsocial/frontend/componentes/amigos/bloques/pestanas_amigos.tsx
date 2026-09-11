import type { PestanaAmigos } from '@/tipos/amigos/pestanas_amigos'

const TABS = [
  { etiqueta: 'Todos', href: '15-05-amigos-01-todos-web.html' },
  { etiqueta: 'Solicitudes', href: '16-05-amigos-02-solicitudes-web.html' },
  { etiqueta: 'Sugerencias', href: '17-05-amigos-03-web-sugerencias.html' },
  { etiqueta: 'Listas', href: '18-05-amigos-04-web-listas.html' },
] as const

export function PestanasAmigos({ activa, insigniaSolicitudes }: { activa: PestanaAmigos; insigniaSolicitudes?: number }) {
  return (
    <div className="mb-4.5 flex gap-1 overflow-x-auto border-b border-borde [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map((t) => (
        <a
          key={t.href}
          href={`../paginas/${t.href}`}
          role="tab"
          aria-selected={t.href === activa}
          className={
            'inline-block whitespace-nowrap border-b-2 px-3.25 py-2.5 text-xs no-underline ' +
            (t.href === activa ? 'border-primario font-bold text-primario' : 'border-transparent text-[#858295] hover:text-primario')
          }
        >
          {t.etiqueta}
          {t.href === '16-05-amigos-02-solicitudes-web.html' && insigniaSolicitudes !== undefined && ` ${insigniaSolicitudes}`}
        </a>
      ))}
    </div>
  )
}
