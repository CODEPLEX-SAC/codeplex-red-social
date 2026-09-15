import { Boton } from '../interfaz/boton'
import { ANUNCIO_LATERAL } from '../../../datos/compartido/anuncio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function BloqueAnuncio() {
  return (
    <section className="mx-3.5 mt-5.5 rounded-xl bg-[#2c2059] p-[17px] text-white shadow-sombra">
      <span className="text-[9px] font-extrabold tracking-[0.12em] text-[#8f7dff]">{ANUNCIO_LATERAL.marca}</span>
      <strong className="mt-2 block text-[15px] leading-tight">{ANUNCIO_LATERAL.titulo}</strong>
      <p className="text-[10px] leading-relaxed text-[#cbc5e4]">{ANUNCIO_LATERAL.descripcion}</p>
      <Boton variant="oscuro" className="mt-1">{ANUNCIO_LATERAL.textoBoton}</Boton>
    </section>
  )
}
