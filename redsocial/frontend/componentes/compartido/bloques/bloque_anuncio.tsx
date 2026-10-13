import { Boton } from '../interfaz/boton'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function BloqueAnuncio() {
  return (
    <section className="mx-3.5 mt-5.5 rounded-xl bg-fondo-anuncio p-4.25 text-white shadow-sombra">
      <span className="text-auxiliar font-pagina tracking-12 text-texto-sobre-oscuro-acento">{catalogoCompartido.anuncio.marca}</span>
      <strong className="mt-2 block text-subtitulo leading-compacto">{catalogoCompartido.anuncio.titulo}</strong>
      <p className="text-cuerpo leading-texto text-texto-sobre-oscuro">{catalogoCompartido.anuncio.descripcion}</p>
      <Boton variant="oscuro" className="mt-1">{catalogoCompartido.anuncio.texto_boton}</Boton>
    </section>
  )
}
