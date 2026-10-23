import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { rellenarPlantilla } from './logica_resumen_empresas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { TarjetaPlanAsignadoProps } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.planes_asignados
const clases = textos.clases
const TONOS_ICONO: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color
const UNA = 1

function capacidades(suscripcion: SuscripcionContratada, totalEmpresas: number) {
  const { empresas, sucursales } = suscripcion.capacidad
  return [
    empresas === null ? null : rellenarPlantilla(textos.empresas, { limite: empresas, usadas: totalEmpresas }),
    sucursales === null ? null : rellenarPlantilla(sucursales === UNA ? textos.sucursales_una : textos.sucursales_varias, { n: sucursales }),
  ].filter((texto): texto is string => texto !== null)
}

export function TarjetaPlanAsignado({ modulo, suscripcion, planNombre, totalEmpresas }: TarjetaPlanAsignadoProps) {
  return (
    <li className={clases.tarjeta}>
      <span className={`${clases.icono_caja} ${TONOS_ICONO[modulo.tono]}`}>
        <Icono name={modulo.icono as IconName} className={clases.icono} />
      </span>
      <div className={clases.cuerpo}>
        <h3 className={clases.nombre}>{suscripcion.nombre}</h3>
        {capacidades(suscripcion, totalEmpresas).map((texto) => (
          <span key={texto} className={clases.capacidad}>{texto}</span>
        ))}
      </div>
      <Insignia variant="status" className={catalogoEmpresas.clases.aplicativos.pildora}>{textos.plan.replace(':plan', planNombre)}</Insignia>
    </li>
  )
}
