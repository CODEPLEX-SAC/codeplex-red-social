import { BannerInformativo } from '../../compartido/interfaz/banner_informativo'
import { rellenarPlantilla } from './logica_resumen_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { AvisosLimitePlanProps } from '@/tipos/empresas/contrato_mejora_plan'

const edicion = catalogoEmpresas.planes_asignados.edicion

export function AvisosLimitePlan({ avisos }: AvisosLimitePlanProps) {
  if (avisos.length === 0) return null

  return (
    <div className={edicion.clases.avisos}>
      {avisos.map((aviso) => (
        <BannerInformativo
          key={aviso.modulo.clave}
          icono={edicion.aviso.icono as IconName}
          titulo={edicion.aviso.titulo}
          descripcion={rellenarPlantilla(edicion.aviso.descripcion, { usadas: aviso.usadas, limite: aviso.limite, aplicativo: aviso.aplicativo })}
        />
      ))}
    </div>
  )
}
