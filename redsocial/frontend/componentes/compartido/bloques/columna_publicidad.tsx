import { Icono } from '../icono'
import { ANUNCIOS_PUBLICIDAD, ANUNCIO_PUBLICIDAD_DESTACADO } from '../../../datos/compartido/publicidad'
import mensajesGlobales from '../../../mensajes/globales/textos.json'

const BOTON_MINI =
  'inline-flex min-h-[30px] items-center justify-center gap-sm whitespace-nowrap rounded-[7px] border px-[10px] text-xs no-underline'

function VisualAnuncio({ oscuro }: { oscuro?: boolean }) {
  return (
    <div
      className={'mt-2.5 h-[70px] rounded-[9px] ' + (oscuro ? 'bg-white/[.08]' : 'bg-[linear-gradient(135deg,#f0edff,#e4e0ff)]')}
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
      <span className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#9c99ab]">{mensajesGlobales.PUBLICIDAD}</span>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em] text-texto">
          {ANUNCIOS_PUBLICIDAD[0].titulo}<br />{ANUNCIOS_PUBLICIDAD[0].subtitulo}
        </h3>
        <p className="m-0 mb-3 text-[11px] text-texto-suave">{ANUNCIOS_PUBLICIDAD[0].descripcion}</p>
        <a href="#" className={BOTON_MINI + ' border-transparent bg-primario text-white hover:bg-primario-oscuro'}>{ANUNCIOS_PUBLICIDAD[0].textoBoton}</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em] text-texto">{ANUNCIOS_PUBLICIDAD[1].titulo}</h3>
        <p className="m-0 mb-3 text-[11px] text-texto-suave">{ANUNCIOS_PUBLICIDAD[1].descripcion}</p>
        <a href="#" className={BOTON_MINI + ' border-transparent bg-exito text-white'}>{ANUNCIOS_PUBLICIDAD[1].textoBoton}</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em] text-texto">{ANUNCIOS_PUBLICIDAD[2].titulo}</h3>
        <p className="m-0 mb-3 text-[11px] text-texto-suave">{ANUNCIOS_PUBLICIDAD[2].descripcion}</p>
        <a href="#" className={BOTON_MINI + ' border-transparent bg-primario text-white hover:bg-primario-oscuro'}>{ANUNCIOS_PUBLICIDAD[2].textoBoton}</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <PuntosCarrusel cantidad={3} />

      <article className="relative overflow-hidden rounded-xl bg-[#2c2059] p-4 text-white">
        <h3 className="m-0 mb-1 text-[15px] leading-[1.25] tracking-[-.01em]">
          {ANUNCIO_PUBLICIDAD_DESTACADO.titulo}<br />{ANUNCIO_PUBLICIDAD_DESTACADO.subtitulo}<br />{ANUNCIO_PUBLICIDAD_DESTACADO.marca}
        </h3>
        <ul className="m-0 mb-3.5 grid list-none gap-1.5 p-0 text-[11px] text-[#e4e0ff]">
          {ANUNCIO_PUBLICIDAD_DESTACADO.beneficios.map((b) => (
            <li key={b}>✓ {b}</li>
          ))}
        </ul>
        <a href="#" className={BOTON_MINI + ' border-gris-borde bg-white text-[#5d5a70]'}>{ANUNCIO_PUBLICIDAD_DESTACADO.textoBoton}</a>
        <VisualAnuncio oscuro />
      </article>

      <div className="mt-2.5 flex items-center justify-center gap-2.5">
        <button type="button" aria-label={mensajesGlobales.ANTERIOR} className="grid h-5.5 w-5.5 place-items-center rounded-full border-0 bg-white/[.12] text-white">
          <Icono name="flecha-izquierda" className="h-3 w-3" />
        </button>
        <PuntosCarrusel cantidad={2} />
        <button type="button" aria-label={mensajesGlobales.SIGUIENTE} className="grid h-5.5 w-5.5 place-items-center rounded-full border-0 bg-white/[.12] text-white">
          <Icono name="flecha-derecha" className="h-3 w-3" />
        </button>
      </div>
    </aside>
  )
}
