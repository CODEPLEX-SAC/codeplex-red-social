import { Boton } from '../interfaz/boton'

export function BloqueAnuncio() {
  return (
    <section className="mx-3.5 mt-5.5 rounded-xl bg-[#2c2059] p-[17px] text-white shadow-sombra">
      <span className="text-[9px] font-extrabold tracking-[0.12em] text-[#8f7dff]">CODEPLEX</span>
      <strong className="mt-2 block text-[15px] leading-tight">Trabaja, comparte y crece.</strong>
      <p className="text-[10px] leading-relaxed text-[#cbc5e4]">Conecta con tu comunidad profesional.</p>
      <Boton variant="oscuro" className="mt-1">Explorar</Boton>
    </section>
  )
}
