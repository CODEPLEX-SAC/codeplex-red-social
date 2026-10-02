import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'

export function SeccionListado2() {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3 max-900:flex-col max-900:items-stretch">
      <div>
        <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-gris-oscuro-texto">{catalogoColaboradores.titulos.listado}</h1>
        <p className="m-0 max-w-120 text-subtitulo leading-snug text-gris-texto-secundario">
          {catalogoColaboradores.subtitulos.listado}
        </p>
      </div>
      <a
        href={catalogoColaboradores.rutas.invitar}
        className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primario px-5 py-2.5 text-boton font-semibold text-white no-underline hover:bg-t-4a35d4 max-900:w-full"
      >
        <Icono name="nuevo-usuario" className="w-4 h-4" />
        {catalogoColaboradores.botones.invitar_colaborador}
      </a>
    </div>
  )
}
