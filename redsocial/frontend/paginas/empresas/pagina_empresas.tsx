import { EstructuraApp } from '../../componentes/compartido'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { SeccionListadoEmpresas } from '../../componentes/empresas'
import { DATOS_DETALLE_EMPRESA, EMPRESAS } from '../../rutas/empresas/rutas_empresas'

export function PaginaEmpresas() {
  return (
    <EstructuraApp paginaActiva={catalogoEmpresas.claves.modulo}>
      <SeccionListadoEmpresas empresas={EMPRESAS} datosDetalle={DATOS_DETALLE_EMPRESA} />
    </EstructuraApp>
  )
}
