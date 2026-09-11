import { Icono } from '../icono'

const BOTON_MINI =
  'inline-flex min-h-[30px] items-center justify-center gap-sm whitespace-nowrap rounded-[7px] border px-[10px] text-xs no-underline'

function VisualAnuncio({ oscuro }: { oscuro?: boolean }) {
  return (
    <div
      className="mt-2.5 h-[70px] rounded-[9px]"
      style={oscuro ? { background: 'rgba(255,255,255,.08)' } : { background: 'linear-gradient(135deg,#f0edff,#e4e0ff)' }}
    />
  )
}

function FlechaAnuncio() {
  return (
    <span className="absolute bottom-3.5 right-3.5 grid h-6.5 w-6.5 place-items-center rounded-full bg-white text-primario shadow-sombra">
      <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
    </span>
  )
}

function PuntosCarrusel({ cantidad }: { cantidad: number }) {
  return (
    <div className="flex justify-center gap-1.25">
      {Array.from({ length: cantidad }).map((_, i) => (
        <span key={i} className={'h-1.25 w-1.25 rounded-full ' + (i === 0 ? 'bg-primario' : 'bg-[#d8d5e6]')} />
      ))}
    </div>
  )
}

export function ColumnaPublicidad() {
  return (
    <aside className="grid min-w-0 content-start gap-3.5">
      <span className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#9c99ab]">Publicidad</span>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em] text-texto">
          Automatiza tu empresa<br />y ahorra tiempo
        </h3>
        <p className="m-0 mb-3 text-[11px] text-texto-suave">Con las soluciones de Codeplex</p>
        <a href="#" className={BOTON_MINI + ' border-transparent bg-primario text-white hover:bg-primario-oscuro'}>Conoce más</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em] text-texto">Lleva tu negocio al siguiente nivel</h3>
        <p className="m-0 mb-3 text-[11px] text-texto-suave">con nuestras herramientas</p>
        <a href="#" className={BOTON_MINI + ' border-transparent bg-exito text-white'}>Empieza ahora</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em] text-texto">Todo tu negocio en un solo lugar</h3>
        <p className="m-0 mb-3 text-[11px] text-texto-suave">Soluciones integradas para hacer crecer tu empresa</p>
        <a href="#" className={BOTON_MINI + ' border-transparent bg-primario text-white hover:bg-primario-oscuro'}>Conoce más</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <PuntosCarrusel cantidad={3} />

      <article className="relative overflow-hidden rounded-xl bg-[#2c2059] p-4 text-white">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em]">
          Gestiona tu empresa<br />de forma inteligente<br />con Codeplex
        </h3>
        <ul className="m-0 mb-3.5 grid list-none gap-1.5 p-0 text-[11px] text-[#e4e0ff]">
          <li>✓ Más control</li>
          <li>✓ Más productividad</li>
          <li>✓ Mejores resultados</li>
          <li>✓ Todo en un solo lugar</li>
        </ul>
        <a href="#" className={BOTON_MINI + ' border-gris-borde bg-white text-[#5d5a70]'}>Conoce más</a>
        <VisualAnuncio oscuro />
      </article>

      <div className="mt-2.5 flex items-center justify-center gap-2.5">
        <button type="button" aria-label="Anterior" className="grid h-5.5 w-5.5 place-items-center rounded-full border-0 bg-white/[.12] text-white">
          <Icono name="flecha-izquierda" className="h-3 w-3" />
        </button>
        <PuntosCarrusel cantidad={2} />
        <button type="button" aria-label="Siguiente" className="grid h-5.5 w-5.5 place-items-center rounded-full border-0 bg-white/[.12] text-white">
          <Icono name="flecha-derecha" className="h-3 w-3" />
        </button>
      </div>
    </aside>
  )
}
