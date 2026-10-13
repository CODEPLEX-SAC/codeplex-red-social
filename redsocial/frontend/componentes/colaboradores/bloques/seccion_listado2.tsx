import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'

export function SeccionListado2({ alInvitar }: { alInvitar: () => void }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3 max-900:flex-col max-900:items-stretch">
      <div>
        <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoColaboradores.titulos.listado}</h1>
        <p className="m-0 max-w-120 text-subtitulo leading-texto text-texto-suave">
          {catalogoColaboradores.subtitulos.listado}
        </p>
      </div>
      <Boton type="button" variant="primario" size="md" onClick={alInvitar} className="max-900:w-full">
        <Icono name="nuevo-usuario" className="w-4 h-4" />
        {catalogoColaboradores.botones.invitar_colaborador}
      </Boton>
    </div>
  )
}
