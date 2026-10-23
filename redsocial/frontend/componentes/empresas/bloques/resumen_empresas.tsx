import { Icono } from '../../compartido/icono'
import { usarSuscripciones } from '../../compartido/carrito/contexto_suscripciones'
import { MODULOS_EMPRESA } from './logica_listado_empresas'
import { calcularResumenEmpresas, rellenarPlantilla } from './logica_resumen_empresas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ResumenEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const textos = catalogoEmpresas.resumen
const clases = catalogoEmpresas.clases.resumen
const TONOS_ICONO: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color
const TONOS_BARRA: Record<string, string> = clases.barra_tono

export function ResumenEmpresas({ empresas }: ResumenEmpresasProps) {
  const resumen = calcularResumenEmpresas(empresas, usarSuscripciones())

  return (
    <section aria-label={textos.etiqueta} className={clases.rejilla}>
      <article className={clases.tarjeta}>
        <span className={`${clases.icono_caja} ${TONOS_ICONO[textos.tono_total]}`}>
          <Icono name={textos.icono_total as IconName} className={clases.icono} />
        </span>
        <div className={clases.cuerpo}>
          <span className={clases.etiqueta}>{textos.total}</span>
          <strong className={clases.valor}>{resumen.total}</strong>
          <span className={clases.detalle}>{rellenarPlantilla(textos.nuevas_mes, { cantidad: resumen.nuevasMes })}</span>
        </div>
      </article>
      {resumen.modulos.map((fila, indice) => {
        const modulo = MODULOS_EMPRESA[indice]
        const porcentaje = rellenarPlantilla(textos.porcentaje, { porcentaje: fila.porcentaje })
        const etiqueta = rellenarPlantilla(textos.con_modulo, { modulo: modulo.etiqueta })
        return (
          <article key={fila.clave} className={clases.tarjeta}>
            <span className={`${clases.icono_caja} ${TONOS_ICONO[modulo.tono]}`}>
              <Icono name={modulo.icono} className={clases.icono} />
            </span>
            <div className={clases.cuerpo}>
              <span className={clases.etiqueta}>{etiqueta}</span>
              <strong className={clases.valor}>{fila.cantidad}</strong>
              <span className={clases.detalle}>{porcentaje}</span>
              <progress value={fila.porcentaje} max={textos.porcentaje_maximo} aria-label={rellenarPlantilla(textos.etiqueta_barra, { etiqueta, porcentaje })} className={`${clases.barra} ${TONOS_BARRA[modulo.tono]}`} />
            </div>
          </article>
        )
      })}
    </section>
  )
}
