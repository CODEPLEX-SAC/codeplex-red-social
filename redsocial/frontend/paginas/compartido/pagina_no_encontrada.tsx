import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { RUTA_INICIAL } from '../../rutas/compartido/rutas'
import { navegar } from '../../rutas/compartido/navegacion'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

export function PaginaNoEncontrada() {
  return (
    <EstructuraApp>
      <div className="grid place-items-center py-20 text-center">
        <div>
          <h1 className="m-0 text-xl font-extrabold text-texto">{textosRedSocial.PAGINA_NO_ENCONTRADA_TITULO}</h1>
          <p className="mt-2 text-sm text-texto-suave">{textosRedSocial.PAGINA_NO_ENCONTRADA_DESCRIPCION}</p>
          <button
            type="button"
            onClick={() => navegar(RUTA_INICIAL)}
            className="mt-4 inline-flex h-9 items-center rounded-control border-0 bg-primario px-4 text-sm font-semibold text-white"
          >
            {textosRedSocial.VOLVER_A_INICIO}
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
