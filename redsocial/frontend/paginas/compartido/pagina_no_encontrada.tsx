import { Boton, EstructuraApp } from '../../componentes/compartido'
import { RUTA_INICIAL } from '../../rutas/compartido/rutas'
import { navegar } from '../../rutas/compartido/navegacion'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

export function PaginaNoEncontrada() {
  return (
    <EstructuraApp>
      <div className="grid place-items-center py-20 text-center">
        <div>
          <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{textosRedSocial.PAGINA_NO_ENCONTRADA_TITULO}</h1>
          <p className="mt-2 text-subtitulo text-texto-suave">{textosRedSocial.PAGINA_NO_ENCONTRADA_DESCRIPCION}</p>
          <Boton type="button" onClick={() => navegar(RUTA_INICIAL)} variant="primario" size="md" className="mt-4">
            {textosRedSocial.VOLVER_A_INICIO}
          </Boton>
        </div>
      </div>
    </EstructuraApp>
  )
}
