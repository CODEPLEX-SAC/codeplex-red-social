import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'

export function EncabezadoAmigos({ textoBoton }: { textoBoton: string }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-5">
      <h1 className="m-0 text-[23px] tracking-[-0.02em] text-texto">Amigos</h1>
      <div className="flex flex-none items-center gap-2.5">
        <Boton variant="primario">
          <Icono name="mas" className="h-[18px] w-[18px]" /> {textoBoton}
        </Boton>
        <button type="button" aria-label="Más opciones" className="relative grid h-8 w-8 place-items-center rounded-[7px] border-0 bg-transparent p-0 text-[#6d6a7c] hover:bg-[#f2f1f6]">
          <Icono name="puntos" className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  )
}
