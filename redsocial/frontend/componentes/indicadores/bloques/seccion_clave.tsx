import catalogoIndicadores from '../../../catalogos/capacidades/redsocial/indicadores.json'
import { Icono } from '../../compartido/icono'
import { Selector } from '../../compartido/interfaz/selector'
import { Boton } from '../../compartido/interfaz/boton'

export function SeccionClave() {
  return (
    <div className="mb-5 flex items-start justify-between gap-5 max-900:flex-col max-900:items-stretch">
      <div>
        <h1 className="m-0 flex items-center gap-2 text-titulo-pagina font-extrabold text-texto">
          {catalogoIndicadores.titulos.clave} <Icono name="informacion" className="h-4 w-4 text-texto-suave" />
        </h1>
        <p className="m-0 mt-1 text-subtitulo text-texto-suave">{catalogoIndicadores.subtitulos.clave}</p>
      </div>
      <div className="flex flex-wrap items-end gap-3.5 max-480:flex-col max-480:items-stretch">
        <Selector variant="default" label={catalogoIndicadores.selectores.periodo.etiqueta}>
          {catalogoIndicadores.selectores.periodo.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
        <Selector variant="default" label={catalogoIndicadores.selectores.comparar_con.etiqueta}>
          {catalogoIndicadores.selectores.comparar_con.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
        <Boton type="button" variant="contorno" size="md" className="flex-none max-900:w-full max-900:justify-center">
          <Icono name="filtro" className="h-3.75 w-3.75" /> {catalogoIndicadores.botones.filtros_avanzados}
        </Boton>
      </div>
    </div>
  )
}
