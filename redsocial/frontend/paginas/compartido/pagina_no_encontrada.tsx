import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { RUTA_INICIAL } from '../../enrutamiento/rutas'
import { navegar } from '../../enrutamiento/navegacion'

export function PaginaNoEncontrada() {
  return (
    <EstructuraApp>
      <div className="grid place-items-center py-20 text-center">
        <div>
          <h1 className="m-0 text-xl font-extrabold text-texto">Página no encontrada</h1>
          <p className="mt-2 text-sm text-texto-suave">La ruta solicitada no existe en CodePlex.</p>
          <button
            type="button"
            onClick={() => navegar(RUTA_INICIAL)}
            className="mt-4 inline-flex h-9 items-center rounded-control border-0 bg-primario px-4 text-sm font-semibold text-white"
          >
            Volver a Inicio
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
