import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'

export function EncabezadoAmigos({ textoBoton, alClick }: { textoBoton?: string; alClick?: () => void }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
      <h1 className="m-0 text-titulo-pagina text-texto">{catalogoAmigos.titulos.todos}</h1>
      {textoBoton && (
        <div className="flex flex-none items-center gap-2.5">
          <Boton variant="primario" size="md" onClick={alClick}>
            <Icono name="mas" className="h-4.5 w-4.5" /> {textoBoton}
          </Boton>
        </div>
      )}
    </div>
  )
}
