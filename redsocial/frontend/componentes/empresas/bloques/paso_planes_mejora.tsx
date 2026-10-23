import { Icono } from '../../compartido/icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { TarjetaPlanMejora } from './tarjeta_plan_mejora'
import { rellenarPlantilla } from './logica_resumen_empresas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { PasoPlanesMejoraProps } from '@/tipos/empresas/contrato_mejora_plan'

const textos = catalogoEmpresas.planes_asignados.mejora
const clases = textos.clases
const generales = catalogoEmpresas.planes_asignados.clases
const TONOS_ICONO: Record<string, string> = catalogoCompartido.tarjeta_indicador_icono_color

export function PasoPlanesMejora({ modulo, suscripcion, capacidad, datos, alElegir }: PasoPlanesMejoraProps) {
  const alcanzado = capacidad.usadas !== null && capacidad.limite !== null && capacidad.usadas >= capacidad.limite
  const motivo = alcanzado ? rellenarPlantilla(textos.motivo_limite, { usadas: capacidad.usadas ?? 0, limite: capacidad.limite ?? 0 }) : textos.motivo_general

  return (
    <div className={clases.cuerpo}>
      <div className={clases.contexto}>
        <span className={`${generales.icono_caja} ${TONOS_ICONO[modulo.tono]}`}>
          <Icono name={modulo.icono as IconName} className={generales.icono} />
        </span>
        <p className={clases.contexto_texto}>{motivo.replace(':aplicativo', suscripcion.nombre)}</p>
      </div>
      <h3 className="m-0 text-titulo-banner text-texto">{textos.plan_actual_titulo}</h3>
      <ul aria-label={textos.plan_actual_titulo} className={clases.lista}>
        {datos.actual && <TarjetaPlanMejora plan={datos.actual} limite={capacidad.limite} recurso={capacidad.recurso} periodo={suscripcion.periodo} precio={datos.precioActual} />}
      </ul>
      <h3 className="m-0 text-titulo-banner text-texto">{textos.planes_titulo}</h3>
      {datos.opciones.length === 0 ? (
        <MensajeVacio texto={textos.sin_opciones} />
      ) : (
        <ul aria-label={textos.lista_etiqueta.replace(':aplicativo', suscripcion.nombre)} className={clases.lista}>
          {datos.opciones.map((opcion) => (
            <TarjetaPlanMejora key={opcion.plan.id} plan={opcion.plan} limite={opcion.limite} recurso={capacidad.recurso} periodo={suscripcion.periodo} precio={opcion.precio} opcion={opcion} alElegir={alElegir} />
          ))}
        </ul>
      )}
    </div>
  )
}
