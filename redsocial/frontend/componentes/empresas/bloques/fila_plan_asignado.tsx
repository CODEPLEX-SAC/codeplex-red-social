import { Icono } from '../../compartido/icono'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import { Boton } from '../../compartido/interfaz/boton'
import { Interruptor } from '../../compartido/interfaz/interruptor'
import { capacidadDeFila, porcentajeDeUso } from './logica_mejora_plan'
import { rellenarPlantilla } from './logica_resumen_empresas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { FilaPlanAsignadoProps } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.planes_asignados
const edicion = textos.edicion
const clases = edicion.clases
const generales = catalogoEmpresas.clases
const TONOS_ICONO: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color
const TONOS_BARRA: Record<string, string> = generales.resumen.barra_tono

export function FilaPlanAsignado({ modulo, suscripcion, activo, totalEmpresas, puedeMejorar, onAlternar, onMejorar }: FilaPlanAsignadoProps) {
  const capacidad = capacidadDeFila(suscripcion, totalEmpresas)
  const porcentaje = porcentajeDeUso(capacidad, edicion.porcentaje_maximo)
  const conocida = capacidad.recurso !== null && capacidad.limite !== null
  const valor = capacidad.usadas === null ? edicion.capacidad_valor : edicion.uso_valor

  return (
    <tr className={CLASES_TABLA.fila}>
      <td className={CLASES_TABLA.celda}>
        <div className={clases.aplicativo}>
          <span className={`${textos.clases.icono_caja} ${TONOS_ICONO[modulo.tono]}`}>
            <Icono name={modulo.icono as IconName} className={textos.clases.icono} />
          </span>
          <div className="min-w-0">
            <span className={`block ${generales.nombre_fila}`}>{modulo.etiqueta}</span>
            <span className={clases.subtitulo}>{modulo.descripcion}</span>
          </div>
        </div>
      </td>
      <td className={CLASES_TABLA.celda}>
        {conocida && capacidad.recurso ? (
          <div className={clases.uso}>
            <div className={clases.uso_cabecera}>
              <span>{edicion.recursos[capacidad.recurso]}</span>
              <span>{rellenarPlantilla(valor, { usadas: capacidad.usadas ?? 0, limite: capacidad.limite ?? 0 })}</span>
            </div>
            {porcentaje === null ? (
              <span className={generales.texto_auxiliar}>{edicion.uso_no_determinado}</span>
            ) : (
              <>
                <progress value={porcentaje} max={edicion.porcentaje_maximo} aria-label={edicion.etiqueta_uso.replace(':modulo', modulo.etiqueta)} className={`${generales.resumen.barra} ${TONOS_BARRA[edicion.tono_barra]}`} />
                <span className={generales.texto_auxiliar}>{rellenarPlantilla(edicion.uso_porcentaje, { porcentaje })}</span>
              </>
            )}
          </div>
        ) : (
          <span className={generales.texto_auxiliar}>{edicion.capacidad_no_determinada}</span>
        )}
      </td>
      <td className={CLASES_TABLA.celda}>
        <div className={clases.interruptor}>
          <Interruptor etiqueta={activo ? edicion.activo : edicion.inactivo} posicionEtiqueta="fin" seleccionado={activo} alCambiar={onAlternar} />
        </div>
      </td>
      <td className={CLASES_TABLA.celda}>
        {puedeMejorar && (
          <Boton type="button" variant="contorno" size="default" aria-label={edicion.etiqueta_mejorar.replace(':modulo', modulo.etiqueta)} onClick={onMejorar} className="whitespace-nowrap">
            <Icono name={edicion.icono_mejorar as IconName} className="h-4 w-4" />
            {edicion.mejorar_plan}
          </Boton>
        )}
      </td>
    </tr>
  )
}
