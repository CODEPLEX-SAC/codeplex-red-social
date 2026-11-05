import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const clases = catalogoColaboradores.clases.listado

export function BloqueColaboradores1({ datos }: {
  datos: {
    rol: string
    cambiarRol: (evento: { target: { value: unknown } }) => void
    aplicacion: string
    cambiarAplicacion: (evento: { target: { value: unknown } }) => void
    ordenarPor: string
    cambiarOrdenarPor: (evento: { target: { value: unknown } }) => void
  }
}) {
  const { rol, cambiarRol, aplicacion, cambiarAplicacion, ordenarPor, cambiarOrdenarPor } = datos
  return (
    <div className={clases.selectores}>
      <div className={clases.selector_filtro}>
        <Selector variant="colaboradores" label={catalogoColaboradores.selectores.rol_perfil.etiqueta} value={rol} onChange={cambiarRol}>
          {catalogoColaboradores.selectores.rol_perfil.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
      <div className={clases.selector_filtro}>
        <Selector variant="colaboradores" label={catalogoColaboradores.selectores.aplicaciones.etiqueta} value={aplicacion} onChange={cambiarAplicacion}>
          {catalogoColaboradores.selectores.aplicaciones.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
      <Selector variant="colaboradores" label={catalogoColaboradores.selectores.ordenar_por.etiqueta} value={ordenarPor} onChange={cambiarOrdenarPor}>
        {catalogoColaboradores.selectores.ordenar_por.opciones.map((o) => <option key={o}>{o}</option>)}
      </Selector>
    </div>
  )
}
