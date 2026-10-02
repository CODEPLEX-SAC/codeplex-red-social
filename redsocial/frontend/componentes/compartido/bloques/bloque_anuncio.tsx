import { Boton } from '../interfaz/boton'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function BloqueAnuncio() {
  return (
    <section className="mx-3.5 mt-5.5 rounded-xl bg-t-2c2059 p-4.25 text-white shadow-sombra">
      <span className="text-auxiliar font-extrabold tracking-12 text-t-8f7dff">{catalogoCompartido.anuncio.marca}</span>
      <strong className="mt-2 block text-subtitulo leading-tight">{catalogoCompartido.anuncio.titulo}</strong>
      <p className="text-cuerpo leading-relaxed text-t-cbc5e4">{catalogoCompartido.anuncio.descripcion}</p>
      <Boton variant="oscuro" className="mt-1">{catalogoCompartido.anuncio.texto_boton}</Boton>
    </section>
  )
}
