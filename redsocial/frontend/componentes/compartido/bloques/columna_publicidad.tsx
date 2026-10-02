import { posicionesDe } from '../posiciones'
import { Icono } from '../icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

const ANUNCIOS_PUBLICIDAD = catalogoCompartido.publicidad.anunciosPublicidad
const ANUNCIO_PUBLICIDAD_DESTACADO = catalogoCompartido.publicidad.anuncioPublicidadDestacado
const claseBotonMini = catalogoCompartido.clases_boton_mini

function VisualAnuncio({ oscuro }: { oscuro?: boolean }) {
  return (
    <div
      className={'mt-2.5 h-17.5 rounded-9 ' + (oscuro ? 'bg-white/8' : 'degradado-lavanda-clara')}
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
      {posicionesDe(cantidad).map((posicion) => (
        <span key={posicion.id} className={'h-1.25 w-1.25 rounded-full ' + (posicion.orden === 0 ? 'bg-primario' : 'bg-t-d8d5e6')} />
      ))}
    </div>
  )
}

export function ColumnaPublicidad() {
  return (
    <aside className="grid min-w-0 content-start gap-3.5">
      <span className="mb-0.5 text-auxiliar font-extrabold uppercase tracking-widest text-t-9c99ab">{textosRedSocial.PUBLICIDAD}</span>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-subtitulo leading-tight tracking-n01 text-texto">
          {ANUNCIOS_PUBLICIDAD[0].titulo}<br />{ANUNCIOS_PUBLICIDAD[0].subtitulo}
        </h3>
        <p className="m-0 mb-3 text-cuerpo text-texto-suave">{ANUNCIOS_PUBLICIDAD[0].descripcion}</p>
        <a href="#" className={claseBotonMini + ' border-transparent bg-primario text-white hover:bg-primario-oscuro'}>{ANUNCIOS_PUBLICIDAD[0].textoBoton}</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-subtitulo leading-tight tracking-n01 text-texto">{ANUNCIOS_PUBLICIDAD[1].titulo}</h3>
        <p className="m-0 mb-3 text-cuerpo text-texto-suave">{ANUNCIOS_PUBLICIDAD[1].descripcion}</p>
        <a href="#" className={claseBotonMini + ' border-transparent bg-exito text-white'}>{ANUNCIOS_PUBLICIDAD[1].textoBoton}</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <article className="relative overflow-hidden rounded-xl border border-borde bg-white p-4 shadow-sombra">
        <h3 className="m-0 mb-1 text-subtitulo leading-tight tracking-n01 text-texto">{ANUNCIOS_PUBLICIDAD[2].titulo}</h3>
        <p className="m-0 mb-3 text-cuerpo text-texto-suave">{ANUNCIOS_PUBLICIDAD[2].descripcion}</p>
        <a href="#" className={claseBotonMini + ' border-transparent bg-primario text-white hover:bg-primario-oscuro'}>{ANUNCIOS_PUBLICIDAD[2].textoBoton}</a>
        <VisualAnuncio />
        <FlechaAnuncio />
      </article>

      <PuntosCarrusel cantidad={3} />

      <article className="relative overflow-hidden rounded-xl bg-t-2c2059 p-4 text-white">
        <h3 className="m-0 mb-1 text-subtitulo leading-tight tracking-n01">
          {ANUNCIO_PUBLICIDAD_DESTACADO.titulo}<br />{ANUNCIO_PUBLICIDAD_DESTACADO.subtitulo}<br />{ANUNCIO_PUBLICIDAD_DESTACADO.marca}
        </h3>
        <ul className="m-0 mb-3.5 grid list-none gap-1.5 p-0 text-auxiliar text-t-e4e0ff">
          {ANUNCIO_PUBLICIDAD_DESTACADO.beneficios.map((b) => (
            <li key={b}>✓ {b}</li>
          ))}
        </ul>
        <a href="#" className={claseBotonMini + ' border-gris-borde bg-white text-t-5d5a70'}>{ANUNCIO_PUBLICIDAD_DESTACADO.textoBoton}</a>
        <VisualAnuncio oscuro />
      </article>

      <div className="mt-2.5 flex items-center justify-center gap-2.5">
        <button type="button" aria-label={textosRedSocial.ANTERIOR} className="grid h-5.5 w-5.5 place-items-center rounded-full border-0 bg-white/12 text-white">
          <Icono name="flecha-izquierda" className="h-3 w-3" />
        </button>
        <PuntosCarrusel cantidad={2} />
        <button type="button" aria-label={textosRedSocial.SIGUIENTE} className="grid h-5.5 w-5.5 place-items-center rounded-full border-0 bg-white/12 text-white">
          <Icono name="flecha-derecha" className="h-3 w-3" />
        </button>
      </div>
    </aside>
  )
}
