import { Icono } from '../../compartido/icono'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const textos = catalogoEmpresas.planes_asignados
const edicion = textos.edicion
const clases = edicion.clases

export function CabeceraPlanesAsignados() {
  return (
    <div className={clases.cabecera}>
      <span className={clases.cabecera_caja}>
        <Icono name={edicion.icono_cabecera as IconName} className={clases.cabecera_icono} />
      </span>
      <div className="min-w-0">
        <h2 className={clases.titulo}>{textos.titulo}</h2>
        <p className={clases.descripcion}>{textos.descripcion}</p>
      </div>
    </div>
  )
}
