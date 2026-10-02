import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

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
    <div className="mb-5 grid grid-cols-3 gap-3 max-768:grid-cols-2">
      <Selector variant="colaboradores" label={catalogoColaboradores.selectores.rol_perfil.etiqueta} value={rol} onChange={cambiarRol}>
        {catalogoColaboradores.selectores.rol_perfil.opciones.map((o) => <option key={o}>{o}</option>)}
      </Selector>
      <Selector variant="colaboradores" label={catalogoColaboradores.selectores.aplicaciones.etiqueta} value={aplicacion} onChange={cambiarAplicacion}>
        {catalogoColaboradores.selectores.aplicaciones.opciones.map((o) => <option key={o}>{o}</option>)}
      </Selector>
      <Selector variant="colaboradores" label={catalogoColaboradores.selectores.ordenar_por.etiqueta} value={ordenarPor} onChange={cambiarOrdenarPor}>
        {catalogoColaboradores.selectores.ordenar_por.opciones.map((o) => <option key={o}>{o}</option>)}
      </Selector>
    </div>
  )
}
