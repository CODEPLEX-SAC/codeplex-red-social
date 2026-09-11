import type { EstructuraTresColumnasProps } from '@/tipos/compartido/estructura_tres_columnas'

export function EstructuraTresColumnas({ principal, publicidad, lateral, alturaCompleta }: EstructuraTresColumnasProps) {
  return (
    <div
      className={
        'grid w-full gap-10 grid-cols-[minmax(400px,900px)_minmax(260px,300px)_minmax(300px,340px)] max-[1600px]:grid-cols-[minmax(400px,1fr)_minmax(230px,300px)] max-[1600px]:gap-6 max-[1250px]:grid-cols-1 max-[950px]:gap-4 ' +
        (alturaCompleta ? 'items-stretch min-h-0' : 'items-start')
      }
    >
      <div className="min-h-0 min-w-0">{principal}</div>
      <div className="min-h-0 max-[1600px]:hidden">{publicidad}</div>
      <div className="min-h-0 max-[1250px]:hidden">{lateral}</div>
    </div>
  )
}
