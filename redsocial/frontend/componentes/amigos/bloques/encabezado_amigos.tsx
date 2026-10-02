import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

export function EncabezadoAmigos({ textoBoton }: { textoBoton: string }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-5">
      <h1 className="m-0 text-titulo-pagina tracking-n02 text-texto">{catalogoAmigos.titulos.todos}</h1>
      <div className="flex flex-none items-center gap-2.5">
        <Boton variant="primario">
          <Icono name="mas" className="h-4.5 w-4.5" /> {textoBoton}
        </Boton>
        <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="sutil" size="default" className="relative" />
      </div>
    </div>
  )
}
