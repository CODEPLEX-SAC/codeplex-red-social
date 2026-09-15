import { Boton } from '../interfaz/boton'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

export function BloqueAnuncio() {
  return (
    <section className="mx-3.5 mt-5.5 rounded-xl bg-[#2c2059] p-[17px] text-white shadow-sombra">
      <span className="text-[9px] font-extrabold tracking-[0.12em] text-[#8f7dff]">{catalogoCompartido.anuncio.marca}</span>
      <strong className="mt-2 block text-[15px] leading-tight">{catalogoCompartido.anuncio.titulo}</strong>
      <p className="text-[10px] leading-relaxed text-[#cbc5e4]">{catalogoCompartido.anuncio.descripcion}</p>
      <Boton variant="oscuro" className="mt-1">{catalogoCompartido.anuncio.texto_boton}</Boton>
    </section>
  )
}
