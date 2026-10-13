import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoUsuariosProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa

export function FiltrosUsuariosEmpresa({ listado }: ListadoUsuariosProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 max-600:flex-col max-600:items-stretch">
      <CampoBusqueda
        placeholder={textos.placeholder_busqueda}
        aria-label={textos.etiquetas.busqueda}
        className="min-w-52 flex-1 max-600:min-w-full"
        value={listado.busqueda}
        onChange={listado.cambiarBusqueda}
      />
      <div className="flex flex-none gap-3 max-600:grid max-600:grid-cols-2 max-480:grid-cols-1">
        <Selector variant="colaboradores" aria-label={textos.etiquetas.rol} value={listado.rol} onChange={listado.cambiarRol}>
          {textos.filtros.roles.map((opcion) => <option key={opcion}>{opcion}</option>)}
        </Selector>
        <Selector variant="colaboradores" aria-label={textos.etiquetas.estado} value={listado.estado} onChange={listado.cambiarEstado}>
          {textos.filtros.estados.map((opcion) => <option key={opcion}>{opcion}</option>)}
        </Selector>
      </div>
    </div>
  )
}
